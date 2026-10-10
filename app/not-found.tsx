import EmptyState from "@/components/EmptyState";

// Saytdagi boshqa barcha topilmagan manzillar uchun
export default function NotFound() {
  return (
    <EmptyState
      title="Sahifa topilmadi"
      description="Bunday manzil mavjud emas. Havolani tekshirib ko'ring."
      href="/"
      linkLabel="Bosh sahifaga"
    />
  );
}
