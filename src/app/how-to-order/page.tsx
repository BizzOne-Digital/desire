import type { Metadata } from "next";
import Image from "@/components/safe-image";
import Link from "next/link";
import { ArrowRight, MessageCircle, FileText, Mail, CheckCircle } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/sections";
import { Reveal } from "@/components/motion";
import { getContent } from "@/lib/content-store";
import { getSiteSettings } from "@/lib/store";

export const metadata: Metadata = {
  title: "How to Order",
  description:
    "Learn how to browse our catalogs and place an inquiry for authentic athletic merchandise from Sport Only.",
};

const stepIcons = [FileText, MessageCircle, Mail, CheckCircle];

export default async function HowToOrderPage() {
  const [c, settings] = await Promise.all([getContent(), getSiteSettings()]);
  const steps = stepIcons.map((icon, index) => ({
    number: `0${index + 1}`,
    icon,
    title: c.t(`order.step${index + 1}.title`),
    description: c.t(`order.step${index + 1}.text`),
    details: c
      .lines(`order.step${index + 1}.details`)
      .map((line) => line.replaceAll("{email}", settings.email).replaceAll("{phone}", settings.phone)),
  }));
  const notes = [1, 2, 3].map((index) => [c.t(`order.info.${index}.title`), c.t(`order.info.${index}.text`)]);

  return (
    <>
      <PageHero
        eyebrow={c.t("order.hero.eyebrow")}
        title={c.t("order.hero.title")}
        text={c.t("order.hero.text")}
        image={c.t("order.hero.image")}
        cta={{ label: c.t("order.hero.cta"), href: "/shop" }}
      />

      <section className="luxury-container py-16 sm:py-20 md:py-24">
        <SectionHeading
          eyebrow={c.t("order.steps.eyebrow")}
          title={c.t("order.steps.title")}
          text={c.t("order.steps.text")}
          centered
        />

        <div className="mt-12 grid gap-8 lg:gap-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.number} delay={index * 0.1}>
                <div className="glass-panel group rounded-[1.7rem] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-champagne/40 hover:shadow-gold sm:rounded-[2rem] sm:p-8 lg:p-10">
                  <div className="grid gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
                    <div className="flex flex-col items-start gap-4 lg:items-center lg:text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-champagne/30 bg-champagne/5 sm:h-20 sm:w-20">
                        <Icon className="h-8 w-8 text-champagne sm:h-10 sm:w-10" />
                      </div>
                      <span className="font-serif text-6xl text-champagne/20 sm:text-7xl lg:text-8xl">
                        {step.number}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-serif text-3xl text-ivory sm:text-4xl">
                        {step.title}
                      </h3>
                      <p className="mt-4 text-base leading-7 text-ivory/70 sm:text-lg">
                        {step.description}
                      </p>
                      <ul className="mt-6 grid gap-3 sm:gap-4">
                        {step.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-sm text-ivory/60"
                          >
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-gradient" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="luxury-container pb-16 sm:pb-20 md:pb-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <Reveal>
            <div className="glass-panel rounded-[1.7rem] p-6 sm:rounded-[2rem] sm:p-8 lg:p-10">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.28em] text-champagne sm:text-xs">
                {c.t("order.info.eyebrow")}
              </h2>
              <h3 className="mt-4 font-serif text-3xl text-ivory sm:text-4xl">
                {c.t("order.info.title")}
              </h3>
              <div className="mt-6 grid gap-4">
                {notes.map(([title, text]) => (
                  <div key={title}>
                    <h4 className="text-sm font-semibold text-ivory">{title}</h4>
                    <p className="mt-2 text-sm leading-6 text-ivory/70">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass-panel rounded-[1.7rem] p-6 sm:rounded-[2rem] sm:p-8 lg:p-10">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.28em] text-champagne sm:text-xs">
                {c.t("order.help.eyebrow")}
              </h2>
              <h3 className="mt-4 font-serif text-3xl text-ivory sm:text-4xl">
                {c.t("order.help.title")}
              </h3>
              <p className="mt-4 text-base leading-7 text-ivory/70">
                {c.t("order.help.text")}
              </p>
              <div className="mt-6 grid gap-3">
                <div className="rounded-lg border border-champagne/20 bg-white/[0.02] p-4">
                  <p className="text-xs uppercase tracking-wider text-champagne">
                    Email
                  </p>
                  <a
                    href={`mailto:${settings.email}`}
                    className="mt-1 block text-sm font-medium text-ivory hover:text-champagne"
                  >
                    {settings.email}
                  </a>
                </div>
                <div className="rounded-lg border border-champagne/20 bg-white/[0.02] p-4">
                  <p className="text-xs uppercase tracking-wider text-champagne">
                    Phone
                  </p>
                  <a
                    href={`tel:${settings.phone}`}
                    className="mt-1 block text-sm font-medium text-ivory hover:text-champagne"
                  >
                    {settings.phone}
                  </a>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black hover:shadow-gold"
                >
                  Contact Us <ArrowRight size={14} />
                </Link>
                <Link
                  href="/product-inquiry"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-champagne/40 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-champagne hover:bg-champagne/10"
                >
                  Submit Inquiry <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="luxury-container pb-16 sm:pb-20 md:pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.7rem] sm:rounded-[2.5rem]">
            <div className="absolute inset-0">
              <Image
                src={c.t("order.cta.image")}
                alt="Contact Sport Only"
                fill
                className="object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>
            <div className="relative z-10 px-6 py-12 text-center sm:px-10 sm:py-16 md:px-16 md:py-20">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-champagne sm:text-xs">
                {c.t("order.cta.eyebrow")}
              </p>
              <h2 className="mt-4 font-serif text-4xl text-ivory sm:text-5xl md:text-6xl">
                {c.t("order.cta.title")}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-ivory/70 sm:text-base">
                {c.t("order.cta.text")}
              </p>
              <Link
                href="/shop"
                className="mt-7 inline-flex items-center gap-3 rounded-full bg-gold-gradient px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-black hover:shadow-gold sm:text-sm"
              >
                {c.t("order.cta.button")} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
