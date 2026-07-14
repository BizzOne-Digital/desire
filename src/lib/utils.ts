import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatMoney(value: number, currency = "CAD") {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency
  }).format(value);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function absoluteUrl(path = "") {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getImageSet(seed: string, count = 5) {
  const images = [
    "/gallery/gallery-1.png",
    "/gallery/gallery-2.png",
    "/gallery/gallery-3.png",
    "/gallery/gallery-4.png",
    "/gallery/gallery-5.png",
    "/gallery/gallery-6.png",
    "/products/auric-veil-1.png",
    "/products/gilded-hour-1.png",
    "/products/noir-silk-1.png",
    "/categories/signature-fragrance.png"
  ];
  const start = seed.length % images.length;
  return Array.from({ length: count }, (_, index) => images[(start + index) % images.length]);
}
