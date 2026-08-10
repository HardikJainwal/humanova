"use client";

import { useState } from "react";
import { useDemoModal } from "@/context/DemoModalContext";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import {
  ClipboardCheck, Activity, BarChart3, ArrowRight, ShieldCheck,
  CalendarClock, HeadphonesIcon, ClipboardList, ActivitySquare,
  ChevronDown, ChevronUp, Zap, Quote, Users, Heart, Star,
} from "lucide-react";

const BANNER_IMG =
  "https://humanova-docs-app.s3.amazonaws.com/Banners/Αρχική_-_Δες_μέσα_σου_ghi0ys.jpg";

/**
 * SolutionPageTemplate
 * Reusable base for all 4 Solutions sub-pages.
 * All text/content passed as props — UI stays identical.
 *
 * Props:
 *  - eyebrow      string   small label above headline
 *  - headline     ReactNode
 *  - subheadline  string
 *  - ctaPrimary   { label, href }
 *  - ctaSecondary { label, href }
 *  - stats        [{ value, label }]   max 4
 *  - testimonials [{ quote, author, role, avatarColor }]  max 6
 *  - services     { headline, subline, items: [{icon,title,desc}] } max 6 items
 *  - howItWorks   { image, title, ctaLabel, ctaHref, items: [{icon,title,desc}] } max 3 items
 *  - faqs         [{ question, answer }]
 *  - faqCta       { title, desc, ctaLabel, ctaHref }
 *  - bannerImg    string (override if needed)
 */
