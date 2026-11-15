import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/menu": "/menu",
    "/story": { tr: "/hikaye", en: "/story" },
    "/gallery": { tr: "/galeri", en: "/gallery" },
    "/reserve": { tr: "/rezervasyon", en: "/reserve" },
    "/contact": { tr: "/iletisim", en: "/contact" },
    "/events": { tr: "/etkinlik", en: "/events" },
  },
});

export type Locale = (typeof routing.locales)[number];
