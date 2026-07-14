"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { GalleryGrid, SectionHeading } from "@/components/sections";
import { GalleryItem } from "@/lib/content";

export function GalleryClient({ items }: { items: GalleryItem[] }) {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<GalleryItem | null>(null);
  const categories = ["All", ...Array.from(new Set(items.map((item) => item.category)))];
  const filtered = useMemo(
    () => (category === "All" ? items : items.filter((item) => item.category === category)),
    [category, items]
  );

  return (
    <section className="luxury-container py-20">
      <SectionHeading eyebrow="Portfolio" title="Filter the mood." centered />
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`rounded-full border px-5 py-2 text-sm transition ${
              category === item
                ? "border-champagne bg-champagne text-black"
                : "border-champagne/25 text-ivory hover:border-champagne"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <button className="contents" onClick={() => undefined} aria-label="Gallery grid">
        <div onClick={(event) => {
          const card = (event.target as HTMLElement).closest("[data-gallery-index]");
          if (!card) return;
          const index = Number(card.getAttribute("data-gallery-index"));
          setActive(filtered[index]);
        }}>
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {filtered.map((item, index) => (
              <article
                key={item.title}
                data-gallery-index={index}
                className="mb-5 break-inside-avoid cursor-zoom-in overflow-hidden rounded-[1.7rem] border border-champagne/14 bg-white/[0.035]"
              >
                <div className="relative aspect-[4/5]">
                  <Image src={item.imageUrl} alt={item.title} fill className="object-cover transition duration-700 hover:scale-105" />
                </div>
                <div className="p-5 text-left">
                  <p className="text-xs uppercase tracking-[0.22em] text-champagne">{item.category}</p>
                  <h2 className="mt-2 font-serif text-2xl text-ivory">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-ivory/62">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </button>
      <noscript>
        <GalleryGrid items={filtered} />
      </noscript>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-black/85 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <button className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-ivory" aria-label="Close lightbox">
              <X />
            </button>
            <motion.div
              className="relative aspect-[4/5] w-full max-w-3xl overflow-hidden rounded-[2rem]"
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
            >
              <Image src={active.imageUrl} alt={active.title} fill className="object-cover" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
