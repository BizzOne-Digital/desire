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
    "Contact ONLY COLLECTION for collection questions and styling support.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We would love to hear from you."
        text="Reach out for collection questions, styling guidance, or general brand support."
        image="/pages/contact-hero.png"
      />
      <section className="luxury-container grid gap-10 py-24 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading
            eyebrow="Reach Us"
            title="Clear support for every message."
            text="Share your question and we will respond with helpful, carefully considered guidance."
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
