import Link from "next/link";
import { CalendarIcon, ClockIcon } from "lucide-react";
import type { Post } from "@/generated/prisma/client";
import PostCover from "@/components/PostCover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { excerpt, formatDate, readingTime } from "@/lib/format";

export default function PostCard({
  post,
  eager = false,
}: {
  post: Post;
  eager?: boolean;
}) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full rounded-xl focus-visible:outline-2">
      <Card className="h-full pt-0 transition-all group-hover:-translate-y-0.5 group-hover:shadow-lg">
        <div className="overflow-hidden">
          <PostCover
            id={post.id}
            title={post.title}
            eager={eager}
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardHeader>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <CalendarIcon className="size-3.5" />
              {formatDate(post.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon className="size-3.5" />
              {readingTime(post.content)} daq
            </span>
          </div>
          <CardTitle className="font-heading text-lg leading-snug group-hover:underline">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          {excerpt(post.content, 120)}
        </CardContent>
      </Card>
    </Link>
  );
}
