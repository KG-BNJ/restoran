import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

const links = [
  { href: "/menu", key: "menu" },
  { href: "/story", key: "story" },
  { href: "/gallery", key: "gallery" },
  { href: "/contact", key: "contact" },
] as const;

export async function Header() {
  const t = await getTranslations("nav");

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-4 bg-pine px-4 text-cream md:px-[max(1.5rem,calc((100%-1000px)/2))]">
      <Link href="/" className="font-display text-xl leading-none">
        Restoran
      </Link>
      <nav className="ml-auto hidden items-center gap-5 text-sm text-cream/80 md:flex" aria-label="Sayfa">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-white">
            {t(link.key)}
          </Link>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-3 md:ml-2">
        <LanguageSwitcher />
        <div className="hidden md:block">
          <Button href="/reserve">{t("reserve")}</Button>
        </div>
      </div>
    </header>
  );
}
