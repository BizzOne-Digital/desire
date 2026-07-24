import type { Metadata } from "next";
import { PageHero, SectionHeading } from "@/components/sections";
import { ProductInquiryForm } from "@/components/product-inquiry-form";

export const metadata: Metadata = {
  title: "Product Inquiry",
  description:
    "Inquire about products from our catalogs. Send us details about items you're interested in.",
};

export default function ProductInquiryPage() {
  return (
    <>
      <PageHero
        eyebrow="Product Inquiry"
        title="Tell Us What You Want"
        text="Fill out the form below with details about products you&apos;d like to order from our catalogs."
        image="/pages/contact-hero.png"
      />

      <section className="luxury-container py-16 sm:py-20 md:py-24">
        <SectionHeading
          eyebrow="Inquiry Form"
          title="Product details and contact information"
          text="Include product codes, sizes, colors, and quantities. The more details you provide, the faster we can respond."
          centered
        />

        <div className="mx-auto mt-10 max-w-3xl">
          <ProductInquiryForm />
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-sm leading-7 text-ivory/70">
            <strong className="text-champagne">Tip:</strong> Include screenshots
            or product codes from the catalog to help us identify items quickly.
            We&apos;ll respond with availability, pricing, and shipping information.
          </p>
        </div>
      </section>
    </>
  );
}
