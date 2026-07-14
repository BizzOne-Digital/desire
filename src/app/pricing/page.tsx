import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { EditorialImageStrip, PageHero, SectionHeading } from "@/components/sections";
import { Reveal } from "@/components/motion";
import { getPricingPlans } from "@/lib/store";
import { getImageSet } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Editable pricing cards for consultations, services, bundles, and custom packages."
};

export default async function PricingPage() {
  const plans = await getPricingPlans();

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Flexible options for gifts, bundles, and special requests."
        text="Placeholder pricing is ready for the client to update from the admin dashboard once final service pricing is confirmed."
        image="/pages/pricing-hero.png"
      />
      <section className="luxury-container py-24">
        <SectionHeading eyebrow="Packages" title="Editable premium pricing cards." centered />
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <Reveal key={plan.name}>
              <article className={`relative h-full rounded-[2rem] border p-8 ${plan.highlighted ? "border-champagne bg-champagne/10 shadow-gold" : "border-champagne/15 bg-white/[0.035]"}`}>
                {plan.highlighted && (
                  <span className="absolute right-6 top-6 rounded-full bg-champagne px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-black">
                    Popular
                  </span>
                )}
                <h2 className="font-serif text-4xl text-ivory">{plan.name}</h2>
                <p className="mt-4 text-5xl font-semibold gold-text">{plan.price}</p>
                <p className="mt-5 leading-7 text-ivory/68">{plan.description}</p>
                <ul className="mt-8 grid gap-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm text-ivory/72">
                      <Check className="mt-0.5 text-champagne" size={17} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="mt-9 inline-flex w-full justify-center rounded-full bg-gold-gradient px-6 py-3 text-sm font-bold uppercase tracking-[0.22em] text-black">
                  Inquire Now
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <EditorialImageStrip images={getImageSet("pricing")} title="Pricing Editorial Set" />
    </>
  );
}
