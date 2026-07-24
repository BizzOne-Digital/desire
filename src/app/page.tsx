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
  const featuredCatalogs = getFeaturedCatalogs().slice(0, 3);

  return (
    <>
      <section className="home-hero relative min-h-[100svh] overflow-hidden bg-black pt-[72px] sm:pt-20 md:pt-[100px]">
        <Image
          src="/hero-background.png"
          alt="Black and gold luxury product hero"
          fill
          priority
          className="object-cover object-[58%_top] opacity-[0.52] sm:object-contain sm:object-right sm:opacity-100"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.46)_0%,rgba(0,0,0,0.68)_34%,rgba(0,0,0,0.96)_100%)] sm:bg-[linear-gradient(90deg,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.86)_31%,rgba(0,0,0,0.34)_66%,rgba(0,0,0,0.08)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_56%,rgba(215,181,109,0.18),transparent_13rem)] sm:bg-[radial-gradient(circle_at_8%_36%,rgba(215,181,109,0.16),transparent_18rem)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent" />
        <div className="home-hero-inner luxury-container relative z-10 flex min-h-[calc(100svh-72px)] items-center pb-10 pt-8 sm:min-h-[calc(100svh-80px)] sm:items-end sm:pb-12 md:min-h-[calc(100vh-100px)] md:items-start md:pb-0 md:pt-24">
          <Reveal className="home-hero-copy w-full max-w-[720px]">
            <div className="home-hero-kicker mx-auto flex w-fit items-center justify-center gap-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-champagne min-[380px]:text-[10px] sm:mx-0 sm:justify-start sm:gap-4 sm:text-[11px] sm:tracking-[0.28em]">
              <span className="text-base leading-none text-champagne drop-shadow-[0_0_12px_rgba(215,181,109,0.9)] sm:text-lg">
                ✦
              </span>
              Premium Athletic Catalogs
            </div>
            <h1 className="home-hero-title mx-auto mt-5 max-w-[21rem] text-center font-serif text-[clamp(2.35rem,11vw,3.05rem)] uppercase leading-[0.92] tracking-[0.005em] text-ivory sm:mx-0 sm:max-w-none sm:text-left sm:text-5xl md:mt-7 md:text-6xl lg:text-[3.75rem] xl:text-[4.35rem]">
              <span className="block">Authentic</span>
              <span className="block">Sports</span>
              <span className="block">Merchandise</span>
              <span className="gold-text block overflow-visible pr-[0.12em] pb-[0.08em]">
                Sport Only.
              </span>
            </h1>
            <p className="home-hero-text mx-auto mt-5 max-w-[32ch] text-center text-[13px] leading-6 text-ivory/78 sm:mx-0 sm:max-w-[520px] sm:text-left sm:text-sm md:mt-6 md:text-base md:leading-7">
              Browse our curated catalogs featuring sneakers, bags, watches, accessories, and premium athletic gear from trusted suppliers.
            </p>
            <div className="home-hero-actions mx-auto mt-6 flex w-full max-w-[21rem] flex-col gap-3 sm:mx-0 sm:max-w-sm sm:flex-row sm:gap-5 md:mt-7">
              <Link
                href="/shop"
                className="home-hero-button inline-flex w-full min-w-0 items-center justify-center gap-3 bg-gold-gradient px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-black shadow-gold transition hover:-translate-y-1 sm:min-w-44 sm:px-7 sm:py-4 sm:text-[11px]"
              >
                Browse Catalogs <ArrowRight size={15} />
              </Link>
              <Link
                href="/how-to-order"
                className="home-hero-button inline-flex w-full min-w-0 items-center justify-center gap-3 border border-champagne/70 bg-black/20 px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-champagne transition hover:bg-champagne hover:text-black sm:min-w-44 sm:px-7 sm:py-4 sm:text-[11px]"
              >
                How to Order <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="luxury-container relative overflow-hidden py-16 sm:py-20 md:py-24">
        <div className="absolute -right-20 top-8 h-48 w-48 rounded-full border border-champagne/10 sm:-right-28 sm:h-72 sm:w-72" />
        <SectionHeading
          eyebrow="Featured Catalogs"
          title="Start exploring our premium collections"
          text="Browse authentic athletic merchandise from verified suppliers. Each catalog opens in a new window for your convenience."
        />
        <div className="grid gap-5 md:grid-cols-3">
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
            View All Catalogs <ArrowRight size={16} />
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
