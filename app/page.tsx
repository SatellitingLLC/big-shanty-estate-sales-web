import type { Metadata } from "next";
import { connection } from "next/server";

import { LandingPageRenderer } from "@/components/site/LandingPageRenderer";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { getPublishedPage } from "@/lib/page-store";
import { getSiteUrl } from "@/lib/site-url";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPublishedPage("home");
  const siteUrl = getSiteUrl();
  const logoUrl = siteUrl ? new URL("/assets/estate-logo.png", siteUrl).href : undefined;
  return {
    title: page.title,
    description: page.description,
    alternates: siteUrl ? { canonical: siteUrl.href } : undefined,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "website",
      siteName: "Big Shanty Estate Sales",
      ...(siteUrl ? { url: siteUrl.href } : {}),
      ...(logoUrl
        ? {
            images: [
              {
                url: logoUrl,
                width: 900,
                height: 512,
                alt: "Big Shanty Estate Sales logo",
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary",
      title: page.title,
      description: page.description,
      ...(logoUrl ? { images: [logoUrl] } : {}),
    },
  };
}

export default async function HomePage() {
  await connection();
  const page = await getPublishedPage("home");
  const siteUrl = getSiteUrl();
  const business = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Big Shanty Estate Sales",
    description: page.description,
    email: "hello@bigshantyestatesales.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Atlanta",
      addressRegion: "GA",
      addressCountry: "US",
    },
    ...(siteUrl
      ? {
          "@id": new URL("/#business", siteUrl).href,
          url: siteUrl.href,
          image: new URL("/assets/estate-logo.png", siteUrl).href,
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(business).replace(/</g, "\\u003c"),
        }}
      />
      <div className="home-shell">
        <SiteHeader currentPage="Home" />
        <LandingPageRenderer page={page} />
        <SiteFooter />
      </div>
    </>
  );
}
