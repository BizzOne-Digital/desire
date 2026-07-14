"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { itemKey, useCart } from "@/components/cart-provider";
import { formatMoney } from "@/lib/utils";

export function CartPageClient() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 14;
  const total = subtotal + shipping;

  return (
      <section className="luxury-container grid gap-8 py-20 lg:grid-cols-[1fr_380px]">
        <div className="grid gap-4">
          {items.length ? (
            items.map((item) => (
              <article key={itemKey(item)} className="glass-panel grid gap-5 rounded-[1.6rem] p-5 sm:grid-cols-[120px_1fr_auto]">
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div>
                  <Link href={`/products/${item.slug}`} className="font-serif text-3xl text-ivory hover:text-champagne">
                    {item.title}
                  </Link>
                  {item.variant && <p className="mt-2 text-sm text-ivory/55">{item.variant}</p>}
                  <p className="mt-3 text-champagne">{formatMoney(item.price)}</p>
                </div>
                <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                  <div className="flex items-center rounded-full border border-champagne/20">
                    <button className="p-3" onClick={() => updateQuantity(itemKey(item), item.quantity - 1)} aria-label="Decrease quantity">
                      <Minus size={15} />
                    </button>
                    <span className="min-w-8 text-center">{item.quantity}</span>
                    <button className="p-3" onClick={() => updateQuantity(itemKey(item), item.quantity + 1)} aria-label="Increase quantity">
                      <Plus size={15} />
                    </button>
                  </div>
                  <button className="text-ivory/55 hover:text-red-300" onClick={() => removeItem(itemKey(item))} aria-label="Remove item">
                    <Trash2 size={18} />
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="glass-panel rounded-[2rem] p-12 text-center">
              <h2 className="font-serif text-5xl text-ivory">Your cart is empty.</h2>
              <p className="mt-4 text-ivory/65">Start with the shop and build a selection that feels right.</p>
              <Link href="/shop" className="mt-8 inline-flex rounded-full bg-gold-gradient px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-black">
                Shop Collection
              </Link>
            </div>
          )}
        </div>
        <aside className="glass-panel h-fit rounded-[1.8rem] p-6">
          <h2 className="font-serif text-4xl text-ivory">Order Summary</h2>
          <div className="mt-6 grid gap-3 text-sm text-ivory/70">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatMoney(subtotal)}</span></div>
            <div className="flex justify-between"><span>Estimated shipping</span><span>{shipping ? formatMoney(shipping) : "Free"}</span></div>
            <label className="mt-3 grid gap-2">
              Discount code
              <input className="rounded-2xl border border-champagne/15 bg-black/35 px-4 py-3" placeholder="WELCOME10" />
            </label>
            <div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-base font-semibold text-ivory">
              <span>Total</span><span>{formatMoney(total)}</span>
            </div>
          </div>
          <Link href="/checkout" className="mt-7 inline-flex w-full justify-center rounded-full bg-gold-gradient px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-black">
            Checkout
          </Link>
        </aside>
      </section>
  );
}
