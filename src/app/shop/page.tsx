import type { Metadata } from "next";
import { ShopClient } from "@/components/shop-client";
import { EditorialImageStrip, PageHero } from "@/components/sections";
import { getImageSet } from "@/lib/utils";
import { getCategories, getProducts } from "@/lib/store";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse ONLY COLLECTION products with search, sorting, category filters, tags, and stock filters."
};

export default async function ShopPage({
  searchParams
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const { category } = await searchParams;
  const selectedCategory =
    categories.find((item) => item.slug === category)?.name ?? "all";

  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="A refined collection for everyday presence."
        text="Browse fragrance, accessories, gifts, and rituals selected for confidence, comfort, and high-end expression."
        image="/pages/shop-hero.png"
      />
      <ShopClient products={products} categories={categories} initialCategory={selectedCategory} />
      <EditorialImageStrip images={getImageSet("shop")} title="Shop Editorial Set" />
    </>
  );
}
