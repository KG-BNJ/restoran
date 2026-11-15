import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Photo } from "@/components/ui/Photo";
import { images, type Locale } from "@/data/images";

export async function StoryTeaser() {
  const t = await getTranslations("home");
  const locale = (await getLocale()) as Locale;

  return (
    <section className="border-t border-line px-4 py-14 md:px-[max(1.5rem,calc((100%-1000px)/2))]">
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,16rem)_1fr]">
        <Photo image={images.chef} locale={locale} sizes="(min-width: 768px) 16rem, 100vw" className="aspect-[3/4] w-full" />
        <div>
          <h2 className="font-display text-3xl md:text-4xl">{t("storyTitle")}</h2>
          <p className="mt-4 max-w-prose text-muted">{t("storyLede")}</p>
          <Link href="/story" className="mt-5 inline-flex min-h-11 items-center text-sm font-medium text-pine underline">
            {t("storyMore")}
          </Link>
        </div>
      </div>
    </section>
  );
}
