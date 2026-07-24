import type { Metadata } from "next";
import { EditorialImageStrip, PageHero, SectionHeading } from "@/components/sections";
import { Reveal } from "@/components/motion";
import { CatalogCard } from "@/components/catalog-card";
import { catalogs } from "@/lib/catalogs";
import { getImageSet } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shop Catalogs",
  description:
    "Browse our curated collection of premium athletic and sports catalogs. Sneakers, bags, watches, accessories, and more.",
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="Browse Catalogs"
        title="Premium Athletic Collections"
        text="Explore our curated catalogs featuring authentic sneakers, bags, watches, and sports accessories. Each catalog opens in a new window for your convenience."
        image="/pages/shop-hero.png"
        cta={{ label: "How to Order", href: "/how-to-order" }}
      />
      <section className="luxury-container py-16 sm:py-20 md:py-24">
        <SectionHeading
          eyebrow="Our Catalogs"
          title="Choose a catalog to explore."
          text="Browse authentic athletic and sports merchandise. Some catalogs require access codes - we've provided them for your convenience."
          centered
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {catalogs.map((catalog) => (
            <Reveal key={catalog.id}>
              <CatalogCard catalog={catalog} />
            </Reveal>
          ))}
        </div>
      </section>
      
      <section className="luxury-container pb-16 sm:pb-20 md:pb-24">
        <div className="glass-panel rounded-[1.7rem] p-6 text-center sm:rounded-[2.5rem] sm:p-10 md:p-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-champagne sm:text-xs sm:tracking-[0.35em]">
            Need Help?
          </p>
          <h2 className="mt-4 font-serif text-3xl text-ivory sm:text-4xl md:text-5xl">
            Questions about our catalogs or how to order?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-ivory/70 sm:mt-5 sm:text-base">
            Our catalogs are hosted externally on Yupoo. Browse freely and contact us with any product inquiries or questions about ordering.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-7 sm:flex-row sm:gap-4">
            <a
              href="/how-to-order"
              className="inline-flex rounded-full border border-champagne/40 px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-champagne hover:bg-champagne/10 sm:px-7 sm:text-sm"
            >
              How to Order
            </a>
            <a
              href="/contact"
              className="inline-flex rounded-full bg-gold-gradient px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-black hover:shadow-gold sm:px-7 sm:text-sm"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <EditorialImageStrip images={getImageSet("shop")} title="Shop Inspiration" />
    </>
  );
}
