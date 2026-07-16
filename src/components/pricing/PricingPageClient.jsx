"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DemoButton from "@/components/ui/DemoButton";
import {
  ChevronDown,
  ArrowRight,
  Users,
  BarChart3,
  Shield,
  HeartPulse,
  Brain,
  Sparkles,
  Globe,
  Headphones,
  Zap,
  Lock,
  TrendingUp,
  Award,
  Clock,
  MessageSquare,
  Building2,
  Layers,
  Settings,
  CheckCircle2,
  ArrowUpRight,
  Phone,
} from "lucide-react";

/* ── Animation variants ──────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

/* ── Animated counter ─────────────────────────────────────────── */
function AnimatedStat({ value, suffix = "", prefix = "", label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);
  const numericValue = parseFloat(value);

  useEffect(() => {
    if (!isInView) return;
    let frame;
    const duration = 1600;
    const start = performance.now();

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(eased * numericValue);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, numericValue]);

  const formatted = Number.isInteger(numericValue)
    ? Math.round(display)
    : display.toFixed(1);

  return (
    <div ref={ref} className="text-center">
      <p
        className="text-5xl md:text-6xl font-bold text-[#1F2937] tracking-tight"
        style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
      >
        {prefix}
        {formatted}
        {suffix}
      </p>
      <p className="mt-3 text-sm text-[#5F6B73] leading-relaxed max-w-[200px] mx-auto">
        {label}
      </p>
    </div>
  );
}

/* ── Capability data ──────────────────────────────────────────── */
const capabilities = [
  {
    icon: HeartPulse,
    title: "Wellbeing & Support",
    desc: "Employee check-ins, self-help resources, guided sessions, and proactive mental health support — all in one place.",
    gradient: "from-[#56C1C7]/10 to-[#2C8C91]/5",
  },
  {
    icon: Brain,
    title: "Coaching Programs",
    desc: "1-on-1 coaching for performance, leadership, life challenges, and sales resilience. Matched to individual needs.",
    gradient: "from-[#2C8C91]/10 to-[#1B6E73]/5",
  },
  {
    icon: BarChart3,
    title: "HR Analytics & Intelligence",
    desc: "Real-time dashboards, leave & attendance insights, engagement trends, and AI-powered recommendations for HR teams.",
    gradient: "from-[#1B6E73]/10 to-[#2C8C91]/5",
  },
  {
    icon: Layers,
    title: "Surveys & Pulse Checks",
    desc: "Custom surveys, pulse checks, and anonymous feedback loops that surface what matters most to your people.",
    gradient: "from-[#56C1C7]/10 to-[#2C8C91]/5",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "SSO/SAML, HRIS integrations, SOC 2 compliance, GDPR readiness, and role-based access — built for scale.",
    gradient: "from-[#2C8C91]/10 to-[#1B6E73]/5",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    desc: "A named success manager, custom onboarding, training for managers, and SLA-backed priority support.",
    gradient: "from-[#1B6E73]/10 to-[#2C8C91]/5",
  },
];

/* ── What shapes your plan ────────────────────────────────────── */
const pricingFactors = [
  {
    icon: Users,
    title: "Team size",
    desc: "Whether you're supporting 50 or 50,000 employees.",
  },
  {
    icon: Layers,
    title: "Programs & modules",
    desc: "Choose the wellbeing, coaching, and analytics modules you need.",
  },
  {
    icon: Settings,
    title: "Integrations & setup",
    desc: "SSO, HRIS, custom branding, and deployment preferences.",
  },
  {
    icon: Headphones,
    title: "Support level",
    desc: "From self-serve to a dedicated success manager and SLA.",
  },
];

/* ── Who it's for ─────────────────────────────────────────────── */
const audiences = [
  {
    icon: Building2,
    title: "Enterprises",
    desc: "Global deployment, advanced compliance, and deep analytics for complex organisations.",
  },
  {
    icon: TrendingUp,
    title: "Scale-ups",
    desc: "Scalable tools that grow with you — start lean, add more as your team evolves.",
  },
  {
    icon: Zap,
    title: "Startups",
    desc: "Lightweight wellbeing infrastructure from day one, without enterprise complexity.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare & Public Sector",
    desc: "Specialist support designed for high-pressure, regulated environments.",
  },
];

