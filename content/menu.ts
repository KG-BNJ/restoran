import { images, type SiteImage } from "@/data/images";

export type DishTag = "vegan" | "vegetarian" | "gluten-free" | "spicy";

export type Dish = {
  id: string;
  price: number;
  tags: DishTag[];
  signature?: boolean;
  image?: SiteImage;
  tr: { name: string; description: string };
  en: { name: string; description: string };
};

export type MenuCategory = {
  id: string;
  tr: string;
  en: string;
  dishes: Dish[];
};

/** TODO: confirm dietary tags with the kitchen. Prices include VAT. */
export const menu: MenuCategory[] = [
  {
    id: "starters",
    tr: "Başlangıç",
    en: "Starters",
    dishes: [
      {
        id: "humus",
        price: 140,
        tags: ["vegan"],
        signature: true,
        image: images.dishHumus,
        tr: { name: "Humus", description: "Nohut, tahin, zeytinyağı ve isot yağı" },
        en: { name: "Hummus", description: "Chickpeas, tahini, olive oil, and isot oil" },
      },
      {
        id: "atom",
        price: 160,
        tags: ["vegetarian", "spicy"],
        tr: { name: "Atom", description: "Süzme yoğurt, tereyağı, isot ve ceviz" },
        en: { name: "Atom", description: "Strained yogurt, butter, isot, and walnuts" },
      },
      {
        id: "sigara",
        price: 150,
        tags: ["vegetarian"],
        tr: { name: "Sigara böreği", description: "İnce yufka, lor peyniri, maydanoz" },
        en: { name: "Sigara böreği", description: "Thin pastry, lor cheese, and parsley" },
      },
      {
        id: "levrek",
        price: 220,
        tags: [],
        tr: { name: "Levrek marine", description: "Zeytinyağı, limon, dereotu, kapari" },
        en: { name: "Cured sea bass", description: "Olive oil, lemon, dill, and capers" },
      },
    ],
  },
  {
    id: "grill",
    tr: "Izgara",
    en: "Grill",
    dishes: [
      {
        id: "adana",
        price: 420,
        tags: ["spicy"],
        signature: true,
        image: images.dishAdana,
        tr: { name: "Adana kebap", description: "El kıyması, köz biber, lavaş, sumak soğan" },
        en: { name: "Adana kebab", description: "Hand-cut lamb, grilled pepper, flatbread, sumac onions" },
      },
      {
        id: "pirzola",
        price: 780,
        tags: [],
        signature: true,
        image: images.dishPirzola,
        tr: { name: "Kuzu pirzola", description: "Kekik, közlenmiş domates, roka" },
        en: { name: "Lamb chops", description: "Thyme, charred tomato, and rocket" },
      },
      {
        id: "kanat",
        price: 340,
        tags: ["spicy"],
        tr: { name: "Tavuk kanat", description: "Bal ve isot marine, patates közlemesi" },
        en: { name: "Chicken wings", description: "Honey and isot marinade, charred potatoes" },
      },
      {
        id: "karisik",
        price: 690,
        tags: [],
        signature: true,
        image: images.dishKarisik,
        tr: { name: "Karışık ızgara", description: "Adana, kanat, köfte ve köz sebze" },
        en: { name: "Mixed grill", description: "Adana, wings, köfte, and grilled vegetables" },
      },
    ],
  },
  {
    id: "mains",
    tr: "Ana yemek",
    en: "Mains",
    dishes: [
      {
        id: "manti",
        price: 310,
        tags: [],
        image: images.dishManti,
        tr: { name: "Kayseri mantısı", description: "Sarımsaklı yoğurt, isotlu tereyağı" },
        en: { name: "Kayseri manti", description: "Garlic yogurt and isot butter" },
      },
      {
        id: "icli",
        price: 280,
        tags: [],
        image: images.dishIcli,
        tr: { name: "İçli köfte", description: "İnce bulgur kabuk, cevizli kıyma" },
        en: { name: "Stuffed köfte", description: "Fine bulgur shell, walnuts, and minced meat" },
      },
      {
        id: "hunkar",
        price: 460,
        tags: [],
        signature: true,
        image: images.dishHunkar,
        tr: { name: "Hünkar beğendi", description: "Kuzu kuşbaşı, köz patlıcan beşameli" },
        en: { name: "Hünkar beğendi", description: "Lamb over smoked-eggplant béchamel" },
      },
    ],
  },
  {
    id: "dessert",
    tr: "Tatlı",
    en: "Dessert",
    dishes: [
      {
        id: "kunefe",
        price: 240,
        tags: ["vegetarian"],
        signature: true,
        image: images.dishKunefe,
        tr: { name: "Künefe", description: "Antep peyniri, şerbet, antep fıstığı" },
        en: { name: "Künefe", description: "Antep cheese, syrup, and pistachio" },
      },
      {
        id: "sutlac",
        price: 140,
        tags: ["vegetarian"],
        tr: { name: "Fırın sütlaç", description: "Közlenmiş pirinç sütlacı, tarçın" },
        en: { name: "Baked rice pudding", description: "Scorched rice pudding and cinnamon" },
      },
      {
        id: "baklava",
        price: 180,
        tags: ["vegetarian"],
        image: images.dishBaklava,
        tr: { name: "Fıstıklı baklava", description: "İnce yufka, antep fıstığı, sade yağ" },
        en: { name: "Pistachio baklava", description: "Thin pastry, pistachio, and clarified butter" },
      },
    ],
  },
  {
    id: "drinks",
    tr: "İçecek",
    en: "Drinks",
    dishes: [
      {
        id: "ayran",
        price: 50,
        tags: ["vegetarian"],
        tr: { name: "Ayran", description: "Köpüklü, tuzlu ev ayranı" },
        en: { name: "Ayran", description: "Foamy, salted yogurt drink" },
      },
      {
        id: "salgam",
        price: 55,
        tags: ["vegan", "spicy"],
        tr: { name: "Şalgam", description: "Acılı, fermente şalgam suyu" },
        en: { name: "Şalgam", description: "Spicy fermented turnip juice" },
      },
      {
        id: "limonata",
        price: 90,
        tags: ["vegan"],
        tr: { name: "Ev limonatası", description: "Taze nane, limon kabuğu" },
        en: { name: "House lemonade", description: "Fresh mint and lemon peel" },
      },
      {
        id: "kahve",
        price: 80,
        tags: ["vegan"],
        tr: { name: "Türk kahvesi", description: "Cezve, lokum ile" },
        en: { name: "Turkish coffee", description: "Cezve coffee, served with lokum" },
      },
      {
        id: "cay",
        price: 40,
        tags: ["vegan"],
        image: images.dishCay,
        tr: { name: "İnce belli çay", description: "Demlik çay" },
        en: { name: "Turkish tea", description: "Black tea from the pot" },
      },
    ],
  },
];

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(amount);
}
