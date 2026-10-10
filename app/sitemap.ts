import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";

const SAYT = "https://mening-blog.uz";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Oddiy sahifalar — qo'lda yozamiz, ular kam
  const sahifalar = [
    { url: SAYT },
    { url: `${SAYT}/blog` },
  ];

  // 2. Maqola sahifalari — bazadagi har bir maqoladan bitta { url } yasaymiz
  const posts = await getPosts();
  const maqolaSahifalari = posts.map((post) => ({
    url: `${SAYT}/blog/${post.slug}`,
    lastModified: post.updatedAt,
  }));

  // 3. Ikkalasini bitta ro'yxatga qo'shib qaytaramiz
  return [...sahifalar, ...maqolaSahifalari];
}
