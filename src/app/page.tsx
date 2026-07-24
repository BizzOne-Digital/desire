import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  EditorialImageStrip,
  SectionHeading,
  GalleryGrid,
} from "@/components/sections";
import { Reveal } from "@/components/motion";
import { CatalogCard } from "@/components/catalog-card";
import { editorialImages, services, galleryItems } from "@/lib/content";
import { getFeaturedCatalogs } from "@/lib/catalogs";

export default function HomePage() {
  const featuredCatalogs = getFeaturedCatalogs();

  return (
    <>
      <section className="luxury-container relative overflow-hidden py-24 pt-32 sm:py-28 sm:pt-36 md:py-32 md:pt-40">
        <div className="absolute -right-20 top-8 h-48 w-48 rounded-full border border-champagne/10 sm:-right-28 sm:h-72 sm:w-72" />
        <SectionHeading
          eyebrow="Featured Catalog"
          title="Explore our exclusive Sport Only collection"
          text="Browse authentic athletic merchandise from our verified catalog. Click below to view our complete collection."
        />
        <div className="mx-auto max-w-md">
          {featuredCatalogs.map((catalog) => (
            <Reveal key={catalog.id}>
              <CatalogCard catalog={catalog} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 rounded-full border border-champagne/40 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-ivory hover:bg-champagne/10 sm:px-8 sm:text-sm sm:tracking-[0.22em]"
          >
            View Catalog <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="luxury-container grid gap-8 py-16 sm:py-20 md:py-28 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="luxury-frame relative aspect-[4/5] overflow-hidden rounded-[1.6rem] border border-champagne/18 shadow-gold sm:rounded-[2.4rem]">
            <Image
              src="/pages/about-hero.png"
              alt="Elegant brand story editorial"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-radial-gold" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mb-6 grid grid-cols-2 gap-2 sm:mb-8 sm:gap-3">
            {["Curated", "Refined", "Elevated", "Timeless"].map((item) => (
              <div
                key={item}
                className="rounded-full border border-champagne/18 bg-white/[0.035] px-3 py-2 text-center text-[9px] uppercase tracking-[0.16em] text-ivory/60 sm:px-4 sm:text-xs sm:tracking-[0.2em]"
              >
                {item}
              </div>
            ))}
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-champagne sm:text-xs sm:tracking-[0.35em]">
            Brand Story
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-ivory sm:text-5xl md:text-7xl">
            Fashion designed to feel personal and polished.
          </h2>
          <p className="mt-5 text-sm leading-7 text-ivory/70 sm:text-lg sm:leading-8">
            ONLY COLLECTION focuses on elevated style, careful presentation, and
            a calm shopping experience built around confidence and clarity.
          </p>
          <Link
            href="/about"
            className="mt-7 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-champagne sm:text-sm sm:tracking-[0.24em]"
          >
            Explore Brand <ArrowRight size={16} />
          </Link>
        </Reveal>
      </section>

      <section className="luxury-container py-14 sm:py-20 md:py-24">
        <SectionHeading
          eyebrow="Services"
          title="Support shaped around a refined customer experience."
          centered
        />
        <div className="grid gap-5 md:grid-cols-4">
          {services.map((service) => (
            <Reveal key={service.slug}>
              <article className="glass-panel group h-full rounded-[1.5rem] p-4 transition duration-500 hover:-translate-y-2 hover:border-champagne/40 hover:shadow-gold sm:rounded-[1.8rem] sm:p-6">
                <div className="relative mb-5 aspect-square overflow-hidden rounded-[1.2rem]">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-2xl text-ivory">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-ivory/62">
                  {service.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-20 md:py-28">
        <Image
          src="/pages/gallery-hero.png"
          alt="Luxury statement"
          fill
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-black/70" />
        <Reveal className="luxury-container relative z-10 max-w-4xl text-center">
          <div className="mx-auto mb-6 h-px w-24 bg-gold-gradient sm:mb-8 sm:w-32" />
          <blockquote className="font-serif text-3xl leading-tight text-ivory sm:text-5xl md:text-7xl">
            “Designed to make you feel extraordinary.”
          </blockquote>
        </Reveal>
      </section>

      <section className="luxury-container py-14 sm:py-20 md:py-24">
        <SectionHeading
          eyebrow="Gallery"
          title="A refined visual world."
          centered
        />
        <GalleryGrid items={galleryItems.slice(0, 6)} />
        <div className="mt-10 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 rounded-full border border-champagne/40 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ivory hover:bg-champagne/10 sm:px-7 sm:text-sm sm:tracking-[0.22em]"
          >
            View Gallery <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="luxury-container pb-16 sm:pb-20 md:pb-24">
        <div className="glass-panel rounded-[1.7rem] p-6 text-center sm:rounded-[2.5rem] sm:p-10 md:p-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-champagne sm:text-xs sm:tracking-[0.35em]">
            Stay Connected
          </p>
          <h2 className="mt-4 font-serif text-4xl text-ivory sm:text-5xl md:text-7xl">
            Reach out for styling guidance and collection questions.
          </h2>
          <Link
            href="/contact"
            className="mt-7 inline-flex rounded-full bg-gold-gradient px-7 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-black sm:mt-8 sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.24em]"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <EditorialImageStrip
        images={editorialImages}
        title="Homepage Editorial Set"
      />
    </>
  );
}
