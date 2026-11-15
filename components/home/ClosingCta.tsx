import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";

export async function ClosingCta() {
  const t = await getTranslations("home");

  return (
    <section className="bg-pine px-4 py-16 text-cream md:px-[max(1.5rem,calc((100%-1000px)/2))]">
      <h2 className="max-w-[16ch] font-display text-4xl leading-tight md:text-5xl">{t("closeTitle")}</h2>
      <p className="mt-4 max-w-md text-cream/80">{t("closeLede")}</p>
      <div className="mt-6">
        <Button href="/reserve" variant="ghost">
          {t("cta")}
        </Button>
      </div>
    </section>
  );
}
