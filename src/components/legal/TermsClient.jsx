"use client";

import { useState, useEffect } from "react";
import { motion, number } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DemoButton from "@/components/ui/DemoButton";
import {
  FileText,
  CheckSquare,
  Layers,
  Stethoscope,
  UserCog,
  Building2,
  CreditCard,
  Copyright,
  Lock,
  Globe,
  AlertTriangle,
  Shield,
  Pause,
  RefreshCw,
  Scale,
  Mail,
  Search,
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
    id: "acceptance",
    number: 1,
    icon: CheckSquare,
    title: "Acceptance of Terms",
    content: [
      {
        text: "By accessing or using the Humanova Services, you confirm that you are at least 18 years of age and have the legal capacity to enter into a binding agreement.",
      },
      {
        text: "If you are accessing the Services on behalf of an organization, institution, or employer, you represent that you are duly authorized to bind such entities to these Terms.",
      },
    ],
  },
  {
    id: "scope",
    number: 2,
    icon: Layers,
    title: "Scope of Services",
    content: [
      {
        text: "Humanova provides non-clinical, preventive, developmental, and wellbeing-oriented services, which may include but are not limited to: Corporate wellbeing programs, Human performance and resilience coaching, Mental wellbeing awareness and support (non-therapeutic), Leadership, communication, and behavioral development programs, Assessments, workshops, digital tools, and advisory frameworks.",
      },
      {
        text: "Humanova does not provide emergency care, clinical treatment, diagnosis, or medical interventions. All Services are designed for awareness, capability-building, and support, not for replacing professional medical, psychiatric, or therapeutic care.",
        highlight: true,
      },
    ],
  },
  {
    id: "no-medical",
    number: 3,
    icon: Stethoscope,
    title: "No Medical or Clinical Advice",
    content: [
      {
        text: "Humanova Services do not constitute medical advice, diagnosis, psychotherapy, or treatment and are not a substitute for consultation with qualified medical, psychiatric, or healthcare professionals.",
      },
      {
        text: "Services should not be relied upon in medical emergencies or for clinical decision-making. If you believe you are experiencing a medical or mental health emergency, you should immediately contact local emergency services or a licensed healthcare professional.",
        highlight: true,
      },
    ],
  },
  {
    id: "user-responsibilities",
    number: 4,
    icon: UserCog,
    title: "User Responsibilities",
    content: [
      {
        text: "By using Humanova Services, you agree to provide accurate, current, and complete information when required, and use the Services only for lawful, intended, and ethical purposes.",
      },
      {
        text: "You must refrain from misrepresenting information, impersonating others, or disrupting platform operations, and respect the dignity, confidentiality, and boundaries of facilitators, coaches, and other participants.",
      },
    ],
  },
  {
    id: "employer-use",
    number: 5,
    icon: Building2,
    title: "Organizational & Employer Use",
    content: [
      {
        text: "Where Services are accessed through an employer, institution, or partner organization, access may be subject to additional agreements between Humanova and the organization.",
      },
      {
        text: "Humanova is not responsible for employer decisions, internal policies, or actions taken based on program participation. Data handling will follow contractual and applicable legal requirements.",
      },
    ],
  },
  {
    id: "fees",
    number: 6,
    icon: CreditCard,
    title: "Fees, Commercial Terms & Payments",
    content: [
      {
        text: "Certain Services may be offered on a paid, subscription, or contractual basis. By purchasing or accessing paid Services, you agree to pay all applicable fees as agreed or displayed and comply with commercial terms communicated at the time of engagement.",
      },
      {
        text: "Fees are generally non-refundable unless explicitly stated otherwise in writing. The Company reserves the right to revise pricing, service structures, or offerings with reasonable notice.",
      },
    ],
  },
  {
    id: "ip",
    number: 7,
    icon: Copyright,
    title: "Intellectual Property",
    content: [
      {
        text: "All content, materials, frameworks, assessments, trademarks, logos, and methodologies used or displayed in connection with Humanova are the exclusive intellectual property of Misafir Support LLP or its licensors.",
      },
      {
        text: "You may not copy, reproduce, distribute, modify, or commercially exploit any content, or use Humanova branding or materials without prior written permission.",
      },
    ],
  },
  {
    id: "confidentiality",
    number: 8,
    icon: Lock,
    title: "Confidentiality & Privacy",
    content: [
      {
        text: "Your use of Humanova Services is subject to our Privacy Policy, which governs how personal and organizational data is collected, processed, stored, and protected.",
      },
      {
        text: "You acknowledge that certain sessions may involve sensitive discussions and that Humanova will take reasonable measures to protect confidentiality but cannot guarantee absolute security in digital environments.",
      },
    ],
  },
  {
    id: "third-party",
    number: 9,
    icon: Globe,
    title: "Third-Party Providers & Tools",
    content: [
      {
        text: "Humanova may engage third-party facilitators, platforms, or tools to deliver parts of its Services. Such third parties operate under their own policies and obligations.",
      },
      {
        text: "Humanova is not responsible for third-party acts, omissions, or independent services. Use of third-party tools is at your own discretion and risk.",
      },
    ],
  },
  {
    id: "liability",
    number: 10,
    icon: AlertTriangle,
    title: "Limitation of Liability",
    content: [
      {
        text: "To the maximum extent permitted by law, Misafir Support LLP and Humanova shall not be liable for any indirect, incidental, consequential, special, or punitive damages, or decisions, actions, or outcomes arising from participation in Humanova programs.",
      },
      {
        text: "We are not liable for loss of business, reputation, data, or goodwill, or interruptions or unavailability of Services due to factors beyond reasonable control. Your use of the Services is entirely at your own risk.",
      },
    ],
  },
  {
    id: "indemnification",
    number: 11,
    icon: Shield,
    title: "Indemnification",
    content: [
      {
        text: "You agree to indemnify and hold harmless Misafir Support LLP, Humanova, its officers, employees, partners, and affiliates from any claims, damages, liabilities, or expenses arising from your misuse of the Services, violation of these Terms, or breach of applicable laws or third-party rights.",
      },
    ],
  },
  {
    id: "termination",
    number: 12,
    icon: Pause,
    title: "Suspension & Termination",
    content: [
      {
        text: "The Company reserves the right to suspend or terminate access to the Services, without prior notice, if these Terms are violated, use is deemed harmful, abusive, unlawful, or reputationally damaging, or if required by law or regulatory authority.",
      },
    ],
  },
  {
    id: "modifications",
    number: 13,
    icon: RefreshCw,
    title: "Modifications to Terms",
    content: [
      {
        text: "The Company may update these Terms from time to time. Updated Terms will be posted on the website.",
      },
      {
        text: "Continued use of the Services constitutes acceptance of revised Terms.",
      },
    ],
  },
  {
    id: "governing-law",
    number: 14,
    icon: Scale,
    title: "Governing Law & Dispute Resolution",
    content: [
      {
        text: "These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be resolved through arbitration in accordance with the Arbitration and Conciliation Act, 1996.",
      },
      {
        text: "Seat and venue of arbitration: Delhi NCR. Language: English.",
      },
    ],
  },
  {
    id: "contact",
    number: 15,
    icon: Mail,
    title: "Contact Information",
    content: [
      {
        text: "For questions, concerns, or legal notices related to these Terms, please contact us through the official Humanova communication channels listed on the website.",
      },
    ],
  },
];



