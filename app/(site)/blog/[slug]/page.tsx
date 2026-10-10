import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, CalendarIcon, ClockIcon } from "lucide-react";
import PostCard from "@/components/PostCard";
import PostCover from "@/components/PostCover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { excerpt, formatDate, paragraphs, readingTime } from "@/lib/format";
import { getLatestPosts, getPostBySlug, getPosts } from "@/lib/posts";

// Build vaqtida bazadagi maqolalar oldindan yasaladi.
// Keyin qo'shilganlari birinchi ochilganda yasaladi (dynamicParams = true).
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Maqola topilmadi" };
  }

  return {
    title: post.title,
    description: excerpt(post.content),
    openGraph: {
      title: post.title,
      description: excerpt(post.content),
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      authors: [post.author ?? "Admin"],
    },
  };
}

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const morePosts = await getLatestPosts(3, post.id);
  const author = post.author ?? "Admin";

  return (
    <main className="flex-1">
      <article className="mx-auto max-w-3xl px-4 py-10">
        <Link href="/blog" className={buttonVariants({ variant: "ghost", className: "-ml-2.5 mb-6" })}>
          <ArrowLeftIcon data-icon="inline-start" />
          Barcha maqolalar
        </Link>

        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-5xl sm:leading-tight">
          {post.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-2 font-medium text-foreground">
            <Avatar size="sm">
              <AvatarFallback>{author.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            {author}
          </span>
          <span className="flex items-center gap-1">
            <CalendarIcon className="size-4" />
            <time dateTime={post.createdAt.toISOString()}>{formatDate(post.createdAt)}</time>
          </span>
          <span className="flex items-center gap-1">
            <ClockIcon className="size-4" />
            {readingTime(post.content)} daqiqa o&apos;qish
          </span>
        </div>

        <PostCover
          id={post.id}
          title={post.title}
          eager
          sizes="(min-width: 768px) 736px, 100vw"
          className="mt-8 rounded-xl border"
        />

        <div className="mt-10 space-y-6 font-serif text-lg leading-relaxed text-foreground/90">
          {paragraphs(post.content).map((text, i) => (
            <p key={i} className="whitespace-pre-wrap">
              {text}
            </p>
          ))}
        </div>
      </article>

      {morePosts.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 pb-16">
          <Separator className="mb-12" />
          <h2 className="mb-6 font-heading text-2xl font-bold">Boshqa maqolalar</h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {morePosts.map((p) => (
              <li key={p.id}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
