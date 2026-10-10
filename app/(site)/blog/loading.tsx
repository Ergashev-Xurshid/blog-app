import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12">
      <Skeleton className="h-9 w-64" />
      <Skeleton className="mt-3 h-5 w-40" />
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <li key={i} className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
            <Skeleton className="aspect-1200/630 rounded-none" />
            <div className="space-y-3 p-4">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-5 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
