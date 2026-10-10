"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { paragraphs } from "@/lib/format";

export default function PostPreview({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const parts = paragraphs(content);

  return (
    <Card className="h-fit lg:sticky lg:top-8">
      <CardContent>
        <Badge variant="outline" className="mb-4">
          Ko&apos;rinish
        </Badge>
        <h1 className="font-heading text-3xl font-bold tracking-tight">
          {title || "Sarlavhasiz"}
        </h1>
        <div className="mt-6 space-y-4 font-serif text-base leading-relaxed text-foreground/90">
          {parts.length === 0 ? (
            <p className="text-muted-foreground">Matn yo&apos;q</p>
          ) : (
            parts.map((text, i) => (
              <p key={i} className="whitespace-pre-wrap">
                {text}
              </p>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
