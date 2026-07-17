import Link from "next/link";
import { PageHero } from "@/components/sections";

export function UnavailableCheckoutNotice({
  title = "Direct checkout is unavailable.",
}: {
  title?: string;
}) {
  return (
    <>
      <PageHero
        eyebrow="Coming Soon"
        title={title}
        text="Direct online checkout is currently unavailable. Please contact us for pricing and availability."
        image="/pages/shop-hero.png"
        cta={{ label: "Contact Us", href: "/contact" }}
      />
      <section className="luxury-container py-16">
        <div className="glass-panel mx-auto max-w-3xl rounded-[2rem] p-8 text-center">
          <p className="text-sm leading-7 text-ivory/70">
            Explore the collections and reach out when you are ready for styling
            guidance or product questions.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="rounded-full bg-gold-gradient px-7 py-3 text-xs font-bold uppercase tracking-[0.22em] text-black"
            >
              Explore Shop
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-champagne/35 px-7 py-3 text-xs font-bold uppercase tracking-[0.22em] text-ivory hover:bg-champagne/10"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
