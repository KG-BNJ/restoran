import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ReserveForm } from "@/components/reserve/ReserveForm";
import { istanbulDate } from "@/content/hours";
import { settings } from "@/content/settings";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reserve" });
  return { title: t("title"), description: t("lead") };
}

export default async function ReservePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("reserve");
  const whatsapp = `https://wa.me/${settings.phone.replace(/\D/g, "")}?text=${encodeURIComponent(t("whatsappText"))}`;

  return (
    <article className="px-4 pb-16 pt-10 md:px-[max(1.5rem,calc((100%-1000px)/2))]">
      <h1 className="font-display text-4xl md:text-5xl">{t("title")}</h1>
      <p className="mt-4 max-w-prose text-muted">{t("lead")}</p>
      <p className="mt-3 max-w-prose text-ink">
        {t("callLead")}{" "}
        <a href={`tel:${settings.phone}`} className="font-medium text-pine underline">
          {settings.phoneDisplay}
        </a>
      </p>
      <p className="mt-1">
        <a href={whatsapp} className="font-medium text-pine underline">
          {t("whatsapp")}
        </a>
      </p>
      <p className="mt-4 max-w-prose text-sm text-muted">{t("hours")}</p>
      <ReserveForm today={istanbulDate()} />
    </article>
  );
}
