"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/cart-provider";
import { categories as shopCategories } from "@/lib/content";
import { cn } from "@/lib/utils";

const navItems = [
  ["Home", "/"],
  ["Shop", "/shop"],
  ["Services", "/services"],
  ["Pricing", "/pricing"],
  ["Gallery", "/gallery"],
  ["About", "/about"],
  ["Contact", "/contact"]
];

export function SiteHeader({ logoUrl, businessName }: { logoUrl: string; businessName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const { count } = useCart();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-champagne/45 bg-black shadow-[0_14px_45px_rgba(0,0,0,0.42)]">
      <div className="luxury-container flex h-[100px] items-center justify-between gap-8">
        <Link href="/" className="flex items-center" aria-label={`${businessName} home`}>
          {showLogo && logoUrl ? (
            <Image
              src={logoUrl}
              width={150}
              height={104}
              alt={`${businessName} logo`}
              className="h-[88px] w-auto object-contain drop-shadow-[0_0_24px_rgba(215,181,109,0.28)]"
              priority
              onError={() => setShowLogo(false)}
            />
          ) : (
            <span className="grid h-20 w-20 place-items-center rounded-full border border-champagne/50 gold-text font-serif text-5xl">
              O
            </span>
          )}
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-9 lg:flex" aria-label="Main navigation">
          {navItems.map(([label, href]) =>
            label === "Shop" ? (
              <div key={href} className="group relative py-9">
                <Link
                  href={href}
                  className={cn(
                    "relative inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-ivory/78 transition hover:text-champagne",
                    pathname === href && "text-champagne"
                  )}
                >
                  {label}
                  <ChevronDown size={12} className="transition duration-300 group-hover:rotate-180" />
                  <span className={cn("absolute -bottom-4 left-0 h-[2px] bg-gold-gradient transition-all duration-300 group-hover:w-full", pathname === href ? "w-full" : "w-0")} />
                </Link>
                <div className="pointer-events-none absolute left-1/2 top-full w-[430px] -translate-x-1/2 translate-y-4 opacity-0 transition duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="overflow-hidden rounded-b-[1.8rem] border border-champagne/20 bg-black/95 p-3 shadow-[0_28px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                    <div className="border-b border-champagne/15 px-4 py-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-champagne">
                        Shop Categories
                      </p>
                    </div>
                    <div className="grid gap-1 p-2">
                      {shopCategories.map((category) => (
                        <Link
                          key={category.slug}
                          href={`/shop?category=${category.slug}`}
                          className="group/item rounded-2xl border border-transparent px-4 py-3 transition hover:border-champagne/25 hover:bg-champagne/10"
                        >
                          <span className="flex items-center justify-between gap-4">
                            <span>
                              <span className="block font-serif text-xl text-ivory transition group-hover/item:text-champagne">
                                {category.name}
                              </span>
                              <span className="mt-1 block text-xs leading-5 text-ivory/55">
                                {category.description}
                              </span>
                            </span>
                            <ArrowRightIcon />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={href}
                href={href}
                className={cn(
                  "group relative inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-ivory/78 transition hover:text-champagne",
                  pathname === href && "text-champagne"
                )}
              >
                {label}
                <span className={cn("absolute -bottom-4 left-0 h-[2px] bg-gold-gradient transition-all duration-300 group-hover:w-full", pathname === href ? "w-full" : "w-0")} />
              </Link>
            )
          )}
        </nav>

        <div className="flex min-w-[150px] items-center justify-end gap-4">
          <Link href="/shop" aria-label="Search products" className="rounded-full p-2 text-ivory/80 transition hover:bg-white/10 hover:text-champagne">
            <Search size={19} />
          </Link>
          <Link href="/admin/login" aria-label="Admin account" className="hidden rounded-full p-2 text-ivory/80 transition hover:bg-white/10 hover:text-champagne sm:inline-flex">
            <UserRound size={19} />
          </Link>
          <Link href="/cart" aria-label="Cart" className="relative rounded-full p-2 text-ivory/80 transition hover:bg-white/10 hover:text-champagne">
            <ShoppingBag size={20} />
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-champagne px-1 text-[10px] font-bold text-black">
              {count}
            </span>
          </Link>
          <button
            className="rounded-full p-2 text-ivory lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.nav
              className="absolute right-0 top-0 h-full w-[86vw] max-w-sm border-l border-champagne/20 bg-noir p-7 shadow-soft"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 230, damping: 28 }}
              aria-label="Mobile navigation"
            >
              <div className="mb-10 flex items-center justify-between">
                {showLogo && logoUrl ? (
                  <Image
                    src={logoUrl}
                    width={128}
                    height={92}
                    alt={`${businessName} logo`}
                    className="h-20 w-auto object-contain"
                  />
                ) : (
                  <span className="grid h-16 w-16 place-items-center rounded-full border border-champagne/50 gold-text font-serif text-4xl">
                    O
                  </span>
                )}
                <button aria-label="Close menu" onClick={() => setOpen(false)}>
                  <X />
                </button>
              </div>
              <div className="grid gap-5">
                {navItems.map(([label, href]) => (
                  <div key={href} className="border-b border-white/10 pb-4">
                    <Link
                      href={href}
                      className="font-serif text-3xl text-ivory transition hover:text-champagne"
                    >
                      {label}
                    </Link>
                    {label === "Shop" && (
                      <div className="mt-4 grid gap-3 pl-3">
                        {shopCategories.map((category) => (
                          <Link
                            key={category.slug}
                            href={`/shop?category=${category.slug}`}
                            className="text-sm uppercase tracking-[0.2em] text-champagne/75"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ArrowRightIcon() {
  return (
    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-champagne/25 text-champagne transition group-hover/item:border-champagne group-hover/item:bg-champagne group-hover/item:text-black">
      →
    </span>
  );
}
