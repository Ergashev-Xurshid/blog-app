import EmptyState from "@/components/EmptyState";

export default function MaqolaNotFound() {
  return (
    <EmptyState
      title="Maqola topilmadi"
      description="Siz qidirgan maqola mavjud emas yoki o'chirilgan."
      href="/blog"
      linkLabel="Barcha maqolalar"
    />
  );
}
