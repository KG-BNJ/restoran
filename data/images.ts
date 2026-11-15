export type Locale = "tr" | "en";

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
};

/** Tiny neutral blur so next/image can fade placeholders in. */
export const imageBlur =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUTEhIVFhUXFxUYFxUXFxUYFxUYFxUXFxUYFRcYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAAEAAQMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAIFAAEGB//EAB4QAAIBAwUAAAAAAAAAAAAAAAACAQMEBREhMUH/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAwT/xAAYEQEAAwEAAAAAAAAAAAAAAAABAAIRIf/aAAwDAQACEQMRAD8AqN1u3W6d7p3un+6d7p/und7p3und7p3und7p3und7p3uqf7p3und7p3und7p3und7p3und7p3un+6d7p3und7p3und7p3und7p3und7p/und7p3und7p3und7p3und7p3und7p3un+6d7p3uqf7p3und7p3und7p3und7p3und7p/und7p3und7p3und7p3und7p3und7p3un+6d7p3und7p3und7p3und7p3und7p/und7p3und7p3und7p3und7p3und7p3un+6f/Z";

/** TODO: REPLACE WITH REAL PHOTO — every entry below. */
export const images = {
  hero: {
    src: "/images/hero.jpg",
    width: 1920,
    height: 1080,
    alt: {
      tr: "Közde pişen et ve alev",
      en: "Meat grilling over an open flame",
    },
  },
  og: {
    src: "/images/og.jpg",
    width: 1200,
    height: 630,
    alt: {
      tr: "Restoran, Karaköy — köz ateşi",
      en: "Restaurant, Karaköy — open fire",
    },
  },
  dishAdana: {
    src: "/images/dish-adana.jpg",
    width: 1200,
    height: 900,
    alt: { tr: "Adana kebap, köz biber ve lavaş", en: "Adana kebab with pepper and flatbread" },
  },
  dishHumus: {
    src: "/images/dish-humus.jpg",
    width: 1200,
    height: 900,
    alt: { tr: "Zeytinyağlı humus", en: "Hummus with olive oil" },
  },
  dishPirzola: {
    src: "/images/dish-pirzola.jpg",
    width: 1200,
    height: 900,
    alt: { tr: "Kekikli kuzu pirzola", en: "Lamb chops with thyme" },
  },
  dishKarisik: {
    src: "/images/dish-karisik.jpg",
    width: 1200,
    height: 900,
    alt: { tr: "Karışık ızgara tabağı", en: "Mixed grill plate" },
  },
  dishHunkar: {
    src: "/images/dish-hunkar.jpg",
    width: 1200,
    height: 900,
    alt: { tr: "Kuzu kuşbaşı, köz patlıcan", en: "Lamb over smoked eggplant" },
  },
  dishKunefe: {
    src: "/images/dish-kunefe.jpg",
    width: 1200,
    height: 900,
    alt: { tr: "Antep fıstıklı künefe", en: "Pistachio künefe" },
  },
  dishManti: {
    src: "/images/dish-manti.jpg",
    width: 1200,
    height: 900,
    alt: { tr: "Yoğurtlu mantı", en: "Manti with yogurt" },
  },
  dishIcli: {
    src: "/images/dish-icli.jpg",
    width: 1200,
    height: 900,
    alt: { tr: "İçli köfte", en: "Stuffed bulgur köfte" },
  },
  dishBaklava: {
    src: "/images/dish-baklava.jpg",
    width: 1200,
    height: 900,
    alt: { tr: "Fıstıklı baklava", en: "Pistachio baklava" },
  },
  dishCay: {
    src: "/images/dish-cay.jpg",
    width: 1200,
    height: 900,
    alt: { tr: "İnce belli çay", en: "Turkish tea in a small glass" },
  },
  chef: {
    src: "/images/chef.jpg",
    width: 900,
    height: 1200,
    alt: { tr: "Şef ocak başında", en: "The chef at the grill" },
  },
  interior: {
    src: "/images/interior-1.jpg",
    width: 1600,
    height: 900,
    alt: { tr: "Salon ve ocak", en: "Dining room and the hearth" },
  },
  gallery: [
    { src: "/images/gallery-1.jpg", width: 900, height: 1200, alt: { tr: "Ocakta yükselen alev", en: "Flame rising on the hearth" } },
    { src: "/images/gallery-2.jpg", width: 1200, height: 1200, alt: { tr: "Izgara tabağı", en: "A plate from the grill" } },
    { src: "/images/gallery-3.jpg", width: 900, height: 1200, alt: { tr: "Taze ekmek", en: "Fresh bread" } },
    { src: "/images/gallery-4.jpg", width: 1200, height: 900, alt: { tr: "Akşam kurulan masa", en: "A table set for the evening" } },
    { src: "/images/gallery-5.jpg", width: 900, height: 1200, alt: { tr: "İnce belli çay bardağı", en: "A glass of Turkish tea" } },
    { src: "/images/gallery-6.jpg", width: 1200, height: 1500, alt: { tr: "Tatlı tabağı", en: "A dessert plate" } },
    { src: "/images/gallery-7.jpg", width: 1200, height: 900, alt: { tr: "Gece salonu", en: "The dining room at night" } },
    { src: "/images/gallery-8.jpg", width: 900, height: 1200, alt: { tr: "Mutfakta çalışan eller", en: "Hands at work in the kitchen" } },
    { src: "/images/gallery-9.jpg", width: 1200, height: 1200, alt: { tr: "Yeşil salata", en: "A green salad" } },
    { src: "/images/gallery-10.jpg", width: 900, height: 1200, alt: { tr: "Servis edilen kebap", en: "Kebab being served" } },
    { src: "/images/gallery-11.jpg", width: 1200, height: 900, alt: { tr: "Bakır mutfak tezgahı", en: "A copper kitchen counter" } },
    { src: "/images/gallery-12.jpg", width: 900, height: 1200, alt: { tr: "Sokağa açılan kapı", en: "The door opening onto the street" } },
  ],
} as const satisfies Record<string, SiteImage | readonly SiteImage[]>;
