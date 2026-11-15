import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { imageBlur, images, type Locale } from "@/data/images";
import { Button } from "@/components/ui/Button";

export async function Hero() {
  const t = await getTranslations("home");
  const locale = (await getLocale()) as Locale;

  return (
    <section className="relative flex min-h-[calc(100dvh-3.5rem)] items-end overflow-hidden bg-hero text-cream">
      <Image
        src={images.hero.src}
        alt={images.hero.alt[locale]}
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL={imageBlur}
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/45" />
      <div className="relative z-10 w-full px-4 pb-24 pt-16 md:px-[max(1.5rem,calc((100%-1000px)/2))] md:pb-14">
        <p className="text-xs uppercase tracking-[0.16em] text-cream/90">{t("kicker")}</p>
        <h1 className="mt-3 max-w-[16ch] font-display text-4xl leading-tight text-white md:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-md text-base text-cream/85">{t("lede")}</p>
        <div className="mt-6">
          <Button href="/reserve">{t("cta")}</Button>
        </div>
      </div>
    </section>
  );
}
