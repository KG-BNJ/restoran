import { getTranslations } from "next-intl/server";
import { Photo } from "@/components/ui/Photo";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { formatPrice, type Dish, type DishTag } from "@/content/menu";
import type { Locale } from "@/data/images";

export async function DishCard({ dish, locale }: { dish: Dish; locale: Locale }) {
  const t = await getTranslations("tags");
  const copy = dish[locale];

  return (
    <article id={dish.id} className="grid scroll-mt-32 grid-cols-[auto_1fr_auto] items-start gap-3 border-b border-line py-4">
      {dish.image ? (
        <Photo image={dish.image} locale={locale} sizes="96px" className="aspect-[4/3] h-[4.5rem] w-[6rem]" />
      ) : (
        <PhotoSlot className="aspect-[4/3] h-[4.5rem] w-[6rem]" />
      )}
      <div>
        <h3 className="font-display text-xl leading-tight">{copy.name}</h3>
        <p className="mt-1 text-sm text-muted">{copy.description}</p>
        {dish.tags.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {dish.tags.map((tag: DishTag) => (
              <li key={tag} className="border border-line px-1.5 py-0.5 text-[0.7rem] uppercase tracking-wide text-muted">
                {t(tag)}
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="font-medium text-pine">{formatPrice(dish.price)}</p>
    </article>
  );
}
