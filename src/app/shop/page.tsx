import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialImageStrip, PageHero, SectionHeading } from "@/components/sections";
import { Reveal } from "@/components/motion";
import { getCategories } from "@/lib/store";
import { getImageSet } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Explore ONLY COLLECTION categories curated for a refined fashion experience.",
};

export default async function ShopPage() {
  const categories = await getCategories();

  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="Explore Our Collections"
        text="Browse signature categories designed for confidence, comfort, and timeless expression."
        image="/pages/shop-hero.png"
        cta={{ label: "Contact Us", href: "/contact" }}
      />
      <section className="luxury-container py-16 sm:py-20 md:py-24">
        <SectionHeading
          eyebrow="Collections"
          title="Choose a category to explore."
          text="Each collection is presented with the same black-and-gold visual language used across the brand."
          centered
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {categories.map((category) => (
            <Reveal key={category.id || category.slug}>
              <article className="luxury-frame group relative min-h-[360px] overflow-hidden rounded-[1.6rem] border border-champagne/15 shadow-soft sm:min-h-[420px] sm:rounded-[2rem]">
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <h2 className="font-serif text-3xl text-ivory sm:text-4xl">
                    {category.name}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-ivory/68">
                    {category.description}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-champagne"
                  >
                    Ask About This Collection <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <EditorialImageStrip images={getImageSet("shop")} title="Shop Inspiration" />
    </>
  );
}
