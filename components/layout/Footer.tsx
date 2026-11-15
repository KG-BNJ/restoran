import { getTranslations } from "next-intl/server";
import { settings } from "@/content/settings";
import { Link } from "@/i18n/navigation";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="mt-auto border-t border-line px-4 py-8 text-sm text-muted md:flex md:items-center md:justify-between md:px-[max(1.5rem,calc((100%-1000px)/2))]">
      <p>{t("note")}</p>
      <Link href="/contact" className="mt-2 inline-block font-medium text-pine md:mt-0">
        {settings.address}
      </Link>
    </footer>
  );
}
