"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/lib/content";

export function ShopClient({
  products,
  categories,
  initialCategory = "all"
}: {
  products: Product[];
  categories: { name: string; slug: string }[];
  initialCategory?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [availability, setAvailability] = useState("all");
  const [tag, setTag] = useState("all");
  const [sort, setSort] = useState("featured");
  const [visible, setVisible] = useState(8);

  const tags = Array.from(new Set(products.flatMap((product) => product.tags))).sort();

  const filtered = useMemo(() => {
    const result = products
      .filter((product) => {
        const matchesQuery = `${product.title} ${product.description} ${product.category}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesCategory = category === "all" || product.category === category;
        const matchesAvailability =
          availability === "all" ||
          (availability === "in-stock" ? product.stock > 0 : product.stock <= 0);
        const matchesTag = tag === "all" || product.tags.includes(tag);
        return matchesQuery && matchesCategory && matchesAvailability && matchesTag;
      })
      .sort((a, b) => {
        if (sort === "price-low") return (a.salePrice ?? a.price) - (b.salePrice ?? b.price);
        if (sort === "price-high") return (b.salePrice ?? b.price) - (a.salePrice ?? a.price);
        if (sort === "newest") return Number(Boolean(b.isNew)) - Number(Boolean(a.isNew));
        if (sort === "popular") return b.popularity - a.popularity;
        return Number(b.featured) - Number(a.featured);
      });
    return result;
  }, [availability, category, products, query, sort, tag]);

  return (
    <div className="luxury-container py-16">
      <div className="glass-panel mb-8 grid gap-4 rounded-[1.8rem] p-5 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <label className="grid gap-2 text-sm text-ivory/68">
          Search
          <input
            className="rounded-2xl border border-champagne/15 bg-black/30 px-4 py-3 text-ivory"
            placeholder="Search products..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <Filter label="Category" value={category} onChange={setCategory}>
          <option value="all">All categories</option>
          {categories.map((item) => (
            <option key={item.slug} value={item.name}>
              {item.name}
            </option>
          ))}
        </Filter>
        <Filter label="Availability" value={availability} onChange={setAvailability}>
          <option value="all">All availability</option>
          <option value="in-stock">In stock</option>
          <option value="out-of-stock">Out of stock</option>
        </Filter>
        <Filter label="Tags" value={tag} onChange={setTag}>
          <option value="all">All tags</option>
          {tags.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Filter>
        <Filter label="Sort" value={sort} onChange={setSort}>
          <option value="featured">Featured</option>
          <option value="popular">Popularity</option>
          <option value="newest">Newest</option>
          <option value="price-low">Price low to high</option>
          <option value="price-high">Price high to low</option>
        </Filter>
      </div>

      <div className="mb-7 flex items-center justify-between gap-4 text-sm text-ivory/65">
        <p>{filtered.length} products found</p>
        <p className="inline-flex items-center gap-2 md:hidden">
          <SlidersHorizontal size={16} /> Filters above
        </p>
      </div>

      {filtered.length ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.slice(0, visible).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {visible < filtered.length && (
            <div className="mt-10 text-center">
              <button
                className="rounded-full border border-champagne/40 px-8 py-3 text-sm font-bold uppercase tracking-[0.22em] text-ivory transition hover:bg-champagne/10"
                onClick={() => setVisible((current) => current + 4)}
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="glass-panel rounded-[2rem] p-12 text-center">
          <h2 className="font-serif text-4xl text-ivory">No products found.</h2>
          <p className="mt-3 text-ivory/65">Try another search, category, or availability filter.</p>
        </div>
      )}
    </div>
  );
}

function Filter({
  label,
  value,
  onChange,
  children
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm text-ivory/68">
      {label}
      <select
        className="rounded-2xl border border-champagne/15 bg-black/30 px-4 py-3 text-ivory"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {children}
      </select>
    </label>
  );
}
