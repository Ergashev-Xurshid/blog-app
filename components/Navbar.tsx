import Link from "next/link";
import { PenLineIcon } from "lucide-react";
import NavLinks from "@/components/NavLinks";
import { ThemeToggle } from "@/components/theme";
import { buttonVariants } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-4">
        <Link href="/" className="flex items-center gap-2 font-heading text-lg font-bold">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <PenLineIcon className="size-4" />
          </span>
          MeningBlog
        </Link>
        <NavLinks />
        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
          <Link href="/admin" className={buttonVariants({ variant: "outline", size: "sm" })}>
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
