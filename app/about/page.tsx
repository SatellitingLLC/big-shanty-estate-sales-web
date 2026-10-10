import type { Metadata } from "next";
import Image from "next/image";

import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { LandingPageRenderer } from "@/components/site/LandingPageRenderer";
import { getPublishedPage } from "@/lib/page-store";
import { connection } from "next/server";
import { getSiteUrl } from "@/lib/site-url";
import styles from "./page.module.css";

const siteUrl = getSiteUrl();
const description =
  "Meet the team behind Big Shanty Estate Sales: two Georgia estate sale specialists serving the Atlanta area with honest pricing and full-service sales.";
const canonical = siteUrl ? new URL("/about", siteUrl).href : undefined;

export const metadata: Metadata = {
  title: "About Us | Big Shanty Estate Sales",
  description,
  alternates: canonical ? { canonical } : undefined,
  openGraph: {
    title: "About Us | Big Shanty Estate Sales",
    description,
    type: "website",
    siteName: "Big Shanty Estate Sales",
    ...(canonical ? { url: canonical } : {}),
  },
};

const tags = [
  {
    no: "Tag No. 1",
    title: "Estate Sales",
    text: "Full-service, in-home sales. We price, stage and run every day of the sale.",
    price: "Our flagship",
  },
  {
    no: "Tag No. 2",
    title: "Big Shanty Auction",
    text: "For pieces that deserve a bidding room and a wider audience.",
    price: "Going once…",
    href: "https://bigshantyauction.com",
  },
  {
    no: "Tag No. 3",
    title: "Big Shanty Antiques",
    text: "Where select finds are curated and offered to collectors and decorators.",
    price: "Always something new",
    href: "https://bigshantyantique.com",
  },
];

const principles = [
  {
    numeral: "I",
    title: "Look closely",
    text: "We go through everything, from the attic to the china cabinet, because value hides in the details.",
  },
  {
    numeral: "II",
    title: "Price honestly",
    text: "Research drives every price tag. Fair numbers bring serious buyers and better results for your family.",
  },
  {
    numeral: "III",
    title: "Sell widely",
    text: "Our buyers hear about a sale before the doors open, so the right people show up.",
  },
  {
    numeral: "IV",
    title: "Respect the home",
    text: "We know why these sales happen. We work with sensitivity, keep you informed, and leave the house in good order.",
  },
];

const team = [
  {
    no: "Lot No. 1",
    name: "Dana Worley",
    role: "Co-Owner & Estate Specialist",
    photo: "/assets/dana-worley.jpg",
    bio: "Dana leads pricing and research, with a trained eye for antiques, collectibles, and the pieces that deserve a second look.",
  },
  {
    no: "Lot No. 2",
    name: "Stephanie",
    role: "Co-Owner & Estate Specialist",
    photo: "/assets/stephanie.jpg",
    bio: "Stephanie runs staging and sale days, turning full houses into welcoming sales backed by a loyal network of buyers.",
  },
];

const specialties = [
  "Antiques",
  "Collectibles",
  "Fine jewelry",
  "Sports memorabilia",
  "Art & prints",
  "Silver & china",
  "Vintage advertising",
  "Furniture",
];

