"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  ["Home", "/"],
  ["Shop Catalogs", "/shop"],
  ["How to Order", "/how-to-order"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export function SiteHeader({
  logoUrl,
  businessName,
}: {
  logoUrl: string;
  businessName: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-champagne/35 bg-black/96 shadow-[0_14px_45px_rgba(0,0,0,0.42)] backdrop-blur-xl">
      <div className="site-header-inner luxury-container flex h-[72px] items-center justify-between gap-3 sm:h-20 sm:gap-5 md:h-[100px] lg:gap-8">
        <Link
          href="/"
          className="flex min-w-0 items-center"
          aria-label={`${businessName} home`}
        >
          {showLogo && logoUrl ? (
            <Image
              src={logoUrl}
              width={150}
              height={104}
              alt={`${businessName} logo`}
              className="h-16 w-auto max-w-[138px] object-contain drop-shadow-[0_0_24px_rgba(215,181,109,0.28)] sm:h-20 sm:max-w-none md:h-[88px]"
              priority
              onError={() => setShowLogo(false)}
            />
          ) : (
            <span className="grid h-14 w-14 place-items-center rounded-full border border-champagne/50 gold-text font-serif text-4xl sm:h-14 sm:w-14 sm:text-4xl md:h-20 md:w-20 md:text-5xl">
              O
            </span>
          )}
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-9 lg:flex"
          aria-label="Main navigation"
        >
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "group relative inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-ivory/78 transition hover:text-champagne",
                pathname === href && "text-champagne",
              )}
            >
              {label}
              <span
                className={cn(
                  "absolute -bottom-4 left-0 h-[2px] bg-gold-gradient transition-all duration-300 group-hover:w-full",
                  pathname === href ? "w-full" : "w-0",
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-1 sm:min-w-[150px] sm:gap-4">
          <Link
            href="/contact"
            aria-label="Contact Sport Only"
            className="hidden rounded-full bg-gold-gradient px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-black transition hover:-translate-y-0.5 sm:inline-flex"
          >
            Contact
          </Link>
          <button
            type="button"
            className="rounded-full border border-champagne/15 bg-white/[0.03] p-2 text-ivory sm:border-0 sm:bg-transparent lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu size={23} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[120] bg-black/75 backdrop-blur-md lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.nav
              className="fixed right-0 top-0 z-[130] h-dvh w-[88vw] max-w-sm overflow-y-auto border-l border-champagne/20 bg-noir p-5 shadow-soft sm:p-7"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 230, damping: 28 }}
              aria-label="Mobile navigation"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-8 flex items-center justify-between sm:mb-10">
                {showLogo && logoUrl ? (
                  <Image
                    src={logoUrl}
                    width={128}
                    height={92}
                    alt={`${businessName} logo`}
                    className="h-16 w-auto object-contain sm:h-20"
                  />
                ) : (
                  <span className="grid h-16 w-16 place-items-center rounded-full border border-champagne/50 gold-text font-serif text-4xl">
                    O
                  </span>
                )}
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X />
                </button>
              </div>
              <div className="grid gap-4 sm:gap-5">
                {navItems.map(([label, href]) => (
                  <div
                    key={href}
                    className="border-b border-white/10 pb-3 sm:pb-4"
                  >
                    <Link
                      href={href}
                      className="font-serif text-2xl text-ivory transition hover:text-champagne sm:text-3xl"
                    >
                      {label}
                    </Link>
                  </div>
                ))}
                <Link
                  href="/contact"
                  className="rounded-full bg-gold-gradient px-6 py-3 text-center text-xs font-bold uppercase tracking-[0.22em] text-black"
                >
                  Contact
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
