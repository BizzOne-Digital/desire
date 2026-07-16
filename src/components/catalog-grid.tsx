"use client";

import { useMemo, useState } from "react";
import { CatalogCard } from "@/components/catalog-card";
import {
  Catalog,
  CatalogCategory,
  catalogFilters,
  catalogs,
} from "@/lib/catalogs";

export function CatalogGrid({ items = catalogs }: { items?: Catalog[] }) {
  const [filter, setFilter] = useState<(typeof catalogFilters)[number]>("All");

  const filtered = useMemo(
    () =>
      filter === "All"
        ? items
        : items.filter((catalog) => catalog.category === filter),
    [filter, items],
  );

  return (
    <section className="luxury-container py-16">
      <div className="mb-8 flex flex-wrap gap-3">
        {catalogFilters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-full border px-5 py-2 text-xs font-bold uppercase tracking-[0.22em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne ${
              filter === item
                ? "border-champagne bg-champagne text-black"
                : "border-champagne/25 text-ivory hover:border-champagne hover:bg-champagne/10"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mb-7 flex flex-col gap-2 text-sm text-ivory/62 sm:flex-row sm:items-center sm:justify-between">
        <p>{filtered.length} catalogs shown</p>
        <p>
          Open catalogs in a new tab, then return here to submit an inquiry.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((catalog) => (
          <CatalogCard key={catalog.id} catalog={catalog} />
        ))}
      </div>
    </section>
  );
}

export type CatalogFilter = "All" | CatalogCategory;
