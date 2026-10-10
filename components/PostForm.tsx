"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { EyeIcon, EyeOffIcon, Loader2Icon, SaveIcon } from "lucide-react";
import type { PostFormState } from "@/app/admin/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { readingTime } from "@/lib/format";

// Ko'rinish oynasi alohida JS faylga ajraladi va faqat "Ko'rish" bosilganda yuklanadi
const PostPreview = dynamic(() => import("./PostPreview"));

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[ʻʼ'`‘’]/g, "")
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

type Props = {
  action: (state: PostFormState, formData: FormData) => Promise<PostFormState>;
  initial?: { title: string; slug: string; author: string; content: string };
  submitLabel?: string;
};

// Yangi maqola va tahrirlash uchun bitta forma
export default function PostForm({
  action,
  initial,
  submitLabel = "Saqlash",
}: Props) {
  const [state, formAction, pending] = useActionState(action, {});
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [showPreview, setShowPreview] = useState(false);
  // Tahrirlashda slug sarlavha bilan birga o'zgarmasin (URL buzilmasligi uchun)
  const [autoSlug, setAutoSlug] = useState(!initial);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form action={formAction} className={showPreview ? "" : "lg:col-span-2 lg:max-w-3xl"}>
        <Card>
          <CardContent className="space-y-5">
            <Field label="Sarlavha" htmlFor="title" error={state.errors?.title}>
              <Input
                id="title"
                name="title"
                value={title}
                aria-invalid={!!state.errors?.title}
                placeholder="Maqola sarlavhasi"
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (autoSlug) setSlug(slugify(e.target.value));
                }}
                className="h-9"
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Slug"
                htmlFor="slug"
                error={state.errors?.slug}
                hint={slug ? `/blog/${slug}` : "URL manzili"}
              >
                <Input
                  id="slug"
                  name="slug"
                  value={slug}
                  aria-invalid={!!state.errors?.slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setAutoSlug(false);
                  }}
                  placeholder="nextjs-bilan-tanishuv"
                  className="h-9 font-mono"
                />
              </Field>

              <Field label="Muallif" htmlFor="author" error={state.errors?.author} hint="Bo'sh qolsa: Admin">
                <Input
                  id="author"
                  name="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  aria-invalid={!!state.errors?.author}
                  placeholder="Admin"
                  className="h-9"
                />
              </Field>
            </div>

            <Field
              label="Matn"
              htmlFor="content"
              error={state.errors?.content}
              hint={`${content.length} belgi · ~${readingTime(content)} daqiqa · paragraflarni bo'sh qator bilan ajrating`}
            >
              <Textarea
                id="content"
                name="content"
                rows={14}
                value={content}
                aria-invalid={!!state.errors?.content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-72 font-serif text-base leading-relaxed"
              />
            </Field>

            {state.message && <p className="text-sm text-destructive">{state.message}</p>}
          </CardContent>

          <CardFooter className="flex-wrap gap-2 border-t bg-muted/50 py-4">
            <Button type="submit" size="lg" disabled={pending} className="px-4">
              {pending ? (
                <Loader2Icon data-icon="inline-start" className="animate-spin" />
              ) : (
                <SaveIcon data-icon="inline-start" />
              )}
              {pending ? "Saqlanmoqda..." : submitLabel}
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={() => setShowPreview(!showPreview)}>
              {showPreview ? <EyeOffIcon data-icon="inline-start" /> : <EyeIcon data-icon="inline-start" />}
              {showPreview ? "Yashirish" : "Ko'rish"}
            </Button>
            <Link href="/admin" className={buttonVariants({ variant: "ghost", size: "lg", className: "ml-auto" })}>
              Bekor qilish
            </Link>
          </CardFooter>
        </Card>
      </form>

      {showPreview && <PostPreview title={title} content={content} />}
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : (
        hint && <p className="truncate text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}
