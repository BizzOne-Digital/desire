import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { categories } from "@/lib/content";
import { hasDatabase, prisma } from "@/lib/db";
import { getMongoDb, ObjectId } from "@/lib/mongodb";
import { categorySchema } from "@/lib/validators";

async function requireAdmin() {
  const session = await getAdminSession();
  return Boolean(session);
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasDatabase) {
    return NextResponse.json({ categories });
  }

  const rows = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ categories: rows });
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasDatabase) {
    return NextResponse.json(
      { error: "Configure DATABASE_URL to create categories." },
      { status: 503 },
    );
  }

  const parsed = categorySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid category data." }, { status: 400 });
  }

  const now = new Date();
  const db = await getMongoDb();
  const result = await db.collection("Category").insertOne({
    ...parsed.data,
    createdAt: now,
    updatedAt: now,
  });

  return NextResponse.json({
    category: { id: result.insertedId.toString(), ...parsed.data },
  });
}

export async function PUT(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasDatabase) {
    return NextResponse.json(
      { error: "Configure DATABASE_URL to update categories." },
      { status: 503 },
    );
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid category id." }, { status: 400 });
  }

  const parsed = categorySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid category data." }, { status: 400 });
  }

  const db = await getMongoDb();
  await db.collection("Category").updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...parsed.data, updatedAt: new Date() } },
  );

  return NextResponse.json({ category: { id, ...parsed.data } });
}

export async function DELETE(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasDatabase) {
    return NextResponse.json(
      { error: "Configure DATABASE_URL to delete categories." },
      { status: 503 },
    );
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid category id." }, { status: 400 });
  }

  const db = await getMongoDb();
  const categoryId = new ObjectId(id);
  await db.collection("Product").updateMany({ categoryId }, { $unset: { categoryId: "" } });
  await db.collection("Category").deleteOne({ _id: categoryId });

  return NextResponse.json({ ok: true });
}
