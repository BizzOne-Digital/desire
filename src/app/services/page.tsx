import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  EditorialImageStrip,
  PageHero,
  SectionHeading,
} from "@/components/sections";
import { Reveal } from "@/components/motion";
import { services } from "@/lib/content";
import { getImageSet } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Catalog browsing guidance, product inquiry support, and confirmation before ordering.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Support for catalog inquiries."
        text="Get help browsing external catalogs, organizing product references, and confirming price, availability, sizing, color, and delivery details."
        image="/pages/services-hero.png"
        cta={{ label: "Submit Inquiry", href: "/product-inquiry" }}
      />
      <section className="luxury-container py-24">
        <SectionHeading
          eyebrow="What We Offer"
          title="Clear support from catalog to confirmation."
          centered
        />
        <div className="grid gap-7 md:grid-cols-2">
          {services.map((service) => (
            <Reveal key={service.slug}>
              <article className="glass-panel overflow-hidden rounded-[2rem]">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-7">
                  <h2 className="font-serif text-4xl text-ivory">
                    {service.title}
                  </h2>
                  <p className="mt-4 leading-7 text-ivory/68">
                    {service.description}
                  </p>
                  <ul className="mt-6 grid gap-3">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="border-l border-champagne/50 pl-4 text-sm text-ivory/70"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="border-y border-champagne/10 bg-black/35 py-24">
        <div className="luxury-container">
          <SectionHeading
            eyebrow="Process"
            title="A calm path from catalog to confirmed details."
            centered
          />
          <div className="grid gap-5 md:grid-cols-4">
            {[
              "Open catalog",
              "Copy product link",
              "Submit inquiry",
              "Confirm details",
            ].map((step, index) => (
              <Reveal key={step}>
                <div className="rounded-[1.6rem] border border-champagne/15 p-6">
                  <span className="font-serif text-5xl gold-text">
                    0{index + 1}
                  </span>
                  <h3 className="mt-4 font-serif text-2xl text-ivory">
                    {step}
                  </h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="luxury-container py-24">
        <SectionHeading eyebrow="FAQ" title="Helpful details." centered />
        <div className="mx-auto grid max-w-3xl gap-4">
          {[
            [
              "Do catalog links open in a new tab?",
              "Yes. External catalogs open in a new tab so you can return to ONLY COLLECTION and submit your inquiry.",
            ],
            [
              "Does submitting an inquiry create an order?",
              "No. Price, availability, delivery time, and payment instructions must be confirmed first.",
            ],
            [
              "Can I send a product code instead of a link?",
              "Yes. A product code, album name, or clear product reference can be included in the inquiry form.",
            ],
          ].map(([question, answer]) => (
            <details
              key={question}
              className="rounded-2xl border border-champagne/15 p-5"
            >
              <summary className="cursor-pointer font-serif text-2xl text-ivory">
                {question}
              </summary>
              <p className="mt-3 text-sm leading-7 text-ivory/65">{answer}</p>
            </details>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/product-inquiry"
            className="rounded-full bg-gold-gradient px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-black"
          >
            Submit Inquiry
          </Link>
        </div>
      </section>
      <EditorialImageStrip
        images={getImageSet("services")}
        title="Services Editorial Set"
      />
    </>
  );
}
