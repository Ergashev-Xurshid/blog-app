import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

// 404 sahifalari uchun umumiy ko'rinish
export default function EmptyState({
  title,
  description,
  href,
  linkLabel,
}: {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-heading text-7xl font-bold text-muted-foreground/40">404</p>
      <h1 className="mt-4 font-heading text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-muted-foreground">{description}</p>
      <Link href={href} className={buttonVariants({ variant: "outline", size: "lg", className: "mt-8" })}>
        <ArrowLeftIcon data-icon="inline-start" />
        {linkLabel}
      </Link>
    </main>
  );
}
