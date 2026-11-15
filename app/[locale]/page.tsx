import { setRequestLocale } from "next-intl/server";
import { ClosingCta } from "@/components/home/ClosingCta";
import { GalleryStrip } from "@/components/home/GalleryStrip";
import { Hero } from "@/components/home/Hero";
import { HoursStrip } from "@/components/home/HoursStrip";
import { Signatures } from "@/components/home/Signatures";
import { StoryTeaser } from "@/components/home/StoryTeaser";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <HoursStrip />
      <Signatures />
      <StoryTeaser />
      <GalleryStrip />
      <ClosingCta />
    </>
  );
}
