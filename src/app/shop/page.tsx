import type { Metadata } from "next";
import Link from "next/link";
import { CatalogGrid } from "@/components/catalog-grid";
import { EditorialImageStrip, PageHero } from "@/components/sections";
import { getCatalogs } from "@/lib/catalog-store";
import { getImageSet } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shop Catalogs",
  description:
    "Browse external supplier catalogs and submit a product inquiry for pricing and availability.",
};

export default async function ShopPage() {
  const catalogs = await getCatalogs();

  return (
    <>
      <PageHero
        eyebrow="Shop Catalogs"
        title="Browse Our Catalogs"
        text="Explore our curated collections. Open a catalog, choose the product you are interested in, and send us the product link or code for pricing and availability."
        image="/pages/shop-hero.png"
        cta={{ label: "Submit Product Inquiry", href: "/product-inquiry" }}
      />
      <CatalogGrid items={catalogs} />
      <section className="luxury-container pb-16">
        <div className="rounded-[2rem] border border-champagne/15 bg-black/45 p-6 text-sm leading-7 text-ivory/68">
          <p>
            Catalog products, prices, sizes, colors, and availability are
            subject to confirmation. External catalogs are operated by
            third-party suppliers. ONLY COLLECTION does not claim ownership of
            these external catalogs.
          </p>
          <Link
            href="/how-to-order"
            className="mt-4 inline-flex text-champagne underline-offset-4 hover:underline"
          >
            Learn how the inquiry process works
          </Link>
        </div>
      </section>
      <EditorialImageStrip
        images={getImageSet("shop")}
        title="Catalog Inspiration"
      />
    </>
  );
}
