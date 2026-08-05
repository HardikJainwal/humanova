"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { NAV_LINKS } from "@/constants/navigation";
import { ArrowUpRight, Heart, ShieldCheck } from "lucide-react";
import { useDemoModal } from "@/context/DemoModalContext";

/* ── Inline social SVGs (lucide-react v1.x lacks these) ── */
function IconX({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.634 5.902-5.634Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function IconLinkedin({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function IconInstagram({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

/* ── Data ──────────────────────────────────────────────── */

const FOOTER_LINKS = {
  Services: [
    { label: "Our Services", href: "/services" },
    { label: "Platform Overview", href: "/Platformoverviewpage" },
    { label: "Wellness Programs", href: "/programs/employee-wellbeing" },
    { label: "Pricing", href: "/pricing" },
  ],
  Company: [
    { label: "About Us", href: "/aboutUs" },
    { label: "Blog & Insights", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
    { label: "Client Login", href: "/login" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const SOCIAL_LINKS = [
  // { icon: IconX, href: "#", label: "Twitter / X" },
  { icon: IconLinkedin, href: "https://www.linkedin.com/company/humanovabydevdoot/", label: "LinkedIn" },
  { icon: IconInstagram, href: "https://www.instagram.com/humanova_official/", label: "Instagram" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
];

const COMPLIANCE_BADGES = [
  { label: "DPDP Act 2023", inProgress: false },
  { label: "UAE PDPL Ready", inProgress: false },
  { label: "GDPR Compliant", inProgress: false },
  { label: "SOC 2", inProgress: true },
  { label: "ISO 27001", inProgress: true },
];

/* ── Animation variants ─────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" },
  }),
};

/* ── Component ──────────────────────────────────────────── */

export default function Footer() {
  const { open: openModal } = useDemoModal();
  return (
    <footer
      aria-label="Site footer"
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #165B5E 0%, #1B6E73 45%, #2C8C91 100%)" }}
    >
      {/* ── Decorative glows ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(44,140,145,0.18) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,240,74,0.07) 0%, transparent 70%)" }}
      />

      {/* ── Top CTA strip ── */}
      <div className="relative z-10 border-b border-white/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
          >
            <p className="text-[#D4F04A] text-xs uppercase tracking-widest mb-1.5 font-extrabold">
              Ready to transform your workplace?
            </p>
            <h2
              className="text-white text-3xl lg:text-4xl font-extrabold leading-tight"
              style={{ fontFamily: "'DM Sans', var(--font-outfit), sans-serif" }}
            >
              Start your wellness journey{" "}
              <span
                className="italic font-normal"
                style={{ fontFamily: "'Instrument Serif', serif", color: "#D4F04A" }}
              >
                today.
              </span>
            </h2>
          </motion.div>

          <motion.button
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
            type="button"
            onClick={openModal}
            id="footer-cta"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-3 rounded-full pl-7 pr-2 py-2 shrink-0 bg-white hover:bg-[#EFFDF4] shadow-[0_8px_30px_rgba(0,0,0,0.18)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] transition-all cursor-pointer border border-white"
          >
            <span className="font-extrabold text-[#0E3D39] text-sm">Get a Free Demo</span>
            <span className="grid place-items-center w-9 h-9 rounded-full bg-[#0E3D39] text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight size={15} />
            </span>
          </motion.button>
        </div>
      </div>

      {/* ── Main footer body ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* ── Brand column ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Logo */}
            <a href="/" aria-label="Humanova home" className="inline-block w-fit">
              <Image
                src="https://res.cloudinary.com/dii2omqrm/image/upload/v1768221271/Vasu_-_Humanova_Logo_500_x_100_px_1_op9ppj.png"
                alt="Humanova Logo"
                width={180}
                height={60}
                className="w-auto h-10 object-contain brightness-0 invert"
              />
            </a>

            <p className="text-white/90 text-sm leading-7 max-w-xs font-medium">
              Humanova empowers organisations with evidence-based mental wellness
              programmes, real-time insights, and compassionate support tools for
              thriving workplaces.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid place-items-center w-9 h-9 rounded-full border border-white/25 text-white/80 hover:text-[#D4F04A] hover:border-[#D4F04A] hover:bg-white/10 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Link columns ── */}
          {Object.entries(FOOTER_LINKS).map(([category, links], colIdx) => (
            <motion.div
              key={category}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={colIdx + 1}
              className="flex flex-col gap-4"
            >
              <h3
                className="text-[#D4F04A] font-extrabold text-xs tracking-widest uppercase"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {category}
              </h3>
              <ul className="flex flex-col gap-2.5" role="list">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-white/85 hover:text-[#D4F04A] text-sm font-medium transition-colors duration-150 hover:translate-x-0.5 inline-block"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Compliance badges strip ── */}
      <div className="relative z-10 border-t border-white/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
          >
            {COMPLIANCE_BADGES.map(({ label, inProgress }) => (
              <span
                key={label}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${
                  inProgress
                    ? "border border-dashed border-white/30 text-white/60"
                    : "border border-white/20 bg-white/10 text-white shadow-sm"
                }`}
              >
                <ShieldCheck size={13} className={inProgress ? "text-white/40" : "text-[#D4F04A]"} />
                {label}
                {inProgress && <span className="text-white/40 font-normal">(in progress)</span>}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Bottom legal row ── */}
      <div className="relative z-10 border-t border-white/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/70 text-xs flex items-center gap-1.5 font-medium">
            © {new Date().getFullYear()} Humanova. Made with{" "}
            <Heart size={11} fill="currentColor" className="text-[#D4F04A]" />{" "}
            for thriving workplaces.
          </p>

          <ul className="flex items-center gap-5" role="list">
            {LEGAL_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-white/70 hover:text-[#D4F04A] text-xs font-medium transition-colors duration-150"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}