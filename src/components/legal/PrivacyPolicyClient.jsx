"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DemoButton from "@/components/ui/DemoButton";
import {
  Shield,
  Eye,
  Share2,
  Cookie,
  Clock,
  Lock,
  UserCheck,
  Building2,
  ExternalLink,
  Baby,
  RefreshCw,
  Scale,
  Mail,
  Search,
  ShieldCheck,
  UserX,
  HeartPulse,
  KeyRound,
  FileText,
  ClipboardList,
  ChevronUp,
  MessageSquare,
} from "lucide-react";

/* ── Animation ────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

/* ── Section data ─────────────────────────────────────────────── */
const sections = [
  {
    id: "information-we-collect",
    number: 1,
    icon: ClipboardList,
    title: "Information We Collect",
    content: [
      {
        subtitle: "Personal & Professional Information",
        text: "We collect name, email address, phone number, organization name, role, professional details, communication preferences, and participation records.",
      },
      {
        subtitle: "Wellbeing & Program-Related Information",
        text: "We collect self-reported wellbeing inputs shared during assessments or sessions, program participation data, feedback, responses, and coaching or facilitation interaction data (non-clinical). Humanova does not collect medical records, clinical diagnoses, or emergency health data.",
      },
      {
        subtitle: "Technical & Usage Data",
        text: "We collect IP address, browser type, device information, website and platform usage analytics, and cookies and session data.",
      },
    ],
  },
  {
    id: "how-we-use-information",
    number: 2,
    icon: Eye,
    title: "How We Use Information",
    content: [
      {
        text: "Information collected is used to deliver and improve Humanova programs and Services, facilitate assessments, workshops, and learning experiences, communicate program updates, insights, and support information, analyze participation trends and improve service quality, and ensure platform security, compliance, and operational integrity.",
      },
      {
        text: "We do not sell personal data and do not use data for advertising profiling.",
        highlight: true,
      },
    ],
  },
  {
    id: "data-sharing",
    number: 3,
    icon: Share2,
    title: "Data Sharing & Disclosure",
    content: [
      {
        text: "We may share information only in limited circumstances, including with authorized facilitators, coaches, or partners delivering Humanova Services, with technology and analytics partners under confidentiality obligations, with client organizations in aggregated or anonymized form only (unless explicit individual consent is obtained), and when required by law, regulation, or lawful authority.",
      },
      {
        text: "Individual-level data is not shared with employers unless clearly disclosed and consented.",
        highlight: true,
      },
    ],
  },
  {
    id: "cookies",
    number: 4,
    icon: Cookie,
    title: "Cookies & Analytics",
    content: [
      {
        text: "Humanova uses cookies and similar technologies to improve website functionality and performance, understand usage patterns and content effectiveness, and maintain session continuity and security.",
      },
      {
        text: "Users may control cookies through browser settings; disabling cookies may affect some features.",
      },
    ],
  },
  {
    id: "data-retention",
    number: 5,
    icon: Clock,
    title: "Data Retention",
    content: [
      {
        text: "We retain information only for as long as necessary to fulfill program delivery and contractual obligations, meet legal, regulatory, or audit requirements, and maintain service quality and platform integrity.",
      },
      {
        text: "Data no longer required is securely deleted or anonymized.",
      },
    ],
  },
  {
    id: "data-security",
    number: 6,
    icon: Lock,
    title: "Data Security",
    content: [
      {
        text: "We implement reasonable administrative, technical, and organizational safeguards to protect data, including access controls and role-based permissions, secure hosting environments and encrypted communications, and internal data handling and confidentiality protocols.",
      },
      {
        text: "While we strive for strong protection, no digital system can guarantee absolute security.",
      },
    ],
  },
  {
    id: "user-rights",
    number: 7,
    icon: UserCheck,
    title: "User Rights",
    content: [
      {
        text: "Subject to applicable law, users may request to access or update their personal information, withdraw consent where applicable, and request deletion of data (subject to legal and contractual limits).",
      },
      {
        text: "Requests can be made through Humanova's official communication channels.",
      },
    ],
  },
  {
    id: "employer-programs",
    number: 8,
    icon: Building2,
    title: "Organizational & Employer Programs",
    content: [
      {
        text: "Where Services are accessed through an employer or institution, data handling is governed by contractual terms and this Privacy Policy. Employers receive only program-level insights, not personal disclosures.",
      },
      {
        text: "Humanova is not responsible for internal employer decisions or policies.",
      },
    ],
  },
  {
    id: "third-party",
    number: 9,
    icon: ExternalLink,
    title: "Third-Party Tools & Links",
    content: [
      {
        text: "Humanova may use third-party platforms for hosting, communication, or analytics. Such providers operate under their own privacy policies.",
      },
      {
        text: "Humanova is not responsible for third-party practices outside its control.",
      },
    ],
  },
  {
    id: "childrens-privacy",
    number: 10,
    icon: Baby,
    title: "Children's Privacy",
    content: [
      {
        text: "Humanova Services are intended for adults. We do not knowingly collect data from individuals under 18. If such data is identified, it will be deleted promptly.",
      },
    ],
  },
  {
    id: "updates",
    number: 11,
    icon: RefreshCw,
    title: "Updates to This Privacy Policy",
    content: [
      {
        text: "This Privacy Policy may be updated periodically. Updates will be published on the website. Continued use of Services constitutes acceptance of revised terms.",
      },
    ],
  },
  {
    id: "governing-law",
    number: 12,
    icon: Scale,
    title: "Governing Law",
    content: [
      {
        text: "This Privacy Policy is governed by the laws of India, including applicable data protection and information technology regulations.",
      },
    ],
  },
  {
    id: "contact",
    number: 13,
    icon: Mail,
    title: "Contact Information",
    content: [
      {
        text: "For questions, concerns, or data-related requests, please contact Humanova through the official contact details provided on the website.",
      },
    ],
  },
];

