"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const next = locale === "tr" ? "en" : "tr";

  return (
    <Link href={pathname} locale={next} hrefLang={next} className="text-sm text-cream/80 hover:text-white">
      {next === "en" ? "EN" : "TR"}
    </Link>
  );
}
