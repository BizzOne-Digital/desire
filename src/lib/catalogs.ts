export type Catalog = {
  id: string;
  name: string;
  slug: string;
  description: string;
  yupooUrl: string;
  imageUrl: string;
  category: "footwear" | "accessories" | "apparel" | "watches" | "bags";
  featured?: boolean;
  requiresPassword?: boolean;
  password?: string;
  tags: string[];
};

export const catalogs: Catalog[] = [
  {
    id: "cat-sport-only",
    name: "Sport Only",
    slug: "sport-only",
    description:
      "Our exclusive Sport Only collection. Premium athletic merchandise curated specifically for our brand.",
    yupooUrl: "https://x.yupoo.com/photos/xy666999/albums",
    imageUrl: "/logo.png",
    category: "footwear",
    featured: true,
    tags: ["sport-only", "exclusive", "featured", "athletic"],
  },
  {
    id: "cat-sneakers",
    name: "Sneakers Collection",
    slug: "sneakers",
    description:
      "Premium athletic sneakers from top brands. Authentic styles for sport and lifestyle.",
    yupooUrl: "https://x.yupoo.com/photos/xy666999/albums",
    imageUrl: "/categories/signature-fragrance.png",
    category: "footwear",
    featured: true,
    tags: ["sneakers", "athletic", "footwear", "featured"],
  },
  {
    id: "cat-tennis",
    name: "Tennis Shoes",
    slug: "tennis-shoes",
    description:
      "High-performance tennis and court shoes. Professional quality for athletes.",
    yupooUrl: "https://linfengshoes.x.yupoo.com/albums",
    imageUrl: "/categories/elevated-accessories.png",
    category: "footwear",
    featured: true,
    tags: ["tennis", "athletic", "court", "performance"],
  },
  {
    id: "cat-bags",
    name: "Premium Bags",
    slug: "bags",
    description:
      "Luxury bags and backpacks collection. Access code required: 666999",
    yupooUrl: "https://luxurydiscountglobalstation.x.yupoo.com/",
    imageUrl: "/categories/body-and-ritual.png",
    category: "bags",
    featured: true,
    requiresPassword: true,
    password: "666999",
    tags: ["bags", "backpacks", "luxury", "accessories"],
  },
  {
    id: "cat-accessories",
    name: "Accessories",
    slug: "accessories",
    description:
      "Complete your look with premium sports accessories and gear.",
    yupooUrl: "https://351164.x.yupoo.com/categories/",
    imageUrl: "/products/gilded-hour-1.png",
    category: "accessories",
    tags: ["accessories", "gear", "lifestyle"],
  },
  {
    id: "cat-shoes-collection",
    name: "Shoes Collection",
    slug: "shoes-collection",
    description:
      "Curated selection of premium footwear for every occasion.",
    yupooUrl: "https://mujixieye.x.yupoo.com/categories/355787",
    imageUrl: "/products/champagne-drape-1.png",
    category: "footwear",
    tags: ["shoes", "footwear", "collection"],
  },
  {
    id: "cat-luxury-shoes",
    name: "Luxury Shoes",
    slug: "luxury-shoes",
    description:
      "High-end designer footwear collection. Premium materials and craftsmanship.",
    yupooUrl: "https://globalluxuryshoes.x.yupoo.com/albums",
    imageUrl: "/products/velvet-keepsake-1.png",
    category: "footwear",
    featured: true,
    tags: ["luxury", "designer", "premium", "shoes"],
  },
  {
    id: "cat-clothing",
    name: "Clothing",
    slug: "clothing",
    description:
      "Athletic and lifestyle apparel collection. Access code required: 188288388",
    yupooUrl: "https://mujichaopaia.x.yupoo.com/",
    imageUrl: "/products/noir-silk-1.png",
    category: "apparel",
    requiresPassword: true,
    password: "188288388",
    tags: ["clothing", "apparel", "athletic", "lifestyle"],
  },
  {
    id: "cat-watches",
    name: "Watches",
    slug: "watches",
    description:
      "Premium timepiece collection. Luxury watches for the modern athlete.",
    yupooUrl: "https://x.yupoo.com/photos/spjy/albums",
    imageUrl: "/products/golden-mist-1.png",
    category: "watches",
    featured: true,
    tags: ["watches", "timepieces", "luxury"],
  },
  {
    id: "cat-belts",
    name: "Belts",
    slug: "belts",
    description:
      "Designer belt collection. Premium leather and signature styles.",
    yupooUrl: "https://ouyapidai.x.yupoo.com/albums",
    imageUrl: "/products/ivory-ritual-1.png",
    category: "accessories",
    tags: ["belts", "accessories", "leather"],
  },
  {
    id: "cat-sunglasses",
    name: "Sunglasses",
    slug: "sunglasses",
    description:
      "Premium eyewear collection. Designer sunglasses for sport and style.",
    yupooUrl: "https://shangmei168.x.yupoo.com/categories",
    imageUrl: "/products/auric-veil-1.png",
    category: "accessories",
    tags: ["sunglasses", "eyewear", "accessories"],
  },
  {
    id: "cat-hats-caps",
    name: "Hats & Caps",
    slug: "hats-caps",
    description:
      "Athletic and lifestyle headwear. Complete your sporty look.",
    yupooUrl: "https://poland13024664695.x.yupoo.com/categories",
    imageUrl: "/products/midnight-gift-set-1.png",
    category: "accessories",
    tags: ["hats", "caps", "headwear", "accessories"],
  },
];

export function getCatalogBySlug(slug: string): Catalog | undefined {
  return catalogs.find((cat) => cat.slug === slug);
}

export function getFeaturedCatalogs(): Catalog[] {
  return catalogs.filter((cat) => cat.featured);
}

export function getCatalogsByCategory(
  category: Catalog["category"],
): Catalog[] {
  return catalogs.filter((cat) => cat.category === category);
}
