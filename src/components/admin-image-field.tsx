"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import SafeImage from "@/components/safe-image";
import type { UploadFolder } from "@/lib/uploads-shared";
import { cn } from "@/lib/utils";

const ACCEPT = "image/png,image/jpeg,image/webp,image/gif";
// Vercel rejects request bodies above ~4.5MB, so larger photos are resized in the browser first.
const CLIENT_LIMIT = 4 * 1024 * 1024;
const MAX_DIMENSION = 2400;

async function shrinkImage(file: File): Promise<File> {
  if (file.size <= CLIENT_LIMIT || file.type === "image/gif") return file;

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.85));
  if (!blob) return file;
  return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".webp", { type: "image/webp" });
}

export async function uploadImage(file: File, folder: UploadFolder): Promise<string> {
  const prepared = await shrinkImage(file);
  const form = new FormData();
  form.append("file", prepared);
  form.append("folder", folder);

  const response = await fetch("/api/upload", { method: "POST", body: form });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) {
    throw new Error(data.error || (response.status === 413 ? "Image is too large." : "Upload failed."));
  }
  return data.url as string;
}

export function AdminImageField({
  label,
  value,
  onChange,
  folder = "misc",
  className
}: {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  folder?: UploadFolder;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file?: File) {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
      toast.success("Image uploaded. Save to publish it.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      {label && <span className="text-xs uppercase tracking-[0.18em] text-champagne/80">{label}</span>}
      <div className="flex items-center gap-4 rounded-2xl border border-champagne/15 bg-black/35 p-3">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-champagne/15 bg-black">
          {value ? (
            <SafeImage src={value} alt={label ?? "Preview"} fill sizes="80px" className="object-cover" unoptimized />
          ) : (
            <span className="flex h-full items-center justify-center text-[10px] text-ivory/40">No image</span>
          )}
        </div>
        <div className="grid min-w-0 flex-1 gap-2">
          <p className="truncate text-xs text-ivory/50">{uploading ? "Uploading..." : value || "Nothing selected"}</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="rounded-full border border-champagne/40 px-4 py-1.5 text-xs font-semibold text-champagne transition hover:bg-champagne hover:text-black disabled:opacity-50"
            >
              {value ? "Replace" : "Upload"}
            </button>
            {value && (
              <button
                type="button"
                disabled={uploading}
                onClick={() => onChange("")}
                className="rounded-full border border-red-300/40 px-4 py-1.5 text-xs font-semibold text-red-300 transition hover:bg-red-300/10 disabled:opacity-50"
              >
                Remove
              </button>
            )}
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          className="hidden"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
      </div>
    </div>
  );
}
