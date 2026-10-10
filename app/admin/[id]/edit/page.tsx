import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/AdminPageHeader";
import PostForm from "@/components/PostForm";
import { updatePost } from "@/app/admin/actions";
import { getPostById } from "@/lib/posts";
import { verifySession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Tahrirlash",
};

export default async function EditPostPage(props: PageProps<"/admin/[id]/edit">) {
  await verifySession();

  const { id } = await props.params;
  const post = Number.isInteger(Number(id)) ? await getPostById(Number(id)) : null;
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-6xl p-4 md:p-8">
      <AdminPageHeader title="Tahrirlash" crumb={post.title} />
      {/* bind: id ni action'ga oldindan "yopishtirib" qo'yamiz */}
      <PostForm
        action={updatePost.bind(null, post.id)}
        initial={{
          title: post.title,
          slug: post.slug,
          author: post.author ?? "",
          content: post.content,
        }}
        submitLabel="Yangilash"
      />
    </main>
  );
}
