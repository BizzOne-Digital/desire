import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/forms";
import { siteConfig } from "@/lib/content";

const links = [
  ["Shop", "/shop"],
  ["Services", "/services"],
  ["Pricing", "/pricing"],
  ["Gallery", "/gallery"],
  ["About", "/about"],
  ["Contact", "/contact"]
];

const support = [
  ["Privacy Policy", "/privacy-policy"],
  ["Terms and Conditions", "/terms-and-conditions"],
  ["Shipping and Returns", "/shipping-and-returns"],
  ["Cart", "/cart"],
  ["Checkout", "/checkout"]
];

export function SiteFooter({
  businessName = siteConfig.businessName,
  logoUrl = siteConfig.logoUrl
}: {
  businessName?: string;
  logoUrl?: string;
}) {
  return (
    <footer className="relative overflow-hidden border-t border-champagne/15 bg-black pt-20">
      <div className="gold-orb -left-32 top-10 opacity-55" />
      <div className="absolute inset-x-0 top-0 h-px bg-gold-gradient opacity-70" />
      <div className="luxury-container grid gap-12 pb-14 lg:grid-cols-[1.35fr_0.8fr_0.8fr_1.2fr]">
        <div className="relative z-10">
          <Image
            src={logoUrl}
            width={260}
            height={170}
            alt={`${businessName} logo`}
            className="h-32 w-auto object-contain drop-shadow-[0_0_38px_rgba(215,181,109,0.28)] md:h-40"
          />
          <p className="mt-5 max-w-sm text-sm leading-7 text-ivory/70">
            Thoughtfully selected products, premium presentation, and an elevated shopping
            experience designed to help every customer feel good.
          </p>
          <div className="mt-7 h-px w-28 bg-gold-gradient" />
        </div>

        <div className="relative z-10">
          <h2 className="text-xs font-bold uppercase tracking-[0.28em] text-champagne">Explore</h2>
          <div className="mt-5 grid gap-3">
            {links.map(([label, href]) => (
              <Link key={href} href={href} className="text-sm text-ivory/68 transition hover:text-champagne">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-xs font-bold uppercase tracking-[0.28em] text-champagne">Support</h2>
          <div className="mt-5 grid gap-3">
            {support.map(([label, href]) => (
              <Link key={href} href={href} className="text-sm text-ivory/68 transition hover:text-champagne">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-xs font-bold uppercase tracking-[0.28em] text-champagne">Stay Close</h2>
          <p className="mt-5 text-sm leading-7 text-ivory/70">
            Receive refined product updates, thoughtful gift ideas, and collection notes.
          </p>
          <div className="mt-5">
            <NewsletterForm compact />
          </div>
          <div className="mt-6 text-sm text-ivory/70">
            <p>{siteConfig.email}</p>
            <p>{siteConfig.phone}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6">
        <div className="luxury-container flex flex-col gap-3 text-xs text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} All rights reserved.</p>
          <p>Luxury commerce website built for Desire.</p>
        </div>
      </div>
    </footer>
  );
}
