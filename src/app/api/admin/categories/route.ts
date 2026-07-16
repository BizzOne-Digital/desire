import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { catalogs } from "@/lib/catalogs";
import { getCatalogs } from "@/lib/catalog-store";
import { hasDatabase } from "@/lib/db";
import { getMongoDb, ObjectId } from "@/lib/mongodb";
import { catalogSchema } from "@/lib/validators";

async function requireAdmin() {
  const session = await getAdminSession();
  return Boolean(session);
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ catalogs: await getCatalogs() });
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasDatabase) {
    return NextResponse.json(
      { error: "Configure DATABASE_URL to create catalog categories." },
      { status: 503 },
    );
  }

  const parsed = catalogSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid catalog data." },
      { status: 400 },
    );
  }

  const now = new Date();
  const db = await getMongoDb();
  const result = await db.collection("Catalog").insertOne({
    ...parsed.data,
    createdAt: now,
    updatedAt: now,
  });

  return NextResponse.json({
    catalog: { id: result.insertedId.toString(), ...parsed.data },
  });
}

export async function PUT(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasDatabase) {
    return NextResponse.json(
      { error: "Configure DATABASE_URL to update catalog categories." },
      { status: 503 },
    );
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Invalid catalog id." }, { status: 400 });
  }

  const parsed = catalogSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid catalog data." },
      { status: 400 },
    );
  }

  const db = await getMongoDb();
  if (ObjectId.isValid(id)) {
    await db
      .collection("Catalog")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...parsed.data, disabled: false, updatedAt: new Date() } },
      );
  } else {
    await db.collection("Catalog").updateOne(
      { key: id },
      {
        $set: {
          ...parsed.data,
          key: id,
          disabled: false,
          updatedAt: new Date(),
        },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true },
    );
  }

  return NextResponse.json({ catalog: { id, ...parsed.data } });
}

export async function DELETE(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasDatabase) {
    return NextResponse.json(
      { error: "Configure DATABASE_URL to delete catalog categories." },
      { status: 503 },
    );
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Invalid catalog id." }, { status: 400 });
  }

  const db = await getMongoDb();
  if (ObjectId.isValid(id)) {
    await db.collection("Catalog").deleteOne({ _id: new ObjectId(id) });
  } else if (catalogs.some((catalog) => catalog.id === id)) {
    await db.collection("Catalog").updateOne(
      { key: id },
      {
        $set: { key: id, disabled: true, updatedAt: new Date() },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true },
    );
  } else {
    await db.collection("Catalog").deleteOne({ key: id });
  }

  return NextResponse.json({ ok: true });
}
