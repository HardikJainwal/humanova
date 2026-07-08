"use client";

import { useState } from "react";
import { useDemoModal } from "@/context/DemoModalContext";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import {
  ArrowRight, ChevronDown, ChevronUp, Zap, Check,
  Clock, Users, Target, Sparkles, BookOpen, GraduationCap,
} from "lucide-react";

/**
 * ProgramPageTemplate
 * Reusable base for all 5 Programs sub-pages.
 * DISTINCT design from SolutionPageTemplate — editorial, warm, human-touch feel.
 *
 * Props:
 *  - badge        string    colored label (e.g. "Most Popular")
 *  - headline     ReactNode
 *  - subheadline  string
 *  - accentColor  string    hex — drives the page accent (defaults teal)
 *  - highlights   [{ label, value }]  max 3 — quick program facts
 *  - modules      [{ number, title, desc }] max 5 — curriculum steps
 *  - outcomes     [{ stat, desc }]  max 4 — measurable outcomes
 *  - whoIsItFor   [{ title, desc }]  max 4 — audience personas
 *  - faqs         { headline, items: [{ question, answer }] }
 *  - ctaTitle     string
 *  - ctaDesc      string
 */
export default function ProgramPageTemplate({
  // badge         = "Program",
  headline      = "Placeholder Headline",
  subheadline   = "Placeholder subheadline text.",
  accentColor   = "#2C8C91",
  highlights    = PLACEHOLDER_HIGHLIGHTS,
  modules       = PLACEHOLDER_MODULES,
  outcomes      = PLACEHOLDER_OUTCOMES,
  whoIsItFor    = PLACEHOLDER_AUDIENCE,
  faqs          = PLACEHOLDER_FAQS,
  ctaTitle      = "Ready to get started?",
  ctaDesc       = "Book a free consultation and discover how this program can transform your team.",
}) {
  const [openFaq, setOpenFaq] = useState(0);
  const { open: openModal } = useDemoModal();

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      <main>

        {/* ── HERO — editorial, warm, no bg image ────────────── */}
        <section className="relative overflow-hidden -mt-24 pt-40 lg:pt-48 pb-20 lg:pb-28">
          {/* Decorative accent blob */}
          <div
            className="absolute -top-20 -right-40 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.12]"
            style={{ background: accentColor }}
          />
          <div
            className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.08]"
            style={{ background: accentColor }}
          />

          <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 text-center">
            {/* Badge pill */}
            {/* <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] mb-8"
              style={{ background: `${accentColor}15`, color: accentColor }}
            >
              <Sparkles size={13} />
              {badge}
            </span> */}

            {/* Headline — large editorial serif */}
            <h1
              className="text-[#0E3D39] text-4xl sm:text-5xl lg:text-[3.8rem] leading-[1.1] tracking-tight mb-6"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {headline}
            </h1>

            {/* Subheadline */}
            <p className="text-[#5F6B73] text-lg lg:text-xl leading-[1.7] max-w-2xl mx-auto mb-10">
              {subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                type="button"
                onClick={openModal}
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer"
                style={{ background: accentColor }}
              >
                Enrol Your Team
                <ArrowRight size={15} />
              </button>
              <button
                type="button"
                onClick={openModal}
                className="inline-flex items-center gap-2 rounded-full border-2 px-8 py-4 text-sm font-semibold transition-colors duration-200 cursor-pointer"
                style={{ borderColor: `${accentColor}30`, color: accentColor }}
              >
                Download Brochure
              </button>
            </div>
          </div>
        </section>

        {/* ── PROGRAM HIGHLIGHTS — horizontal fact strip ──────── */}
        <section className="max-w-5xl mx-auto px-6 lg:px-10 -mt-4 mb-16 lg:mb-24">
          <div className="bg-white rounded-[24px] border border-[#E5DED6] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] p-8">
            <div className="grid sm:grid-cols-3 gap-6 sm:divide-x divide-[#E5DED6]">
              {highlights.map(({ label, value, icon }) => (
                <div key={label} className="flex items-center gap-4 px-4 first:pl-0">
                  <div
                    className="w-12 h-12 rounded-2xl grid place-items-center shrink-0"
                    style={{ background: `${accentColor}12`, color: accentColor }}
                  >
                    {icon}
                  </div>
                  <div>
                    <p
                      className="text-[#0E3D39] text-xl font-bold leading-tight"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {value}
                    </p>
                    <p className="text-[#8FA8A3] text-xs uppercase tracking-wider font-medium mt-0.5">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CURRICULUM — vertical timeline ─────────────────── */}
        <section className="max-w-5xl mx-auto px-6 lg:px-10 mb-20 lg:mb-28">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-5">
              <BookOpen size={15} style={{ color: accentColor }} />
              <span className="text-[#1F2937] text-xs font-bold uppercase tracking-[0.15em]">
                What You&apos;ll Learn
              </span>
            </div>
            <h2
              className="text-[#0E3D39] text-3xl lg:text-[2.8rem] leading-[1.15]"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Program curriculum
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative max-w-2xl mx-auto">
            {/* Vertical line */}
            <div
              className="absolute left-6 top-6 bottom-6 w-[2px] rounded-full hidden sm:block"
              style={{ background: `${accentColor}20` }}
            />

            <div className="flex flex-col gap-8">
              {modules.map(({ number, title, desc }, i) => (
                <div key={title} className="flex gap-5 sm:gap-7 group">
                  {/* Number circle */}
                  <div className="shrink-0 relative z-10">
                    <div
                      className="w-12 h-12 rounded-full grid place-items-center text-white text-sm font-bold shadow-lg"
                      style={{ background: accentColor }}
                    >
                      {number || `0${i + 1}`}
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="flex-1 bg-white rounded-[20px] border border-[#E5DED6] p-6 group-hover:border-transparent group-hover:shadow-[0_8px_32px_-8px_rgba(44,140,145,0.12)] transition-all duration-300">
                    <h3
                      className="text-[#0E3D39] text-lg font-semibold mb-2"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {title}
                    </h3>
                    <p className="text-[#5F6B73] text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── KEY OUTCOMES — large statement cards ────────────── */}
        <section className="mb-20 lg:mb-28">
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 mb-5">
                <Target size={15} style={{ color: accentColor }} />
                <span className="text-[#1F2937] text-xs font-bold uppercase tracking-[0.15em]">
                  Measurable Impact
                </span>
              </div>
              <h2
                className="text-[#0E3D39] text-3xl lg:text-[2.8rem] leading-[1.15]"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Results you can measure
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {outcomes.map(({ stat, desc }, i) => {
                const palettes = [
                  { bg: "#0E3D39", text: "#fff", accent: "#D4F04A" },
                  { bg: "#fff", text: "#0E3D39", accent: accentColor },
                  { bg: "#fff", text: "#0E3D39", accent: accentColor },
                  { bg: "#0E3D39", text: "#fff", accent: "#D4F04A" },
                ];
                const p = palettes[i % palettes.length];

                return (
                  <div
                    key={desc}
                    className="rounded-[24px] p-8 lg:p-10 border transition-all duration-300 hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)]"
                    style={{
                      background: p.bg,
                      borderColor: p.bg === "#fff" ? "#E5DED6" : "transparent",
                    }}
                  >
                    <p
                      className="text-4xl lg:text-5xl font-extrabold mb-4 leading-none"
                      style={{ fontFamily: "var(--font-outfit)", color: p.accent }}
                    >
                      {stat}
                    </p>
                    <p
                      className="text-xl leading-snug"
                      style={{
                        fontFamily: "'Instrument Serif', serif",
                        color: p.bg === "#fff" ? "#0E3D39" : "rgba(255,255,255,0.8)",
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── WHO IT'S FOR — persona cards ────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 lg:px-10 mb-20 lg:mb-28">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-5">
              <Users size={15} style={{ color: accentColor }} />
              <span className="text-[#1F2937] text-xs font-bold uppercase tracking-[0.15em]">
                Who It&apos;s For
              </span>
            </div>
            <h2
              className="text-[#0E3D39] text-3xl lg:text-[2.8rem] leading-[1.15]"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Built for your people
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whoIsItFor.map(({ title, desc }, i) => {
              const colors = ["#2C8C91", "#7C5CDB", "#E05FA0", "#E8A020"];
              const c = colors[i % colors.length];
              return (
                <div
                  key={title}
                  className="bg-white rounded-[24px] border border-[#E5DED6] p-6 text-center hover:shadow-[0_8px_32px_-8px_rgba(44,140,145,0.12)] hover:border-transparent transition-all duration-300"
                >
                  {/* Colored top line */}
                  <div
                    className="w-10 h-1 rounded-full mx-auto mb-5"
                    style={{ background: c }}
                  />
                  <h3
                    className="text-[#0E3D39] font-semibold text-base mb-2"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {title}
                  </h3>
                  <p className="text-[#8FA8A3] text-xs leading-relaxed">
                    {desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── FAQ — inline expandable ────────────────────────── */}
        <section className="max-w-3xl mx-auto px-6 lg:px-10 mb-20 lg:mb-28">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-5">
              <Zap size={15} className="text-[#D4F04A] fill-[#D4F04A]" />
              <span className="text-[#1F2937] text-xs font-bold uppercase tracking-[0.15em]">
                Common Questions
              </span>
            </div>
            <h2
              className="text-[#0E3D39] text-3xl lg:text-[2.8rem] leading-[1.15]"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {faqs.headline || "Everything you need to know"}
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.items.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={item.question}
                  className={`rounded-[20px] border px-7 py-5 cursor-pointer transition-all duration-300 ${
                    isOpen
                      ? "bg-white border-transparent shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1)]"
                      : "bg-white/60 border-[#E5DED6] hover:bg-white hover:border-transparent hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)]"
                  }`}
                  onClick={() => setOpenFaq(isOpen ? -1 : i)}
                >
                  <div className="flex items-center justify-between gap-6">
                    {/* Numbered question */}
                    <div className="flex items-center gap-4">
                      <span
                        className="text-xs font-bold shrink-0"
                        style={{ color: accentColor }}
                      >
                        {`0${i + 1}`}
                      </span>
                      <h3
                        className="text-[#0E3D39] text-base lg:text-lg font-medium leading-snug"
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                      >
                        {item.question}
                      </h3>
                    </div>
                    <span
                      className={`shrink-0 grid place-items-center w-8 h-8 rounded-full transition-all duration-200 ${
                        isOpen ? "text-white rotate-0" : "bg-[#F4F9F8] text-[#0E3D39] rotate-0"
                      }`}
                      style={isOpen ? { background: accentColor } : {}}
                    >
                      {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
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
                        <p className="text-[#5F6B73] text-sm leading-relaxed pt-4 pl-8">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── BOTTOM CTA — warm gradient ─────────────────────── */}
        <section className="max-w-5xl mx-auto px-4 mb-16">
          <div
            className="rounded-[32px] overflow-hidden p-10 lg:p-14 text-center relative"
            style={{ background: accentColor }}
          >
            {/* Soft pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: "radial-gradient(#fff 1.5px, transparent 1.5px)",
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative z-10">
              <GraduationCap size={36} className="text-white/40 mx-auto mb-5" />
              <h2
                className="text-white text-3xl lg:text-4xl leading-[1.15] mb-4"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {ctaTitle}
              </h2>
              <p className="text-white/60 text-base max-w-lg mx-auto mb-8 leading-relaxed">
                {ctaDesc}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  type="button"
                  onClick={openModal}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  style={{ color: accentColor }}
                >
                  Book a Free Consultation
                  <ArrowRight size={15} />
                </button>
                <button
                  type="button"
                  onClick={openModal}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer"
                >
                  Talk to an Expert
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

/* ── Placeholder data (overridden per page) ─────────────────── */

const PLACEHOLDER_HIGHLIGHTS = [
  { icon: <Clock size={20} />, value: "8 Weeks", label: "Duration" },
  { icon: <Users size={20} />, value: "12–30", label: "Group Size" },
  { icon: <GraduationCap size={20} />, value: "Certified", label: "Accreditation" },
];

const PLACEHOLDER_MODULES = [
  { number: "01", title: "Foundation Assessment", desc: "Baseline evaluation of current wellbeing metrics, identifying key focus areas and personal development goals." },
  { number: "02", title: "Core Framework Training", desc: "Deep-dive into evidence-based techniques, interactive workshops, and practical frameworks for daily application." },
  { number: "03", title: "Guided Practice Sessions", desc: "Facilitated group sessions with expert coaches, role-playing scenarios, and peer feedback loops." },
  { number: "04", title: "Integration & Application", desc: "Applying learned techniques in real workplace situations with ongoing coach support and progress tracking." },
  { number: "05", title: "Outcomes & Certification", desc: "Final assessment, personalised report, certificate of completion, and 90-day follow-up plan." },
];

const PLACEHOLDER_OUTCOMES = [
  { stat: "85%", desc: "Of participants report improved stress management within 30 days" },
  { stat: "3.2×", desc: "Higher engagement scores compared to pre-program baseline" },
  { stat: "40%", desc: "Reduction in burnout-related absences across participating teams" },
  { stat: "92%", desc: "Would recommend the program to colleagues and peers" },
];

const PLACEHOLDER_AUDIENCE = [
  { title: "HR Leaders", desc: "Building organisation-wide wellness strategy and culture" },
  { title: "Team Managers", desc: "Supporting direct reports through daily challenges" },
  { title: "Individual Contributors", desc: "Developing personal resilience and growth mindset" },
  { title: "C-Suite Executives", desc: "Modelling healthy leadership from the top down" },
];

const PLACEHOLDER_FAQS = {
  headline: "Everything you need to know",
  items: [
    { question: "How is the program delivered?", answer: "Programs are delivered through a mix of live virtual workshops, self-paced modules, and 1-on-1 coaching sessions. All content is accessible through the Humanova platform." },
    { question: "Can the program be customised for our team?", answer: "Yes. Every program begins with a needs assessment so we can tailor content, pacing, and focus areas to your organisation's unique challenges." },
    { question: "What qualifications do the coaches have?", answer: "All Humanova coaches are certified professionals with backgrounds in organisational psychology, clinical psychology, or executive coaching, with a minimum of 5 years' experience." },
    { question: "How do you measure program success?", answer: "We track pre- and post-program metrics including engagement scores, absenteeism rates, self-reported wellbeing, and manager feedback. You receive a detailed impact report." },
    { question: "Is there ongoing support after the program ends?", answer: "Yes. All participants receive 90 days of follow-up support, access to our resource library, and optional monthly coaching check-ins." },
  ],
};