export default async function AboutPage() {
  await connection();
  const page = await getPublishedPage("about");

  if (page.published) {
    return (
      <div className={`${styles.page} about-page`}>
        <SiteHeader currentPage="About" />
        <LandingPageRenderer page={page} />
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className={`${styles.page} about-page`}>
      <SiteHeader currentPage="About" />

      <main>
        <header className={styles.hero} aria-labelledby="about-title">
          <div className={styles.wrap}>
            <div className={styles.frame}>
              <i aria-hidden="true" />
              <i aria-hidden="true" />
              <i aria-hidden="true" />
              <i aria-hidden="true" />
              <span className={styles.eyebrow}>About Big Shanty</span>
              <h1 id="about-title">
                Every piece has a past.
                <br />
                <em>So do we.</em>
              </h1>
              <p className={styles.heroText}>
                Two knowledgeable women, one Georgia company, and a lifelong respect for the
                things people leave behind.
              </p>
            </div>
          </div>
        </header>

        <section aria-label="Our story">
          <div className={`${styles.wrap} ${styles.split}`}>
            <div className={styles.def}>
              <div>
                <span className={styles.word}>
                  provenance<small>noun &middot; /ˈprɒv.ə.nəns/</small>
                </span>
                <p>The record of where a thing has been and who has cared for it.</p>
                <span className={styles.src}>The heart of our work</span>
              </div>
            </div>
            <div className={styles.story}>
              <span className={`${styles.eyebrow} ${styles.blue}`}>Our Story</span>
              <h2>We read the history in every room</h2>
              <div className={styles.rule} />
              <p>
                In our business, a drawer is never just a drawer. It holds a signed program, a
                strand of pearls, a tool someone kept for fifty years. Our job is to recognize
                what each of those things is, what it is worth, and who will treasure it next.
              </p>
              <p>
                Big Shanty Estate Sales is a Georgia company run by two of the most
                knowledgeable women in the business. We handle the sorting, pricing and setup
                ourselves, and we bring a large network of buyers to the door, so your family
                gets a clear, professional sale without doing the heavy lifting.
              </p>
              <p>
                The name comes from our corner of Georgia. Big Shanty is the name Kennesaw went
                by in the 1800s, and we like carrying a little of that history with us.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.dark} aria-labelledby="family-title">
          <div className={`${styles.wrap} ${styles.center}`}>
            <span className={styles.eyebrow}>The Big Shanty Family</span>
            <h2 id="family-title">Three ways we find a new home for your things</h2>
            <div className={styles.rule} />
            <div className={styles.tags}>
              {tags.map((tag) => (
                <div className={styles.tag} key={tag.no}>
                  <small>{tag.no}</small>
                  <h3>{tag.title}</h3>
                  <p>{tag.text}</p>
                  {tag.href ? (
                    <a
                      className={styles.price}
                      href={tag.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {tag.price}
                    </a>
                  ) : (
                    <span className={styles.price}>{tag.price}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="habits-title">
          <div className={styles.wrap}>
            <div className={styles.center}>
              <span className={`${styles.eyebrow} ${styles.blue}`}>How We Work</span>
              <h2 id="habits-title">Four habits behind every sale</h2>
              <div className={styles.rule} />
            </div>
            <div className={styles.principles}>
              {principles.map((item) => (
                <div className={styles.principle} key={item.numeral}>
                  <b aria-hidden="true">{item.numeral}</b>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.lots} aria-labelledby="team-title">
          <div className={`${styles.wrap} ${styles.center}`}>
            <span className={`${styles.eyebrow} ${styles.blue}`}>The Team</span>
            <h2 id="team-title">Meet the two behind the key</h2>
            <div className={styles.rule} />
            <div className={styles.teamGrid}>
              {team.map((member) => (
                <div className={styles.lot} key={member.name}>
                  <div>
                    <Image
                      className={styles.portrait}
                      src={member.photo}
                      width={320}
                      height={320}
                      alt={`Portrait of ${member.name}`}
                    />
                    <small>{member.no}</small>
                    <h3>{member.name}</h3>
                    <em>{member.role}</em>
                    <p>{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.dark} aria-labelledby="skills-title">
          <div className={`${styles.wrap} ${styles.center}`}>
            <span className={styles.eyebrow}>What We Know</span>
            <h2 id="skills-title">Trained eyes for the good stuff</h2>
            <div className={styles.rule} />
            <div className={styles.specialties}>
              {specialties.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <div className={styles.cta}>
          <div className={styles.wrap}>
            <span className={styles.eyebrow}>Ready When You Are</span>
            <h2>Let&rsquo;s see what your home is hiding</h2>
            <a className={styles.ctaButton} href="/contact">
              Request a Walk-Through
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
