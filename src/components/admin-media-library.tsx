"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { uploadImage } from "@/components/admin-image-field";
import SafeImage from "@/components/safe-image";
import type { UploadFolder } from "@/lib/uploads-shared";

type MediaItem = { url: string; folder: string; filename: string; size: number; createdAt: string };

const folders: UploadFolder[] = ["pages", "gallery", "products", "misc"];

export function AdminMediaLibrary({ databaseEnabled }: { databaseEnabled: boolean }) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [folder, setFolder] = useState<UploadFolder>("misc");
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    const response = await fetch("/api/admin/media");
    if (response.ok) setItems((await response.json()).items);
  }, []);

  useEffect(() => {
    if (databaseEnabled) void load();
  }, [databaseEnabled, load]);

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        await uploadImage(file, folder);
      }
      toast.success("Upload complete.");
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function remove(item: MediaItem) {
    if (!window.confirm("Delete this image? Pages that still use it will show a placeholder.")) return;
    const response = await fetch(`/api/admin/media?url=${encodeURIComponent(item.url)}`, { method: "DELETE" });
    if (!response.ok) {
      toast.error("Image could not be deleted.");
      return;
    }
    setItems((current) => current.filter((entry) => entry.url !== item.url));
    toast.success("Image deleted.");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <section className="grid h-fit gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.url} className="glass-panel overflow-hidden rounded-[1.5rem]">
            <div className="relative aspect-square">
              <SafeImage src={item.url} alt={item.filename} fill sizes="240px" className="object-cover" unoptimized />
            </div>
            <div className="grid gap-2 p-4 text-xs text-ivory/60">
              <p className="truncate">
                {item.folder} / {item.filename}
              </p>
              <p>{(item.size / 1024).toFixed(0)} KB</p>
              <div className="flex gap-3">
                <button
                  className="text-champagne"
                  onClick={() => {
                    void navigator.clipboard.writeText(item.url);
                    toast.success("Image path copied.");
                  }}
                >
                  Copy path
                </button>
                <button className="text-red-300" onClick={() => remove(item)}>
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-ivory/60">
            {databaseEnabled ? "No uploaded images yet." : "Connect MongoDB to upload and store images."}
          </p>
        )}
      </section>
      <section className="glass-panel grid h-fit gap-4 rounded-[1.8rem] p-6">
        <h2 className="font-serif text-4xl text-ivory">Upload Images</h2>
        <select
          value={folder}
          onChange={(event) => setFolder(event.target.value as UploadFolder)}
          className="rounded-2xl border border-champagne/15 bg-black/35 px-4 py-3 text-sm text-ivory"
        >
          {folders.map((item) => (
            <option key={item} value={item}>
              Folder: {item}
            </option>
          ))}
        </select>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/png,image/jpeg,image/webp,image/gif"
          disabled={!databaseEnabled || uploading}
          onChange={(event) => onFiles(event.target.files)}
          className="rounded-2xl border border-champagne/15 bg-black/35 px-4 py-3 text-sm"
        />
        <p className="text-xs leading-6 text-ivory/48">
          {uploading
            ? "Uploading..."
            : "JPG, PNG, WEBP or GIF, up to 8MB each. Images are stored in MongoDB, so they survive redeploys. Use the image fields in Content, Settings and Categories to place them on the site."}
        </p>
      </section>
    </div>
  );
}
