"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const messages: Record<string, string> = {
  created: "Maqola yaratildi",
  updated: "Maqola yangilandi",
};

// Server Action redirect("/admin?saved=...") qilgandan keyin bir marta toast
// ko'rsatadi va ?saved= ni URL'dan olib tashlaydi (yangilansa qayta chiqmasin)
export default function SavedToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const saved = searchParams.get("saved");

  useEffect(() => {
    if (!saved || !messages[saved]) return;
    toast.success(messages[saved]);
    router.replace(pathname, { scroll: false });
  }, [saved, router, pathname]);

  return null;
}
