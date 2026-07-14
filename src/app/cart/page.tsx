import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart-page-client";
import { EditorialImageStrip, PageHero } from "@/components/sections";
import { getImageSet } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review cart items, update quantities, remove products, and proceed to checkout."
};

export default function CartPage() {
  return (
    <>
      <PageHero
        eyebrow="Cart"
        title="Review your selected pieces."
        text="Update quantities, remove items, apply discounts at checkout, and continue into a Stripe-ready payment structure."
        image="/pages/shop-hero.png"
      />
      <CartPageClient />
      <EditorialImageStrip images={getImageSet("cart")} title="Cart Editorial Set" />
    </>
  );
}
