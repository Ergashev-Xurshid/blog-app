import Link from "next/link";
import { CalendarPlusIcon, FileTextIcon, HistoryIcon, PlusIcon } from "lucide-react";
import PostRowActions from "@/components/PostRowActions";
import SavedToast from "@/components/SavedToast";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/format";
import { getPosts, getStats } from "@/lib/posts";
import { verifySession } from "@/lib/session";

export default async function AdminPage() {
  await verifySession();
  const [posts, stats] = await Promise.all([getPosts(), getStats()]);

  const cards = [
    { label: "Jami maqolalar", value: stats.total, icon: FileTextIcon },
    { label: "Shu oyda qo'shilgan", value: stats.thisMonth, icon: CalendarPlusIcon },
    {
      label: "Oxirgi o'zgarish",
      value: stats.lastUpdated ? formatDate(stats.lastUpdated.updatedAt) : "—",
      icon: HistoryIcon,
    },
  ];

  return (
    <main className="mx-auto max-w-6xl p-4 md:p-8">
      <SavedToast />

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">Maqolalar</h1>
          <p className="mt-1 text-muted-foreground">Blogdagi barcha maqolalarni boshqarish</p>
        </div>
        <Link href="/admin/new" className={buttonVariants({ size: "lg", className: "px-4" })}>
          <PlusIcon data-icon="inline-start" />
          Yangi maqola
        </Link>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {cards.map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardHeader>
              <CardDescription className="flex items-center justify-between">
                {label}
                <Icon className="size-4" />
              </CardDescription>
              <CardTitle className="text-2xl font-bold">{value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="py-0">
        {posts.length === 0 ? (
          <CardContent className="flex flex-col items-center py-16 text-center">
            <FileTextIcon className="mb-4 size-10 text-muted-foreground" />
            <p className="font-medium">Hali maqola yo&apos;q</p>
            <Link href="/admin/new" className={buttonVariants({ variant: "outline", className: "mt-4" })}>
              Birinchisini yozish
            </Link>
          </CardContent>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 pl-4">#</TableHead>
                <TableHead>Sarlavha</TableHead>
                <TableHead className="hidden md:table-cell">Muallif</TableHead>
                <TableHead className="hidden sm:table-cell">Sana</TableHead>
                <TableHead className="w-12 pr-4" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="pl-4 text-muted-foreground">{post.id}</TableCell>
                  <TableCell className="max-w-0 w-full">
                    <Link href={`/admin/${post.id}/edit`} className="block truncate font-medium hover:underline">
                      {post.title}
                    </Link>
                    <span className="block truncate font-mono text-xs text-muted-foreground">
                      /blog/{post.slug}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="secondary">{post.author ?? "Admin"}</Badge>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground sm:table-cell">
                    {formatDate(post.createdAt)}
                  </TableCell>
                  <TableCell className="pr-4 text-right">
                    <PostRowActions id={post.id} slug={post.slug} title={post.title} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </main>
  );
}
