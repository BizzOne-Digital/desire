import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { siteConfig } from "@/lib/content";
import { hasDatabase, prisma } from "@/lib/db";
import { getMongoDb } from "@/lib/mongodb";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasDatabase) {
    return NextResponse.json({ settings: siteConfig });
  }

  const settings = await prisma.siteSettings.findUnique({ where: { key: "site" } });
  return NextResponse.json({ settings: settings?.value ?? siteConfig });
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasDatabase) {
    return NextResponse.json({ error: "Configure DATABASE_URL to persist settings." }, { status: 503 });
  }

  const body = await request.json();
  const db = await getMongoDb();
  await db.collection("SiteSettings").updateOne(
    { key: "site" },
    {
      $set: { value: body, updatedAt: new Date() },
      $setOnInsert: { key: "site", createdAt: new Date() }
    },
    { upsert: true }
  );
  return NextResponse.json({ settings: body });
}
