import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy-page";
import { policyContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Shipping and Returns",
  description: "Shipping and return information for ONLY COLLECTION."
};

export default function ShippingReturnsPage() {
  return (
    <PolicyPage
      eyebrow="Shipping"
      title="Shipping and Returns"
      text="Helpful delivery timing, return expectations, and care for each order."
      body={policyContent.shipping}
      image="/pages/services-hero.png"
      imageSeed="shipping"
    />
  );
}
