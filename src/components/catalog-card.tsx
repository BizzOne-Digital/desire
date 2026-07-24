"use client";

import Image from "next/image";
import { ExternalLink, Lock, Copy, Check } from "lucide-react";
import { useState } from "react";
import type { Catalog } from "@/lib/catalogs";
import { cn } from "@/lib/utils";

export function CatalogCard({ catalog }: { catalog: Catalog }) {
  const [copied, setCopied] = useState(false);

  const handleCopyPassword = async () => {
    if (catalog.password) {
      await navigator.clipboard.writeText(catalog.password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenCatalog = () => {
    window.open(catalog.yupooUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <article className="luxury-frame group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-champagne/15 shadow-soft transition duration-500 hover:-translate-y-1 hover:border-champagne/30 hover:shadow-gold sm:rounded-[2rem]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={catalog.imageUrl}
          alt={catalog.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        {catalog.featured && (
          <div className="absolute right-3 top-3 rounded-full border border-champagne/30 bg-black/60 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-champagne backdrop-blur-sm sm:right-4 sm:top-4">
            Featured
          </div>
        )}
        {catalog.requiresPassword && (
          <div className="absolute left-3 top-3 rounded-full border border-ivory/30 bg-black/60 p-2 text-ivory backdrop-blur-sm sm:left-4 sm:top-4">
            <Lock size={14} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-2 flex flex-wrap gap-2">
          {catalog.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-champagne/20 bg-white/[0.03] px-2 py-0.5 text-[9px] uppercase tracking-[0.15em] text-ivory/60"
            >
              {tag}
            </span>
          ))}
        </div>

        <h2 className="font-serif text-2xl text-ivory sm:text-3xl">
          {catalog.name}
        </h2>

        <p className="mt-3 flex-1 text-sm leading-6 text-ivory/68">
          {catalog.description}
        </p>

        {catalog.requiresPassword && catalog.password && (
          <div className="mt-4 rounded-lg border border-champagne/20 bg-white/[0.03] p-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-champagne">
              Access Code
            </p>
            <div className="flex items-center justify-between gap-3">
              <code className="font-mono text-sm text-ivory">
                {catalog.password}
              </code>
              <button
                onClick={handleCopyPassword}
                className={cn(
                  "rounded-full p-2 transition",
                  copied
                    ? "bg-champagne/20 text-champagne"
                    : "bg-white/[0.05] text-ivory/70 hover:bg-white/[0.1] hover:text-champagne",
                )}
                aria-label="Copy password"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        )}

        <button
          onClick={handleOpenCatalog}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-black transition hover:-translate-y-0.5 hover:shadow-gold sm:text-[11px]"
        >
          Browse Catalog <ExternalLink size={14} />
        </button>
      </div>
    </article>
  );
}
