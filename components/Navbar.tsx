"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { siteContent } from "@/content/site";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        menuToggleRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeMenu, menuOpen]);

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <Link
          className="site-brand"
          href="/"
          aria-label={siteContent.brandName}
          onClick={closeMenu}
        >
          <Image
            className="site-brand-logo"
            src="/images/logo.jpg"
            alt=""
            width={48}
            height={48}
            loading="eager"
          />
          {siteContent.brandName}
        </Link>

        <button
          ref={menuToggleRef}
          className={`menu-toggle${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={
            menuOpen
              ? siteContent.navigation.closeMenu
              : siteContent.navigation.openMenu
          }
          aria-expanded={menuOpen}
          aria-controls="primary-links"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <div
          className={`nav-links${menuOpen ? " is-open" : ""}`}
          id="primary-links"
        >
          <a className="nav-link" href="#collections" onClick={closeMenu}>
            {siteContent.navigation.collection}
          </a>
          <a className="nav-link" href="#story" onClick={closeMenu}>
            {siteContent.navigation.story}
          </a>
          <a className="nav-link" href="#showcase" onClick={closeMenu}>
            {siteContent.navigation.showcase}
          </a>
          <a className="nav-link" href="#contact" onClick={closeMenu}>
            {siteContent.navigation.contact}
          </a>
          <a
            className="nav-link nav-link-facebook"
            href={siteContent.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            {siteContent.navigation.facebook}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
