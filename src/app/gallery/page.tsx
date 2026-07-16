import type { Metadata } from "next";
import { GalleryClient } from "@/components/gallery-client";
import { PageHero } from "@/components/sections";
import { getGalleryItems } from "@/lib/store";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Editorial inspiration for the ONLY COLLECTION catalog inquiry experience.",
};

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="A visual mood for catalog browsing."
        text="Explore neutral fashion and lifestyle imagery that supports the ONLY COLLECTION black-and-gold catalog experience."
        image="/pages/gallery-hero.png"
      />
      <GalleryClient items={items} />
    </>
  );
}
