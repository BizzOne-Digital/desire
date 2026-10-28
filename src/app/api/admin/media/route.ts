import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { hasDatabase } from "@/lib/db";
import { UPLOAD_URL_PREFIX, deleteUploadByUrl, getUploadCollection } from "@/lib/uploads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasDatabase) {
    return NextResponse.json({ items: [] });
  }

  const collection = await getUploadCollection();
  const rows = await collection
    .find({}, { projection: { data: 0 } })
    .sort({ createdAt: -1 })
    .limit(200)
    .toArray();

  return NextResponse.json({
    items: rows.map((row) => ({
      url: `${UPLOAD_URL_PREFIX}${row.folder}/${row.filename}`,
      folder: row.folder,
      filename: row.filename,
      size: row.size,
      createdAt: row.createdAt
    }))
  });
}

export async function DELETE(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url).searchParams.get("url");
  const deleted = await deleteUploadByUrl(url);
  if (!deleted) {
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
