import { menu } from "@/content/menu";
import type { Locale } from "@/data/images";

export function MenuNav({ locale }: { locale: Locale }) {
  return (
    <nav
      className="sticky top-14 z-10 -mx-4 flex gap-4 overflow-x-auto bg-bg/95 px-4 py-3 backdrop-blur"
      aria-label="Menu"
    >
      {menu.map((category) => (
        <a
          key={category.id}
          href={`#${category.id}`}
          className="shrink-0 border-b-2 border-transparent pb-1 text-sm text-muted hover:text-ink"
        >
          {category[locale]}
        </a>
      ))}
    </nav>
  );
}
