import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsletterForm } from "@/components/forms";
import { ProductCard } from "@/components/product-card";
import { EditorialImageStrip, GalleryGrid, SectionHeading } from "@/components/sections";
import { Reveal } from "@/components/motion";
import { editorialImages } from "@/lib/content";
import { getCategories, getGalleryItems, getPricingPlans, getProducts, getServices, getTestimonials } from "@/lib/store";

export default async function HomePage() {
  const [products, categories, services, galleryItems, testimonials] = await Promise.all([
    getProducts(),
    getCategories(),
    getServices(),
    getGalleryItems(),
    getTestimonials(),
    getPricingPlans()
  ]);
  const featuredProducts = products.filter((product) => product.featured).slice(0, 4);

  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-black pt-[100px]">
        <Image
          src="/hero-background.png"
          alt="Black and gold luxury product hero"
          fill
          priority
          className="object-contain object-right"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.86)_31%,rgba(0,0,0,0.34)_66%,rgba(0,0,0,0.08)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_36%,rgba(215,181,109,0.16),transparent_18rem)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-obsidian to-transparent" />
        <div className="luxury-container relative z-10 flex min-h-[calc(100vh-100px)] items-start pt-20 md:pt-24">
          <Reveal className="max-w-[620px]">
            <div className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-champagne">
              <span className="text-lg leading-none text-champagne drop-shadow-[0_0_12px_rgba(215,181,109,0.9)]">✦</span>
              <span className="h-px w-14 bg-gold-gradient" />
              Made to inspire confidence
            </div>
            <h1 className="mt-7 font-serif text-5xl uppercase leading-[0.96] tracking-[0.035em] text-ivory md:text-6xl lg:text-[4rem] xl:text-[4.8rem]">
              Designed to make
              <br />
              you feel
              <br />
              <span className="gold-text">Extraordinary.</span>
            </h1>
            <p className="mt-6 max-w-[520px] text-[15px] leading-7 text-ivory/78 md:text-base">
              Discover a refined collection created for confidence, comfort, and timeless expression.
            </p>
            <div className="mt-7 flex flex-col gap-5 sm:flex-row">
              <Link href="/shop" className="inline-flex min-w-44 items-center justify-center gap-4 bg-gold-gradient px-7 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-black shadow-gold transition hover:-translate-y-1">
                Shop Collection <ArrowRight size={15} />
              </Link>
              <Link href="/about" className="inline-flex min-w-44 items-center justify-center gap-4 border border-champagne/70 bg-black/20 px-7 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-champagne transition hover:bg-champagne hover:text-black">
                Explore Brand <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="luxury-container relative py-24">
        <div className="absolute -right-28 top-8 h-72 w-72 rounded-full border border-champagne/10" />
        <SectionHeading
          eyebrow="Collections"
          title="Curated for the way luxury should feel."
          text="Editable collection cards help the client shape the brand as products and categories evolve."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {categories.map((category) => (
            <Reveal key={category.slug}>
              <Link href={`/shop?category=${category.slug}`} className="luxury-frame group relative block min-h-[460px] overflow-hidden rounded-[2.2rem] border border-champagne/15 shadow-soft">
                <Image src={category.imageUrl} alt={category.name} fill className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 group-hover:bg-radial-gold" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h2 className="font-serif text-4xl text-ivory">{category.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-ivory/68">{category.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-champagne">
                    View Collection <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-champagne/10 bg-black/50 py-24">
        <div className="gold-orb left-1/2 top-0 -translate-x-1/2 opacity-45" />
        <div className="luxury-container">
          <SectionHeading
            eyebrow="Featured"
            title="Objects with presence."
            text="Premium product cards include badges, hover image swaps, quick cart actions, category labels, pricing, and stock-aware states."
            centered
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="luxury-container grid gap-10 py-28 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="luxury-frame relative aspect-[4/5] overflow-hidden rounded-[2.4rem] border border-champagne/18 shadow-gold">
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
          <div className="mb-8 grid grid-cols-2 gap-3">
            {["Curated", "Gift Ready", "Mobile First", "Admin Editable"].map((item) => (
              <div key={item} className="rounded-full border border-champagne/18 bg-white/[0.035] px-4 py-2 text-center text-xs uppercase tracking-[0.2em] text-ivory/60">
                {item}
              </div>
            ))}
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-champagne">Brand Story</p>
          <h2 className="mt-4 font-serif text-5xl leading-tight text-ivory md:text-7xl">
            Helping people feel good through elevated choice.
          </h2>
          <p className="mt-6 text-lg leading-8 text-ivory/70">
            ONLY COLLECTION is built around thoughtful selection, beautiful presentation, and a
            shopping experience that feels calm, confident, and personal.
          </p>
          <Link href="/about" className="mt-8 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.24em] text-champagne">
            Learn More <ArrowRight size={16} />
          </Link>
        </Reveal>
      </section>

      <section className="luxury-container py-24">
        <SectionHeading eyebrow="Services" title="Support that feels personal." centered />
        <div className="grid gap-5 md:grid-cols-4">
          {services.map((service) => (
            <Reveal key={service.slug}>
              <article className="glass-panel group h-full rounded-[1.8rem] p-6 transition duration-500 hover:-translate-y-2 hover:border-champagne/40 hover:shadow-gold">
                <div className="relative mb-5 aspect-square overflow-hidden rounded-[1.2rem]">
                  <Image src={service.imageUrl} alt={service.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <h3 className="font-serif text-2xl text-ivory">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ivory/62">{service.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-28">
        <Image
          src="/pages/gallery-hero.png"
          alt="Luxury statement"
          fill
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-black/70" />
        <Reveal className="luxury-container relative z-10 max-w-4xl text-center">
          <div className="mx-auto mb-8 h-px w-32 bg-gold-gradient" />
          <blockquote className="font-serif text-5xl leading-tight text-ivory md:text-7xl">
            “Luxury is not only how something looks. It is how it makes you feel.”
          </blockquote>
        </Reveal>
      </section>

      <section className="luxury-container py-24">
        <SectionHeading eyebrow="Gallery" title="A refined visual world." centered />
        <GalleryGrid items={galleryItems.slice(0, 6)} />
        <div className="mt-10 text-center">
          <Link href="/gallery" className="inline-flex items-center gap-3 rounded-full border border-champagne/40 px-7 py-3 text-sm font-bold uppercase tracking-[0.22em] text-ivory hover:bg-champagne/10">
            View Gallery <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="border-y border-champagne/10 bg-black/36 py-24">
        <div className="luxury-container">
          <SectionHeading eyebrow="Testimonials" title="Warm words from customers." centered />
          <div className="grid gap-5 md:grid-cols-4">
            {testimonials.map((testimonial) => (
              <Reveal key={testimonial.name}>
                <article className="glass-panel h-full rounded-[1.6rem] p-6">
                  <p className="text-sm text-champagne">{"★".repeat(testimonial.rating)}</p>
                  <p className="mt-5 text-sm leading-7 text-ivory/72">“{testimonial.review}”</p>
                  <p className="mt-6 font-serif text-xl text-ivory">{testimonial.name}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="luxury-container py-24 text-center">
        <SectionHeading
          eyebrow="Newsletter"
          title="Notes from the collection."
          text="Sign up for refined product updates, gift inspiration, and exclusive launch notes."
          centered
        />
        <NewsletterForm />
      </section>

      <section className="luxury-container pb-24">
        <div className="glass-panel rounded-[2.5rem] p-10 text-center md:p-16">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-champagne">Final Call</p>
          <h2 className="mt-4 font-serif text-5xl text-ivory md:text-7xl">
            Find Something That Feels Like You.
          </h2>
          <Link href="/shop" className="mt-8 inline-flex rounded-full bg-gold-gradient px-8 py-4 text-sm font-bold uppercase tracking-[0.24em] text-black">
            Shop Now
          </Link>
        </div>
      </section>

      <EditorialImageStrip images={editorialImages} title="Homepage Editorial Set" />
    </>
  );
}
