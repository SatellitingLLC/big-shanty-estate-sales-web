import type { Metadata } from "next";
import { Lato, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

import { getSiteUrl } from "@/lib/site-url";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Big Shanty Estate Sales | Atlanta's Premier Estate Sale Company",
  description:
    "Big Shanty Estate Sales: full-service estate sales, liquidations and auctions in the Atlanta area. We price, stage and sell so your family does not have to.",
  metadataBase: siteUrl ?? undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${playfair.variable} ${lato.variable}`}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
