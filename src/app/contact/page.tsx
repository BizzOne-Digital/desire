import type { Metadata } from "next";
import { ContactForm } from "@/components/forms";
import { EditorialImageStrip, PageHero, SectionHeading } from "@/components/sections";
import { siteConfig } from "@/lib/content";
import { getImageSet } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact ONLY COLLECTION by form, email, or phone."
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We would love to help you choose well."
        text="Send a message for product questions, custom requests, gifting help, or order support."
        image="/pages/contact-hero.png"
      />
      <section className="luxury-container grid gap-10 py-24 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading
            eyebrow="Reach Us"
            title="Warm support, refined answers."
            text="Address, hours, and social links stay hidden until they are entered from the admin dashboard."
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
      <EditorialImageStrip images={getImageSet("contact")} title="Contact Editorial Set" />
    </>
  );
}
