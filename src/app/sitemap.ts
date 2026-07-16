import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";

const staticRoutes = [
  "",
  "/shop",
  "/services",
  "/how-to-order",
  "/product-inquiry",
  "/gallery",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
  "/shipping-and-returns",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
  ];
}
