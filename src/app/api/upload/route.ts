import crypto from "crypto";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { hasDatabase } from "@/lib/db";
import {
  ALLOWED_MIME_TYPES,
  MAX_UPLOAD_BYTES,
  UPLOAD_URL_PREFIX,
  getUploadCollection,
  isUploadFolder,
  matchesImageSignature
} from "@/lib/uploads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!hasDatabase) {
    return NextResponse.json({ success: false, error: "Configure DATABASE_URL to upload images." }, { status: 503 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid upload request." }, { status: 400 });
  }

  const file = form.get("file");
  const folder = String(form.get("folder") ?? "misc");
  if (!isUploadFolder(folder)) {
    return NextResponse.json({ success: false, error: "Invalid upload folder." }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return NextResponse.json({ success: false, error: "No file uploaded." }, { status: 400 });
  }

  const ext = ALLOWED_MIME_TYPES[file.type];
  if (!ext) {
    return NextResponse.json({ success: false, error: "Upload a JPG, PNG, WEBP, or GIF image." }, { status: 400 });
  }
  if (file.size === 0 || file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ success: false, error: "Image must be under 8MB." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  if (!matchesImageSignature(buffer, file.type)) {
    return NextResponse.json({ success: false, error: "File content does not match its image type." }, { status: 400 });
  }

  const filename = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;
  const now = new Date();
  const collection = await getUploadCollection();
  await collection.insertOne({
    folder,
    filename,
    mimeType: file.type,
    size: buffer.length,
    data: buffer,
    createdAt: now,
    updatedAt: now
  });

  return NextResponse.json({
    success: true,
    url: `${UPLOAD_URL_PREFIX}${folder}/${filename}`,
    filename,
    size: buffer.length,
    folder
  });
}
