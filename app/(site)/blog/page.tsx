import type { Metadata } from "next";
import Link from "next/link";
import { SearchIcon, XIcon } from "lucide-react";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getPostsPage } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Barcha maqolalar",
};

export default async function BlogPage({ searchParams }: PageProps<"/blog">) {
  const { q, page } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";
  const pageNumber = Math.max(1, Math.floor(Number(page)) || 1);

  // Qidiruv va sahifalashni baza bajaradi (WHERE title ILIKE ... LIMIT ... OFFSET ...)
  const { posts, total, totalPages } = await getPostsPage(query || undefined, pageNumber);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12">
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">Barcha maqolalar</h1>
          <p className="mt-1 text-muted-foreground">
            {query ? `"${query}" bo'yicha ${total} ta natija` : `Jami ${total} ta maqola`}
          </p>
        </div>
        <form className="flex w-full gap-2 sm:w-80">
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Maqola qidirish..."
              aria-label="Maqola qidirish"
              className="h-9 pl-8"
            />
          </div>
          <Button type="submit" size="lg">
            Qidirish
          </Button>
        </form>
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center rounded-xl border border-dashed py-16 text-center">
          <SearchIcon className="mb-4 size-10 text-muted-foreground" />
          <p className="font-medium">Hech narsa topilmadi</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Boshqa so&apos;z bilan qidirib ko&apos;ring
          </p>
          {query && (
            <Link href="/blog" className={buttonVariants({ variant: "outline", className: "mt-6" })}>
              <XIcon data-icon="inline-start" />
              Qidiruvni tozalash
            </Link>
          )}
        </div>
      ) : (
        <>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <li key={post.id}>
                <PostCard post={post} eager={index === 0} />
              </li>
            ))}
          </ul>
          <Pagination page={pageNumber} totalPages={totalPages} query={query} />
        </>
      )}
    </main>
  );
}