export default function SolutionPageTemplate({
  eyebrow       = "For Enterprises",
  headline      = "Placeholder Headline",
  subheadline   = "Placeholder subheadline text. Change this per page.",
  ctaPrimary    = { label: "Get a Free Demo", href: "#request-demo" },
  ctaSecondary  = { label: "See How It Works", href: "#how-it-works" },
  stats         = PLACEHOLDER_STATS,
  testimonials  = PLACEHOLDER_TESTIMONIALS,
  services      = PLACEHOLDER_SERVICES,
  howItWorks    = PLACEHOLDER_HOW_IT_WORKS,
  faqs          = PLACEHOLDER_FAQS,
  faqCta        = PLACEHOLDER_FAQ_CTA,
  bannerImg     = BANNER_IMG,
}) {
  const [openFaq, setOpenFaq] = useState(0);
  const { open: openModal } = useDemoModal();

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      <main>
        {/* ── HERO BANNER ─────────────────────────────────────── */}
        {/*
          -mt-24 pulls the section up behind the sticky navbar (header height ≈ 92px).
          overflow-hidden + rounded-b-[40px] gives the curved bottom edge.
          The content inside gets pt-36 to clear the floating nav pill.
        */}
        <section
          id="solution-hero"
          className="relative w-full overflow-hidden -mt-24 rounded-b-[0px]"
          style={{ minHeight: "640px" }}
          aria-labelledby="solution-heading"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src={bannerImg}
              alt="Solution hero"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            {/* Dark overlay so text is readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#07312C]/85 via-[#07312C]/55 to-transparent" />
          </div>

          {/* Content grid — pt-36 = clears sticky navbar pill */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-36 pb-24 lg:pt-40 lg:pb-28 grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT — text */}
            <div className="flex flex-col gap-6">
              {/* Eyebrow */}
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#D4F04A] backdrop-blur-sm">
                {eyebrow}
              </span>

              {/* Headline */}
              <h1
                id="solution-heading"
                className="text-white text-4xl sm:text-5xl lg:text-[3.2rem] font-extrabold leading-[1.1] tracking-tight"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {headline}
              </h1>

              {/* Sub-headline */}
              <p className="text-white/70 text-lg leading-[1.7] max-w-[480px]">
                {subheadline}
              </p>
            
              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  id="solution-cta-primary"
                  type="button"
                  onClick={openModal}
                  className="inline-flex items-center gap-2 rounded-full bg-[#D4F04A] px-7 py-3.5 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(212,240,74,0.4)] hover:shadow-[0_8px_40px_rgba(212,240,74,0.6)] transition-shadow duration-200 cursor-pointer"
                >
                  {ctaPrimary.label}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <a
                  id="solution-cta-secondary"
                  href={ctaSecondary.href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-colors duration-200"
                >
                  {ctaSecondary.label}
                </a>
              </div>
            </div>

            {/* RIGHT — image decorative placeholder (image is the bg; right col is intentionally empty or can hold a card) */}
            <div className="hidden lg:flex justify-end">
              {/* Optional overlay card — leave empty for now, add per-page later */}
            </div>
          </div>
        </section>

        {/* ── STATS STRIP ─────────────────────────────────────── */}
        <section className="bg-white border-b border-[#E5DED6]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-[#E5DED6]">
              {stats.map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center text-center px-4 first:pl-0 last:pr-0">
                  <span
                    className="text-3xl font-extrabold text-[#2C8C91]"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {value}
                  </span>
                  <span className="mt-1 text-xs text-[#5F6B73] uppercase tracking-wider font-medium">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES — dune wave cards ───────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-10 lg:pt-10">
          <div className="text-center mb-20">
            <p className="text-[#2C8C91] text-sm font-bold uppercase tracking-[0.2em] mb-3">
              Services
            </p>
            <h2
              className="text-[#1F2937] text-4xl md:text-5xl font-extrabold leading-tight"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {services.headline || "Everything Your Team"}
              <br />
              {services.subline || "Needs, In One Platform"}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-20">
            {services.items.map(({ icon, title, desc }, i) => {
              const palettes = [
                { bg: "#E8F4FF", iconBg: "from-[#4A90D9] to-[#1A5FA8]", shadow: "rgba(74,144,217,0.35)" },
                { bg: "#FFF0F6", iconBg: "from-[#E05FA0] to-[#A0336E]", shadow: "rgba(224,95,160,0.35)" },
                { bg: "#EFFDF4", iconBg: "from-[#2C8C91] to-[#0E3D39]", shadow: "rgba(44,140,145,0.35)" },
                { bg: "#FFF8E8", iconBg: "from-[#E8A020] to-[#B87000]", shadow: "rgba(232,160,32,0.35)" },
                { bg: "#F3EEFF", iconBg: "from-[#7C5CDB] to-[#4A2EA8]", shadow: "rgba(124,92,219,0.35)" },
                { bg: "#E8FDF4", iconBg: "from-[#1AAF7E] to-[#0A7055]", shadow: "rgba(26,175,126,0.35)" },
                { bg: '#E8FDF9', iconBg: "from-[#2C8291] to-[#0E3D]"}
              ];
              const p = palettes[i % palettes.length];

              return (
                <div key={title} className="group relative hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full">
                  <div
                    className="rounded-[28px] overflow-hidden shadow-[0_18px_48px_-16px_rgba(0,0,0,0.14)] flex flex-col flex-1 h-full"
                    style={{ background: "#fff" }}
                  >
                    <div className="relative shrink-0" style={{ background: p.bg }}>
                      <div className="flex justify-center pt-8 pb-4">
                        <div
                          className={`w-[72px] h-[72px] rounded-2xl bg-gradient-to-br ${p.iconBg} text-white grid place-items-center`}
                          style={{ boxShadow: `0 12px 28px -8px ${p.shadow}` }}
                        >
                          {icon}
                        </div>
                      </div>

                      <svg
                        viewBox="0 0 360 52"
                        preserveAspectRatio="none"
                        className="w-full block"
                        style={{ height: "52px", marginBottom: "-1px" }}
                        aria-hidden="true"
                      >
                        <path
                          d="M0,0 C60,52 140,52 180,28 C220,4 300,4 360,52 L360,52 L0,52 Z"
                          fill="#ffffff"
                        />
                      </svg>
                    </div>

                    <div className="bg-white px-7 pt-2 pb-16 text-center flex-1 flex flex-col justify-start">
                      <h3
                        className="text-[#1F2937] font-bold text-xl mb-3 min-h-[56px] flex items-center justify-center"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        {title}
                      </h3>
                      <p className="text-[#5F6B73] text-sm leading-relaxed max-w-[260px] mx-auto flex-1">
                        {desc}
                      </p>
                    </div>
                  </div>

                  <a
                    href="#"
                    aria-label={`Learn more about ${title}`}
                    className={`absolute -bottom-5 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-gradient-to-br ${p.iconBg} text-white grid place-items-center group-hover:scale-110 transition-transform duration-200 z-10`}
                    style={{ boxShadow: `0 8px 20px -4px ${p.shadow}` }}
                  >
                    <ArrowRight size={16} />
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── HOW DOES IT WORK ────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-10 lg:pt-20 pb-20 lg:pb-28">
          <div className="grid lg:grid-cols-[380px_1fr] gap-6">

            {/* LEFT — image card */}
            <a
              href={howItWorks.ctaHref}
              className="group relative rounded-[24px] overflow-hidden min-h-[320px] lg:min-h-0 block"
            >
              <Image
                src={howItWorks.image}
                alt={howItWorks.title}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 380px, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <h3
                  className="text-white text-2xl font-bold leading-tight mb-3"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {howItWorks.title}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-[#D4F04A] text-sm font-semibold">
                  {howItWorks.ctaLabel}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </a>

            {/* RIGHT — dark teal panel, 3 items */}
            <div className="bg-[#07312C] rounded-[24px] p-8 lg:p-10">
              <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 h-full">
                {howItWorks.items.map(({ icon, title, desc }, i) => (
                  <div
                    key={title}
                    className={`rounded-2xl p-6 ${i === 0 ? "bg-white/5" : ""}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#D4F04A] grid place-items-center text-[#07312C] mb-5">
                      {icon}
                    </div>
                    <h4
                      className="text-white font-semibold text-lg leading-snug mb-2"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {title}
                    </h4>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY TEAMS CHOOSE US — testimonials ────────────────── */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-10 mb-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 mb-5">
                <Star size={15} className="text-[#D4F04A] fill-[#D4F04A]" />
                <span className="text-[#1F2937] text-xs font-bold uppercase tracking-[0.15em]">
                  Testimonials
                </span>
              </div>
              <h2
                className="text-[#0E3D39] text-4xl lg:text-5xl leading-[1.15]"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Why teams choose us
              </h2>
              <p className="mt-4 text-[#5F6B73] text-base leading-7 max-w-md">
                Hear from HR leaders and employees who have transformed their workplace wellbeing with Humanova.
              </p>
            </div>
            <button
              type="button"
              onClick={openModal}
              className="inline-flex items-center gap-3 bg-[#D4F04A] rounded-full pl-2 pr-6 py-2 hover:shadow-[0_8px_24px_-6px_rgba(212,240,74,0.6)] transition-shadow duration-200 cursor-pointer shrink-0"
            >
              <span className="grid place-items-center w-9 h-9 rounded-full bg-white text-[#0E3D39]">
                <ArrowRight size={15} />
              </span>
              <span className="font-semibold text-sm text-black">
                Join Them Today
              </span>
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map(({ quote, author, role, avatarColor }, i) => (
              <div
                key={author}
                className="group bg-white rounded-[24px] border border-[#E5DED6] p-7 hover:border-[#2C8C91]/30 hover:shadow-[0_8px_32px_-8px_rgba(44,140,145,0.12)] transition-all duration-300 flex flex-col"
              >
                {/* Quote icon */}
                <div
                  className="w-10 h-10 rounded-full grid place-items-center mb-5 shrink-0"
                  style={{ background: avatarColor || "#EAF6F4", color: "#fff" }}
                >
                  <Quote size={18} />
                </div>

                {/* Quote text */}
                <p
                  className="text-[#0E3D39] text-lg leading-[1.6] mb-6 flex-1"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  &ldquo;{quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-5 border-t border-[#E5DED6]">
                  <div
                    className="w-9 h-9 rounded-full grid place-items-center text-white text-xs font-bold uppercase"
                    style={{ background: avatarColor || "#2C8C91" }}
                  >
                    {author.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-[#1F2937] text-sm font-semibold leading-snug">
                      {author}
                    </p>
                    <p className="text-[#8FA8A3] text-xs leading-snug">
                      {role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── RESULTS & IMPACT ─────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20 lg:pb-28">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 mb-5">
                <BarChart3 size={15} className="text-[#D4F04A]" />
                <span className="text-[#1F2937] text-xs font-bold uppercase tracking-[0.15em]">
                  Measurable Outcomes
                </span>
              </div>
              <h2
                className="text-[#0E3D39] text-4xl lg:text-5xl leading-[1.15]"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Real results, not promises
              </h2>
              <p className="mt-4 text-[#5F6B73] text-base leading-7 max-w-md">
                Organisations using Humanova see measurable improvements across key wellbeing and performance indicators.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Primary metric — dark teal accent card */}
            <div className="bg-[#07312C] rounded-[28px] p-8 lg:p-10 flex flex-col justify-between min-h-[280px]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#D4F04A]/15 px-3 py-1 text-xs font-semibold text-[#D4F04A] mb-6">
                  Top Result
                </span>
                <h3
                  className="text-white text-5xl lg:text-6xl font-extrabold mb-3"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  40<span className="text-[#D4F04A]">%</span>
                </h3>
                <p
                  className="text-white/80 text-xl leading-snug"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Reduction in burnout-related absences within the first six months
                </p>
              </div>
              <div className="mt-6">
                <div className="flex justify-between text-xs text-white/40 mb-2">
                  <span>Before Humanova</span>
                  <span>After 6 months</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#D4F04A] to-[#A8C73A]" style={{ width: "60%" }} />
                </div>
              </div>
            </div>

            {/* Right column — 3 stacked metric cards */}
            <div className="flex flex-col gap-6">
              {[
                { value: "92%", label: "Employee satisfaction with wellbeing support", progress: 92, color: "#2C8C91" },
                { value: "3×", label: "Return on investment reported by HR leaders", progress: 78, color: "#4A90D9" },
                { value: "67%", label: "Faster onboarding vs. traditional EAP providers", progress: 67, color: "#7C5CDB" },
              ].map(({ value, label, progress, color }) => (
                <div
                  key={label}
                  className="bg-white rounded-[24px] border border-[#E5DED6] p-6 hover:border-[#2C8C91]/30 hover:shadow-[0_8px_32px_-8px_rgba(44,140,145,0.12)] transition-all duration-300"
                >
                  <div className="flex items-start gap-5">
                    <span
                      className="text-3xl font-extrabold shrink-0"
                      style={{ fontFamily: "var(--font-outfit)", color }}
                    >
                      {value}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[#0E3D39] text-base leading-snug mb-3"
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                      >
                        {label}
                      </p>
                      <div className="w-full h-1.5 rounded-full bg-[#E5DED6]/60 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${progress}%`, background: color }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ — Q&A accordion ──────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20 lg:pb-28">
          <div className="grid lg:grid-cols-[420px_1fr] gap-10 lg:gap-16">

            {/* LEFT — heading + still-have-questions card */}
            <div className="flex flex-col justify-between gap-10">
              <div>
                <div className="inline-flex items-center gap-2 mb-5">
                  <Zap size={15} className="text-[#D4F04A] fill-[#D4F04A]" />
                  <span className="text-[#1F2937] text-xs font-bold uppercase tracking-[0.15em]">
                    Questions &amp; Answers
                  </span>
                </div>

                <h2
                  className="text-[#0E3D39] text-4xl lg:text-5xl leading-[1.15]"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {faqs.headline || "Clear answers for complex operations"}
                </h2>

                <p className="mt-6 text-[#5F6B73] text-base leading-7 max-w-sm">
                  {faqCta.subline ||
                    "Clear answers on onboarding, rollout, security, and measurable outcomes."}
                </p>
              </div>

              {/* Still have questions card */}
              <div className="rounded-[28px] bg-[#EAF6F4] p-8">
                <h3
                  className="text-[#0E3D39] text-2xl mb-3"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {faqCta.title}
                </h3>
                <p className="text-[#5F6B73] text-sm leading-relaxed mb-6">
                  {faqCta.desc}
                </p>
                <button
                  type="button"
                  onClick={openModal}
                  className="inline-flex items-center gap-3 bg-[#D4F04A] rounded-full pl-2 pr-6 py-2 hover:shadow-[0_8px_24px_-6px_rgba(212,240,74,0.6)] transition-shadow duration-200 cursor-pointer"
                >
                  <span className="grid place-items-center w-9 h-9 rounded-full bg-white text-[#0E3D39]">
                    <ArrowRight size={15} />
                  </span>
                  <span className="font-semibold text-sm text-black">
                    {faqCta.ctaLabel}
                  </span>
                </button>
              </div>
            </div>

            {/* RIGHT — accordion list */}
            <div className="flex flex-col gap-4">
              {faqs.items.map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={item.question}
                    className="rounded-[24px] bg-white border border-[#E5DED6] px-7 py-6 cursor-pointer transition-colors duration-200 hover:border-[#2C8C91]/30"
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                  >
                    <div className="flex items-center justify-between gap-6">
                      <h3
                        className="text-[#1F2937] text-lg lg:text-xl leading-snug"
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                      >
                        {item.question}
                      </h3>
                      <span
                        className={`shrink-0 grid place-items-center w-9 h-9 rounded-full transition-colors duration-200 ${
                          isOpen ? "bg-[#0E3D39] text-white" : "bg-[#EAF6F4] text-[#0E3D39]"
                        }`}
                      >
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-[#5F6B73] text-sm leading-relaxed pt-4 pr-10">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ──────────────────────────────────────── */}
        <section className="bg-[#07312C] mx-4 mb-16 rounded-[32px] overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <h2
              className="text-white text-4xl font-extrabold leading-tight"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Ready to transform your{" "}
              <span className="text-[#D4F04A]">workplace?</span>
            </h2>
            <p className="mt-4 text-white/60 text-base max-w-xl mx-auto">
              Join 50+ organisations already using Humanova to build healthier, more resilient teams.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <button
                type="button"
                onClick={openModal}
                className="inline-flex items-center gap-2 rounded-full bg-[#D4F04A] px-8 py-3.5 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(212,240,74,0.3)] hover:shadow-[0_8px_40px_rgba(212,240,74,0.5)] transition-shadow cursor-pointer"
              >
                Get a Free Demo
              </button>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                View Pricing
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ── Placeholder data (overridden per page) ─────────────────── */

const PLACEHOLDER_STATS = [
  { value: "50+", label: "Organisations" },
  { value: "10k+", label: "Employees served" },
  { value: "92%", label: "Satisfaction rate" },
  { value: "3×", label: "ROI reported" },
];

const PlaceholderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
);

const PLACEHOLDER_TESTIMONIALS = [
  {
    quote: "Humanova gave us the visibility we needed into team wellbeing without compromising employee privacy. It's been a game changer.",
    author: "Sarah Mitchell",
    role: "Head of People, FinTech Corp",
    avatarColor: "#2C8C91",
  },
  {
    quote: "We saw a 40% drop in burnout-related absences within six months. The data-driven approach really resonated with our leadership team.",
    author: "James Chen",
    role: "CHRO, Global Manufacturing",
    avatarColor: "#4A90D9",
  },
  {
    quote: "The onboarding was seamless. Our employees started using the wellness tools within days, and engagement has stayed consistently high.",
    author: "Priya Sharma",
    role: "HR Director, Healthcare Group",
    avatarColor: "#7C5CDB",
  },
  {
    quote: "As a fast-growing startup, we needed something that could scale with us. Humanova fits perfectly into our culture and pace.",
    author: "Tom Eriksson",
    role: "Co-Founder, NordicScale",
    avatarColor: "#E05FA0",
  },
  {
    quote: "The anonymous mood tracking helped us identify systemic issues we didn't even know existed. Now we can actually fix them.",
    author: "Elena Kowalski",
    role: "VP Operations, TechLogic",
    avatarColor: "#1AAF7E",
  },
  {
    quote: "Our employee satisfaction scores improved by 28% after rolling out Humanova across all departments. The ROI speaks for itself.",
    author: "David Okonkwo",
    role: "CEO, Public Sector Advisory",
    avatarColor: "#E8A020",
  },
];

const PLACEHOLDER_HOW_IT_WORKS = {
  image: BANNER_IMG,
  title: "How Does It Work?",
  ctaLabel: "Learn More",
  ctaHref: "#how-it-works",
  items: [
    { icon: <ClipboardCheck size={20} />, title: "Easy Onboarding", desc: "Roll out to your team in minutes with guided setup, no IT overhead." },
    { icon: <Activity size={20} />, title: "Real-time Wellness Tracking", desc: "AI-powered mood and reflection insights, updated continuously." },
    { icon: <BarChart3 size={20} />, title: "Actionable HR Insights", desc: "Clear, exportable reports your admin team can act on immediately." },
  ],
};

const PLACEHOLDER_SERVICES = {
  headline: "Everything Your Team",
  subline: "Needs, In One Platform",
  items: [
    { icon: <ActivitySquare size={22} />, title: "Wellness Tracking", desc: "AI-powered mood detection and reflection insights for every employee." },
    { icon: <ShieldCheck size={22} />,    title: "Data Security",     desc: "Enterprise-grade encryption keeps every record private and safe." },
    { icon: <CalendarClock size={22} />,  title: "Shift Management",  desc: "Assign, swap, and track shifts without the back-and-forth." },
    { icon: <HeadphonesIcon size={22} />, title: "Team Support",      desc: "Confidential support channels your team can reach any time." },
    { icon: <ClipboardList size={22} />,  title: "Leave Management",  desc: "Requests, approvals, and conflict handling in one clean flow." },
    { icon: <BarChart3 size={22} />,      title: "HR Analytics",      desc: "Clear dashboards HR can act on, not just look at." },
  ],
};

const PLACEHOLDER_FAQS = {
  headline: "Clear answers for a smoother rollout",
  items: [
    {
      question: "What kind of wellness problems do you solve?",
      answer:
        "We help HR teams track employee mood and morale, catch burnout early, streamline leave and shift management, and give managers visibility without breaching anyone's privacy.",
    },
    {
      question: "How long does onboarding take?",
      answer:
        "Most schools and organisations are fully onboarded within a week — account setup, admin training, and employee invites included.",
    },
    {
      question: "Do you work with schools and small organisations?",
      answer:
        "Yes. Humanova is built for both large enterprises and smaller teams like schools, with plans that scale to headcount.",
    },
    {
      question: "How do you measure wellbeing improvement?",
      answer:
        "Dashboards track mood trends, engagement with support features, and leave/shift patterns over time, so HR can see real movement, not just raw numbers.",
    },
    {
      question: "Is our employee data kept private?",
      answer:
        "Individual check-ins and confidential chats stay private to the employee. Managers only ever see aggregated, anonymised trends.",
    },
  ],
};

const PLACEHOLDER_FAQ_CTA = {
  title: "Still have questions?",
  desc: "Need clarity before rolling this out? Talk to our team and get direct answers for your organisation.",
  ctaLabel: "Book a Consultation",
  ctaHref: "#request-demo",
};