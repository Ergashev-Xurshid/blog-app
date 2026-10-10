import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",     // * = hamma robotlar uchun
      allow: "/",         // butun saytga kirish mumkin...
      disallow: ["/admin", "/login"],    // ...faqat bu yerga emas
    },
    sitemap: "https://mening-blog.uz/sitemap.xml",       // mundarija (sitemap) qayerda?
  };
}