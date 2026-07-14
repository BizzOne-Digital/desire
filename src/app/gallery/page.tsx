import type { Metadata } from "next";
import { GalleryClient } from "@/components/gallery-client";
import { EditorialImageStrip, PageHero } from "@/components/sections";
import { getGalleryItems } from "@/lib/store";
import { getImageSet } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Premium gallery with category filters, editorial masonry layout, and lightbox-ready imagery."
};

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="A visual world of texture, light, and polish."
        text="Filter editorial moments, product styling, ritual imagery, and premium packaging visuals managed from admin."
        image="/pages/gallery-hero.png"
      />
      <GalleryClient items={items} />
      <EditorialImageStrip images={getImageSet("gallery")} title="Gallery Editorial Set" />
    </>
  );
}
