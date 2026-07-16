import type { Metadata } from "next";
import { ContactForm } from "@/components/forms";
import {
  EditorialImageStrip,
  PageHero,
  SectionHeading,
} from "@/components/sections";
import { siteConfig } from "@/lib/content";
import { getImageSet } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact ONLY COLLECTION for catalog questions and product inquiry support.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Questions before you submit an inquiry?"
        text="Contact us for catalog browsing help, product reference questions, or delivery-related questions."
        image="/pages/contact-hero.png"
      />
      <section className="luxury-container grid gap-10 py-24 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading
            eyebrow="Reach Us"
            title="Support for catalog customers."
            text="For product-specific pricing and availability, please use the Product Inquiry form and include the catalog link or product code."
          />
          <div className="grid gap-4 text-ivory/72">
            <p>
              <span className="text-champagne">Email:</span> {siteConfig.email}
            </p>
            <p>
              <span className="text-champagne">Phone:</span> {siteConfig.phone}
            </p>
            {siteConfig.businessHours && <p>{siteConfig.businessHours}</p>}
            {siteConfig.address && <p>{siteConfig.address}</p>}
          </div>
        </div>
        <ContactForm />
      </section>
      <EditorialImageStrip
        images={getImageSet("contact")}
        title="Contact Editorial Set"
      />
    </>
  );
}
