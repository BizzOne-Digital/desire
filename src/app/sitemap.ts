import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/store";
import { absoluteUrl } from "@/lib/utils";

const staticRoutes = [
  "",
  "/shop",
  "/services",
  "/pricing",
  "/gallery",
  "/about",
  "/contact",
  "/cart",
  "/checkout",
  "/privacy-policy",
  "/terms-and-conditions",
  "/shipping-and-returns"
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/products/${product.slug}`),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7
    }))
  ];
}
