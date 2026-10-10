"use server";

import { createHash, timingSafeEqual } from "node:crypto";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";

export type LoginState = { error?: string };

// Parollarni solishtirish. Oddiy === emas, chunki === birinchi farq qiluvchi
// harfda to'xtaydi va javob vaqti orqali parolni taxmin qilish mumkin bo'ladi.
function passwordMatches(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error("ADMIN_PASSWORD .env faylida yo'q");
  const a = createHash("sha256").update(input).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");

  if (!passwordMatches(password)) {
    return { error: "Parol noto'g'ri" };
  }

  await createSession();
  redirect("/admin");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
