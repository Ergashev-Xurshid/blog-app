import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Sessiya = "bilaguzuk". Admin parolni to'g'ri kiritsa, imzolangan token
// cookie'ga yoziladi. Imzo SESSION_SECRET bilan qo'yiladi — uni bilmagan odam
// soxta token yasay olmaydi.

const COOKIE_NAME = "session";
const MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 kun

function getKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET .env faylida yo'q");
  return new TextEncoder().encode(secret);
}

export async function encrypt() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(getKey());
}

// Token haqiqiy va muddati o'tmagan bo'lsa — true
export async function decrypt(token: string | undefined) {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getKey(), {
      algorithms: ["HS256"],
    });
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function createSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, await encrypt(), {
    httpOnly: true, // brauzerdagi JS o'qiy olmaydi
    secure: process.env.NODE_ENV === "production", // prod'da faqat https orqali
    sameSite: "lax",
    maxAge: MAX_AGE_SECONDS,
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isLoggedIn() {
  const cookieStore = await cookies();
  return decrypt(cookieStore.get(COOKIE_NAME)?.value);
}

// Admin sahifalari va Server Action'lar boshida chaqiriladi.
// proxy.ts birinchi qorovul, bu esa ma'lumotga eng yaqin ikkinchi qorovul.
export async function verifySession() {
  if (!(await isLoggedIn())) redirect("/login");
}

export { COOKIE_NAME };
