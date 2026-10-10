"use client";

import { RotateCcwIcon, TriangleAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogErrorPage({
  error,
  retry,
}: {
  error: Error;
  retry: () => void;
}) {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <TriangleAlertIcon className="size-6" />
      </div>
      <h1 className="font-heading text-2xl font-bold">Nimadir xato ketdi</h1>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
      <Button onClick={() => retry()} variant="outline" size="lg" className="mt-6">
        <RotateCcwIcon data-icon="inline-start" />
        Qayta urinish
      </Button>
    </main>
  );
}