/* ── Sidebar search ───────────────────────────────────────────── */
function SidebarSearch({ value, onChange }) {
  return (
    <div className="relative">
      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9BA9B4]" />
      <input
        type="text"
        placeholder="Search terms..."
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
export default function TermsClient() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

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
            c.text.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : sections;

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />
      <main>
        {/* ── HERO ────────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 pt-10 pb-14 md:pt-6 md:pb-10">
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
              Terms & Conditions
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-2xl text-lg text-[#5F6B73] leading-relaxed"
            >
              These Terms and Conditions govern your access to and use of our
              website, app, and services. By using our Services, you agree to
              comply with these Terms.
            </motion.p>
          </motion.div>
        </section>

        {/* ── CONTENT AREA — sidebar + sections ───────────────── */}
        <section className="px-6 pb-10 md:pb-8">
          <div className="mx-auto max-w-6xl flex gap-10">
            {/* ── LEFT SIDEBAR — sticky ── */}
            <aside className="hidden lg:block w-[260px] shrink-0">
              <div className="sticky top-28 space-y-6">
                {/* Search */}
                <SidebarSearch value={searchQuery} onChange={setSearchQuery} />

                {/* Contents nav */}
                <div className="rounded-2xl border border-[#E5DED6] bg-white p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#9BA9B4] mb-3">
                    Contents
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
                              <span
                                className={`shrink-0 text-[11px] font-bold mt-0.5 w-5 text-right ${
                                  isActive ? "text-[#2C8C91]" : "text-[#C0BDB8]"
                                }`}
                              >
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
                        <p
                          key={bIdx}
                          className={`text-sm leading-relaxed ${
                            block.highlight
                              ? "text-[#2C8C91] font-medium bg-[#2C8C91]/5 border border-[#2C8C91]/15 rounded-xl px-4 py-3"
                              : "text-[#5F6B73]"
                          }`}
                        >
                          {block.text}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}

              {searchQuery && filteredSections.length === 0 && (
                <div className="text-center py-16">
                  <Search size={32} className="mx-auto text-[#D0D8DC] mb-3" />
                  <p className="text-[#5F6B73]">
                    No sections match &ldquo;{searchQuery}&rdquo;
                  </p>
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

        {/* ── BOTTOM CTA ──────────────────────────────────────── */}
        <section className="px-6 py-10 md:py-4 mb-10">
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
              If you have any questions about these Terms and Conditions, please
              don&apos;t hesitate to contact us.
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
                href="/privacy-policy"
                className="inline-flex items-center gap-2 rounded-2xl border border-[#E5DED6] hover:border-[#2C8C91] px-6 py-3 text-sm font-semibold text-[#1F2937] hover:text-[#2C8C91] bg-white transition-all duration-200"
              >
                View Privacy Policy
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
