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
