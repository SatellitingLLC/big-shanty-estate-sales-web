import type { Metadata } from "next";

import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteIcon } from "@/components/site/SiteIcon";
import { LandingPageRenderer } from "@/components/site/LandingPageRenderer";
import { getPublishedPage } from "@/lib/page-store";
import { connection } from "next/server";
import { getSiteUrl } from "@/lib/site-url";
import styles from "./page.module.css";
import { ContactForm } from "./ContactForm";

const siteUrl = getSiteUrl();
const canonical = siteUrl ? new URL("/contact", siteUrl).href : undefined;
const description =
  "Contact Big Shanty Estate Sales in the Atlanta area. Request a free walk-through for an estate sale, downsizing, liquidation, or auction.";

export const metadata: Metadata = {
  title: "Contact | Big Shanty Estate Sales",
  description,
  alternates: canonical ? { canonical } : undefined,
  openGraph: {
    title: "Contact | Big Shanty Estate Sales",
    description,
    type: "website",
    siteName: "Big Shanty Estate Sales",
    ...(canonical ? { url: canonical } : {}),
  },
};

const steps = [
  {
    numeral: "I",
    title: "We reply",
    text: "We read your note and get back to you to talk through the home and your timeline.",
  },
  {
    numeral: "II",
    title: "We walk the house",
    text: "A free walk-through to see what is there and decide the best way to sell it.",
  },
  {
    numeral: "III",
    title: "We run the sale",
    text: "We sort, price, stage and sell, and keep you updated along the way.",
  },
];

export default async function ContactPage() {
  await connection();
  const page = await getPublishedPage("contact");

  if (page.published) {
    return (
      <div className={`${styles.page} contact-page`}>
        <SiteHeader currentPage="Contact" />
        <LandingPageRenderer page={page} />
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className={`${styles.page} contact-page`}>
      <SiteHeader currentPage="Contact" />

      <main>
        <header className={styles.hero} aria-labelledby="contact-title">
          <div className={styles.wrap}>
            <span className={styles.eyebrow}>Contact</span>
            <h1 id="contact-title">
              Let&rsquo;s open the <i>door.</i>
            </h1>
            <p className={styles.heroText}>
              Tell us about the home, the timeline and what you need. A real person from our
              team will get back to you.
            </p>
            <svg className={styles.key} viewBox="0 0 400 90" aria-hidden="true">
              <defs>
                <linearGradient id="contact-key-gold" x1="0" x2="1">
                  <stop offset="0" stopColor="#f7e7a6" />
                  <stop offset="1" stopColor="#b8923a" />
                </linearGradient>
              </defs>
              <g className={styles.draw}>
                <ellipse cx="62" cy="45" rx="44" ry="38" />
                <ellipse cx="62" cy="45" rx="30" ry="25" />
                <circle cx="62" cy="45" r="9" />
                <path d="M106 45H372V70H350V58H336V70H318V58H300V70H282V45" />
                <path d="M130 38v14M140 38v14" />
              </g>
            </svg>
          </div>
        </header>

        <div className={styles.main}>
          <div className={`${styles.wrap} ${styles.grid}`}>
            <div>
              <span className={`${styles.eyebrow} ${styles.blue}`}>Reach Us</span>
              <h2>Every sale starts with a conversation</h2>
              <div className={styles.rule} />
              <p className={styles.lead}>
                Whether you are settling an estate, downsizing, or just curious what a
                collection might bring, the first walk-through is where we begin.
              </p>
              <div className={styles.info}>
                <div className={styles.row}>
                  <div className={styles.ico}>
                    <SiteIcon name="phone" />
                  </div>
                  <div>
                    <h3>Phone</h3>
                    <p>
                      <a href="tel:4702268003">(470) 226-8003</a>
                    </p>
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.ico}>
                    <SiteIcon name="location" />
                  </div>
                  <div>
                    <h3>Service area</h3>
                    <p>Atlanta and the surrounding Georgia communities, including Cobb County.</p>
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.ico}>
                    <SiteIcon name="handshake" />
                  </div>
                  <div>
                    <h3>Sister companies</h3>
                    <p>
                      <a href="https://bigshantyauction.com" target="_blank" rel="noopener noreferrer">
                        Big Shanty Auction
                      </a>{" "}
                      &amp;{" "}
                      <a
                        href="https://bigshantyantique.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Big Shanty Antiques
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>

        <section className={styles.steps} aria-labelledby="steps-title">
          <div className={styles.wrap}>
            <div className={styles.stepsHead}>
              <span className={styles.eyebrow}>What Happens Next</span>
              <h2 id="steps-title">From first call to final count</h2>
              <div className={styles.rule} />
            </div>
            <div className={styles.stepGrid}>
              {steps.map((step) => (
                <div className={styles.step} key={step.numeral}>
                  <b aria-hidden="true">{step.numeral}</b>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
