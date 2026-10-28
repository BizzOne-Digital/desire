import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { siteConfig } from "@/lib/content";
import { hasDatabase } from "@/lib/db";
import { getMongoDb } from "@/lib/mongodb";
import { deleteReplacedUploads } from "@/lib/uploads";
import { siteSettingsSchema } from "@/lib/validators";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasDatabase) {
    return NextResponse.json({ settings: siteConfig });
  }

  const db = await getMongoDb();
  const settings = await db.collection("SiteSettings").findOne({ key: "site" });
  return NextResponse.json({ settings: { ...siteConfig, ...(settings?.value ?? {}) } });
}

export async function PUT(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasDatabase) {
    return NextResponse.json({ error: "Configure DATABASE_URL to persist settings." }, { status: 503 });
  }

  const parsed = siteSettingsSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the highlighted fields and try again." }, { status: 400 });
  }

  const db = await getMongoDb();
  const collection = db.collection("SiteSettings");
  const previous = await collection.findOne({ key: "site" });
  const value = { ...siteConfig, ...parsed.data, logoUrl: parsed.data.logoUrl || siteConfig.logoUrl };
  const now = new Date();

  await collection.updateOne(
    { key: "site" },
    { $set: { value, updatedAt: now }, $setOnInsert: { key: "site", createdAt: now } },
    { upsert: true }
  );
  await deleteReplacedUploads(previous?.value, value);

  revalidatePath("/", "layout");
  return NextResponse.json({ settings: value });
}
