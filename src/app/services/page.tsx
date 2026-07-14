import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EditorialImageStrip, PageHero, SectionHeading } from "@/components/sections";
import { Reveal } from "@/components/motion";
import { getServices } from "@/lib/store";
import { getImageSet } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description: "Personal product selection, gift consultation, premium packaging, and custom order support."
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Premium support for considered choices."
        text="Editable services help customers choose gifts, bundles, packaging, and product combinations with confidence."
        image="/pages/services-hero.png"
        cta={{ label: "Contact Us", href: "/contact" }}
      />
      <section className="luxury-container py-24">
        <SectionHeading eyebrow="What We Offer" title="Services with a personal touch." centered />
        <div className="grid gap-7 md:grid-cols-2">
          {services.map((service) => (
            <Reveal key={service.slug}>
              <article className="glass-panel overflow-hidden rounded-[2rem]">
                <div className="relative aspect-[16/10]">
                  <Image src={service.imageUrl} alt={service.title} fill className="object-cover" />
                </div>
                <div className="p-7">
                  <h2 className="font-serif text-4xl text-ivory">{service.title}</h2>
                  <p className="mt-4 leading-7 text-ivory/68">{service.description}</p>
                  <ul className="mt-6 grid gap-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="border-l border-champagne/50 pl-4 text-sm text-ivory/70">
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
          <SectionHeading eyebrow="Process" title="A calm path from idea to order." centered />
          <div className="grid gap-5 md:grid-cols-4">
            {["Share the occasion", "Receive curated options", "Confirm presentation", "Enjoy the delivery"].map((step, index) => (
              <Reveal key={step}>
                <div className="rounded-[1.6rem] border border-champagne/15 p-6">
                  <span className="font-serif text-5xl gold-text">0{index + 1}</span>
                  <h3 className="mt-4 font-serif text-2xl text-ivory">{step}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="luxury-container py-24">
        <SectionHeading eyebrow="FAQ" title="Helpful details." centered />
        <div className="mx-auto grid max-w-3xl gap-4">
          {["Can services be edited from admin?", "Can custom orders be requested?", "Can packaging options change?"].map((question) => (
            <details key={question} className="rounded-2xl border border-champagne/15 p-5">
              <summary className="cursor-pointer font-serif text-2xl text-ivory">{question}</summary>
              <p className="mt-3 text-sm leading-7 text-ivory/65">
                Yes. The admin content management structure supports editing service names, details, images, features, and calls to action.
              </p>
            </details>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/contact" className="rounded-full bg-gold-gradient px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-black">
            Start a Request
          </Link>
        </div>
      </section>
      <EditorialImageStrip images={getImageSet("services")} title="Services Editorial Set" />
    </>
  );
}