/* ── FAQ data ─────────────────────────────────────────────────── */
const faqs = [
  {
    q: "How does Humanova pricing work?",
    a: "Our pricing is fully tailored to your organisation. We consider your team size, the modules and programs you need, integration requirements, and support level. There are no rigid tiers — your plan is built around your priorities.",
  },
  {
    q: "Is there a minimum contract?",
    a: "We offer flexible engagement models. Most organisations start with an annual plan for the best value, but we're happy to discuss what works for your budget cycle and procurement process.",
  },
  {
    q: "Can we start small and expand later?",
    a: "Absolutely. Many of our customers begin with core wellbeing check-ins and analytics, then add coaching, surveys, and advanced intelligence as they see results. Your plan grows with you.",
  },
  {
    q: "Is there a free trial or pilot?",
    a: "We offer a guided pilot programme so you can experience Humanova with a subset of your team. No commitment — just a chance to see real impact before rolling out organisation-wide.",
  },
  {
    q: "Do you offer special pricing for non-profits?",
    a: "Yes. We have dedicated programmes for non-profits, educational institutions, and public sector organisations. Reach out and we'll put together something that works.",
  },
  {
    q: "What's the onboarding process?",
    a: "Every engagement begins with a kickoff call, platform configuration, and team training. Enterprise customers also receive a dedicated success manager and a custom rollout plan.",
  },
];

