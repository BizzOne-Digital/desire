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

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about ONLY COLLECTION and the brand’s focus on refined fashion and elevated presentation.",
};

export default async function AboutPage() {
  const c = await getContent();
  const pillars = ["mission", "vision", "promise"].map((key) => [
    c.t(`about.${key}.title`),
    c.t(`about.${key}.text`),
  ]);
  const values = [1, 2, 3, 4].map((index) => c.t(`about.values.${index}`));
  const journey = [1, 2, 3, 4].map((index) => c.t(`about.journey.${index}`));

  return (
    <>
      <PageHero
        eyebrow={c.t("about.hero.eyebrow")}
        title={c.t("about.hero.title")}
        text={c.t("about.hero.text")}
        image={c.t("about.hero.image")}
      />
      <section className="luxury-container grid gap-12 py-24 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <SectionHeading
            eyebrow={c.t("about.story.eyebrow")}
            title={c.t("about.story.title")}
            text={c.t("about.story.text")}
          />
          <Link
            href="/shop"
            className="inline-flex rounded-full bg-gold-gradient px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-black"
          >
            {c.t("about.story.button")}
          </Link>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.4rem] border border-champagne/18">
            <Image
              src={c.t("about.story.image")}
              alt="About editorial"
              fill
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>
      <section className="border-y border-champagne/10 bg-black/35 py-24">
        <div className="luxury-container grid gap-5 md:grid-cols-3">
          {pillars.map(([title, text]) => (
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
          eyebrow={c.t("about.values.eyebrow")}
          title={c.t("about.values.title")}
          centered
        />
        <div className="grid gap-5 md:grid-cols-4">
          {values.map((value) => (
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
          eyebrow={c.t("about.journey.eyebrow")}
          title={c.t("about.journey.title")}
          centered
        />
        <div className="mx-auto max-w-3xl border-l border-champagne/25 pl-7">
          {journey.map((item, index) => (
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
        images={c.strip("about")}
        title={c.t("about.strip.title")}
        eyebrow={c.t("strip.eyebrow")}
        text={c.t("strip.text")}
      />
    </>
  );
}
