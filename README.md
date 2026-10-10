# Mening blog

Next.js 16 + PostgreSQL + Prisma bilan yozilgan blog va admin panel.
UI: [shadcn/ui](https://ui.shadcn.com) (Base UI) + Tailwind CSS 4 + lucide ikonkalar, dark mode, toast xabarlar.

## Imkoniyatlar

- Bosh sahifa (hero + so'nggi maqolalar), `/blog` — qidiruv va sahifalash (`?q=`, `?page=`)
- Maqola sahifasi: muallif, sana, o'qish vaqti, boshqa maqolalar, OG rasm
- Yorug'/qorong'i tema (tanlov saqlanadi)
- Admin panel: statistika, jadval, `...` menyu, tasdiqlash oynasi bilan o'chirish, toast xabarlar
- Maqola formasi: avtomatik slug, muallif, jonli ko'rinish (next/dynamic), validatsiya
- Parolli kirish (JWT cookie), `proxy.ts` himoyasi, sitemap/robots

## Lokal ishga tushirish

Kerak: Node.js 22, Docker Desktop.

```bash
npm install                 # paketlar + Prisma Client (postinstall)
cp .env.example .env        # so'ng .env ichini to'ldiring
npm run db:up               # Postgres'ni Docker'da ishga tushirish
npm run db:migrate          # jadvallarni yaratish
npm run db:seed             # boshlang'ich maqolalar
npm run dev                 # http://localhost:3000
```

Admin panel: http://localhost:3000/admin (parol `.env` dagi `ADMIN_PASSWORD`).

Bazani jadval ko'rinishida ko'rish: `npm run db:studio`.

## Tuzilishi

| Fayl | Vazifasi |
|---|---|
| `prisma/schema.prisma` | Bazadagi jadvallar (Post) |
| `prisma/seed.ts` | Boshlang'ich maqolalar |
| `lib/prisma.ts` | Bazaga ulanish (bitta nusxa) |
| `lib/posts.ts` | Maqolalarni o'qish funksiyalari |
| `lib/session.ts` | Login sessiyasi (imzolangan cookie) |
| `proxy.ts` | `/admin` ga kirishdan oldin cookie tekshiruvi |
| `app/admin/actions.ts` | Yaratish / tahrirlash / o'chirish (Server Actions) |
| `app/login/actions.ts` | Kirish va chiqish |
| `components/ui/*` | shadcn/ui komponentlari (Button, Card, Table, AlertDialog...) |
| `components/theme.tsx` | Dark mode: `useTheme`, `ThemeToggle` |
| `lib/format.ts` | Sana, o'qish vaqti, qisqa matn |

## Vercel'ga deploy

1. Loyihani GitHub'ga yuklang (`.env` yuklanmaydi, bu to'g'ri).
2. Bulutda Postgres oching, masalan [Neon](https://neon.tech) (bepul) va ulanish manzilini nusxalang.
3. Vercel'da "New Project", so'ng repozitoriyni tanlang. **Environment Variables** ga uchta o'zgaruvchini kiriting:
   `DATABASE_URL`, `ADMIN_PASSWORD` (kuchli parol!), `SESSION_SECRET` (yangi tasodifiy qator).
4. Bulutdagi bazada jadvallarni yarating (o'z kompyuteringizdan, bir marta):
   ```bash
   DATABASE_URL="<neon-manzili>" npx prisma migrate deploy
   DATABASE_URL="<neon-manzili>" npx prisma db seed
   ```
5. Vercel'da "Deploy" ni bosing.
# blog-app
