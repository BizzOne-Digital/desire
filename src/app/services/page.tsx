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
    "Styling guidance, personal support, and a refined customer experience from ONLY COLLECTION.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Support shaped around a refined experience."
        text="From styling guidance to personal support, every service is designed to feel calm, clear, and premium."
        image="/pages/services-hero.png"
        cta={{ label: "Contact Us", href: "/contact" }}
      />
      <section className="luxury-container py-24">
        <SectionHeading
          eyebrow="What We Offer"
          title="Careful support for every customer journey."
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
            title="A calm path from discovery to support."
            centered
          />
          <div className="grid gap-5 md:grid-cols-4">
            {[
              "Explore collections",
              "Review details",
              "Ask for guidance",
              "Stay connected",
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
              "How can I ask about a collection?",
              "Use the Contact page to share your questions and we will respond with clear guidance.",
            ],
            [
              "Is online checkout available right now?",
              "Direct online checkout is currently unavailable. Contact us for pricing and availability details.",
            ],
            [
              "Can I request styling advice?",
              "Yes. Reach out with the collection or look you have in mind and we will help guide the next step.",
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
            href="/contact"
            className="rounded-full bg-gold-gradient px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-black"
          >
            Contact Us
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
