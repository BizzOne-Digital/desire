import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { hasDatabase, prisma } from "@/lib/db";
import { getMongoDb, ObjectId } from "@/lib/mongodb";
import { products } from "@/lib/content";
import { productSchema } from "@/lib/validators";

async function requireAdmin() {
  const session = await getAdminSession();
  return Boolean(session);
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasDatabase) {
    return NextResponse.json({ products });
  }

  const rows = await prisma.product.findMany({
    include: { category: true, images: true, variants: true },
    orderBy: { updatedAt: "desc" }
  });
  return NextResponse.json({ products: rows });
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasDatabase) {
    return NextResponse.json({ error: "Configure DATABASE_URL to create products." }, { status: 503 });
  }

  const parsed = productSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid product data." }, { status: 400 });
  }

  const { images, salePrice, categoryId, ...data } = parsed.data;
  const db = await getMongoDb();
  const now = new Date();
  const product = await db.collection("Product").insertOne({
      ...data,
      salePrice: salePrice || undefined,
      categoryId: categoryId && ObjectId.isValid(categoryId) ? new ObjectId(categoryId) : undefined,
      createdAt: now,
      updatedAt: now
  });
  if (images.length) {
    await db.collection("ProductImage").insertMany(
      images.map((image, index) => ({
        productId: product.insertedId,
        ...image,
        sortOrder: index,
        createdAt: now
      }))
    );
  }

  return NextResponse.json({ product: { id: product.insertedId.toString(), ...data } });
}

export async function PUT(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasDatabase) {
    return NextResponse.json({ error: "Configure DATABASE_URL to update products." }, { status: 503 });
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing product id." }, { status: 400 });
  }

  const parsed = productSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid product data." }, { status: 400 });
  }

  const { images, salePrice, categoryId, ...data } = parsed.data;
  const db = await getMongoDb();
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid product id." }, { status: 400 });
  }
  const productId = new ObjectId(id);
  await db.collection("Product").updateOne(
    { _id: productId },
    {
      $set: {
      ...data,
        salePrice: salePrice || undefined,
        categoryId: categoryId && ObjectId.isValid(categoryId) ? new ObjectId(categoryId) : undefined,
        updatedAt: new Date()
      }
    }
  );
  await db.collection("ProductImage").deleteMany({ productId });
  if (images.length) {
    await db.collection("ProductImage").insertMany(
      images.map((image, index) => ({
        productId,
        ...image,
        sortOrder: index,
        createdAt: new Date()
      }))
    );
  }

  return NextResponse.json({ product: { id, ...data } });
}

export async function DELETE(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasDatabase) {
    return NextResponse.json({ error: "Configure DATABASE_URL to delete products." }, { status: 503 });
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing product id." }, { status: 400 });
  }

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid product id." }, { status: 400 });
  }
  const db = await getMongoDb();
  const productId = new ObjectId(id);
  await db.collection("ProductImage").deleteMany({ productId });
  await db.collection("ProductVariant").deleteMany({ productId });
  await db.collection("Product").deleteOne({ _id: productId });
  return NextResponse.json({ ok: true });
}
