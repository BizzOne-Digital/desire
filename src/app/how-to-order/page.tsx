import type { Metadata } from "next";
import { OrderSteps } from "@/components/order-steps";
import { EditorialImageStrip, PageHero } from "@/components/sections";
import { getImageSet } from "@/lib/utils";

export const metadata: Metadata = {
  title: "How to Order",
  description:
    "Learn how to browse external catalogs and submit a product inquiry for pricing and availability.",
};

export default function HowToOrderPage() {
  return (
    <>
      <PageHero
        eyebrow="How to Order"
        title="Choose from catalogs. Confirm before ordering."
        text="Our process is built around product inquiries. Browse external catalogs, send the item reference, and wait for confirmation before payment."
        image="/pages/pricing-hero.png"
        cta={{ label: "Submit Product Inquiry", href: "/product-inquiry" }}
      />
      <OrderSteps />
      <EditorialImageStrip
        images={getImageSet("pricing")}
        title="Catalog Order Inspiration"
      />
    </>
  );
}
