import { hasDatabase } from "@/lib/db";
import { getUploadCollection, isSafeFilename, isUploadFolder } from "@/lib/uploads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ folder: string; filename: string }> }
) {
  const { folder, filename } = await params;

  if (!isUploadFolder(folder) || !isSafeFilename(filename) || filename.includes("/") || filename.includes("\\")) {
    return new Response("Not found", { status: 404 });
  }
  if (!hasDatabase) {
    return new Response("Not found", { status: 404 });
  }

  const collection = await getUploadCollection();
  const doc = await collection.findOne({ folder, filename });
  const data = doc?.data;
  if (!doc || !data) {
    return new Response("Not found", { status: 404 });
  }

  // Mongo returns Buffers as BSON Binary; `.buffer` is the raw bytes.
  const bytes: Uint8Array = data.buffer ?? data;

  return new Response(new Uint8Array(bytes), {
    status: 200,
    headers: {
      "Content-Type": doc.mimeType,
      "Content-Length": String(bytes.byteLength),
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff"
    }
  });
}