/* ── FAQ accordion ────────────────────────────────────────────── */
function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-[#E5DED6] last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2C8C91] focus-visible:ring-offset-2 rounded-sm"
        aria-expanded={isOpen}
      >
        <span
          className="text-lg text-[#1F2937]"
          style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
        >
          {item.q}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-[#2C8C91] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-6 pr-8 text-[#5F6B73] leading-relaxed">{item.a}</p>
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════ */
/*  PAGE                                                           */
/* ════════════════════════════════════════════════════════════════ */
export default function PricingPageClient() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />
      <main>
        {/* ─────────────────────────────────────────────────────── */}
        {/*  HERO                                                    */}
        {/* ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 pt-28 pb-20 md:pt-36 md:pb-28">
          {/* Decorative background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-[0.04]"
              style={{ background: "radial-gradient(circle, #2C8C91 0%, transparent 70%)" }}
            />
            <div
              className="absolute -bottom-60 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.03]"
              style={{ background: "radial-gradient(circle, #2C8C91 0%, transparent 70%)" }}
            />
          </div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="relative mx-auto max-w-4xl text-center"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block rounded-full border border-[#2C8C91]/30 bg-[#2C8C91]/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-[#2C8C91]"
            >
              Pricing
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="mt-7 text-4xl leading-[1.1] text-[#1F2937] md:text-5xl lg:text-[3.5rem]"
              style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
            >
              One platform.{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Your configuration.</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#2C8C91]/12 rounded-sm -skew-x-2" />
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-2xl text-lg text-[#5F6B73] leading-relaxed"
            >
              Humanova adapts to your organisation — not the other way around. Tell
              us what your people need, and we&apos;ll build a plan that fits your
              size, goals, and budget. No cookie-cutter packages.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
              <DemoButton
                variant="primary"
                size="lg"
                className="shadow-[0_4px_20px_-4px_rgba(44,140,145,0.4)] hover:shadow-[0_8px_32px_-4px_rgba(44,140,145,0.5)] hover:-translate-y-0.5 rounded-full"
              >
                Talk to Us
                <ArrowRight size={16} />
              </DemoButton>
            </motion.div>

            {/* Micro trust line */}
            <motion.p
              variants={fadeUp}
              className="mt-6 text-xs text-[#9BA9B4] flex items-center justify-center gap-4"
            >
              <span className="flex items-center gap-1.5">
                <Lock size={11} /> No commitment required
              </span>
              <span className="w-px h-3 bg-[#E5DED6]" />
              <span className="flex items-center gap-1.5">
                <Clock size={11} /> Response within 24 hours
              </span>
              <span className="w-px h-3 bg-[#E5DED6] hidden sm:block" />
              <span className="hidden sm:flex items-center gap-1.5">
                <Globe size={11} /> Available worldwide
              </span>
            </motion.p>
          </motion.div>
        </section>

        {/* ─────────────────────────────────────────────────────── */}
        {/*  IMPACT NUMBERS                                          */}
        {/* ─────────────────────────────────────────────────────── */}
        <section className="px-6 pb-20 md:pb-28">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="mx-auto max-w-5xl rounded-3xl border border-[#E5DED6] bg-white p-10 md:p-14 shadow-[0_4px_32px_-8px_rgba(0,0,0,0.05)]"
          >
            <p
              className="text-center text-sm font-semibold uppercase tracking-widest text-[#2C8C91] mb-10"
            >
              Why organisations invest in Humanova
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
              <AnimatedStat value="3.5" suffix="×" label="Average return on wellbeing investment" />
              <AnimatedStat value="40" suffix="%" label="Reduction in absenteeism" />
              <AnimatedStat value="67" suffix="%" label="Increase in employee engagement" />
              <AnimatedStat value="92" suffix="%" label="Employee satisfaction rate" />
            </div>
          </motion.div>
        </section>

        {/* ─────────────────────────────────────────────────────── */}
        {/*  CAPABILITIES GRID                                       */}
        {/* ─────────────────────────────────────────────────────── */}
        <section className="bg-[#F3EEE8] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger}
              className="max-w-2xl"
            >
              <motion.span
                variants={fadeUp}
                className="text-sm font-semibold uppercase tracking-widest text-[#2C8C91]"
              >
                What&apos;s Included
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="mt-3 text-3xl text-[#1F2937] md:text-4xl"
                style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
              >
                Everything you need. Nothing you don&apos;t.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-4 text-[#5F6B73] leading-relaxed"
              >
                Pick the capabilities that matter to your organisation. Every plan
                is assembled from these building blocks — use all of them or just
                the ones you need right now.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
              className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {capabilities.map((cap) => (
                <motion.div
                  key={cap.title}
                  variants={fadeUp}
                  className="group card-lift rounded-2xl border border-[#E5DED6] bg-white p-7 transition-all duration-200 hover:border-[#2C8C91]/30"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${cap.gradient}`}
                  >
                    <cap.icon size={22} className="text-[#2C8C91]" />
                  </div>
                  <h3
                    className="mt-5 text-lg text-[#1F2937] group-hover:text-[#2C8C91] transition-colors duration-150"
                    style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
                  >
                    {cap.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#5F6B73] leading-relaxed">
                    {cap.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────── */}
        {/*  WHAT SHAPES YOUR PLAN                                   */}
        {/* ─────────────────────────────────────────────────────── */}
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger}
              className="grid gap-14 md:grid-cols-2 items-center"
            >
              {/* Left — text */}
              <motion.div variants={fadeUp}>
                <span className="text-sm font-semibold uppercase tracking-widest text-[#2C8C91]">
                  How Pricing Works
                </span>
                <h2
                  className="mt-3 text-3xl text-[#1F2937] md:text-4xl"
                  style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
                >
                  Your plan is shaped by what matters to you
                </h2>
                <p className="mt-5 text-[#5F6B73] leading-relaxed">
                  We don&apos;t believe in one-size-fits-all pricing. Instead, your
                  plan is configured around four simple dimensions — so you only
                  pay for what you actually use.
                </p>
                <div className="mt-8">
                  <DemoButton
                    variant="outline"
                    size="md"
                    className="rounded-2xl"
                  >
                    Get a Custom Quote
                    <ArrowUpRight size={15} />
                  </DemoButton>
                </div>
              </motion.div>

              {/* Right — factor cards */}
              <motion.div
                variants={stagger}
                className="grid grid-cols-2 gap-4"
              >
                {pricingFactors.map((factor, idx) => (
                  <motion.div
                    key={factor.title}
                    variants={fadeUp}
                    className="rounded-2xl border border-[#E5DED6] bg-white p-5 hover:border-[#2C8C91]/25 transition-colors duration-200"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2C8C91]/8">
                      <factor.icon size={18} className="text-[#2C8C91]" />
                    </div>
                    <h3
                      className="mt-3 text-[15px] font-semibold text-[#1F2937]"
                      style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
                    >
                      {factor.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-[#5F6B73] leading-relaxed">
                      {factor.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────── */}
        {/*  BUILT FOR EVERY ORGANISATION                            */}
        {/* ─────────────────────────────────────────────────────── */}
        <section className="bg-[#F3EEE8] px-6 py-20 md:py-28">
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
                Built For You
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="mt-3 text-3xl text-[#1F2937] md:text-4xl"
                style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
              >
                Whatever your size, we&apos;ve got you
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mx-auto mt-4 max-w-2xl text-[#5F6B73] leading-relaxed"
              >
                From 50-person startups to 10,000-employee enterprises — Humanova
                scales to meet you where you are.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {audiences.map((a) => (
                <motion.div
                  key={a.title}
                  variants={fadeUp}
                  className="group card-lift rounded-2xl border border-[#E5DED6] bg-white p-7 text-center"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2C8C91]/8 group-hover:bg-[#2C8C91]/12 transition-colors duration-200">
                    <a.icon size={24} className="text-[#2C8C91]" />
                  </div>
                  <h3
                    className="mt-4 text-lg text-[#1F2937]"
                    style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
                  >
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#5F6B73] leading-relaxed">
                    {a.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────── */}
        {/*  HOW TO GET STARTED — 3 steps                            */}
        {/* ─────────────────────────────────────────────────────── */}
        <section className="px-6 py-20 md:py-28">
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
                Getting Started
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="mt-3 text-3xl text-[#1F2937] md:text-4xl"
                style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
              >
                From conversation to launch in days, not months
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="relative mt-16 grid gap-8 md:grid-cols-3"
            >
              {/* Connecting line */}
              <div className="pointer-events-none absolute left-0 right-0 top-10 hidden h-px bg-[#E5DED6] md:block" />

              {[
                {
                  step: "01",
                  icon: Phone,
                  title: "Have a Conversation",
                  desc: "Tell us about your team, your goals, and the challenges you're facing. We listen first.",
                },
                {
                  step: "02",
                  icon: Settings,
                  title: "We Design Your Plan",
                  desc: "We'll recommend the right combination of modules, coaching hours, and support — tailored to your reality.",
                },
                {
                  step: "03",
                  icon: Sparkles,
                  title: "Launch & Evolve",
                  desc: "Onboard your team, see insights from day one, and iterate with your dedicated success partner.",
                },
              ].map((step) => (
                <motion.div
                  key={step.step}
                  variants={fadeUp}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-white border border-[#E5DED6] shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)]">
                    <step.icon size={28} className="text-[#2C8C91]" />
                  </div>
                  <span className="mt-5 text-xs font-bold uppercase tracking-widest text-[#2C8C91]">
                    Step {step.step}
                  </span>
                  <h3
                    className="mt-2 text-xl text-[#1F2937]"
                    style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#5F6B73] leading-relaxed max-w-xs">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────── */}
        {/*  TRUST / COMPLIANCE STRIP                                */}
        {/* ─────────────────────────────────────────────────────── */}
        <section className="px-6 pb-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
            className="mx-auto max-w-5xl rounded-2xl border border-[#E5DED6] bg-white px-8 py-6"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {[
                { icon: Shield, label: "GDPR Compliant" },
                { icon: Lock, label: "SOC 2 Ready" },
                { icon: Globe, label: "Global Deployments" },
                { icon: Zap, label: "99.9% Uptime SLA" },
                { icon: CheckCircle2, label: "ISO 27001 Aligned" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 text-[#5F6B73]"
                >
                  <item.icon size={16} className="text-[#2C8C91]" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ─────────────────────────────────────────────────────── */}
        {/*  FAQ                                                     */}
        {/* ─────────────────────────────────────────────────────── */}
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-3xl">
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
                FAQ
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="mt-3 text-3xl text-[#1F2937] md:text-4xl"
                style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
              >
                Common questions
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="mt-12 rounded-2xl border border-[#E5DED6] bg-white px-8"
            >
              {faqs.map((item, i) => (
                <FaqItem
                  key={item.q}
                  item={item}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────── */}
        {/*  FINAL CTA                                               */}
        {/* ─────────────────────────────────────────────────────── */}
        <section className="px-6 pb-28 pt-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="mx-auto max-w-5xl rounded-3xl bg-[#1F2937] px-8 py-16 text-center md:px-16 relative overflow-hidden"
          >
            {/* Decorative glow */}
            <div
              className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] opacity-[0.1]"
              style={{ background: "radial-gradient(ellipse, #2C8C91 0%, transparent 70%)" }}
            />

            <div className="relative z-10">
              <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#56C1C7] mb-5">
                Let&apos;s talk
              </span>
              <h2
                className="text-3xl text-white md:text-4xl"
                style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
              >
                Ready to invest in your people?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/65 leading-relaxed">
                Tell us about your organisation and we&apos;ll design a wellbeing
                plan that works for your team, your culture, and your budget.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <DemoButton
                  variant="primary"
                  size="lg"
                  className="rounded-full shadow-[0_4px_20px_-4px_rgba(44,140,145,0.5)]"
                >
                  Get Your Custom Plan
                  <ArrowRight size={16} />
                </DemoButton>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/50"
                >
                  Explore Our Platform
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
