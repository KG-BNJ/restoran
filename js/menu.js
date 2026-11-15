window.OCAK_MENU = [
  {
    id: "humus",
    name: "Humus",
    category: "Başlangıç",
    price: 140,
    description: "Nohut, tahin, zeytinyağı ve isot yağı"
  },
  {
    id: "atom",
    name: "Atom",
    category: "Başlangıç",
    price: 160,
    description: "Süzme yoğurt, tereyağı, isot ve ceviz"
  },
  {
    id: "sigara",
    name: "Sigara böreği",
    category: "Başlangıç",
    price: 150,
    description: "İnce yufka, lor peyniri, maydanoz"
  },
  {
    id: "levrek",
    name: "Levrek marine",
    category: "Başlangıç",
    price: 220,
    description: "Zeytinyağı, limon, dereotu, kapari"
  },
  {
    id: "adana",
    name: "Adana kebap",
    category: "Izgara",
    price: 420,
    description: "El kıyması, köz biber, lavaş, sumak soğan"
  },
  {
    id: "pirzola",
    name: "Kuzu pirzola",
    category: "Izgara",
    price: 780,
    description: "Kekik, közlenmiş domates, roka"
  },
  {
    id: "kanat",
    name: "Tavuk kanat",
    category: "Izgara",
    price: 340,
    description: "Bal ve isot marine, patates közlemesi"
  },
  {
    id: "karisik",
    name: "Karışık ızgara",
    category: "Izgara",
    price: 690,
    description: "Adana, kanat, köfte ve köz sebze"
  },
  {
    id: "manti",
    name: "Kayseri mantısı",
    category: "Ana yemek",
    price: 310,
    description: "Sarımsaklı yoğurt, isotlu tereyağı"
  },
  {
    id: "icli",
    name: "İçli köfte",
    category: "Ana yemek",
    price: 280,
    description: "İnce bulgur kabuk, cevizli kıyma"
  },
  {
    id: "hunkar",
    name: "Hünkar beğendi",
    category: "Ana yemek",
    price: 460,
    description: "Kuzu kuşbaşı, köz patlıcan beşameli"
  },
  {
    id: "kunefe",
    name: "Künefe",
    category: "Tatlı",
    price: 240,
    description: "Antep peyniri, şerbet, antep fıstığı"
  },
  {
    id: "sutlac",
    name: "Fırın sütlaç",
    category: "Tatlı",
    price: 140,
    description: "Közlenmiş pirinç sütlacı, tarçın"
  },
  {
    id: "baklava",
    name: "Fıstıklı baklava",
    category: "Tatlı",
    price: 180,
    description: "İnce yufka, antep fıstığı, sade yağ"
  },
  {
    id: "ayran",
    name: "Ayran",
    category: "İçecek",
    price: 50,
    description: "Köpüklü, tuzlu ev ayranı"
  },
  {
    id: "salgam",
    name: "Şalgam",
    category: "İçecek",
    price: 55,
    description: "Acılı, fermente şalgam suyu"
  },
  {
    id: "limonata",
    name: "Ev limonatası",
    category: "İçecek",
    price: 90,
    description: "Taze nane, limon kabuğu"
  },
  {
    id: "kahve",
    name: "Türk kahvesi",
    category: "İçecek",
    price: 80,
    description: "Cezve, lokum ile"
  },
  {
    id: "cay",
    name: "İnce belli çay",
    category: "İçecek",
    price: 40,
    description: "Demlik çay"
  }
];

window.OCAK_CATEGORIES = ["Başlangıç", "Izgara", "Ana yemek", "Tatlı", "İçecek"];

window.ocakFormatPrice = function ocakFormatPrice(amount) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0
  }).format(amount);
};
