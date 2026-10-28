import { getMongoDb } from "@/lib/mongodb";

export const UPLOAD_FOLDERS = ["products", "gallery", "pages", "misc"] as const;
export type { UploadFolder } from "@/lib/uploads-shared";
import type { UploadFolder } from "@/lib/uploads-shared";

export const ALLOWED_MIME_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif"
};

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
export const UPLOAD_URL_PREFIX = "/api/uploads/";
export const COLLECTION = "StoredUpload";

export function isUploadFolder(value: string): value is UploadFolder {
  return (UPLOAD_FOLDERS as readonly string[]).includes(value);
}

// Filenames we generate are `${Date.now()}-${hex}.${ext}`; anything else is rejected.
export function isSafeFilename(value: string) {
  return /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,120}$/.test(value) && !value.includes("..");
}

// Confirms the bytes really are the image type the client claimed.
export function matchesImageSignature(buffer: Buffer, mimeType: string) {
  switch (mimeType) {
    case "image/jpeg":
      return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
    case "image/png":
      return buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
    case "image/gif":
      return buffer.subarray(0, 4).toString("ascii") === "GIF8";
    case "image/webp":
      return buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP";
    default:
      return false;
  }
}

let indexReady: Promise<unknown> | undefined;

export async function getUploadCollection() {
  const db = await getMongoDb();
  const collection = db.collection(COLLECTION);
  indexReady ??= collection
    .createIndex({ folder: 1, filename: 1 }, { unique: true })
    .catch((error) => {
      indexReady = undefined;
      throw error;
    });
  await indexReady;
  return collection;
}

export function parseUploadUrl(url: unknown): { folder: UploadFolder; filename: string } | null {
  if (typeof url !== "string" || !url.startsWith(UPLOAD_URL_PREFIX)) return null;
  const [folder, filename, ...rest] = url.slice(UPLOAD_URL_PREFIX.length).split("?")[0].split("/");
  if (rest.length || !folder || !filename || !isUploadFolder(folder) || !isSafeFilename(filename)) return null;
  return { folder, filename };
}

/** Deletes the stored binary behind a `/api/uploads/...` URL. Other URLs are ignored. */
export async function deleteUploadByUrl(url: unknown) {
  const parsed = parseUploadUrl(url);
  if (!parsed) return false;
  const collection = await getUploadCollection();
  const result = await collection.deleteOne(parsed);
  return result.deletedCount > 0;
}

/** Collects every string in a JSON-like value that points at a stored upload. */
export function collectUploadUrls(value: unknown, found = new Set<string>()) {
  if (typeof value === "string") {
    if (parseUploadUrl(value)) found.add(value);
  } else if (Array.isArray(value)) {
    value.forEach((item) => collectUploadUrls(item, found));
  } else if (value && typeof value === "object") {
    Object.values(value).forEach((item) => collectUploadUrls(item, found));
  }
  return found;
}

/** Deletes uploads referenced by `before` that are no longer referenced by `after`. */
export async function deleteReplacedUploads(before: unknown, after: unknown) {
  const kept = collectUploadUrls(after);
  const removed = [...collectUploadUrls(before)].filter((url) => !kept.has(url));
  await Promise.all(removed.map((url) => deleteUploadByUrl(url).catch(() => false)));
}
