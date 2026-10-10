import Link from "next/link";
import { ArrowRightIcon, SparklesIcon } from "lucide-react";
import PostCard from "@/components/PostCard";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { getLatestPosts } from "@/lib/posts";

export default async function Home() {
  const latestPosts = await getLatestPosts(3);

  return (
    <main className="flex-1">
      <section className="relative isolate overflow-hidden border-b">
        {/* Fon: yengil nuqtali to'r */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(var(--border)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_center,black_40%,transparent_75%)] bg-size-[20px_20px]" />
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:py-28">
          <Badge variant="secondary" className="mb-6">
            <SparklesIcon />
            Next.js 16 · React 19 · PostgreSQL
          </Badge>
          <h1 className="mx-auto max-w-3xl font-heading text-4xl font-bold tracking-tight sm:text-6xl">
            Veb-dasturlash haqida{" "}
            <span className="bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-violet-400">
              sodda tilda
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Next.js, React va backend asoslarini o&apos;rganish jarayonida yozilgan
            qisqa va tushunarli maqolalar.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/blog" className={buttonVariants({ size: "lg", className: "px-4" })}>
              Maqolalarni o&apos;qish
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold">{"So'nggi maqolalar"}</h2>
            <p className="mt-1 text-muted-foreground">Yangi qo&apos;shilganlari</p>
          </div>
          <Link href="/blog" className={buttonVariants({ variant: "ghost" })}>
            Barchasi
            <ArrowRightIcon data-icon="inline-end" />
          </Link>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post, index) => (
            <li key={post.id}>
              <PostCard post={post} eager={index === 0} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
