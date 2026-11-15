import Image from "next/image";
import { imageBlur, type Locale } from "@/data/images";

export function Photo({
  image,
  locale,
  sizes,
  priority = false,
  className = "",
  style,
}: {
  image: { src: string; alt: { tr: string; en: string } };
  locale: Locale;
  sizes: string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      <Image
        src={image.src}
        alt={image.alt[locale]}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={imageBlur}
        className="object-cover"
      />
    </div>
  );
}
