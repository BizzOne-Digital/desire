import type { Metadata } from "next";
import { GalleryClient } from "@/components/gallery-client";
import { PageHero } from "@/components/sections";
import { getContent } from "@/lib/content-store";
import { getGalleryItems } from "@/lib/store";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Editorial inspiration for the ONLY COLLECTION black-and-gold fashion experience.",
};

export default async function GalleryPage() {
  const [c, items] = await Promise.all([getContent(), getGalleryItems()]);

  return (
    <>
      <PageHero
        eyebrow={c.t("gallery.hero.eyebrow")}
        title={c.t("gallery.hero.title")}
        text={c.t("gallery.hero.text")}
        image={c.t("gallery.hero.image")}
      />
      <GalleryClient items={items} />
    </>
  );
}
