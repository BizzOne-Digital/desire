"use client";

import { usePathname } from "next/navigation";
import { CartProvider } from "@/components/cart-provider";
import { IntroLoader } from "@/components/intro-loader";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type SiteChromeProps = {
  children: React.ReactNode;
  settings: {
    businessName: string;
    logoUrl: string;
  };
};

export function SiteChrome({ children, settings }: SiteChromeProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <CartProvider>
      {!isAdmin && (
        <>
          <IntroLoader businessName={settings.businessName} logoUrl={settings.logoUrl} />
          <SiteHeader businessName={settings.businessName} logoUrl={settings.logoUrl} />
        </>
      )}
      <main>{children}</main>
      {!isAdmin && <SiteFooter businessName={settings.businessName} logoUrl={settings.logoUrl} />}
    </CartProvider>
  );
}
