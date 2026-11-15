import { getTranslations } from "next-intl/server";
import { settings } from "@/content/settings";
import { Link } from "@/i18n/navigation";

export async function MobileActionBar() {
  const t = await getTranslations("action");

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-3 border-t border-line bg-cream md:hidden"
      aria-label={t("reserve")}
    >
      <a href={`tel:${settings.phone}`} className="flex min-h-14 items-center justify-center text-sm font-medium">
        {t("call")}
      </a>
      <a href={settings.mapsUrl} className="flex min-h-14 items-center justify-center text-sm font-medium">
        {t("directions")}
      </a>
      <Link href="/reserve" className="flex min-h-14 items-center justify-center bg-pine text-sm font-medium text-cream">
        {t("reserve")}
      </Link>
    </nav>
  );
}
