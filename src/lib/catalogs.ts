export type CatalogCategory = "Shoes" | "Bags" | "Clothing" | "Accessories";

export type Catalog = {
  id: string;
  name: string;
  description: string;
  url: string;
  accessCode?: string;
  requiresPassword?: boolean;
  category: CatalogCategory;
  image?: string;
  featured?: boolean;
};

export const catalogFilters = [
  "All",
  "Shoes",
  "Bags",
  "Clothing",
  "Accessories",
] as const;

export const catalogs: Catalog[] = [
  {
    id: "sneakers",
    name: "Sneakers Catalog",
    description:
      "Browse casual and statement sneaker styles from an external supplier catalog.",
    url: "https://x.yupoo.com/photos/xy666999/albums?qq_aio_chat_type=2",
    category: "Shoes",
    image: "/categories/elevated-accessories.png",
    featured: true,
  },
  {
    id: "tennis-shoes",
    name: "Tennis Shoes",
    description:
      "Explore tennis-inspired footwear options and send the product link for details.",
    url: "https://linfengshoes.x.yupoo.com/albums",
    category: "Shoes",
    image: "/pages/shop-hero.png",
  },
  {
    id: "bags",
    name: "Bags",
    description:
      "Browse bag styles and copy the public catalog access code before opening.",
    url: "https://luxurydiscountglobalstation.x.yupoo.com/",
    accessCode: "666999",
    requiresPassword: true,
    category: "Bags",
    image: "/gallery/gallery-3.png",
    featured: true,
  },
  {
    id: "accessories",
    name: "Accessories",
    description:
      "Find accessory albums, then submit the product code or link for confirmation.",
    url: "https://351164.x.yupoo.com/categories/",
    category: "Accessories",
    image: "/categories/elevated-accessories.png",
  },
  {
    id: "shoes-collection",
    name: "Shoes Collection",
    description:
      "Browse a broader shoes category catalog and share your selected item details.",
    url: "https://mujixieye.x.yupoo.com/categories/355787?isSubCate=true",
    category: "Shoes",
    image: "/pages/services-hero.png",
  },
  {
    id: "luxury-shoes",
    name: "Luxury Shoes",
    description: "Explore polished footwear albums from a third-party catalog.",
    url: "https://globalluxuryshoes.x.yupoo.com/albums",
    category: "Shoes",
    image: "/gallery/gallery-5.png",
  },
  {
    id: "clothing",
    name: "Clothing",
    description:
      "Open the clothing catalog with the public access code, then send item details.",
    url: "https://mujichaopaia.x.yupoo.com/",
    accessCode: "188288388",
    requiresPassword: true,
    category: "Clothing",
    image: "/pages/about-hero.png",
    featured: true,
  },
  {
    id: "watches",
    name: "Watches",
    description:
      "Browse watch albums and submit the product link or album code for availability.",
    url: "https://x.yupoo.com/photos/spjy/albums?tab=gallery",
    category: "Accessories",
    image: "/gallery/gallery-4.png",
  },
  {
    id: "belts",
    name: "Belts",
    description:
      "Review belt catalog albums and send the item code for pricing details.",
    url: "https://ouyapidai.x.yupoo.com/albums",
    category: "Accessories",
    image: "/gallery/gallery-2.png",
  },
  {
    id: "sunglasses",
    name: "Sunglasses",
    description:
      "Explore sunglasses categories and share the selected product reference.",
    url: "https://shangmei168.x.yupoo.com/categories",
    category: "Accessories",
    image: "/gallery/gallery-1.png",
  },
  {
    id: "hats-caps",
    name: "Hats & Caps",
    description:
      "Browse headwear categories, then submit the album or product link for help.",
    url: "https://poland13024664695.x.yupoo.com/categories",
    category: "Accessories",
    image: "/categories/body-and-ritual.png",
  },
];

export function getCatalogById(id: string) {
  return catalogs.find((catalog) => catalog.id === id);
}

export function isSafeCatalogUrl(url: string) {
  try {
    return new URL(url).protocol === "https:";
  } catch {
    return false;
  }
}
