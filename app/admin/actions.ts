"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";

// Server Action'lar: forma "Saqlash" bosilganda serverda ishlaydigan funksiyalar.
// Ular POST so'rov bilan to'g'ridan-to'g'ri ham chaqirilishi mumkin,
// shuning uchun HAR BIRINING boshida verifySession() bor.

export type PostFormState = {
  errors?: { title?: string; slug?: string; author?: string; content?: string };
  message?: string;
};

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Forma ma'lumotini tekshiradi: to'g'ri bo'lsa { data }, aks holda { errors }
function validate(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  const errors: NonNullable<PostFormState["errors"]> = {};
  if (!title) errors.title = "Sarlavha bo'sh bo'lmasin";
  else if (title.length > 200) errors.title = "Sarlavha 200 belgidan oshmasin";
  if (!SLUG_REGEX.test(slug))
    errors.slug = "Slug faqat kichik lotin harflari, raqam va '-' dan iborat bo'lsin";
  if (author.length > 100) errors.author = "Muallif ismi 100 belgidan oshmasin";
  if (!content) errors.content = "Matn bo'sh bo'lmasin";

  if (Object.keys(errors).length > 0) return { errors };
  // Muallif bo'sh bo'lsa bazaga null yoziladi (sahifada "Admin" ko'rinadi)
  return { data: { title, slug, author: author || null, content } };
}

// Bazadagi xatoni foydalanuvchiga tushunarli holatga aylantiradi
function handleDbError(error: unknown): PostFormState {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002" // unique cheklovi buzildi — bunday slug bor
  ) {
    return { errors: { slug: "Bu slug band, boshqasini tanlang" } };
  }
  throw error;
}

export async function createPost(
  _prevState: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  await verifySession();

  const result = validate(formData);
  if (result.errors) return { errors: result.errors };

  try {
    await prisma.post.create({ data: result.data });
  } catch (error) {
    return handleDbError(error);
  }

  // Butun saytdagi eski nusxalarni tashlaymiz: bosh sahifa, /blog, sitemap...
  revalidatePath("/", "layout");
  // ?saved= — admin sahifasi buni ko'rib "Saqlandi" xabarini (toast) chiqaradi
  redirect("/admin?saved=created");
}

export async function updatePost(
  id: number,
  _prevState: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  await verifySession();

  const result = validate(formData);
  if (result.errors) return { errors: result.errors };

  try {
    await prisma.post.update({ where: { id }, data: result.data });
  } catch (error) {
    return handleDbError(error);
  }

  revalidatePath("/", "layout");
  redirect("/admin?saved=updated");
}

export async function deletePost(id: number) {
  await verifySession();

  // deleteMany: maqola allaqachon o'chirilgan bo'lsa ham xato bermaydi
  await prisma.post.deleteMany({ where: { id } });

  revalidatePath("/", "layout");
}
