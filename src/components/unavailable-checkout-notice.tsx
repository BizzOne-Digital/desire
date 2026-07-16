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
        eyebrow="Inquiry Required"
        title={title}
        text="Direct online checkout is currently unavailable. Please submit a product inquiry for pricing and availability."
        image="/pages/shop-hero.png"
        cta={{ label: "Submit Product Inquiry", href: "/product-inquiry" }}
      />
      <section className="luxury-container py-16">
        <div className="glass-panel mx-auto max-w-3xl rounded-[2rem] p-8 text-center">
          <p className="text-sm leading-7 text-ivory/70">
            We confirm product details, price, availability, delivery timing,
            and payment instructions before any order is created.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="rounded-full bg-gold-gradient px-7 py-3 text-xs font-bold uppercase tracking-[0.22em] text-black"
            >
              Browse Catalogs
            </Link>
            <Link
              href="/how-to-order"
              className="rounded-full border border-champagne/35 px-7 py-3 text-xs font-bold uppercase tracking-[0.22em] text-ivory hover:bg-champagne/10"
            >
              How to Order
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
