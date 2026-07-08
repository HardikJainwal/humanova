"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { NAV_LINKS, NAV_CTA } from "@/constants/navigation";
import { BusinessTrigger, BusinessMegaPanel } from "@/components/layout/BusinessMenu";
import DemoButton from "@/components/ui/DemoButton";

/**
 * Floating Navbar — sticky, white pill, 88–90% width.
 * Business mega-menu state lives here so the panel can be rendered
 * as a sibling of the <nav> pill (inside the same relative header),
 * ensuring correct full-width centred positioning.
 *
 * Scroll behaviour: hides on scroll-down, reveals on scroll-up
 * (only past a small threshold so it doesn't flicker near the top).
 * Past 20px scroll, the pill also picks up a frosted-glass look.
 */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [businessOpen, setBusinessOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("solutions");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const leaveTimer = useRef(null);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastY.current;

        setScrolled(currentY > 20);

        // ignore tiny jitters, only react past a real scroll gesture
        if (Math.abs(delta) > 4) {
          if (delta > 0 && currentY > 140) {
            setHidden(true);
            setMenuOpen(false);
            setBusinessOpen(false);
          } else {
            setHidden(false);
          }
          lastY.current = currentY;
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleEnter = () => {
    clearTimeout(leaveTimer.current);
    setBusinessOpen(true);
  };

  const handleLeave = () => {
    leaveTimer.current = setTimeout(() => setBusinessOpen(false), 140);
  };

  return (
    /*
      `relative` is required so the mega panel (position:absolute top-full)
      is offset from this header, not from the nearest positioned ancestor.
    */
    <motion.header
      animate={{ y: hidden ? -110 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="w-full flex justify-center  px-4 sticky top-6 z-50 relative"
    >
      {/* ── Desktop pill ──────────────────────────────── */}
      <nav
        className={`w-full max-w-[1080px] flex items-center justify-between px-6 py-3.5 rounded-[28px] border transition-all duration-300 ${
          scrolled
            ? "bg-white/75 backdrop-blur-xl border-[#E5DED6] shadow-[0_8px_32px_-8px_rgba(15,61,57,0.16)]"
            : "bg-white border-[#E5DED6] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)]"
        }`}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Logo />

        {/* Nav links — hidden on mobile */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {/* Business mega-menu trigger */}
          <li onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <BusinessTrigger open={businessOpen} />
          </li>

          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="group relative text-[#5F6B73] hover:text-[#1F2937] text-sm font-medium px-4 py-2 rounded-xl transition-colors duration-150 hover:bg-[#FAF7F2]"
              >
                {label}
                <span className="pointer-events-none absolute left-4 right-4 -bottom-0.5 h-[2px] bg-[#2C8C91] rounded-full scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            id="nav-login"
            href="/login"
            className="text-[#5F6B73] hover:text-[#1F2937] text-sm font-medium px-4 py-2 rounded-xl border border-[#E5DED6] hover:border-[#2C8C91] hover:bg-[#FAF7F2] transition-all duration-150"
          >
            Login
          </Link>
          <DemoButton
            id="nav-cta"
            variant="primary"
            size="sm"
            className="shadow-[0_2px_8px_-2px_rgba(44,140,145,0.35)] hover:shadow-[0_4px_16px_-2px_rgba(44,140,145,0.5)] hover:-translate-y-0.5"
          >
            {NAV_CTA.label}
          </DemoButton>
        </div>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-btn"
          className="md:hidden text-[#5F6B73] hover:text-[#1F2937] p-2 rounded-xl transition-colors"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <motion.span
            animate={{ rotate: menuOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="block"
          >
            <Icon name={menuOpen ? "x" : "menu"} size={20} color="currentColor" strokeWidth={2} />
          </motion.span>
        </button>
      </nav>

      {/*
        ── Business mega panel ──────────────────────────────────────
        Rendered as a sibling of <nav>, still inside <header relative>.
        `absolute top-full left-1/2 -translate-x-1/2 max-w-[1080px]`
        = centred directly below the nav pill, exact same width.
        The onMouseEnter/Leave here cancel the leave timer so the panel
        stays open as the cursor travels from the trigger into the panel.
      */}
      <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        <BusinessMegaPanel
          open={businessOpen}
          onClose={() => setBusinessOpen(false)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* ── Mobile dropdown ────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full mt-2 w-[calc(100%-2rem)] max-w-[1080px] bg-white/90 backdrop-blur-xl border border-[#E5DED6] rounded-3xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] p-4 flex flex-col gap-1 md:hidden"
          >
            {/* Business accordion entry for mobile */}
            <a
              href="#"
              onClick={() => setMenuOpen(false)}
              className="text-[#5F6B73] hover:text-[#1F2937] text-sm font-medium px-4 py-3 rounded-xl transition-colors hover:bg-[#FAF7F2]"
            >
              Business
            </a>

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

            <div className="pt-2 border-t border-[#E5DED6] mt-1 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center text-[#5F6B73] hover:text-[#1F2937] text-sm font-medium px-4 py-3 rounded-xl border border-[#E5DED6] hover:bg-[#FAF7F2] transition-colors"
              >
                Login
              </Link>
              <DemoButton
                variant="primary"
                size="md"
                className="w-full justify-center"
                onClick={() => setMenuOpen(false)}
              >
                {NAV_CTA.label}
              </DemoButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
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