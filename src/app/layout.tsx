import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { JsonLd } from "@/components/sections";
import { SiteChrome } from "@/components/site-chrome";
import { absoluteUrl } from "@/lib/utils";
import { getSiteSettings } from "@/lib/store";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Sport Only | Premium Athletic Catalogs",
    template: "%s | Sport Only",
  },
  description:
    "Your premier destination for authentic athletic and sports catalogs. Browse sneakers, tennis shoes, bags, accessories, watches, and more.",
  openGraph: {
    title: "Sport Only",
    description:
      "Your premier destination for authentic athletic and sports catalogs.",
    url: absoluteUrl(),
    siteName: "Sport Only",
    images: [{ url: absoluteUrl("/og-image.jpg"), width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sport Only",
    description: "Premium athletic and sports catalogs.",
  },
  alternates: {
    canonical: absoluteUrl(),
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    shortcut: ["/logo.png"],
    apple: [{ url: "/logo.png", type: "image/png" }],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans antialiased">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: settings.businessName,
            email: settings.email,
            telephone: settings.phone,
            url: absoluteUrl(),
            logo: absoluteUrl(settings.logoUrl || "/logo.png"),
          }}
        />
        <SiteChrome
          settings={{
            businessName: settings.businessName,
            logoUrl: settings.logoUrl,
          }}
        >
          {children}
        </SiteChrome>
        <Toaster theme="dark" richColors position="bottom-right" />
      </body>
    </html>
  );
}
