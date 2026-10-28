import Image from "@/components/safe-image";
import Link from "next/link";
import { NewsletterForm } from "@/components/forms";
import { siteConfig } from "@/lib/content";

const links = [
  ["Shop Catalogs", "/shop"],
  ["How to Order", "/how-to-order"],
  ["Product Inquiry", "/product-inquiry"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

const support = [
  ["Privacy Policy", "/privacy-policy"],
  ["Terms and Conditions", "/terms-and-conditions"],
  ["Shipping and Returns", "/shipping-and-returns"],
];

export type FooterContent = {
  about: string;
  notice: string;
  newsletter: string;
  tagline: string;
  email: string;
  phone: string;
  socialLinks: Record<string, string>;
};

export function SiteFooter({
  businessName = siteConfig.businessName,
  logoUrl = siteConfig.logoUrl,
  content,
}: {
  businessName?: string;
  logoUrl?: string;
  content?: FooterContent;
}) {
  const footer: FooterContent = content ?? {
    about: "",
    notice: "",
    newsletter: "",
    tagline: "",
    email: siteConfig.email,
    phone: siteConfig.phone,
    socialLinks: {},
  };
  const socials = Object.entries(footer.socialLinks).filter(([, url]) => url);
  return (
    <footer className="relative overflow-hidden border-t border-champagne/15 bg-black pt-14 sm:pt-20">
      <div className="gold-orb -left-32 top-10 opacity-55" />
      <div className="absolute inset-x-0 top-0 h-px bg-gold-gradient opacity-70" />
      <div className="luxury-container grid gap-9 pb-10 sm:gap-12 sm:pb-14 lg:grid-cols-[1.35fr_0.8fr_0.8fr_1.2fr]">
        <div className="relative z-10">
          <Image
            src={logoUrl}
            width={260}
            height={170}
            alt={`${businessName} logo`}
            className="h-24 w-auto object-contain drop-shadow-[0_0_38px_rgba(215,181,109,0.28)] sm:h-32 md:h-40"
          />
          <p className="mt-4 max-w-sm text-sm leading-7 text-ivory/70 sm:mt-5">
            {footer.about}
          </p>
          <p className="mt-3 max-w-sm text-xs leading-6 text-ivory/50">
            {footer.notice}
          </p>
          <div className="mt-7 h-px w-28 bg-gold-gradient" />
        </div>

        <div className="relative z-10">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-champagne sm:text-xs sm:tracking-[0.28em]">
            Explore
          </h2>
          <div className="mt-5 grid gap-3">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-ivory/68 transition hover:text-champagne"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-champagne sm:text-xs sm:tracking-[0.28em]">
            Support
          </h2>
          <div className="mt-5 grid gap-3">
            {support.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-ivory/68 transition hover:text-champagne"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-champagne sm:text-xs sm:tracking-[0.28em]">
            Stay Close
          </h2>
          <p className="mt-5 text-sm leading-7 text-ivory/70">
            {footer.newsletter}
          </p>
          <div className="mt-5">
            <NewsletterForm compact />
          </div>
          <div className="mt-6 text-sm text-ivory/70">
            <p>{footer.email}</p>
            <p>{footer.phone}</p>
            {socials.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                {socials.map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="capitalize transition hover:text-champagne"
                  >
                    {name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6">
        <div className="luxury-container flex flex-col gap-3 text-xs text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {businessName}. All rights reserved.</p>
          <p>{footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
