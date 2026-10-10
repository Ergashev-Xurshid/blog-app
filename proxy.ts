import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_NAME, decrypt } from "@/lib/session";

// Qorovul: /admin ga kelgan har bir so'rovni sahifaga yetib bormasidan oldin
// tekshiradi. Bilaguzuk (cookie) yo'q yoki soxta bo'lsa — /login ga qaytaradi.
export async function proxy(request: NextRequest) {
  const ok = await decrypt(request.cookies.get(COOKIE_NAME)?.value);

  if (!ok) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
