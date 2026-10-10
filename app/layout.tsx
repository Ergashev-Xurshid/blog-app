import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import ThemeScript from "@/components/ThemeScript";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mening-blog.uz"),
  title: {
    template: "%s | Mening blog",
    default: "Mening blog",
  },
  description: "Next.js, React va veb-dasturlash haqida o'zbek tilidagi maqolalar",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: ThemeScript <html> ga "dark" klassini
    // React'dan oldin qo'shadi — bu farq kutilgan
    <html
      lang="uz"
      suppressHydrationWarning
      className={`${lora.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
