"use client";

import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import { useState } from "react";
import { MagneticText } from "@/components/magnetic-text";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="Kush Vyas home" onClick={closeMenu}><MagneticText text="KUSH" mode="scatter" /></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <Link href="/#work"><MagneticText text="Work" /></Link>
        <Link href="/#experience"><MagneticText text="Experience" /></Link>
        <Link href="/#contact"><MagneticText text="Contact" /></Link>
      </nav>
      <a className="header-contact" href="mailto:kushv619@gmail.com"><MagneticText text="Email me" /></a>
      <button className="mobile-menu-toggle" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((current) => !current)}>{menuOpen ? <X aria-hidden="true" /> : <List aria-hidden="true" />}</button>
      <nav className="mobile-menu" id="mobile-navigation" aria-label="Mobile navigation" data-open={menuOpen}>
        <Link href="/#work" onClick={closeMenu}><MagneticText text="Work" /></Link>
        <Link href="/#experience" onClick={closeMenu}><MagneticText text="Experience" /></Link>
        <Link href="/#contact" onClick={closeMenu}><MagneticText text="Contact" /></Link>
      </nav>
    </header>
  );
}
