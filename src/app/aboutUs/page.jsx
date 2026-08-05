"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { ABOUT_US_SCHEMA } from "@/constants/schemas";
import DemoButton from "@/components/ui/DemoButton";
import {
  ArrowRight,
  ImageIcon,
  Ear,
  BrainCircuit,
  HeartHandshake,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Eye,
  Target,
  ChevronDown,
  Quote,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  PLACEHOLDER IMAGE COMPONENT                                               */
/*  Every spot that needs a real photo/illustration renders this instead.     */
/*  Swap <ImagePlaceholder /> for a real <img> or <Image /> when ready —      */
/*  the label tells you exactly what asset goes there.                       */
/* -------------------------------------------------------------------------- */
function ImagePlaceholder({ label, className = "" }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-bg-secondary text-body ${className}`}
    >
      <ImageIcon size={28} strokeWidth={1.5} className="opacity-50" />
      <span className="px-4 text-center text-xs font-medium uppercase tracking-wide opacity-60">
        {label}
      </span>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

/* -------------------------------------------------------------------------- */
/*  SIGNAL RINGS — signature motif                                           */
/*  A quiet pulse of concentric rings standing in for a wellbeing "signal":  */
/*  small, regular check-ins radiating outward into something an            */
/*  organisation can actually see and act on. Reused (in miniature) as the   */
/*  connector in the "Our Approach" flow below.                              */
/* -------------------------------------------------------------------------- */
function SignalRings() {
  return (
    <div className="relative flex h-full min-h-[320px] w-full items-center justify-center">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute rounded-full border border-brand/40"
          style={{
            width: `${120 + i * 90}px`,
            height: `${120 + i * 90}px`,
            animation: `signalPulse 3.2s ease-out ${i * 0.7}s infinite`,
          }}
        />
      ))}
      <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-brand shadow-lg shadow-brand/30">
        <Sparkles size={28} className="text-white" strokeWidth={1.75} />
      </div>
      <style jsx>{`
        @keyframes signalPulse {
          0% {
            opacity: 0.55;
            transform: scale(0.7);
          }
          100% {
            opacity: 0;
            transform: scale(1.15);
          }
        }
      `}</style>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  DATA                                                                      */
/* -------------------------------------------------------------------------- */
const differentiators = [
  {
    icon: HeartHandshake,
    title: "Human-first support",
    copy: "Built around real employee needs, not just dashboards. People can reflect, check in, access resources, and connect with support when they need it.",
  },
  {
    icon: BrainCircuit,
    title: "AI-powered insights",
    copy: "Understand patterns across mood, engagement, leave, attendance, coaching, and participation — automatically.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy-first design",
    copy: "Individual confidentiality is protected while organisations still get useful, team-level insight.",
  },
  {
    icon: TrendingUp,
    title: "Measurable outcomes",
    copy: "Track wellbeing improvement, engagement, absenteeism reduction, and productivity signals over time.",
  },
  {
    icon: Sparkles,
    title: "One connected ecosystem",
    copy: "Wellness, coaching, engagement, surveys, and HR analytics — brought together instead of scattered across tools.",
  },
];

const approachSteps = [
  {
    icon: Ear,
    title: "Listen",
    copy: "Employees share regular wellbeing signals through simple, confidential check-ins.",
  },
  {
    icon: BrainCircuit,
    title: "Understand",
    copy: "Humanova analyses trends across teams, departments, and workplace behaviour.",
  },
  {
    icon: HeartHandshake,
    title: "Support",
    copy: "Employees receive relevant resources, sessions, coaching, and guided support.",
  },
  {
    icon: TrendingUp,
    title: "Improve",
    copy: "HR teams act on insights, track outcomes, and build healthier workplace systems.",
  },
];

const values = [
  { title: "Privacy", copy: "Employee trust comes first.", icon: ShieldCheck },
  { title: "Empathy", copy: "Every feature should make people feel supported, not monitored.", icon: HeartHandshake },
  { title: "Clarity", copy: "HR teams need insights they can understand and act on.", icon: Eye },
  { title: "Prevention", copy: "The best support happens before burnout becomes a crisis.", icon: Target },
  { title: "Measurable impact", copy: "Wellbeing should create visible improvement for people and organisations.", icon: TrendingUp },
];

const audiences = [
  { role: "Employees", copy: "A safe and simple way to express how they feel, access resources, and receive support." },
  { role: "Managers", copy: "Early team-level signals without exposing private employee information." },
  { role: "HR Teams", copy: "Meaningful workforce insights across wellbeing, engagement, attendance, leave, and support usage." },
  { role: "Leadership Teams", copy: "Measurable wellbeing and productivity outcomes that support better workforce decisions." },
];

/* Softer, unverified-safe trust indicators — swap for real metrics
   (50+ organisations / 10k+ employees / 92% satisfaction / 3x ROI)
   once Humanova approves disclosing them. */
const trustIndicators = [
  "Built for modern HR teams",
  "Designed for distributed workforces",
  "Privacy-first by default",
];

const faqs = [
  {
    q: "What is Humanova?",
    a: "Humanova is a workplace wellbeing and workforce intelligence platform that helps organisations support employees, track wellbeing, improve engagement, and make better HR decisions.",
  },
  {
    q: "Who is Humanova for?",
    a: "Humanova is built for HR teams, CHROs, people leaders, managers, employees, and organisations that want to improve wellbeing and performance.",
  },
  {
    q: "Is Humanova an EAP?",
    a: "Humanova goes beyond a traditional EAP. It combines wellbeing support, coaching, engagement, HR analytics, AI recommendations, and productivity insights.",
  },
  {
    q: "How does Humanova protect employees?",
    a: "Humanova is designed with confidentiality and privacy at the core. HR teams receive useful insights without exposing sensitive individual information.",
  },
  {
    q: "What kind of companies can use Humanova?",
    a: "Humanova can be used by startups, enterprises, schools, healthcare organisations, technology companies, manufacturing teams, and distributed workforces.",
  },
];

/* -------------------------------------------------------------------------- */
/*  FAQ ACCORDION                                                             */
/* -------------------------------------------------------------------------- */
function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm"
        aria-expanded={isOpen}
      >
        <span className="font-display text-lg text-heading">{item.q}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-brand transition-transform duration-300 ${
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
        <p className="pb-6 pr-8 text-body leading-relaxed">{item.a}</p>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  PAGE                                                                      */
/* -------------------------------------------------------------------------- */
export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <JsonLd data={ABOUT_US_SCHEMA} />
      <Navbar />
      <main className="bg-bg">
      {/* ---------------------------------------------------------------- */}
      {/* HERO BANNER — FULL WIDTH EDGE TO EDGE WITH NO TOP GAP              */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative w-full overflow-hidden -mt-[90px] sm:-mt-[96px] pt-36 pb-16 sm:pt-40 sm:pb-20 md:pt-44 md:pb-24 min-h-[560px] sm:min-h-[600px] md:min-h-[660px] flex items-center">
        
        {/* Full Width Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dii2omqrm/image/upload/v1785316568/Sales_Team_Website_vddhzd.png"
            alt="About Humanova Banner"
            fill
            priority
            unoptimized
            className="object-cover object-right md:object-center"
          />
          {/* Left side gradient overlay to ensure perfect contrast for left-aligned text */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#81c5c8]/95 via-[#81c5c8]/75 to-transparent w-full lg:w-[65%]" />
        </div>

        {/* Left-Aligned Text Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-left">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-2xl">
            <motion.span
              variants={fadeUp}
              className="inline-block rounded-full bg-[#07312C] text-[#D4F04A] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] shadow-sm mb-4"
            >
              About Humanova
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-bold leading-[1.12] text-[#07312C]"
              style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
            >
              Building healthier workplaces through wellbeing, intelligence,
              and human support
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-xl text-base sm:text-lg font-medium text-[#07312C]/90 leading-relaxed"
              style={{ fontFamily: "var(--font-manrope), sans-serif" }}
            >
              Humanova is a workplace wellbeing and workforce intelligence
              platform designed to help organisations understand their people
              better, support them earlier, and create healthier, more
              resilient teams.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
              <a
                href="/services"
                className="group inline-flex items-center gap-2 rounded-full bg-[#07312C] px-7 py-3.5 font-bold text-white text-sm transition-all duration-200 hover:bg-[#2C8C91] shadow-md hover:shadow-lg"
              >
                Explore Services
                <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <DemoButton
                variant="secondary"
                className="rounded-full bg-white/85 backdrop-blur-md border border-[#07312C]/20 px-7 py-3.5 font-bold text-[#07312C] hover:bg-white text-sm transition-all shadow-sm"
              >
                Book a Free Demo
              </DemoButton>
            </motion.div>
          </motion.div>
        </div>

      </section>

      {/* ---------------------------------------------------------------- */}
      {/* WHO WE ARE                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 py-20 md:py-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2"
        >
          <motion.div variants={fadeUp} className="order-2 md:order-1 overflow-hidden rounded-[28px] shadow-xl border border-[#E5DED6] bg-white">
            <Image
              src="https://res.cloudinary.com/dii2omqrm/image/upload/v1785317590/Sales_Team_Website.png_1_touvsf.png"
              alt="Who We Are - Humanova Team"
              width={600}
              height={450}
              unoptimized
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
          <motion.div variants={fadeUp} className="order-1 md:order-2">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand">
              Who We Are
            </span>
            <h2 className="mt-3 text-3xl text-heading md:text-4xl">
              A simple belief, built into a platform
            </h2>
            <p className="mt-5 text-body leading-relaxed">
              Humanova was created with a simple belief: employee wellbeing
              should not be treated as a one-time benefit or a last-minute
              intervention. It should be part of how modern organisations
              understand, support, and grow their people.
            </p>
            <p className="mt-4 text-body leading-relaxed">
              We bring wellbeing, engagement, coaching, HR analytics, and
              productivity insights together in one platform. Humanova gives
              employees a safe space to reflect and receive support, while
              helping HR teams identify patterns, risks, and opportunities at
              a team and organisation level.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* MISSION AND VISION                                                */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-bg-secondary px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center"
          >
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-brand">
              Mission &amp; Vision
            </motion.span>
            <motion.h2 variants={fadeUp} className="mt-3 text-3xl text-heading md:text-4xl">
              Why we get up in the morning
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="mt-12 grid gap-6 md:grid-cols-2"
          >
            <motion.div
              variants={fadeUp}
              className="card-lift rounded-2xl border border-border bg-card p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10">
                <Target size={22} className="text-brand" />
              </div>
              <h3 className="mt-5 text-xl text-heading">Our Mission</h3>
              <p className="mt-3 text-body leading-relaxed">
                To help organisations build workplaces where people feel
                supported, understood, and able to perform at their best.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="card-lift rounded-2xl border border-border bg-card p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10">
                <Eye size={22} className="text-brand" />
              </div>
              <h3 className="mt-5 text-xl text-heading">Our Vision</h3>
              <p className="mt-3 text-body leading-relaxed">
                To become the most trusted workplace wellbeing ecosystem for
                modern organisations.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* WHY HUMANOVA EXISTS                                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 py-20 md:py-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2"
        >
          <motion.div variants={fadeUp}>
            <span className="text-sm font-semibold uppercase tracking-widest text-brand">
              Why Humanova Exists
            </span>
            <h2 className="mt-3 text-3xl text-heading md:text-4xl">
              Closing the gap HR teams feel every day
            </h2>
            <p className="mt-5 text-body leading-relaxed">
              Workplaces are changing. Employees are dealing with stress,
              burnout, disengagement, hybrid work pressure, and rising
              expectations from both organisations and themselves.
            </p>
            <p className="mt-4 text-body leading-relaxed">
              At the same time, HR teams are often expected to solve these
              problems with limited visibility. Traditional surveys are too
              slow. EAPs are often underused. Managers may notice issues too
              late.
            </p>
            <p className="mt-4 text-body leading-relaxed">
              Humanova exists to close this gap. We help organisations
              identify early signs of stress, understand team morale, support
              employees confidentially, and turn wellbeing data into
              meaningful action.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="overflow-hidden rounded-[28px] shadow-xl border border-[#E5DED6] bg-white">
            <Image
              src="https://res.cloudinary.com/dii2omqrm/image/upload/v1785317589/Sales_Team_Website.png_3_zevcey.png"
              alt="Why Humanova Exists"
              width={600}
              height={450}
              unoptimized
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* WHAT MAKES US DIFFERENT                                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-bg-secondary px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-brand">
              What Makes Humanova Different
            </motion.span>
            <motion.h2 variants={fadeUp} className="mt-3 text-3xl text-heading md:text-4xl">
              Beyond dashboards. Beyond generic surveys.
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {differentiators.map((d) => (
              <motion.div
                key={d.title}
                variants={fadeUp}
                className="card-lift rounded-2xl border border-border bg-card p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/10">
                  <d.icon size={20} className="text-brand" />
                </div>
                <h3 className="mt-4 text-lg text-heading">{d.title}</h3>
                <p className="mt-2 text-sm text-body leading-relaxed">{d.copy}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* OUR APPROACH                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center"
          >
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-brand">
              Our Approach
            </motion.span>
            <motion.h2 variants={fadeUp} className="mt-3 text-3xl text-heading md:text-4xl">
              The same signal, followed all the way through
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="relative mt-16 grid gap-10 md:grid-cols-4"
          >
            {/* connecting line — desktop only */}
            <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-border md:block" />

            {approachSteps.map((step, i) => (
              <motion.div key={step.title} variants={fadeUp} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-md shadow-brand/25">
                  <step.icon size={20} />
                </div>
                <span className="mt-5 text-xs font-semibold uppercase tracking-widest text-brand/70">
                  Step {i + 1}
                </span>
                <h3 className="mt-1 text-lg text-heading">{step.title}</h3>
                <p className="mt-2 text-sm text-body leading-relaxed">{step.copy}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* PLATFORM VALUES                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-bg-secondary px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center"
          >
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-brand">
              Platform Values
            </motion.span>
            <motion.h2 variants={fadeUp} className="mt-3 text-3xl text-heading md:text-4xl">
              What we hold ourselves to
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5"
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                className="card-lift rounded-2xl border border-border bg-card p-6"
              >
                <v.icon size={20} className="text-brand" />
                <h3 className="mt-4 text-base text-heading">{v.title}</h3>
                <p className="mt-2 text-sm text-body leading-relaxed">{v.copy}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* WHO WE SUPPORT                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center"
          >
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-brand">
              Who We Support
            </motion.span>
            <motion.h2 variants={fadeUp} className="mt-3 text-3xl text-heading md:text-4xl">
              One platform, every seat at the table
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {audiences.map((a) => (
              <motion.div
                key={a.role}
                variants={fadeUp}
                className="card-lift rounded-2xl border border-border bg-card p-7"
              >
                <h3 className="text-lg text-heading">{a.role}</h3>
                <p className="mt-2 text-sm text-body leading-relaxed">{a.copy}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* OUR STORY                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-bg-secondary px-6 py-20 md:py-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mx-auto grid max-w-6xl items-start gap-14 md:grid-cols-2"
        >
          <motion.div variants={fadeUp} className="relative aspect-[6/5] w-full overflow-hidden rounded-2xl">
            <Image
              src="https://res.cloudinary.com/dii2omqrm/image/upload/v1785319198/Our_Story_nqc2op.png"
              alt="Our Story — Humanova founding team and company origin"
              fill
              unoptimized
              className="object-cover object-center"
              sizes="(min-width: 768px) 60vw, 100vw"
            />
          </motion.div>
          <motion.div variants={fadeUp}>
            <span className="text-sm font-semibold uppercase tracking-widest text-brand">
              Our Story
            </span>
            <Quote size={28} className="mt-4 text-brand/40" />
            <p
              className="mt-2 text-xl leading-snug text-heading"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
             Humanova was created to address a challenge many organisations face: they care about their people, but often don’t have enough visibility into what employees are experiencing until the impact shows up through burnout, absenteeism, disengagement, declining productivity, or attrition.
We built Humanova to help organisations understand these signals earlier and respond with the right support. Through regular wellbeing check-ins, coaching, engagement tools, workforce analytics, and AI-driven recommendations, Humanova gives HR leaders a clearer view of their teams and helps them take timely, meaningful action.

            </p>
            <p className="mt-5 text-body leading-relaxed">
             Our goal is simple: help organisations care for their people more effectively, build healthier workplaces, and create better outcomes for both employees and the business.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* IMPACT STATEMENT                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 py-20 md:py-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.h2 variants={fadeUp} className="text-3xl text-heading md:text-4xl">
            Today, Humanova supports organisations in creating healthier
            workplace cultures
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-body leading-relaxed">
            Through better visibility, stronger employee support, and
            measurable people outcomes.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
            {trustIndicators.map((t) => (
              <span
                key={t}
                className="rounded-full border border-brand/25 bg-brand/5 px-5 py-2.5 text-sm font-medium text-brand"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FAQ                                                                */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-bg-secondary px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center"
          >
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-brand">
              FAQ
            </motion.span>
            <motion.h2 variants={fadeUp} className="mt-3 text-3xl text-heading md:text-4xl">
              Common questions
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="mt-12 rounded-2xl border border-border bg-card px-8"
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

      {/* ---------------------------------------------------------------- */}
      {/* FINAL CTA                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-6 pb-28 pt-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mx-auto max-w-5xl rounded-3xl bg-heading px-8 py-16 text-center md:px-16"
        >
          <h2 className="text-3xl text-white md:text-4xl">
            Let us build healthier workplaces together
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Whether you are supporting 100 employees or 10,000, Humanova
            helps you understand your people better and act before small
            challenges become major workforce issues.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a
              href="/demo"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-white transition-colors duration-200 hover:bg-brand-hover"
            >
              Book a Free Demo
            </a>
            <a
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 font-semibold text-white transition-colors duration-200 hover:border-white"
            >
              Explore Humanova Services
            </a>
          </div>
        </motion.div>
      </section>
      </main>
      <Footer />
    </div>
  );
}