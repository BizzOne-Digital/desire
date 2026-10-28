import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { CONTENT_COLLECTION, readStoredContent } from "@/lib/content-store";
import { hasDatabase } from "@/lib/db";
import { getMongoDb } from "@/lib/mongodb";
import { contentDefaults } from "@/lib/site-content";
import { deleteReplacedUploads } from "@/lib/uploads";
import { catalogsListSchema, contentFieldsSchema, galleryListSchema, servicesListSchema } from "@/lib/validators";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schemas = {
  fields: contentFieldsSchema,
  services: servicesListSchema,
  gallery: galleryListSchema,
  catalogs: catalogsListSchema
} as const;

type ContentKey = keyof typeof schemas;

export async function GET() {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await readStoredContent());
}

export async function PUT(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasDatabase) {
    return NextResponse.json({ error: "Configure DATABASE_URL to save content." }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const key = body?.key as ContentKey | undefined;
  if (!key || !(key in schemas)) {
    return NextResponse.json({ error: "Unknown content key." }, { status: 400 });
  }

  const parsed = schemas[key].safeParse(body.value);
  if (!parsed.success) {
    return NextResponse.json({ error: "Some values are invalid. Check the highlighted fields." }, { status: 400 });
  }

  let value: unknown = parsed.data;
  if (key === "fields") {
    // Only store known keys that differ from the default; blank means "use default".
    value = Object.fromEntries(
      Object.entries(parsed.data as Record<string, string>).filter(
        ([field, text]) => field in contentDefaults && text.trim() !== "" && text !== contentDefaults[field]
      )
    );
  }

  const db = await getMongoDb();
  const collection = db.collection(CONTENT_COLLECTION);
  const previous = await collection.findOne({ key });
  const now = new Date();
  await collection.updateOne(
    { key },
    { $set: { value, updatedAt: now }, $setOnInsert: { key, createdAt: now } },
    { upsert: true }
  );

  // Free the Mongo binaries for images that were replaced or removed.
  await deleteReplacedUploads(previous?.value, value);

  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, value });
}
