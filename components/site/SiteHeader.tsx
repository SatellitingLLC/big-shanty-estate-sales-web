"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./SiteHeader.module.css";

export function SiteHeader({ currentPage }: { currentPage?: "Home" | "About" | "Team" | "Contact" }) {
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const onHome = usePathname() === "/";
  const anchor = (hash: string) => (onHome ? hash : `/${hash}`);
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: anchor("#services"), label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <header className={styles.header} ref={headerRef}>
      <div className={styles.inner}>
        <Link className={styles.brand} href="/" aria-label="Big Shanty Estate Sales home">
          <strong>Big Shanty</strong>
          <small>Estate Sales</small>
        </Link>
        <button
          className={styles.menuToggle}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <i />
          <i />
          <i />
        </button>
        <nav
          className={`${styles.navigation}${menuOpen ? ` ${styles.open}` : ""}`}
          id="site-menu"
          aria-label="Main navigation"
        >
          {links.map(({ href, label }) => (
            <Link
              href={href}
              key={label}
              aria-current={label === currentPage ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <a
            className={styles.cta}
            href="https://www.estatesales.net/companies/GA/Marietta/30066/26564"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Upcoming Estates
          </a>
        </nav>
      </div>
    </header>
  );
}
