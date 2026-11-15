import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Photo } from "@/components/ui/Photo";
import { images, type Locale } from "@/data/images";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return { title: t("gallery") };
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const lang = locale as Locale;

  return (
    <article className="px-4 pb-16 pt-10 md:px-[max(1.5rem,calc((100%-1000px)/2))]">
      <h1 className="font-display text-4xl md:text-5xl">{t("galleryTitle")}</h1>
      <p className="mt-4 max-w-prose text-muted">{t("galleryLede")}</p>
      <ul className="mt-8 columns-2 gap-3 md:columns-3">
        {images.gallery.map((photo) => (
          <li key={photo.src} className="mb-3 break-inside-avoid">
            <Photo
              image={photo}
              locale={lang}
              sizes="(min-width: 768px) 33vw, 50vw"
              className="w-full"
              style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
            />
          </li>
        ))}
      </ul>
    </article>
  );
}
