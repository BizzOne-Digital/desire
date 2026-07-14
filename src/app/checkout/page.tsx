import type { Metadata } from "next";
import { CheckoutClient } from "@/components/checkout-client";
import { EditorialImageStrip, PageHero } from "@/components/sections";
import { getImageSet } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Secure checkout structure with customer information, shipping, billing, payment readiness, and order summary."
};

export default function CheckoutPage() {
  return (
    <>
      <PageHero
        eyebrow="Checkout"
        title="A smooth final step."
        text="Enter customer and shipping details, review the order summary, and complete a mock payment flow ready for Stripe."
        image="/pages/shop-hero.png"
      />
      <CheckoutClient />
      <EditorialImageStrip images={getImageSet("checkout")} title="Checkout Editorial Set" />
    </>
  );
}
