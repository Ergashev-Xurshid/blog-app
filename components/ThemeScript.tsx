// Server komponent: <head> ichiga kichik skript qo'yadi. U HTML o'qilayotganda
// darhol ishlaydi va saqlangan (yoki tizimdagi) temani qo'llaydi.
const script = `(() => {
  try {
    const saved = localStorage.getItem("theme");
    const dark = saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", dark);
  } catch {}
})()`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
