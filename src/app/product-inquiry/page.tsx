import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";
import {
  EditorialImageStrip,
  PageHero,
  SectionHeading,
} from "@/components/sections";
import { getCatalogs } from "@/lib/catalog-store";
import { getImageSet } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Product Inquiry",
  description:
    "Submit a product link or catalog code so ONLY COLLECTION can confirm pricing and availability.",
};

export default async function ProductInquiryPage() {
  const catalogs = await getCatalogs();

  return (
    <>
      <PageHero
        eyebrow="Product Inquiry"
        title="Send us the item you want."
        text="Paste the catalog product link or code, add your preferred size, color, quantity, and delivery country, and we will confirm the details before any order is created."
        image="/pages/contact-hero.png"
      />
      <section className="luxury-container grid gap-10 py-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading
            eyebrow="Inquiry Details"
            title="Price and availability are confirmed personally."
            text="Submitting this form does not create an order or payment obligation. A team member must confirm availability, price, delivery time, and payment instructions first."
          />
          <div className="rounded-[2rem] border border-champagne/15 bg-black/40 p-6 text-sm leading-7 text-ivory/68">
            <p>
              Optional screenshot upload is not enabled yet because secure
              storage must be configured first. Please paste the product link or
              product code instead.
            </p>
          </div>
        </div>
        <InquiryForm catalogs={catalogs} />
      </section>
      <EditorialImageStrip
        images={getImageSet("contact")}
        title="Inquiry Inspiration"
      />
    </>
  );
}
