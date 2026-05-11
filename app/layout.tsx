import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { LocaleProvider } from "@/components/LocaleProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_NAME } from "@/lib/constants";
import { organizationSchema } from "@/lib/schema";
import { absoluteUrl, seoPages, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: seoPages.home.title,
    template: `%s | ${SITE_NAME}`
  },
  description: seoPages.home.description,
  alternates: {
    canonical: absoluteUrl("/")
  },
  openGraph: {
    title: seoPages.home.title,
    description: seoPages.home.description,
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: absoluteUrl("/images/hero-lifestyle.jpg"),
        width: 1200,
        height: 900,
        alt: "Petlinkshop 低粉塵豆腐猫砂"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: seoPages.home.title,
    description: seoPages.home.description,
    images: [absoluteUrl("/images/hero-lifestyle.jpg")]
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen font-sans antialiased">
        <LocaleProvider>
          <SiteHeader />
          <JsonLd data={organizationSchema} />
          <div className="pt-12">{children}</div>
          <SiteFooter />
        </LocaleProvider>
      </body>
    </html>
  );
}
