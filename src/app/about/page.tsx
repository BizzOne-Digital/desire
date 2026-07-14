import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EditorialImageStrip, PageHero, SectionHeading } from "@/components/sections";
import { Reveal } from "@/components/motion";
import { getImageSet } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: "Learn the story, mission, values, and vision behind ONLY COLLECTION."
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Thoughtfully selected. Beautifully experienced."
        text="ONLY COLLECTION helps people feel good through selected products and an elevated shopping experience."
        image="/pages/about-hero.png"
      />
      <section className="luxury-container grid gap-12 py-24 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <SectionHeading
            eyebrow="Our Story"
            title="A brand built around confidence, comfort, and feeling seen."
            text="The client’s core idea is simple and warm: helping people feel good through thoughtfully selected products and a shopping experience that feels elevated from first impression to final delivery."
          />
          <Link href="/shop" className="inline-flex rounded-full bg-gold-gradient px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-black">
            Shop the Collection
          </Link>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.4rem] border border-champagne/18">
            <Image src="/gallery/gallery-6.png" alt="About editorial" fill className="object-cover" />
          </div>
        </Reveal>
      </section>
      <section className="border-y border-champagne/10 bg-black/35 py-24">
        <div className="luxury-container grid gap-5 md:grid-cols-3">
          {[
            ["Mission", "To make premium products feel personal, accessible, and emotionally memorable."],
            ["Vision", "To become a trusted destination for refined daily rituals, gifts, and style pieces."],
            ["Promise", "Every touchpoint should feel polished, clear, and considered."]
          ].map(([title, text]) => (
            <Reveal key={title}>
              <article className="glass-panel h-full rounded-[1.8rem] p-7">
                <h2 className="font-serif text-4xl text-ivory">{title}</h2>
                <p className="mt-4 leading-7 text-ivory/68">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="luxury-container py-24">
        <SectionHeading eyebrow="Values" title="The details that guide the brand." centered />
        <div className="grid gap-5 md:grid-cols-4">
          {["Warmth", "Confidence", "Refinement", "Care"].map((value) => (
            <Reveal key={value}>
              <div className="rounded-[1.6rem] border border-champagne/15 p-8 text-center">
                <h3 className="font-serif text-4xl gold-text">{value}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="luxury-container pb-24">
        <SectionHeading eyebrow="Journey" title="A ready-to-edit brand timeline." centered />
        <div className="mx-auto max-w-3xl border-l border-champagne/25 pl-7">
          {["Brand foundation", "Premium storefront launch", "Product expansion", "Customer community"].map((item, index) => (
            <Reveal key={item}>
              <div className="relative mb-8">
                <span className="absolute -left-[2.25rem] top-1 h-4 w-4 rounded-full bg-champagne" />
                <p className="text-xs uppercase tracking-[0.3em] text-champagne">Step {index + 1}</p>
                <h3 className="mt-2 font-serif text-3xl text-ivory">{item}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <EditorialImageStrip images={getImageSet("about")} title="About Editorial Set" />
    </>
  );
}
