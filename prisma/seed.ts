import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Seed — bo'sh bazaga boshlang'ich maqolalarni yozadi.
// Ishga tushirish: npx prisma db seed

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const posts = [
  { slug: "nextjs-bilan-tanishuv", title: "Next.js bilan tanishuv", content: "Next.js — React asosidagi framework..." },
  { slug: "tailwind-css-asoslari", title: "Tailwind CSS asoslari", content: "Tailwind'da CSS fayl yozish o'rniga tayyor klasslardan foydalanamiz: p-4, text-xl, bg-blue-500. Bu dizaynni ancha tezlashtiradi." },
  { slug: "server-komponentlar-nima", title: "Server komponentlar nima?", content: "Next.js'da komponentlar odatda serverda ishlaydi. Shuning uchun ular bazadan to'g'ridan-to'g'ri ma'lumot olishi mumkin va brauzerga kamroq JavaScript yuboriladi." },
  { slug: "client-komponentlar-nima", title: "Client komponentlar nima?", content: "Fayl boshida \"use client\" yozilsa, komponent brauzerda ishlaydi. useState, onClick kabi interaktiv narsalar faqat shunday komponentlarda ishlaydi." },
  { slug: "app-router-asoslari", title: "App Router asoslari", content: "App Router'da har bir papka URL segmentiga aylanadi, page.tsx esa o'sha sahifaning o'zi." },
  { slug: "layout-va-nested-layout", title: "Layout va nested layout", content: "layout.tsx sahifalarni o'rab turadi va sahifalar almashganda qayta chizilmaydi." },
  { slug: "dinamik-routelar", title: "Dinamik route'lar", content: "[slug] kabi papkalar bitta fayl bilan cheksiz sahifa yasash imkonini beradi." },
  { slug: "link-komponenti", title: "Link komponenti", content: "next/link sahifani to'liq qayta yuklamasdan almashtiradi va oldindan yuklaydi (prefetch)." },
  { slug: "metadata-va-seo", title: "Metadata va SEO", content: "metadata obyekti yoki generateMetadata funksiyasi orqali sahifa sarlavhasi va tavsifi beriladi." },
  { slug: "generate-static-params", title: "generateStaticParams", content: "Build vaqtida qaysi dinamik sahifalar oldindan yasalishini aytadi." },
  { slug: "loading-va-suspense", title: "loading.tsx va Suspense", content: "loading.tsx sahifa tayyorlanguncha ko'rsatiladigan vaqtinchalik ko'rinish." },
  { slug: "error-boundary", title: "error.tsx bilan xatolarni ushlash", content: "error.tsx segmentdagi xatoni ushlab, butun sayt buzilishining oldini oladi." },
  { slug: "not-found-sahifasi", title: "not-found sahifasi", content: "notFound() chaqirilganda eng yaqin not-found.tsx ko'rsatiladi." },
  { slug: "route-groups", title: "Route groups", content: "(site) kabi qavsli papkalar URL'ga ta'sir qilmay, layout'larni ajratishga yordam beradi." },
  { slug: "use-pathname-hook", title: "usePathname hook'i", content: "Joriy URL yo'lini olish uchun client komponentda ishlatiladi." },
  { slug: "search-params", title: "searchParams bilan qidiruv", content: "URL'dagi ?q= qiymatini sahifada o'qib, ro'yxatni filtrlash mumkin." },
  { slug: "next-image", title: "next/image optimizatsiyasi", content: "Image komponenti rasmni siqadi, o'lchamini moslaydi va lazy yuklaydi." },
  { slug: "lazy-loading", title: "Lazy loading nima?", content: "Ekrandan uzoqdagi rasmlar faqat unga yaqinlashganda yuklanadi." },
  { slug: "lcp-nima", title: "LCP nima?", content: "Largest Contentful Paint — sahifadagi eng katta element ko'rinish vaqti." },
  { slug: "next-font", title: "next/font bilan shriftlar", content: "Shriftlar build vaqtida yuklab olinib, saytning o'zidan beriladi." },
  { slug: "server-actions", title: "Server Actions", content: "Formani to'g'ridan-to'g'ri server funksiyasiga yuborish usuli." },
  { slug: "caching-asoslari", title: "Caching asoslari", content: "Next.js natijalarni keshlab, sahifalarni tezroq beradi." },
  { slug: "proxy-fayli", title: "proxy.ts fayli", content: "So'rov sahifaga yetib kelishidan oldin uni ushlab, yo'naltirish mumkin." },
  { slug: "vercel-ga-deploy", title: "Vercel'ga deploy", content: "Loyihani GitHub'ga yuklab, Vercel orqali bir necha daqiqada internetga chiqarish mumkin." },
];

async function main() {
  for (const post of posts) {
    // upsert: slug bo'yicha bor bo'lsa — tegmaydi, yo'q bo'lsa — yaratadi
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }
  console.log(`${posts.length} ta maqola tayyor`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
