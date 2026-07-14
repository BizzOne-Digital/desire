"use client";

import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
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
  const [introFinished, setIntroFinished] = useState(isAdmin);
  const handleIntroComplete = useCallback(() => setIntroFinished(true), []);

  return (
    <CartProvider>
      {!isAdmin && (
        <>
          <IntroLoader
            businessName={settings.businessName}
            logoUrl={settings.logoUrl}
            onComplete={handleIntroComplete}
          />
          <SiteHeader businessName={settings.businessName} logoUrl={settings.logoUrl} />
        </>
      )}
      <main
        className={
          isAdmin || introFinished
            ? "translate-y-0 opacity-100 transition duration-700 ease-out"
            : "translate-y-3 opacity-0 transition duration-700 ease-out"
        }
      >
        {children}
      </main>
      {!isAdmin && <SiteFooter businessName={settings.businessName} logoUrl={settings.logoUrl} />}
    </CartProvider>
  );
}
