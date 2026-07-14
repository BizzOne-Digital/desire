import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import {
  categories,
  galleryItems,
  policyContent,
  pricingPlans,
  products,
  services,
  siteConfig,
  testimonials
} from "../src/lib/content";

const uri = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/only_collection";
const dbName = uri.split("/").pop()?.split("?")[0] || "only_collection";

async function main() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  const now = new Date();
  const passwordHash = await bcrypt.hash("ChangeMe123!", 12);

  await db.collection("AdminUser").updateOne(
    { email: "admin@onlycollection.local" },
    {
      $set: {
        passwordHash,
        updatedAt: now
      },
      $setOnInsert: {
        createdAt: now,
        name: "ONLY COLLECTION Admin",
        role: "OWNER",
        email: "admin@onlycollection.local"
      }
    },
    { upsert: true }
  );

  await db.collection("SiteSettings").updateOne(
    { key: "site" },
    {
      $set: { value: siteConfig, updatedAt: now },
      $setOnInsert: { createdAt: now, key: "site" }
    },
    { upsert: true }
  );

  await db.collection("PageContent").updateOne(
    { page: "home" },
    {
      $set: {
        title: "Designed to Make You Feel Extraordinary.",
        content: {
          heroText:
            "Discover a refined collection created for confidence, comfort, and timeless expression.",
          primaryCta: "Shop Collection",
          secondaryCta: "Explore Brand"
        },
        seoTitle: "ONLY COLLECTION | Luxury Online Boutique",
        seoDescription:
          "Shop a refined collection of fragrance, accessories, gifts, and elevated daily rituals.",
        updatedAt: now
      }
    },
    { upsert: true }
  );

  for (const [index, category] of categories.entries()) {
    await db.collection("Category").updateOne(
      { slug: category.slug },
      {
        $set: {
          name: category.name,
          slug: category.slug,
          description: category.description,
          imageUrl: category.imageUrl,
          sortOrder: index,
          updatedAt: now
        },
        $setOnInsert: { createdAt: now }
      },
      { upsert: true }
    );
  }

  for (const product of products) {
    const category = await db.collection("Category").findOne<{ _id: unknown }>({
      name: product.category
    });

    await db.collection("Product").updateOne(
      { slug: product.slug },
      {
        $set: {
          title: product.title,
          slug: product.slug,
          description: product.description,
          price: product.price,
          salePrice: product.salePrice,
          sku: product.sku,
          stock: product.stock,
          status: "ACTIVE",
          tags: product.tags,
          featured: product.featured,
          isNew: Boolean(product.isNew),
          bestSeller: Boolean(product.bestSeller),
          popularity: product.popularity,
          details: product.details,
          categoryId: category?._id,
          updatedAt: now
        },
        $setOnInsert: { createdAt: now }
      },
      { upsert: true }
    );

    const savedProduct = await db.collection("Product").findOne<{ _id: unknown }>({
      slug: product.slug
    });
    if (!savedProduct) continue;

    await db.collection("ProductImage").deleteMany({ productId: savedProduct._id });
    await db.collection("ProductVariant").deleteMany({ productId: savedProduct._id });
    await db.collection("ProductImage").insertMany(
      product.images.map((url, imageIndex) => ({
        productId: savedProduct._id,
        url,
        alt: `${product.title} image ${imageIndex + 1}`,
        sortOrder: imageIndex,
        createdAt: now
      }))
    );
    await db.collection("ProductVariant").insertMany(
      product.variants.flatMap((variant) =>
        variant.values.map((value) => ({
          productId: savedProduct._id,
          name: variant.name,
          value,
          stock: product.stock,
          sku: null
        }))
      )
    );
  }

  for (const [index, service] of services.entries()) {
    await db.collection("Service").updateOne(
      { slug: service.slug },
      {
        $set: { ...service, sortOrder: index, updatedAt: now },
        $setOnInsert: { createdAt: now }
      },
      { upsert: true }
    );
  }

  for (const [index, plan] of pricingPlans.entries()) {
    await db.collection("PricingPlan").updateOne(
      { name: plan.name },
      {
        $set: { ...plan, sortOrder: index, ctaLabel: "Inquire Now", updatedAt: now },
        $setOnInsert: { createdAt: now }
      },
      { upsert: true }
    );
  }

  for (const [index, item] of galleryItems.entries()) {
    await db.collection("GalleryItem").updateOne(
      { title: item.title },
      {
        $set: { ...item, alt: item.title, sortOrder: index, updatedAt: now },
        $setOnInsert: { createdAt: now }
      },
      { upsert: true }
    );
  }

  for (const [index, testimonial] of testimonials.entries()) {
    await db.collection("Testimonial").updateOne(
      { name: testimonial.name },
      {
        $set: { ...testimonial, isActive: true, sortOrder: index, updatedAt: now },
        $setOnInsert: { createdAt: now }
      },
      { upsert: true }
    );
  }

  await db.collection("DiscountCode").updateOne(
    { code: "WELCOME10" },
    {
      $set: {
        code: "WELCOME10",
        description: "Demo welcome discount",
        type: "PERCENT",
        value: 10,
        isActive: true,
        updatedAt: now
      },
      $setOnInsert: { createdAt: now }
    },
    { upsert: true }
  );

  for (const [page, content] of Object.entries(policyContent)) {
    await db.collection("PageContent").updateOne(
      { page },
      {
        $set: {
          page,
          title: page,
          content: { body: content },
          updatedAt: now
        }
      },
      { upsert: true }
    );
  }

  await client.close();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
