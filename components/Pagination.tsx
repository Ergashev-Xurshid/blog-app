import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Sahifa raqami URL'da saqlanadi: /blog?q=next&page=2
function pageHref(page: number, query: string) {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (page > 1) params.set("page", String(page));
  const search = params.toString();
  return search ? `/blog?${search}` : "/blog";
}

export default function Pagination({
  page,
  totalPages,
  query,
}: {
  page: number;
  totalPages: number;
  query: string;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const disabled = "pointer-events-none opacity-50";

  return (
    <nav aria-label="Sahifalar" className="mt-12 flex items-center justify-center gap-1">
      <Link
        href={pageHref(page - 1, query)}
        aria-disabled={page <= 1}
        tabIndex={page <= 1 ? -1 : undefined}
        className={cn(buttonVariants({ variant: "ghost" }), page <= 1 && disabled)}
      >
        <ChevronLeftIcon data-icon="inline-start" />
        Oldingi
      </Link>
      {pages.map((p) => (
        <Link
          key={p}
          href={pageHref(p, query)}
          aria-current={p === page ? "page" : undefined}
          className={buttonVariants({ variant: p === page ? "default" : "ghost", size: "icon" })}
        >
          {p}
        </Link>
      ))}
      <Link
        href={pageHref(page + 1, query)}
        aria-disabled={page >= totalPages}
        tabIndex={page >= totalPages ? -1 : undefined}
        className={cn(buttonVariants({ variant: "ghost" }), page >= totalPages && disabled)}
      >
        Keyingi
        <ChevronRightIcon data-icon="inline-end" />
      </Link>
    </nav>
  );
}