/* ── Quick links for sidebar ──────────────────────────────────── */
const quickLinks = [
  { icon: ClipboardList, label: "What we collect", id: "information-we-collect" },
  { icon: Eye, label: "How we use data", id: "how-we-use-information" },
  { icon: UserCheck, label: "Your rights", id: "user-rights" },
  { icon: Lock, label: "Data security", id: "data-security" },
];

/* ── Key commitments data ─────────────────────────────────────── */
const commitments = [
  {
    icon: ShieldCheck,
    title: "We Don't Sell Your Data",
    desc: "Your personal information is never sold to third parties for advertising or marketing purposes.",
  },
  {
    icon: UserX,
    title: "Employer Privacy",
    desc: "Individual-level data is not shared with employers unless you explicitly consent.",
  },
  {
    icon: HeartPulse,
    title: "No Clinical Data",
    desc: "We do not collect medical records, clinical diagnoses, or emergency health data.",
  },
  {
    icon: KeyRound,
    title: "Your Rights",
    desc: "You can access, update, or request deletion of your personal information at any time.",
  },
];

/* ── Sidebar search ───────────────────────────────────────────── */
function SidebarSearch({ value, onChange }) {
  return (
    <div className="relative">
      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9BA9B4]" />
      <input
        type="text"
        placeholder="Search policy..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-[#E5DED6] rounded-xl text-[#1F2937] placeholder:text-[#C0BDB8] focus:outline-none focus:ring-2 focus:ring-[#2C8C91]/30 focus:border-[#2C8C91] transition-all"
      />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════ */
/*  PAGE                                                           */
/* ════════════════════════════════════════════════════════════════ */
export default function PrivacyPolicyClient() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const contentRef = useRef(null);

  /* ── Intersection observer for active section tracking ── */
  useEffect(() => {
    const observers = [];
    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(section.id);
        },
        { rootMargin: "-120px 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ── Back to top visibility ── */
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Filtered sections ── */
  const filteredSections = searchQuery
    ? sections.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.content.some((c) =>
            (c.text + (c.subtitle || "")).toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : sections;

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />
      <main>
        {/* ── HERO ────────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 pt-28 pb-14 md:pt-36 md:pb-20">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.04]"
              style={{ background: "radial-gradient(circle, #2C8C91 0%, transparent 70%)" }}
            />
          </div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="relative mx-auto max-w-4xl text-center"
          >

            <motion.h1
              variants={fadeUp}
              className="mt-7 text-4xl leading-[1.1] text-[#1F2937] md:text-5xl lg:text-[3.4rem]"
              style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
            >
              Your Privacy Matters
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-2xl text-lg text-[#5F6B73] leading-relaxed"
            >
              We are committed to protecting your privacy and handling your data
              responsibly.
            </motion.p>
          </motion.div>
        </section>

        {/* ── CONTENT AREA — sidebar + sections ───────────────── */}
        <section className="px-6 pb-10 md:pb-18" ref={contentRef}>
          <div className="mx-auto max-w-6xl flex gap-10">
            {/* ── LEFT SIDEBAR — sticky ── */}
            <aside className="hidden lg:block w-[260px] shrink-0">
              <div className="sticky top-28 space-y-6">
                {/* Quick links */}
                <div className="rounded-2xl border border-[#E5DED6] bg-white p-5">
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#9BA9B4] mb-3"
                  >
                    Quick Links
                  </p>
                  <ul className="space-y-1.5">
                    {quickLinks.map((link) => (
                      <li key={link.id}>
                        <a
                          href={`#${link.id}`}
                          className="flex items-center gap-2.5 text-sm text-[#5F6B73] hover:text-[#2C8C91] py-1.5 px-2 rounded-lg hover:bg-[#2C8C91]/5 transition-all duration-150"
                        >
                          <link.icon size={14} className="shrink-0 text-[#2C8C91]/60" />
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Search */}
                <SidebarSearch value={searchQuery} onChange={setSearchQuery} />

                {/* All sections nav */}
                <div className="rounded-2xl border border-[#E5DED6] bg-white p-5">
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#9BA9B4] mb-3"
                  >
                    All Sections
                  </p>
                  <nav>
                    <ul className="space-y-0.5">
                      {sections.map((s) => {
                        const isActive = activeSection === s.id;
                        const isFiltered =
                          searchQuery && !filteredSections.find((f) => f.id === s.id);
                        return (
                          <li key={s.id}>
                            <a
                              href={`#${s.id}`}
                              className={`flex items-start gap-2.5 text-[13px] py-2 px-2.5 rounded-lg transition-all duration-150 ${
                                isFiltered
                                  ? "opacity-30"
                                  : isActive
                                  ? "bg-[#2C8C91]/8 text-[#2C8C91] font-medium"
                                  : "text-[#5F6B73] hover:text-[#1F2937] hover:bg-[#FAF7F2]"
                              }`}
                            >
                              <span className={`shrink-0 text-[11px] font-bold mt-0.5 w-4 text-right ${isActive ? "text-[#2C8C91]" : "text-[#C0BDB8]"}`}>
                                {s.number}.
                              </span>
                              <span className="leading-snug">{s.title}</span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>
              </div>
            </aside>

            {/* ── MAIN CONTENT ── */}
            <div className="flex-1 min-w-0">
              {filteredSections.map((section, idx) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={fadeUp}
                  className={`scroll-mt-28 ${idx > 0 ? "mt-2" : ""}`}
                >
                  <div className="rounded-2xl border border-[#E5DED6] bg-white p-7 md:p-9 mb-5">
                    {/* Section header */}
                    <div className="flex items-start gap-4 mb-5">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#2C8C91]/8 shrink-0">
                        <section.icon size={18} className="text-[#2C8C91]" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-[#2C8C91]">
                          Section {section.number}
                        </p>
                        <h2
                          className="text-xl md:text-2xl text-[#1F2937] mt-0.5"
                          style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
                        >
                          {section.title}
                        </h2>
                      </div>
                    </div>

                    {/* Section content */}
                    <div className="space-y-5 pl-0 md:pl-14">
                      {section.content.map((block, bIdx) => (
                        <div key={bIdx}>
                          {block.subtitle && (
                            <h3
                              className="text-[15px] font-semibold text-[#1F2937] mb-2"
                              style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
                            >
                              {block.subtitle}
                            </h3>
                          )}
                          <p
                            className={`text-sm leading-relaxed ${
                              block.highlight
                                ? "text-[#2C8C91] font-medium bg-[#2C8C91]/5 border border-[#2C8C91]/15 rounded-xl px-4 py-3"
                                : "text-[#5F6B73]"
                            }`}
                          >
                            {block.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}

              {searchQuery && filteredSections.length === 0 && (
                <div className="text-center py-16">
                  <Search size={32} className="mx-auto text-[#D0D8DC] mb-3" />
                  <p className="text-[#5F6B73]">No sections match &ldquo;{searchQuery}&rdquo;</p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-3 text-sm text-[#2C8C91] hover:underline"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── KEY COMMITMENTS ─────────────────────────────────── */}
        <section className="bg-[#F3EEE8] px-6 py-10 md:py-12">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger}
              className="text-center"
            >
              <motion.span
                variants={fadeUp}
                className="text-sm font-semibold uppercase tracking-widest text-[#2C8C91]"
              >
                Our Key Commitments
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="mt-3 text-3xl text-[#1F2937] md:text-4xl"
                style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
              >
                Built on trust, by design
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {commitments.map((c) => (
                <motion.div
                  key={c.title}
                  variants={fadeUp}
                  className="card-lift rounded-2xl border border-[#E5DED6] bg-white p-7 text-center"
                >
                  <div className="mx-auto flex h-13 w-13 items-center justify-center rounded-2xl bg-[#2C8C91]/8">
                    <c.icon size={22} className="text-[#2C8C91]" />
                  </div>
                  <h3
                    className="mt-4 text-base font-semibold text-[#1F2937]"
                    style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
                  >
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#5F6B73] leading-relaxed">
                    {c.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── BOTTOM CTA ──────────────────────────────────────── */}
        <section className="px-6 py-10 md:py-18">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="mx-auto max-w-3xl rounded-3xl border border-[#E5DED6] bg-white p-10 md:p-14 text-center shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)]"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2C8C91]/10 mb-5">
              <MessageSquare size={24} className="text-[#2C8C91]" />
            </div>
            <h2
              className="text-2xl text-[#1F2937] md:text-3xl"
              style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
            >
              Have questions?
            </h2>
            <p className="mt-3 text-[#5F6B73] leading-relaxed max-w-lg mx-auto">
              If you have any questions about this Privacy Policy, please don&apos;t
              hesitate to contact us.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <DemoButton
                variant="primary"
                size="md"
                className="rounded-2xl"
              >
                Contact Support
              </DemoButton>
              <Link
                href="/terms"
                className="inline-flex items-center gap-2 rounded-2xl border border-[#E5DED6] hover:border-[#2C8C91] px-6 py-3 text-sm font-semibold text-[#1F2937] hover:text-[#2C8C91] bg-white transition-all duration-200"
              >
                View Terms & Conditions
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />

      {/* ── Back to top ── */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: showBackToTop ? 1 : 0,
          scale: showBackToTop ? 1 : 0.8,
          pointerEvents: showBackToTop ? "auto" : "none",
        }}
        transition={{ duration: 0.2 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 z-40 flex items-center justify-center w-11 h-11 rounded-full bg-[#2C8C91] text-white shadow-lg hover:bg-[#1B6E73] transition-colors"
        aria-label="Back to top"
      >
        <ChevronUp size={18} />
      </motion.button>
    </div>
  );
}
