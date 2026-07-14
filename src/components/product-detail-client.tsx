"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, Share2, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/content";
import { ProductCard } from "@/components/product-card";
import { useCart } from "@/components/cart-provider";
import { formatMoney } from "@/lib/utils";

export function ProductDetailClient({
  product,
  related
}: {
  product: Product;
  related: Product[];
}) {
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [recent, setRecent] = useState<Product[]>([]);
  const { addItem } = useCart();
  const displayPrice = product.salePrice ?? product.price;

  const requiredSelected = useMemo(
    () => product.variants.every((variant) => !variant.required || selections[variant.name]),
    [product.variants, selections]
  );

  useEffect(() => {
    const key = "only_recent_products";
    const stored = JSON.parse(window.localStorage.getItem(key) || "[]") as Product[];
    setRecent(stored.filter((item) => item.slug !== product.slug).slice(0, 4));
    window.localStorage.setItem(
      key,
      JSON.stringify([product, ...stored.filter((item) => item.slug !== product.slug)].slice(0, 5))
    );
  }, [product]);

  const variantSummary = Object.entries(selections)
    .map(([name, value]) => `${name}: ${value}`)
    .join(" / ");

  return (
    <div className="luxury-container py-32">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4 lg:grid-cols-[110px_1fr]">
          <div className="order-2 flex gap-3 overflow-auto lg:order-1 lg:grid lg:content-start">
            {product.images.map((image) => (
              <button
                key={image}
                className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-champagne/20"
                onClick={() => setActiveImage(image)}
                aria-label="Select product image"
              >
                <Image src={image} alt={product.title} fill className="object-cover" />
              </button>
            ))}
          </div>
          <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-[2.4rem] border border-champagne/18 bg-charcoal lg:order-2">
            <Image src={activeImage} alt={product.title} fill priority className="object-cover transition duration-700 hover:scale-110" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/35 to-transparent" />
          </div>
        </div>

        <section>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-champagne">{product.category}</p>
          <h1 className="mt-4 font-serif text-5xl leading-tight text-ivory md:text-7xl">{product.title}</h1>
          <div className="mt-5 flex items-center gap-3">
            <span className="text-2xl font-semibold text-ivory">{formatMoney(displayPrice)}</span>
            {product.salePrice && <span className="text-ivory/40 line-through">{formatMoney(product.price)}</span>}
          </div>
          <p className="mt-6 text-lg leading-8 text-ivory/70">{product.description}</p>
          <p className="mt-4 text-sm text-ivory/55">SKU: {product.sku} · {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</p>

          <div className="mt-8 grid gap-6">
            {product.variants.map((variant) => (
              <div key={variant.name}>
                <p className="mb-3 text-sm font-semibold text-ivory">{variant.name}</p>
                <div className="flex flex-wrap gap-3">
                  {variant.values.map((value) => (
                    <button
                      key={value}
                      onClick={() => setSelections((current) => ({ ...current, [variant.name]: value }))}
                      className={`rounded-full border px-5 py-2 text-sm transition ${
                        selections[variant.name] === value
                          ? "border-champagne bg-champagne text-black"
                          : "border-champagne/25 text-ivory hover:border-champagne"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border border-champagne/20">
              <button className="p-3" onClick={() => setQuantity((current) => Math.max(1, current - 1))} aria-label="Decrease quantity">
                <Minus size={16} />
              </button>
              <span className="min-w-10 text-center">{quantity}</span>
              <button className="p-3" onClick={() => setQuantity((current) => current + 1)} aria-label="Increase quantity">
                <Plus size={16} />
              </button>
            </div>
            <button
              disabled={!requiredSelected || product.stock <= 0}
              onClick={() =>
                addItem(
                  {
                    id: product.id,
                    title: product.title,
                    slug: product.slug,
                    price: displayPrice,
                    image: product.images[0],
                    variant: variantSummary
                  },
                  quantity
                )
              }
              className="inline-flex items-center gap-3 rounded-full bg-gold-gradient px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-black disabled:cursor-not-allowed disabled:opacity-45"
            >
              <ShoppingBag size={17} /> Add to Cart
            </button>
            <Link href="/checkout" className="rounded-full border border-champagne/35 px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-ivory hover:bg-champagne/10">
              Buy Now
            </Link>
          </div>
          {!requiredSelected && <p className="mt-3 text-sm text-red-300">Please select the required options before adding to cart.</p>}

          <div className="mt-10 divide-y divide-white/10 rounded-[1.5rem] border border-champagne/15">
            {product.details.map((detail) => (
              <details key={detail.title} className="group p-5" open={detail.title === "Scent Notes" || detail.title === "Material"}>
                <summary className="cursor-pointer list-none font-serif text-2xl text-ivory">
                  {detail.title}
                </summary>
                <p className="mt-3 text-sm leading-7 text-ivory/65">{detail.body}</p>
              </details>
            ))}
            <details className="p-5">
              <summary className="cursor-pointer list-none font-serif text-2xl text-ivory">Reviews</summary>
              <p className="mt-3 text-sm leading-7 text-ivory/65">Product reviews are ready to connect to a review provider or custom database model.</p>
            </details>
          </div>

          <button
            className="mt-7 inline-flex items-center gap-2 text-sm text-champagne"
            onClick={() => navigator.share?.({ title: product.title, url: window.location.href })}
          >
            <Share2 size={16} /> Share product
          </button>
        </section>
      </div>

      <section className="mt-24">
        <h2 className="mb-8 font-serif text-5xl text-ivory">Related Products</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.slice(0, 4).map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      {recent.length > 0 && (
        <section className="mt-24">
          <h2 className="mb-8 font-serif text-5xl text-ivory">Recently Viewed</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recent.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
