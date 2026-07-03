"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { NAV_LINKS, NAV_CTA } from "@/constants/navigation";

/**
 * Floating Navbar — sticky, white pill, 88–90% width.
 * "use client" only for mobile menu toggle state.
 */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full flex justify-center pt-6 px-4 sticky top-6 z-50">
      {/* ── Desktop pill ──────────────────────────────── */}
      <nav
        className="w-full max-w-[1080px] flex items-center justify-between px-6 py-3.5 bg-white rounded-[28px] border border-[#E5DED6] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Logo />

        {/* Nav links — hidden on mobile */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="text-[#5F6B73] hover:text-[#1F2937] text-sm font-medium px-4 py-2 rounded-xl transition-colors duration-150 hover:bg-[#FAF7F2]"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Button
          id="nav-cta"
          href={NAV_CTA.href}
          variant="primary"
          size="sm"
          className="hidden md:inline-flex shadow-[0_2px_8px_-2px_rgba(44,140,145,0.35)]"
        >
          {NAV_CTA.label}
        </Button>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-btn"
          className="md:hidden text-[#5F6B73] hover:text-[#1F2937] p-2 rounded-xl transition-colors"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <Icon name="menu" size={20} color="currentColor" strokeWidth={2} />
        </button>
      </nav>

      {/* ── Mobile dropdown ────────────────────────────── */}
      {menuOpen && (
        <div className="absolute top-full mt-2 w-[calc(100%-2rem)] max-w-[1080px] bg-white border border-[#E5DED6] rounded-3xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] p-4 flex flex-col gap-1 md:hidden">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-[#5F6B73] hover:text-[#1F2937] text-sm font-medium px-4 py-3 rounded-xl transition-colors hover:bg-[#FAF7F2]"
            >
              {label}
            </a>
          ))}
          <div className="pt-2 border-t border-[#E5DED6] mt-1">
            <Button
              href={NAV_CTA.href}
              variant="primary"
              size="md"
              className="w-full justify-center"
              onClick={() => setMenuOpen(false)}
            >
              {NAV_CTA.label}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ── Sub-component: Logo ──────────────────────────────────── */

function Logo() {
  return (
    <a
      href="/"
      className="flex items-center flex-shrink-0"
      aria-label="Humanova home"
    >
      <Image
        src="https://res.cloudinary.com/dii2omqrm/image/upload/v1768221271/Vasu_-_Humanova_Logo_500_x_100_px_1_op9ppj.png"
        alt="Humanova Logo"
        width={180}
        height={60}
        priority
        className="w-auto h-10 object-contain"
      />
    </a>
  );
}