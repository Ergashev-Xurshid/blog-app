import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

// Admin ichki sahifalari tepasidagi "Maqolalar › ..." yo'li va sarlavha
export default function AdminPageHeader({ title, crumb }: { title: string; crumb: string }) {
  return (
    <div className="mb-6">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/admin" className="hover:text-foreground">
          Maqolalar
        </Link>
        <ChevronRightIcon className="size-4" />
        <span className="truncate text-foreground">{crumb}</span>
      </nav>
      <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight">{title}</h1>
    </div>
  );
}
