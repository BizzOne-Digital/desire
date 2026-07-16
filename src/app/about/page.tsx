import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  EditorialImageStrip,
  PageHero,
  SectionHeading,
} from "@/components/sections";
import { Reveal } from "@/components/motion";
import { getImageSet } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how ONLY COLLECTION helps customers browse fashion catalogs and submit product inquiries.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Catalog browsing with personal confirmation."
        text="ONLY COLLECTION helps customers explore fashion supplier catalogs and request clear confirmation before ordering."
        image="/pages/about-hero.png"
      />
      <section className="luxury-container grid gap-12 py-24 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <SectionHeading
            eyebrow="Our Story"
            title="A clear way to browse, ask, and confirm."
            text="The service is built for customers who want to browse external catalogs, send product references, and receive human confirmation for price, availability, sizing, color, and delivery."
          />
          <Link
            href="/shop"
            className="inline-flex rounded-full bg-gold-gradient px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-black"
          >
            Browse Catalogs
          </Link>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.4rem] border border-champagne/18">
            <Image
              src="/gallery/gallery-6.png"
              alt="About editorial"
              fill
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>
      <section className="border-y border-champagne/10 bg-black/35 py-24">
        <div className="luxury-container grid gap-5 md:grid-cols-3">
          {[
            [
              "Mission",
              "To make catalog browsing clearer with a simple product inquiry process.",
            ],
            [
              "Vision",
              "To become a trusted contact point for fashion catalog sourcing requests.",
            ],
            [
              "Promise",
              "Every inquiry is handled with clear confirmation before payment or ordering.",
            ],
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
        <SectionHeading
          eyebrow="Values"
          title="The details that guide the brand."
          centered
        />
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
        <SectionHeading
          eyebrow="Journey"
          title="How customers use ONLY COLLECTION."
          centered
        />
        <div className="mx-auto max-w-3xl border-l border-champagne/25 pl-7">
          {[
            "Browse catalogs",
            "Select product reference",
            "Submit inquiry",
            "Confirm before ordering",
          ].map((item, index) => (
            <Reveal key={item}>
              <div className="relative mb-8">
                <span className="absolute -left-[2.25rem] top-1 h-4 w-4 rounded-full bg-champagne" />
                <p className="text-xs uppercase tracking-[0.3em] text-champagne">
                  Step {index + 1}
                </p>
                <h3 className="mt-2 font-serif text-3xl text-ivory">{item}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <EditorialImageStrip
        images={getImageSet("about")}
        title="About Editorial Set"
      />
    </>
  );
}
