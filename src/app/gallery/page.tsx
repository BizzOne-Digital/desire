import type { Metadata } from "next";
import { GalleryClient } from "@/components/gallery-client";
import { PageHero } from "@/components/sections";
import { getGalleryItems } from "@/lib/store";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Editorial inspiration for the ONLY COLLECTION black-and-gold fashion experience.",
};

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="A refined visual world."
        text="Explore fashion and lifestyle imagery that supports the ONLY COLLECTION black-and-gold aesthetic."
        image="/pages/gallery-hero.png"
      />
      <GalleryClient items={items} />
    </>
  );
}
