import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { week } from "@/content/hours";
import { settings } from "@/content/settings";
import type { Locale } from "@/data/images";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("lead") };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const lang = (await getLocale()) as Locale;
  const whatsapp = `https://wa.me/${settings.phone.replace(/\D/g, "")}`;

  return (
    <article className="px-4 pb-16 pt-10 md:px-[max(1.5rem,calc((100%-1000px)/2))]">
      <h1 className="font-display text-4xl md:text-5xl">{t("title")}</h1>
      <p className="mt-4 max-w-prose text-muted">{t("lead")}</p>
      <p className="mt-6 text-lg">{settings.address}</p>
      <ul className="mt-4 space-y-2 text-pine">
        <li>
          <a href={`tel:${settings.phone}`} className="font-medium underline">
            {t("call")} · {settings.phoneDisplay}
          </a>
        </li>
        <li>
          <a href={whatsapp} className="font-medium underline">
            {t("whatsapp")}
          </a>
        </li>
        <li>
          <a href={settings.mapsUrl} className="font-medium underline">
            {t("directions")}
          </a>
        </li>
      </ul>

      <iframe
        title={t("map")}
        src={settings.mapEmbed}
        className="mt-8 aspect-[16/9] w-full border border-line"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      <h2 className="mt-10 font-display text-3xl">{t("parkingTitle")}</h2>
      <p className="mt-3 max-w-prose text-muted">{t("parking")}</p>

      <h2 className="mt-10 font-display text-3xl">{t("hoursTitle")}</h2>
      <ul className="mt-4 max-w-md divide-y divide-line border-y border-line">
        {week.map((day) => (
          <li key={day.day} className="flex items-baseline justify-between gap-4 py-2">
            <span>{day[lang]}</span>
            <span className="text-muted">{day.open && day.close ? `${day.open}–${day.close}` : t("closed")}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
