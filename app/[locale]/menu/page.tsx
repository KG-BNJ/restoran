import { getTranslations, setRequestLocale } from "next-intl/server";
import { DishCard } from "@/components/menu/DishCard";
import { MenuNav } from "@/components/menu/MenuNav";
import { menu } from "@/content/menu";
import type { Locale } from "@/data/images";

export default async function MenuPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const lang = locale as Locale;

  return (
    <div className="px-4 pb-8 md:px-[max(1.5rem,calc((100%-1000px)/2))]">
      <header className="pb-2 pt-10">
        <h1 className="font-display text-4xl md:text-5xl">{t("pages.menu")}</h1>
        <p className="mt-3 text-muted">{t("menuPage.note")}</p>
        <p className="mt-1 text-sm text-brass">{t("menuPage.pdf")}</p>
      </header>
      <MenuNav locale={lang} />
      {menu.map((category) => (
        <section key={category.id} id={category.id} className="scroll-mt-28 pt-6">
          <h2 className="font-display text-3xl">{category[lang]}</h2>
          <ul>
            {category.dishes.map((dish) => (
              <li key={dish.id}>
                <DishCard dish={dish} locale={lang} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
