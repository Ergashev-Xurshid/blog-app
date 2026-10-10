import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} MeningBlog. Next.js bilan yozilgan.</p>
        <nav className="flex gap-4">
          <Link href="/blog" className="hover:text-foreground">Blog</Link>
          <Link href="/sitemap.xml" className="hover:text-foreground">Sitemap</Link>
        </nav>
      </div>
    </footer>
  );
}
