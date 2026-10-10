import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

// Bazadan maqola o'qiydigan funksiyalar shu yerda jamlangan.
// Sahifalar Prisma'ni to'g'ridan-to'g'ri emas, shu funksiyalar orqali chaqiradi.

export type { Post } from "@/generated/prisma/client";

export const POSTS_PER_PAGE = 9;

const newestFirst = [{ createdAt: "desc" as const }, { id: "desc" as const }];

function searchWhere(q?: string) {
  return q ? { title: { contains: q, mode: "insensitive" as const } } : undefined;
}

// Barcha maqolalar (q berilsa — sarlavhada qidiradi, katta-kichik harf farqsiz)
export function getPosts(q?: string) {
  return prisma.post.findMany({ where: searchWhere(q), orderBy: newestFirst });
}

// Bitta sahifa maqolalar + jami soni (sahifalash uchun)
export async function getPostsPage(q: string | undefined, page: number) {
  const where = searchWhere(q);
  const [posts, total] = await prisma.$transaction([
    prisma.post.findMany({
      where,
      orderBy: newestFirst,
      skip: (page - 1) * POSTS_PER_PAGE,
      take: POSTS_PER_PAGE,
    }),
    prisma.post.count({ where }),
  ]);
  return { posts, total, totalPages: Math.max(1, Math.ceil(total / POSTS_PER_PAGE)) };
}

export function getLatestPosts(count: number, exceptId?: number) {
  return prisma.post.findMany({
    where: exceptId ? { id: { not: exceptId } } : undefined,
    orderBy: newestFirst,
    take: count,
  });
}

// cache: bitta so'rov ichida generateMetadata va sahifa ikkalasi chaqirsa,
// bazaga faqat bir marta murojaat qilinadi
export const getPostBySlug = cache((slug: string) =>
  prisma.post.findUnique({ where: { slug } }),
);

export function getPostById(id: number) {
  return prisma.post.findUnique({ where: { id } });
}

// Admin bosh sahifasidagi raqamlar
export async function getStats() {
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const [total, thisMonth, lastUpdated] = await prisma.$transaction([
    prisma.post.count(),
    prisma.post.count({ where: { createdAt: { gte: monthStart } } }),
    prisma.post.findFirst({ orderBy: { updatedAt: "desc" } }),
  ]);
  return { total, thisMonth, lastUpdated };
}
