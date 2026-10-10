import type { Metadata } from "next";
import AdminPageHeader from "@/components/AdminPageHeader";
import PostForm from "@/components/PostForm";
import { createPost } from "@/app/admin/actions";
import { verifySession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Yangi maqola",
};

export default async function NewPostPage() {
  await verifySession();

  return (
    <main className="mx-auto max-w-6xl p-4 md:p-8">
      <AdminPageHeader title="Yangi maqola" crumb="Yangi" />
      <PostForm action={createPost} />
    </main>
  );
}
