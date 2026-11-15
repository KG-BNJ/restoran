import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { images, type Locale } from "@/data/images";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "story" });
  return { title: t("title"), description: t("lead") };
}

export default async function StoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("story");
  const lang = locale as Locale;

  return (
    <article className="px-4 pb-16 pt-10 md:px-[max(1.5rem,calc((100%-1000px)/2))]">
      <p className="text-xs uppercase tracking-[0.16em] text-brass">{t("kicker")}</p>
      <h1 className="mt-3 max-w-[18ch] font-display text-4xl md:text-5xl">{t("title")}</h1>
      <p className="mt-4 max-w-prose text-lg text-muted">{t("lead")}</p>
      <div className="mt-8 grid items-start gap-8 md:grid-cols-[minmax(0,18rem)_1fr]">
        <Photo image={images.chef} locale={lang} sizes="(min-width: 768px) 18rem, 100vw" className="aspect-[3/4] w-full" />
        <div className="max-w-prose space-y-4 text-muted">
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
          <p>{t("p3")}</p>
        </div>
      </div>
      <Photo
        image={images.interior}
        locale={lang}
        sizes="(min-width: 1000px) 1000px, 100vw"
        className="mt-10 aspect-[16/9] w-full"
      />
      <p className="mt-8 max-w-prose text-ink">{t("close")}</p>
      <div className="mt-6">
        <Button href="/reserve">{t("reserve")}</Button>
      </div>
    </article>
  );
}
