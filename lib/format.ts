// Maqola matnini ko'rsatish uchun kichik yordamchi funksiyalar (server ham, client ham ishlatadi)

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("uz-UZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

// O'rtacha o'qish tezligi ~200 so'z/daqiqa
export function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function excerpt(content: string, length = 160) {
  const text = content.replace(/\s+/g, " ").trim();
  return text.length > length ? `${text.slice(0, length).trimEnd()}…` : text;
}

// Bo'sh qator bilan ajratilgan qismlarni paragraflarga bo'ladi
export function paragraphs(content: string) {
  return content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}
