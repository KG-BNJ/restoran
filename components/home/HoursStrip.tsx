import { getLocale, getTranslations } from "next-intl/server";
import { settings } from "@/content/settings";
import { getServiceState, todayHours, type ServiceState } from "@/content/hours";
import type { Locale } from "@/data/images";

const statusKey: Record<ServiceState, "open" | "kitchen" | "closed"> = {
  open: "open",
  "kitchen-closed": "kitchen",
  closed: "closed",
};

export async function HoursStrip() {
  const t = await getTranslations("hours");
  const locale = (await getLocale()) as Locale;
  const state = getServiceState();
  const today = todayHours();
  const name = today[locale === "en" ? "en" : "tr"];
  const range = today.open && today.close ? `${today.open}–${today.close}` : t("shut");

  return (
    <section className="border-b border-line bg-bg px-4 py-5 md:px-[max(1.5rem,calc((100%-1000px)/2))]">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="text-lg font-medium">
          <span className={state === "closed" ? "text-muted" : "text-pine"}>{t(statusKey[state])}</span>
          <span className="ml-3 text-base font-normal text-muted">
            {name} · {range}
          </span>
        </p>
        <p className="text-sm text-muted">{settings.address}</p>
      </div>
      <p className="mt-1 text-sm text-muted">{t("kitchenNote")}</p>
    </section>
  );
}
