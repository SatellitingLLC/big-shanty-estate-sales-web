import Image from "next/image";
import Link from "next/link";

import { SocialLinks } from "./SocialLinks";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.grid}>
          <div>
            <Link href="#top" aria-label="Big Shanty Estate Sales home">
              <Image
                src="/assets/estate-logo.png"
                width={520}
                height={296}
                alt="Big Shanty Estate Sales"
              />
            </Link>
          </div>
          <div>
            <h2>About</h2>
            <p>
              Big Shanty Estate Sales is a Georgia estate sale company run by two of the most
              knowledgeable women in the business. We sit alongside Big Shanty Auction and Big
              Shanty Antiques.
            </p>
            <SocialLinks />
          </div>
          <div>
            <h2>Quick Menu</h2>
            <Link href="#top">Home</Link>
            <Link href="#about">About</Link>
            <Link href="#contact">Contact</Link>
          </div>
          <div>
            <h2>Our Companies</h2>
            <Link href="/">Big Shanty Estate Sales</Link>
            <a href="https://bigshantyauction.com" target="_blank" rel="noopener noreferrer">
              Big Shanty Auction
            </a>
            <a href="https://bigshantyantique.com" target="_blank" rel="noopener noreferrer">
              Big Shanty Antiques
            </a>
          </div>
        </div>
        <div className={styles.copy}>
          <span>Copyright © 2026 Big Shanty Estate Sales. All rights reserved.</span>
          <span className={styles.divider} aria-hidden="true">
            |
          </span>
          <span>
            Designed by{" "}
            <a href="https://satelliting.space" target="_blank" rel="noopener">
              Satelliting LLC
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
