import type { Metadata } from "next";
import Image from "@/components/safe-image";
import Link from "next/link";
import {
  EditorialImageStrip,
  PageHero,
  SectionHeading,
} from "@/components/sections";
import { Reveal } from "@/components/motion";
import { getContent } from "@/lib/content-store";
import { getServices } from "@/lib/store";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Styling guidance, personal support, and a refined customer experience from ONLY COLLECTION.",
};

export default async function ServicesPage() {
  const [c, services] = await Promise.all([getContent(), getServices()]);
  const steps = [1, 2, 3, 4].map((index) => c.t(`services.process.${index}`));
  const faqs = [1, 2, 3].map((index) => [
    c.t(`services.faq.${index}.q`),
    c.t(`services.faq.${index}.a`),
  ]);

  return (
    <>
      <PageHero
        eyebrow={c.t("services.hero.eyebrow")}
        title={c.t("services.hero.title")}
        text={c.t("services.hero.text")}
        image={c.t("services.hero.image")}
        cta={{ label: c.t("services.hero.cta"), href: "/contact" }}
      />
      <section className="luxury-container py-24">
        <SectionHeading
          eyebrow={c.t("services.offer.eyebrow")}
          title={c.t("services.offer.title")}
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
            eyebrow={c.t("services.process.eyebrow")}
            title={c.t("services.process.title")}
            centered
          />
          <div className="grid gap-5 md:grid-cols-4">
            {steps.map((step, index) => (
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
        <SectionHeading
          eyebrow={c.t("services.faq.eyebrow")}
          title={c.t("services.faq.title")}
          centered
        />
        <div className="mx-auto grid max-w-3xl gap-4">
          {faqs.map(([question, answer]) => (
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
            {c.t("services.faq.button")}
          </Link>
        </div>
      </section>
      <EditorialImageStrip
        images={c.strip("services")}
        title={c.t("services.strip.title")}
        eyebrow={c.t("strip.eyebrow")}
        text={c.t("strip.text")}
      />
    </>
  );
}
