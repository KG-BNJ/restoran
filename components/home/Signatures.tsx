import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Photo } from "@/components/ui/Photo";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { formatPrice, menu } from "@/content/menu";
import type { Locale } from "@/data/images";

export async function Signatures() {
  const t = await getTranslations("home");
  const locale = (await getLocale()) as Locale;
  const dishes = menu.flatMap((category) => category.dishes).filter((dish) => dish.signature);

  return (
    <section className="px-4 py-14 md:px-[max(1.5rem,calc((100%-1000px)/2))]">
      <h2 className="font-display text-3xl md:text-4xl">{t("signaturesTitle")}</h2>
      <p className="mt-2 max-w-md text-muted">{t("signaturesLede")}</p>
      <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {dishes.map((dish) => (
          <li key={dish.id}>
            <Link href={{ pathname: "/menu", hash: dish.id }} className="block">
              {dish.image ? (
                <Photo image={dish.image} locale={locale} sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw" className="aspect-[4/3] w-full" />
              ) : (
                <PhotoSlot className="aspect-[4/3] w-full" />
              )}
              <h3 className="mt-3 font-display text-xl">{dish[locale].name}</h3>
              <p className="mt-1 text-sm text-muted">{dish[locale].description}</p>
              <p className="mt-2 text-sm font-medium text-pine">{formatPrice(dish.price)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
