import { cache } from "react";
import type { Catalog } from "@/lib/catalogs";
import type { GalleryItem, Service } from "@/lib/content";
import { hasDatabase } from "@/lib/db";
import { getMongoDb } from "@/lib/mongodb";
import { contentDefaults, listDefaults, type ListKey } from "@/lib/site-content";

export const CONTENT_COLLECTION = "SiteContent";

type StoredContent = {
  fields: Record<string, string>;
  services?: Service[];
  gallery?: GalleryItem[];
  catalogs?: Catalog[];
};

/** Raw overrides saved from the admin portal. Never throws: the site falls back to built-in defaults. */
export const readStoredContent = cache(async (): Promise<StoredContent> => {
  if (!hasDatabase) return { fields: {} };

  try {
    const db = await getMongoDb();
    const docs = await db.collection(CONTENT_COLLECTION).find({}).toArray();
    const stored: StoredContent = { fields: {} };
    for (const doc of docs) {
      if (doc.key === "fields" && doc.value && typeof doc.value === "object") {
        stored.fields = doc.value as Record<string, string>;
      } else if (doc.key === "services" || doc.key === "gallery" || doc.key === "catalogs") {
        (stored as Record<string, unknown>)[doc.key] = doc.value;
      }
    }
    return stored;
  } catch {
    return { fields: {} };
  }
});

export async function getServicesList(): Promise<Service[]> {
  return (await readStoredContent()).services ?? listDefaults.services;
}

export async function getGalleryList(): Promise<GalleryItem[]> {
  return (await readStoredContent()).gallery ?? listDefaults.gallery;
}

export async function getCatalogList(): Promise<Catalog[]> {
  return (await readStoredContent()).catalogs ?? listDefaults.catalogs;
}

export async function getContent() {
  const stored = await readStoredContent();
  const fields = { ...contentDefaults, ...stored.fields };

  const get = (key: string) => {
    const value = stored.fields[key];
    return typeof value === "string" && value.trim() !== "" ? value : contentDefaults[key] ?? "";
  };

  return {
    fields,
    /** Text or image URL for a key, falling back to the built-in default when blank. */
    t: get,
    /** Multi-line text field as a list of non-empty lines. */
    lines: (key: string) =>
      get(key)
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    /** Five images for the shared inner-page strip, rotated per page like before. */
    strip: (seed: string, count = 5) => {
      const images = [1, 2, 3, 4, 5, 6].map((index) => get(`strip.${index}`));
      const start = seed.length % images.length;
      return Array.from({ length: count }, (_, index) => images[(start + index) % images.length]);
    },
    homeStrip: () => [1, 2, 3, 4, 5].map((index) => get(`home.strip.${index}`))
  };
}

export type SiteContent = Awaited<ReturnType<typeof getContent>>;

export async function readListForAdmin(key: ListKey) {
  const stored = await readStoredContent();
  return (stored[key] as unknown[] | undefined) ?? listDefaults[key];
}
