import type { Metadata } from "next";
import { ContactForm } from "@/components/forms";
import {
  EditorialImageStrip,
  PageHero,
  SectionHeading,
} from "@/components/sections";
import { getContent } from "@/lib/content-store";
import { getSiteSettings } from "@/lib/store";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact ONLY COLLECTION for collection questions and styling support.",
};

export default async function ContactPage() {
  const [c, settings] = await Promise.all([getContent(), getSiteSettings()]);

  return (
    <>
      <PageHero
        eyebrow={c.t("contact.hero.eyebrow")}
        title={c.t("contact.hero.title")}
        text={c.t("contact.hero.text")}
        image={c.t("contact.hero.image")}
      />
      <section className="luxury-container grid gap-10 py-24 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading
            eyebrow={c.t("contact.reach.eyebrow")}
            title={c.t("contact.reach.title")}
            text={c.t("contact.reach.text")}
          />
          <div className="grid gap-4 text-ivory/72">
            <p>
              <span className="text-champagne">Email:</span> {settings.email}
            </p>
            <p>
              <span className="text-champagne">Phone:</span> {settings.phone}
            </p>
            {settings.businessHours && <p>{settings.businessHours}</p>}
            {settings.address && <p>{settings.address}</p>}
          </div>
        </div>
        <ContactForm />
      </section>
      <EditorialImageStrip
        images={c.strip("contact")}
        title={c.t("contact.strip.title")}
        eyebrow={c.t("strip.eyebrow")}
        text={c.t("strip.text")}
      />
    </>
  );
}
