"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, MessageSquare } from "lucide-react";
import { useState } from "react";
import { AccessCode } from "@/components/access-code";
import { Catalog, isSafeCatalogUrl } from "@/lib/catalogs";

export function CatalogCard({ catalog }: { catalog: Catalog }) {
  const [imageFailed, setImageFailed] = useState(false);
  const safeUrl = isSafeCatalogUrl(catalog.url);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-champagne/15 bg-white/[0.035] shadow-soft transition duration-300 hover:-translate-y-1 hover:border-champagne/35 hover:shadow-gold">
      <div className="relative aspect-[16/11] overflow-hidden bg-charcoal">
        {!imageFailed && catalog.image ? (
          <Image
            src={catalog.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover opacity-80 transition duration-700 group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(215,181,109,0.24),transparent_16rem),linear-gradient(135deg,#050505,#141414)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-champagne/35 bg-black/55 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-champagne backdrop-blur">
            {catalog.category}
          </span>
          {catalog.requiresPassword && (
            <span className="rounded-full bg-champagne px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-black">
              Password Required
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h2 className="font-serif text-3xl text-ivory">{catalog.name}</h2>
        <p className="mt-3 flex-1 text-sm leading-7 text-ivory/65">
          {catalog.description}
        </p>

        {catalog.accessCode && (
          <div className="mt-5">
            <AccessCode code={catalog.accessCode} catalogName={catalog.name} />
          </div>
        )}

        <div className="mt-6 grid gap-3">
          {safeUrl ? (
            <a
              href={catalog.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-gold-gradient px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-black transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
              aria-label={`Open ${catalog.name} external catalog in a new tab`}
            >
              View Catalog <ExternalLink size={15} />
            </a>
          ) : (
            <p className="rounded-2xl border border-red-300/30 bg-red-950/20 p-3 text-sm text-red-200">
              Catalog link is unavailable.
            </p>
          )}
          <Link
            href={`/product-inquiry?catalog=${catalog.id}`}
            className="inline-flex items-center justify-center gap-3 rounded-full border border-champagne/35 px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-ivory transition hover:bg-champagne/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
          >
            Start an Inquiry <MessageSquare size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
