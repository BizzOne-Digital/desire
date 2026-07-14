import {
  categories,
  galleryItems,
  pricingPlans,
  products,
  services,
  siteConfig,
  testimonials,
  type Category,
  type GalleryItem,
  type PricingPlan,
  type Product,
  type Service
} from "@/lib/content";
import { hasDatabase, prisma } from "@/lib/db";

type DbProductImage = {
  url: string;
};

type DbProductVariant = {
  name: string;
  value: string;
};

type DbProductRecord = {
  id: string;
  title: string;
  slug: string;
  category?: string | { name?: string | null } | null;
  description: string;
  price: unknown;
  salePrice?: unknown;
  sku?: string | null;
  stock: number;
  tags?: string[];
  featured: boolean;
  isNew?: boolean;
  bestSeller?: boolean;
  popularity?: number;
  images?: Array<string | DbProductImage>;
  variants?: DbProductVariant[];
  details?: unknown;
};

function serializeProduct(product: DbProductRecord): Product {
  const categoryName =
    typeof product.category === "string" ? product.category : product.category?.name ?? "Collection";

  return {
    id: product.id,
    title: product.title,
    slug: product.slug,
    category: categoryName,
    description: product.description,
    price: Number(product.price),
    salePrice: product.salePrice ? Number(product.salePrice) : undefined,
    sku: product.sku ?? "",
    stock: product.stock,
    tags: product.tags ?? [],
    featured: product.featured,
    isNew: product.isNew,
    bestSeller: product.bestSeller,
    popularity: product.popularity ?? 0,
    images: product.images?.length
      ? product.images.map((image) => (typeof image === "string" ? image : image.url))
      : [],
    variants: product.variants?.length
      ? product.variants.reduce<Product["variants"]>((acc, variant) => {
          const existing = acc.find((item) => item.name === variant.name);
          if (existing) {
            existing.values.push(variant.value);
          } else {
            acc.push({ name: variant.name, values: [variant.value], required: true });
          }
          return acc;
        }, [])
      : [],
    details: Array.isArray(product.details) ? product.details : []
  };
}

export async function getSiteSettings() {
  if (!hasDatabase) {
    return siteConfig;
  }

  try {
    const setting = await prisma.siteSettings.findUnique({ where: { key: "site" } });
    return setting?.value ? { ...siteConfig, ...(setting.value as object) } : siteConfig;
  } catch {
    return siteConfig;
  }
}

export async function getProducts() {
  if (!hasDatabase) {
    return products;
  }

  try {
    const rows = await prisma.product.findMany({
      where: { status: "ACTIVE" },
      include: {
        category: true,
        images: { orderBy: { sortOrder: "asc" } },
        variants: true
      },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }]
    });
    return rows.map(serializeProduct);
  } catch {
    return products;
  }
}

export async function getProduct(slug: string) {
  const allProducts = await getProducts();
  return allProducts.find((product) => product.slug === slug) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  if (!hasDatabase) {
    return categories;
  }

  try {
    const rows = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
    return rows.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description ?? "",
      imageUrl: category.imageUrl ?? categories[0].imageUrl
    }));
  } catch {
    return categories;
  }
}

export async function getServices(): Promise<Service[]> {
  if (!hasDatabase) {
    return services;
  }

  try {
    const rows = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
    return rows.map((service) => ({
      title: service.title,
      slug: service.slug,
      description: service.description,
      imageUrl: service.imageUrl ?? services[0].imageUrl,
      features: service.features
    }));
  } catch {
    return services;
  }
}

export async function getPricingPlans(): Promise<PricingPlan[]> {
  if (!hasDatabase) {
    return pricingPlans;
  }

  try {
    return await prisma.pricingPlan.findMany({ orderBy: { sortOrder: "asc" } });
  } catch {
    return pricingPlans;
  }
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (!hasDatabase) {
    return galleryItems;
  }

  try {
    const rows = await prisma.galleryItem.findMany({ orderBy: { sortOrder: "asc" } });
    return rows.map((item) => ({
      title: item.title,
      description: item.description ?? "",
      imageUrl: item.imageUrl,
      category: item.category
    }));
  } catch {
    return galleryItems;
  }
}

export async function getTestimonials() {
  if (!hasDatabase) {
    return testimonials;
  }

  try {
    return await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" }
    });
  } catch {
    return testimonials;
  }
}
