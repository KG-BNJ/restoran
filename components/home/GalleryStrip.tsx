import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Photo } from "@/components/ui/Photo";
import { images, type Locale } from "@/data/images";

export async function GalleryStrip() {
  const t = await getTranslations("home");
  const locale = (await getLocale()) as Locale;

  return (
    <section className="border-t border-line py-14">
      <div className="flex items-end justify-between gap-4 px-4 md:px-[max(1.5rem,calc((100%-1000px)/2))]">
        <h2 className="font-display text-3xl md:text-4xl">{t("galleryTitle")}</h2>
        <Link href="/gallery" className="shrink-0 text-sm font-medium text-pine underline">
          {t("galleryMore")}
        </Link>
      </div>
      <p className="mt-2 px-4 text-muted md:px-[max(1.5rem,calc((100%-1000px)/2))]">{t("galleryLede")}</p>
      <ul className="mt-6 flex gap-3 overflow-x-auto px-4 md:px-[max(1.5rem,calc((100%-1000px)/2))]">
        {images.gallery.map((photo) => (
          <li key={photo.src} className="w-36 shrink-0 sm:w-44">
            <Photo image={photo} locale={locale} sizes="176px" className="aspect-[3/4] w-full" />
          </li>
        ))}
      </ul>
    </section>
  );
}
