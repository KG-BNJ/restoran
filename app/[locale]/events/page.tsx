import { getTranslations, setRequestLocale } from "next-intl/server";
import { Placeholder } from "@/components/ui/Placeholder";

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages");
  return <Placeholder title={t("events")} text={t("soon")} />;
}
