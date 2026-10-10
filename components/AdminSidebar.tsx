"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileTextIcon,
  LogOutIcon,
  PenLineIcon,
  PlusIcon,
} from "lucide-react";
import { logout } from "@/app/login/actions";
import { ThemeToggle } from "@/components/theme";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Maqolalar", icon: FileTextIcon },
  { href: "/admin/new", label: "Yangi maqola", icon: PlusIcon },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex shrink-0 flex-col border-b bg-sidebar text-sidebar-foreground md:sticky md:top-0 md:h-dvh md:w-60 md:border-r md:border-b-0">
      <div className="flex h-14 items-center gap-2 px-4 font-heading font-bold">
        <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <PenLineIcon className="size-4" />
        </span>
        Admin panel
        <div className="ml-auto flex md:hidden">
          <ThemeToggle />
          <form action={logout}>
            <Button type="submit" variant="ghost" size="icon" aria-label="Chiqish" className="text-destructive">
              <LogOutIcon />
            </Button>
          </form>
        </div>
      </div>

      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 whitespace-nowrap md:flex-col md:pb-0">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent",
              pathname === href
                ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                : "text-muted-foreground",
            )}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto hidden items-center gap-1 border-t p-3 md:flex">
        <form action={logout} className="flex-1">
          <Button type="submit" variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
            <LogOutIcon data-icon="inline-start" />
            Chiqish
          </Button>
        </form>
        <ThemeToggle />
      </div>
    </aside>
  );
}
