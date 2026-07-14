"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/lib/content";
import { formatMoney } from "@/lib/utils";
import { useCart } from "@/components/cart-provider";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const image = product.images[0];
  const hoverImage = product.images[1] ?? image;
  const displayPrice = product.salePrice ?? product.price;

  return (
    <motion.article
      className="group overflow-hidden rounded-[1.45rem] border border-champagne/13 bg-white/[0.035] sm:rounded-[1.8rem]"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35 }}
    >
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-charcoal">
        <Image
          src={image}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105 group-hover:opacity-0"
        />
        <Image
          src={hoverImage}
          alt={`${product.title} alternate view`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover opacity-0 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
        <div className="absolute left-3 top-3 flex gap-2 sm:left-4 sm:top-4">
          {product.salePrice && <Badge>Sale</Badge>}
          {product.isNew && <Badge>New</Badge>}
          {product.stock <= 0 && <Badge>Out</Badge>}
        </div>
        <button
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-ivory backdrop-blur transition hover:text-champagne sm:right-4 sm:top-4 sm:h-10 sm:w-10"
          type="button"
        >
          <Heart size={17} />
        </button>
      </Link>
      <div className="p-4 sm:p-5">
        <p className="text-[10px] uppercase tracking-[0.22em] text-champagne/80 sm:text-xs sm:tracking-[0.24em]">{product.category}</p>
        <Link href={`/products/${product.slug}`} className="mt-2 block font-serif text-xl text-ivory transition hover:text-champagne sm:text-2xl">
          {product.title}
        </Link>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-ivory/60 sm:mt-3 sm:text-sm sm:leading-6">{product.description}</p>
        <div className="mt-4 flex items-center justify-between gap-3 sm:mt-5">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-ivory">{formatMoney(displayPrice)}</span>
            {product.salePrice && (
              <span className="text-sm text-ivory/45 line-through">{formatMoney(product.price)}</span>
            )}
          </div>
          <button
            type="button"
            disabled={product.stock <= 0}
            onClick={() =>
              addItem({
                id: product.id,
                title: product.title,
                slug: product.slug,
                price: displayPrice,
                image,
                variant: product.variants[0]?.values[0]
              })
            }
            className="grid h-10 w-10 place-items-center rounded-full bg-champagne text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11"
            aria-label={`Add ${product.title} to cart`}
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-champagne/40 bg-black/55 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-champagne backdrop-blur sm:px-3 sm:text-[10px] sm:tracking-[0.22em]">
      {children}
    </span>
  );
}
