import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";

export const alt = "Maqola rasmi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 32, opacity: 0.7 }}>Mening blog</div>
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>
          {post?.title ?? "Maqola topilmadi"}
        </div>
        <div style={{ fontSize: 28, opacity: 0.7 }}>mening-blog.uz</div>
      </div>
    ),
    size
  );
}
