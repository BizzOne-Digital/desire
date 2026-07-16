import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional().or(z.literal("")),
  subject: z.string().min(2).max(160),
  message: z.string().min(10).max(2000),
});

export const newsletterSchema = z.object({
  name: z.string().max(120).optional().or(z.literal("")),
  email: z.string().email(),
});

export const productInquirySchema = z.object({
  fullName: z.string().min(2, "Full name is required.").max(120),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().min(5, "Phone or WhatsApp number is required.").max(60),
  catalogId: z.string().min(1, "Select a catalog or category."),
  productLink: z
    .string()
    .url("Enter a valid HTTPS product link.")
    .refine((value) => {
      try {
        return new URL(value).protocol === "https:";
      } catch {
        return false;
      }
    }, "Product link must start with https://"),
  productCode: z.string().max(180).optional().or(z.literal("")),
  requestedSize: z.string().max(80).optional().or(z.literal("")),
  requestedColor: z.string().max(80).optional().or(z.literal("")),
  quantity: z.coerce
    .number()
    .int()
    .min(1, "Quantity must be at least 1.")
    .max(100),
  deliveryCountry: z.string().min(2, "Delivery country is required.").max(120),
  notes: z.string().max(1200).optional().or(z.literal("")),
  consent: z.boolean().refine(Boolean, {
    message:
      "Please acknowledge that price and availability require confirmation.",
  }),
  company: z.string().max(0).optional().or(z.literal("")),
});

export const checkoutSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().or(z.literal("")),
  line1: z.string().min(3),
  line2: z.string().optional().or(z.literal("")),
  city: z.string().min(2),
  region: z.string().min(2),
  postal: z.string().min(3),
  country: z.string().min(2),
  notes: z.string().max(1000).optional().or(z.literal("")),
  items: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        slug: z.string(),
        image: z.string().optional(),
        price: z.number().positive(),
        quantity: z.number().int().positive(),
        variant: z.string().optional(),
      }),
    )
    .min(1),
});

export const productSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  categoryId: z.string().optional().or(z.literal("")),
  description: z.string().min(10),
  price: z.coerce.number().positive(),
  salePrice: z.coerce.number().positive().optional().or(z.literal("")),
  sku: z.string().optional().or(z.literal("")),
  stock: z.coerce.number().int().min(0),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).default("ACTIVE"),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  isNew: z.boolean().default(false),
  bestSeller: z.boolean().default(false),
  seoTitle: z.string().optional().or(z.literal("")),
  seoDescription: z.string().optional().or(z.literal("")),
  images: z
    .array(z.object({ url: z.string().min(1), alt: z.string().min(2) }))
    .default([]),
});

export const categorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(5),
  imageUrl: z.string().min(1),
  sortOrder: z.coerce.number().int().min(0).default(0),
});

export const catalogSchema = z.object({
  name: z.string().min(2),
  key: z.string().min(2),
  description: z.string().min(5),
  url: z
    .string()
    .url()
    .refine(
      (value) => new URL(value).protocol === "https:",
      "Catalog link must start with https://",
    ),
  category: z.enum(["Shoes", "Bags", "Clothing", "Accessories"]),
  image: z.string().optional().or(z.literal("")),
  accessCode: z.string().optional().or(z.literal("")),
  requiresPassword: z.boolean().default(false),
  featured: z.boolean().default(false),
  sortOrder: z.coerce.number().int().min(0).default(0),
});
