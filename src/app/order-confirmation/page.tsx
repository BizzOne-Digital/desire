import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { EditorialImageStrip, PageHero } from "@/components/sections";
import { getImageSet } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Order Confirmation",
  description: "Order confirmation and next steps."
};

export default async function OrderConfirmationPage({
  searchParams
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Confirmed"
        title="Thank you for your order."
        text="Your order has been received. A confirmation email structure is ready to connect to the configured notification provider."
        image="/pages/pricing-hero.png"
      />
      <section className="luxury-container py-24">
        <div className="glass-panel mx-auto max-w-3xl rounded-[2rem] p-10 text-center">
          <CheckCircle2 className="mx-auto text-champagne" size={56} />
          <h1 className="mt-6 font-serif text-5xl text-ivory">Order Confirmed</h1>
          <p className="mt-4 text-ivory/68">
            {order ? `Order ${order} has been placed successfully.` : "Your order has been placed successfully."}
          </p>
          <Link href="/shop" className="mt-8 inline-flex rounded-full bg-gold-gradient px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-black">
            Continue Shopping
          </Link>
        </div>
      </section>
      <EditorialImageStrip images={getImageSet("confirmation")} title="Confirmation Editorial Set" />
    </>
  );
}
