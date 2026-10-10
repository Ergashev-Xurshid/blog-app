import Image from "next/image";
import { cn } from "@/lib/utils";

// Har bir maqolaga id bo'yicha bitta rang juftligi (fon/matn)
const palettes = [
  ["18181b", "fafafa"],
  ["1e3a8a", "dbeafe"],
  ["14532d", "dcfce7"],
  ["7c2d12", "ffedd5"],
  ["581c87", "f3e8ff"],
  ["134e4a", "ccfbf1"],
];

export default function PostCover({
  id,
  title,
  eager = false,
  sizes,
  className,
}: {
  id: number;
  title: string;
  eager?: boolean;
  sizes: string;
  className?: string;
}) {
  const [bg, fg] = palettes[id % palettes.length];
  const src = `https://placehold.co/1200x630/${bg}/${fg}/png?font=lora&text=${encodeURIComponent(title)}`;

  return (
    <Image
      src={src}
      alt={title}
      width={1200}
      height={630}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      className={cn("aspect-1200/630 w-full object-cover", className)}
    />
  );
}
