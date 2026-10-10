"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// Tema <html class="dark"> orqali boshqariladi. Tanlov localStorage'da saqlanadi,
// ThemeScript esa sahifa chizilishidan oldin uni qo'llaydi (oq "chaqnash" bo'lmasin).

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

export function useTheme() {
  const isDark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    () => false,
  );

  function setTheme(theme: "light" | "dark") {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }

  return { theme: isDark ? "dark" : "light", setTheme } as const;
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Temani almashtirish"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {/* Ikkala ikonka ham chiziladi, CSS qaysi birini ko'rsatishni hal qiladi —
          shunda server va brauzer HTML'i bir xil bo'ladi */}
      <SunIcon className="dark:hidden" />
      <MoonIcon className="hidden dark:block" />
    </Button>
  );
}
