"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useDemoModal } from "@/context/DemoModalContext";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import {
  ArrowRight, ChevronDown, ChevronUp, Zap,
  Heart, Activity, BarChart3, ShieldCheck, CalendarClock,
  HeadphonesIcon, BookOpen, BrainCircuit, Users, Briefcase,
  Building2, GraduationCap, Stethoscope, Factory, Monitor,
  Globe, Phone, TrendingUp, Gauge, Award, Sparkles,
  Lock, Eye, FileBarChart, UserCheck, Target, CheckCircle2,
} from "lucide-react";

/* ─── Animation Helpers ──────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

function AnimatedSection({ children, className = "", id }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
    >
      {children}
    </motion.section>
  );
}

/* ─── Data ───────────────────────────────────────────── */

const TRUST_METRICS = [
  { value: "50+", label: "Organisations supported" },
  { value: "10k+", label: "Employees served" },
  { value: "92%", label: "Satisfaction rate" },
  { value: "3×", label: "ROI reported" },
  { value: "40%", label: "Burnout reduction" },
];

const CORE_SERVICES = [
  {
    icon: <Heart size={24} />,
    title: "Workplace Wellbeing Tracking",
    desc: "Humanova helps employees check in regularly through mood tracking, reflection prompts, and wellbeing signals. HR teams receive anonymous, team-level insights that reveal stress patterns, morale shifts, and early signs of burnout.",
    features: ["Mood tracking", "Nova Selfie", "Nova Reflections", "Stress & motivation insights", "Anonymous wellbeing trends", "Burnout risk signals"],
    palette: { bg: "#EFFDF4", iconBg: "from-[#2C8C91] to-[#0E3D39]", shadow: "rgba(44,140,145,0.35)", accent: "#2C8C91" },
    slug: "workplace-wellbeing-tracking",
  },
  {
    icon: <Activity size={24} />,
    title: "Employee Engagement Analytics",
    desc: "Understand how connected, supported, and motivated your employees feel. Humanova helps HR teams measure engagement beyond surveys by combining participation, feedback, sessions, events, and workplace signals.",
    features: ["Engagement dashboards", "Pulse insights", "Event participation", "Group session tracking", "Social interaction signals", "Department-level trends"],
    palette: { bg: "#E8F4FF", iconBg: "from-[#4A90D9] to-[#1A5FA8]", shadow: "rgba(74,144,217,0.35)", accent: "#4A90D9" },
    slug: "employee-engagement-analytics",
  },
  {
    icon: <HeadphonesIcon size={24} />,
    title: "Coaching & 1:1 Support",
    desc: "Give employees access to confidential support through qualified coaches, counsellors, and wellbeing professionals. Humanova enables both individual and group support journeys based on employee needs.",
    features: ["1:1 coaching", "Group wellbeing sessions", "Emotional wellness support", "Leadership coaching", "Stress management", "Confidential conversations"],
    palette: { bg: "#FFF0F6", iconBg: "from-[#E05FA0] to-[#A0336E]", shadow: "rgba(224,95,160,0.35)", accent: "#E05FA0" },
    slug: "employee-coaching-support",
  },
  {
    icon: <BarChart3 size={24} />,
    title: "HR Analytics & Workforce Insights",
    desc: "Humanova gives HR leaders clear dashboards that turn employee signals into action. Instead of scattered reports, HR gets one view of wellbeing, engagement, attendance, leave, productivity, and risk patterns.",
    features: ["HR dashboards", "Manager dashboards", "Department insights", "Organisation reports", "Exportable analytics", "Action recommendations"],
    palette: { bg: "#FFF8E8", iconBg: "from-[#E8A020] to-[#B87000]", shadow: "rgba(232,160,32,0.35)", accent: "#E8A020" },
    slug: "hr-analytics-workforce-insights",
  },
  {
    icon: <CalendarClock size={24} />,
    title: "Leave, Attendance & Shift Intelligence",
    desc: "Humanova connects wellbeing with workplace patterns like absenteeism, attendance, leave frequency, and shift behaviour. This helps organisations understand when operational issues may be linked to burnout, disengagement, or workload stress.",
    features: ["Leave management", "Attendance tracking", "Shift management", "Punctuality insights", "Absence pattern detection", "Workload & fatigue signals"],
    palette: { bg: "#F3EEFF", iconBg: "from-[#7C5CDB] to-[#4A2EA8]", shadow: "rgba(124,92,219,0.35)", accent: "#7C5CDB" },
    slug: "leave-attendance-shift-intelligence",
  },
  {
    icon: <BrainCircuit size={24} />,
    title: "AI-Based Recommendations",
    desc: "Humanova uses AI to identify trends and recommend actions for HR teams. Recommendations can include coaching, wellness programs, manager check-ins, group sessions, articles, or targeted engagement activities.",
    features: ["Risk alerts", "AI recommendations", "Team action plans", "Personalized resources", "Wellbeing improvement plans", "NOVA Score insights"],
    palette: { bg: "#E8FDF4", iconBg: "from-[#1AAF7E] to-[#0A7055]", shadow: "rgba(26,175,126,0.35)", accent: "#1AAF7E" },
    slug: "ai-based-recommendations",
  },
  {
    icon: <BookOpen size={24} />,
    title: "Learning & Capability Support",
    desc: "Humanova connects wellbeing with growth. Employees can receive assignments, resources, videos, podcasts, articles, and learning tasks that support both personal development and workplace performance.",
    features: ["Learning assignments", "Resource library", "Videos & podcasts", "Articles & exercises", "Skill-building content", "Progress tracking"],
    palette: { bg: "#FEF3E8", iconBg: "from-[#D97B2A] to-[#A85A10]", shadow: "rgba(217,123,42,0.35)", accent: "#D97B2A" },
    slug: "learning-capability-support",
  },
];

const FLOW_STEPS = [
  { num: "01", title: "Employees share signals", desc: "Employees use quick check-ins, reflections, sessions, attendance, leave, and engagement activities.", icon: <Users size={22} /> },
  { num: "02", title: "Humanova analyzes patterns", desc: "The platform identifies trends across wellbeing, engagement, productivity, and participation.", icon: <BrainCircuit size={22} /> },
  { num: "03", title: "HR gets clear insights", desc: "HR leaders see anonymous dashboards, risk areas, team trends, and recommended actions.", icon: <BarChart3 size={22} /> },
  { num: "04", title: "Teams receive targeted support", desc: "Humanova helps deliver coaching, content, group sessions, manager actions, and wellbeing programs.", icon: <Target size={22} /> },
];

const NOVA_SCORES = [
  { title: "Discipline Score", desc: "Based on attendance, leave, and shift behaviour.", icon: <Gauge size={24} />, color: "#4A90D9" },
  { title: "Learning Score", desc: "Based on assignments, learning activity, and development participation.", icon: <GraduationCap size={24} />, color: "#7C5CDB" },
  { title: "Wellbeing Score", desc: "Based on Nova Selfie, Nova Reflections, and coaching support.", icon: <Heart size={24} />, color: "#E05FA0" },
  { title: "Engagement Score", desc: "Based on events, group sessions, and social interaction.", icon: <Sparkles size={24} />, color: "#1AAF7E" },
];

const ROLE_BENEFITS = [
  {
    role: "For HR Teams",
    desc: "See team-level wellbeing, engagement, leave, attendance, and support trends in one dashboard. Identify risk areas and act before issues escalate.",
    icon: <FileBarChart size={26} />,
    color: "#2C8C91",
  },
  {
    role: "For Managers",
    desc: "Understand team morale and engagement patterns without exposing individual private data. Support people with timely check-ins and recommended actions.",
    icon: <UserCheck size={26} />,
    color: "#4A90D9",
  },
  {
    role: "For Employees",
    desc: "Check in safely, reflect privately, access useful resources, and receive confidential support when needed.",
    icon: <Users size={26} />,
    color: "#1AAF7E",
  },
  {
    role: "For Leadership",
    desc: "Track workforce health, productivity signals, absenteeism patterns, and improvement over time with clear measurable outcomes.",
    icon: <TrendingUp size={26} />,
    color: "#7C5CDB",
  },
];

const WHO_WE_SERVE = [
  { label: "Enterprises & large organisations", icon: <Building2 size={18} /> },
  { label: "Startups & fast-growing companies", icon: <Sparkles size={18} /> },
  { label: "Schools & institutions", icon: <GraduationCap size={18} /> },
  { label: "Healthcare teams", icon: <Stethoscope size={18} /> },
  { label: "Manufacturing & operations", icon: <Factory size={18} /> },
  { label: "Technology companies", icon: <Monitor size={18} /> },
  { label: "Hybrid & remote teams", icon: <Globe size={18} /> },
  { label: "Sales & customer service", icon: <Phone size={18} /> },
  { label: "Large distributed workforces", icon: <Users size={18} /> },
];

const WHY_HUMANOVA = [
  { title: "Proactive, not reactive", desc: "Humanova helps identify issues before they become serious.", icon: <Zap size={20} /> },
  { title: "Privacy-first", desc: "Employees stay protected while HR gets useful team-level insights.", icon: <Lock size={20} /> },
  { title: "Built for measurable outcomes", desc: "Track improvements in wellbeing, engagement, absenteeism, and productivity.", icon: <TrendingUp size={20} /> },
  { title: "Easy to roll out", desc: "Simple onboarding for employees, HR teams, and managers.", icon: <CheckCircle2 size={20} /> },
  { title: "One platform for multiple needs", desc: "Wellbeing, HR analytics, coaching, engagement, and productivity insights in one place.", icon: <Award size={20} /> },
];

const PRIVACY_POINTS = [
  "Individual employee reflections remain confidential.",
  "HR and managers see aggregated and permission-based insights.",
  "Role-based access for HR, managers, admins, and leadership.",
  "Sensitive wellbeing data is never exposed as individual performance data.",
  "Reports focus on teams, departments, trends, and action recommendations.",
];

const FAQ_ITEMS = [
  {
    question: "What services does Humanova provide?",
    answer: "Humanova provides workplace wellbeing tracking, coaching, HR analytics, engagement insights, leave and attendance intelligence, AI recommendations, and employee support programs.",
  },
  {
    question: "Is Humanova only a wellness platform?",
    answer: "No. Humanova combines wellbeing, engagement, coaching, learning, and workforce analytics to help HR teams support employees and improve organisational performance.",
  },
  {
    question: "Can Humanova support large enterprises?",
    answer: "Yes. Humanova is built for organisations with multiple teams, departments, locations, and employee groups.",
  },
  {
    question: "Does Humanova protect employee privacy?",
    answer: "Yes. Humanova is designed around confidential employee support and anonymous team-level reporting.",
  },
  {
    question: "Can Humanova integrate with existing HR processes?",
    answer: "Yes. Humanova can support existing HR, wellbeing, engagement, attendance, leave, and employee experience workflows.",
  },
];

const BANNER_IMG =
  "https://res.cloudinary.com/dii2omqrm/image/upload/v1783072492/%CE%91%CF%81%CF%87%CE%B9%CE%BA%CE%B7%CC%81_-_%CE%94%CE%B5%CF%82_%CE%BC%CE%B5%CC%81%CF%83%CE%B1_%CF%83%CE%BF%CF%85_ghi0ys.jpg";

/* ═══════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                        */
/* ═══════════════════════════════════════════════════════ */
export default function ServicesPageClient() {
  const [openFaq, setOpenFaq] = useState(0);
  const [expandedService, setExpandedService] = useState(null);
  const { open: openModal } = useDemoModal();

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      <main>
        {/* ════════════════════════════════════════════════════ */}
        {/*  1. HERO                                            */}
        {/* ════════════════════════════════════════════════════ */}
        <section
          id="services-hero"
          className="relative w-full overflow-hidden -mt-24"
          style={{ minHeight: "700px" }}
          aria-labelledby="services-heading"
        >
          {/* BG Image */}
          <div className="absolute inset-0">
            <Image
              src={BANNER_IMG}
              alt="Humanova services hero"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#07312C]/92 via-[#07312C]/70 to-[#0E3D39]/50" />
            {/* Animated gradient orbs */}
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#D4F04A]/5 blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 left-1/6 w-[400px] h-[400px] rounded-full bg-[#2C8C91]/10 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-40 pb-28 lg:pt-48 lg:pb-36">
            <motion.div
              className="flex flex-col items-center text-center max-w-4xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              {/* Badge */}
              <motion.span
                variants={fadeUp}
                custom={0}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4F04A] backdrop-blur-sm mb-8"
              >
                <Sparkles size={14} />
                Humanova Services
              </motion.span>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                custom={1}
                id="services-heading"
                className="text-white text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-extrabold leading-[1.08] tracking-tight"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Everything your workforce needs to{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#D4F04A]">feel better</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 8C40 2 80 2 100 6C120 10 160 10 198 4" stroke="#D4F04A" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
                  </svg>
                </span>
                , work better, and grow stronger
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-white/65 text-lg lg:text-xl leading-[1.8] max-w-2xl mt-7"
              >
                Humanova brings employee wellbeing, engagement, coaching, HR analytics, and productivity insights into one intelligent platform. Built for modern organisations that want to support people before problems become performance issues.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4 pt-8 justify-center">
                <button
                  id="services-cta-primary"
                  type="button"
                  onClick={openModal}
                  className="group inline-flex items-center gap-2 rounded-full bg-[#D4F04A] px-8 py-4 text-sm font-bold text-black shadow-[0_8px_30px_rgba(212,240,74,0.4)] hover:shadow-[0_12px_48px_rgba(212,240,74,0.6)] transition-all duration-300 cursor-pointer"
                >
                  Book a Free Demo
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  id="services-cta-secondary"
                  href="#core-services"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/8 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
                >
                  Explore Platform
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom curve */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
              <path d="M0 80V40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0Z" fill="#FAF7F2" />
            </svg>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════ */}
        {/*  2. TRUST METRICS                                   */}
        {/* ════════════════════════════════════════════════════ */}
        <AnimatedSection id="trust-metrics" className="bg-white border-b border-[#E5DED6]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
            <div className="flex flex-wrap justify-center gap-6 md:gap-0 md:grid md:grid-cols-5 md:divide-x md:divide-[#E5DED6]">
              {TRUST_METRICS.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  custom={i}
                  className="flex flex-col items-center text-center px-6"
                >
                  <span
                    className="text-3xl lg:text-4xl font-extrabold text-[#2C8C91]"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {value}
                  </span>
                  <span className="mt-1.5 text-xs text-[#5F6B73] uppercase tracking-wider font-medium">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ════════════════════════════════════════════════════ */}
        {/*  3. CORE SERVICES                                   */}
        {/* ════════════════════════════════════════════════════ */}
        <AnimatedSection id="core-services" className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 lg:pt-28 pb-10">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-[#2C8C91] text-sm font-bold uppercase tracking-[0.2em] mb-4">
              Our Services
            </p>
            <h2
              className="text-[#1F2937] text-4xl md:text-5xl font-extrabold leading-tight"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Everything Your Organisation Needs,
              <br className="hidden sm:block" />
              <span className="text-[#2C8C91]"> In One Platform</span>
            </h2>
            <p className="mt-5 text-[#5F6B73] text-lg max-w-2xl mx-auto leading-relaxed">
              From wellbeing tracking to AI-powered recommendations, every service connects into one intelligent system.
            </p>
          </motion.div>

          {/* Service cards — alternating layout */}
          <div className="flex flex-col gap-8">
            {CORE_SERVICES.map((service, i) => {
              const isExpanded = expandedService === i;
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={service.title}
                  variants={fadeUp}
                  custom={i}
                  className="group"
                >
                  <div className="relative rounded-[28px] overflow-hidden border border-[#E5DED6] bg-white hover:border-[#2C8C91]/30 hover:shadow-[0_16px_48px_-12px_rgba(44,140,145,0.12)] transition-all duration-400">
                    <div className={`grid lg:grid-cols-[1fr_1fr] gap-0 ${!isEven ? "lg:direction-rtl" : ""}`}>
                      {/* Colored side */}
                      <div
                        className={`relative p-8 lg:p-10 flex flex-col justify-center ${!isEven ? "lg:order-2" : ""}`}
                        style={{ backgroundColor: service.palette.bg }}
                      >
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.palette.iconBg} text-white grid place-items-center mb-6`}
                          style={{ boxShadow: `0 12px 28px -8px ${service.palette.shadow}` }}
                        >
                          {service.icon}
                        </div>
                        <h3
                          className="text-[#1F2937] font-bold text-2xl lg:text-[1.65rem] mb-4 leading-tight"
                          style={{ fontFamily: "var(--font-outfit)" }}
                        >
                          {service.title}
                        </h3>
                        <p className="text-[#5F6B73] text-[15px] leading-[1.75]">
                          {service.desc}
                        </p>

                        {/* Actions row */}
                        <div className="mt-6 flex items-center gap-6 flex-wrap">
                          <button
                            type="button"
                            onClick={() => setExpandedService(isExpanded ? null : i)}
                            className="inline-flex items-center gap-2 text-sm font-semibold cursor-pointer"
                            style={{ color: service.palette.accent }}
                          >
                            {isExpanded ? "Hide features" : "View features"}
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown size={16} />
                            </motion.div>
                          </button>

                          {service.slug && (
                            <Link
                              href={`/services/${service.slug}`}
                              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F2937] underline underline-offset-4 decoration-[#1F2937]/30 hover:decoration-[#1F2937] transition-colors"
                            >
                              Read more
                              <ArrowRight size={14} />
                            </Link>
                          )}
                        </div>
                      </div>

                      {/* Placeholder image side */}
                      <div
                        className={`relative min-h-[200px] lg:min-h-[320px] overflow-hidden ${!isEven ? "lg:order-1" : ""}`}
                        style={{ backgroundColor: service.palette.bg }}
                      >
                        {/* placeholder — replace with real image */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-full h-full flex items-center justify-center" style={{ opacity: 0.12 }}>
                            <div className={`w-40 h-40 rounded-3xl bg-gradient-to-br ${service.palette.iconBg} grid place-items-center`}>
                              {/* Large icon placeholder */}
                              <div className="text-white scale-[3]">
                                {service.icon}
                              </div>
                            </div>
                          </div>
                          {/* overlay text */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: service.palette.accent, opacity: 0.5 }}>
                              Dashboard Preview
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded feature pills */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-8 lg:px-10 pb-8 pt-2 border-t border-[#E5DED6]">
                            <div className="flex flex-wrap gap-3 pt-5">
                              {service.features.map((feat, fi) => (
                                <motion.span
                                  key={feat}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: fi * 0.05, duration: 0.3 }}
                                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border"
                                  style={{
                                    borderColor: `${service.palette.accent}30`,
                                    color: service.palette.accent,
                                    backgroundColor: `${service.palette.accent}08`,
                                  }}
                                >
                                  <CheckCircle2 size={14} />
                                  {feat}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatedSection>

        {/* ════════════════════════════════════════════════════ */}
        {/*  4. HOW SERVICES WORK TOGETHER                      */}
        {/* ════════════════════════════════════════════════════ */}
        <AnimatedSection id="how-it-works" className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-[#2C8C91] text-sm font-bold uppercase tracking-[0.2em] mb-4">
              Connected System
            </p>
            <h2
              className="text-[#1F2937] text-4xl md:text-5xl font-extrabold leading-tight"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              One connected system,
              <br className="hidden sm:block" />
              <span className="text-[#2C8C91]">not scattered wellness tools</span>
            </h2>
          </motion.div>

          {/* 4-step flow — horizontal desktop, vertical mobile */}
          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-[60px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-[#D4F04A]/20 via-[#2C8C91]/30 to-[#D4F04A]/20" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {FLOW_STEPS.map(({ num, title, desc, icon }, i) => (
                <motion.div key={num} variants={fadeUp} custom={i} className="relative">
                  <div className="bg-[#07312C] rounded-[24px] p-7 h-full flex flex-col hover:shadow-[0_12px_40px_-12px_rgba(7,49,44,0.5)] transition-shadow duration-300">
                    {/* Step number */}
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-12 h-12 rounded-full bg-[#D4F04A] grid place-items-center text-[#07312C] shrink-0">
                        {icon}
                      </div>
                      <span className="text-[#D4F04A]/40 text-3xl font-extrabold" style={{ fontFamily: "var(--font-outfit)" }}>
                        {num}
                      </span>
                    </div>
                    <h4
                      className="text-white font-bold text-lg mb-3"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {title}
                    </h4>
                    <p className="text-white/55 text-sm leading-relaxed flex-1">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ════════════════════════════════════════════════════ */}
        {/*  5. NOVA SCORE SYSTEM                               */}
        {/* ════════════════════════════════════════════════════ */}
        <AnimatedSection id="nova-score" className="max-w-7xl mx-auto px-6 lg:px-10 pb-20 lg:pb-28">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-[#2C8C91] text-sm font-bold uppercase tracking-[0.2em] mb-4">
              NOVA Score
            </p>
            <h2
              className="text-[#1F2937] text-4xl md:text-5xl font-extrabold leading-tight"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Measure what matters with the{" "}
              <span className="text-[#2C8C91]">NOVA Score</span>
            </h2>
            <p className="mt-5 text-[#5F6B73] text-lg max-w-2xl mx-auto leading-relaxed">
              Humanova brings multiple workplace signals into a clear scoring framework that helps HR understand employee and team health.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {NOVA_SCORES.map(({ title, desc, icon, color }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                custom={i}
                className="group bg-white rounded-[24px] border border-[#E5DED6] p-7 hover:border-transparent hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.12)] transition-all duration-400"
              >
                <div
                  className="w-14 h-14 rounded-2xl grid place-items-center mb-5"
                  style={{ backgroundColor: `${color}15`, color }}
                >
                  {icon}
                </div>
                <h4
                  className="text-[#1F2937] font-bold text-lg mb-2"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {title}
                </h4>
                <p className="text-[#5F6B73] text-sm leading-relaxed">{desc}</p>
                {/* Score bar decoration */}
                <div className="mt-5 w-full h-1.5 rounded-full bg-[#E5DED6]/60 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${65 + i * 8}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.15, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Combined NOVA Score card */}
          <motion.div
            variants={fadeUp}
            custom={4}
            className="bg-gradient-to-br from-[#07312C] to-[#0E3D39] rounded-[28px] p-8 lg:p-10 flex flex-col md:flex-row items-center gap-8"
          >
            <div className="w-20 h-20 rounded-3xl bg-[#D4F04A] grid place-items-center shrink-0">
              <Award size={36} className="text-[#07312C]" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4
                className="text-white text-2xl font-bold mb-2"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                NOVA Score
              </h4>
              <p className="text-white/65 text-[15px] leading-relaxed max-w-xl">
                A combined view of wellbeing, discipline, learning, and engagement to help HR track workforce health and productivity across every dimension.
              </p>
            </div>
            <button
              type="button"
              onClick={openModal}
              className="inline-flex items-center gap-2 rounded-full bg-[#D4F04A] px-6 py-3 text-sm font-bold text-black hover:shadow-[0_8px_24px_-6px_rgba(212,240,74,0.5)] transition-shadow duration-200 cursor-pointer shrink-0"
            >
              See It In Action
              <ArrowRight size={15} />
            </button>
          </motion.div>
        </AnimatedSection>

        {/* ════════════════════════════════════════════════════ */}
        {/*  6. ROLE-BASED BENEFITS                             */}
        {/* ════════════════════════════════════════════════════ */}
        <AnimatedSection id="role-benefits" className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div variants={fadeUp} className="text-center mb-16">
              <p className="text-[#2C8C91] text-sm font-bold uppercase tracking-[0.2em] mb-4">
                Built For Everyone
              </p>
              <h2
                className="text-[#1F2937] text-4xl md:text-5xl font-extrabold leading-tight"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Value for every role in your{" "}
                <span className="text-[#2C8C91]">organisation</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ROLE_BENEFITS.map(({ role, desc, icon, color }, i) => (
                <motion.div
                  key={role}
                  variants={fadeUp}
                  custom={i}
                  className="group relative bg-[#FAF7F2] rounded-[24px] p-7 border border-[#E5DED6] hover:border-transparent hover:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.12)] transition-all duration-400 overflow-hidden"
                >
                  {/* Hover gradient glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[24px]"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${color}12 0%, transparent 70%)`,
                    }}
                  />
                  <div className="relative z-10">
                    <div
                      className="w-14 h-14 rounded-2xl grid place-items-center mb-6"
                      style={{ backgroundColor: `${color}15`, color }}
                    >
                      {icon}
                    </div>
                    <h4
                      className="text-[#1F2937] font-bold text-lg mb-3"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {role}
                    </h4>
                    <p className="text-[#5F6B73] text-sm leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ════════════════════════════════════════════════════ */}
        {/*  7. WHO WE SERVE                                    */}
        {/* ════════════════════════════════════════════════════ */}
        <AnimatedSection id="who-we-serve" className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <h2
              className="text-[#1F2937] text-4xl md:text-5xl font-extrabold leading-tight"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Who we <span className="text-[#2C8C91]">serve</span>
            </h2>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
            {WHO_WE_SERVE.map(({ label, icon }, i) => (
              <motion.div
                key={label}
                variants={fadeUp}
                custom={i}
                className="inline-flex items-center gap-3 bg-white rounded-full border border-[#E5DED6] px-6 py-3.5 hover:border-[#2C8C91]/30 hover:shadow-[0_8px_24px_-8px_rgba(44,140,145,0.1)] transition-all duration-300"
              >
                <span className="text-[#2C8C91]">{icon}</span>
                <span className="text-[#1F2937] text-sm font-medium">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>

        {/* ════════════════════════════════════════════════════ */}
        {/*  8. WHY HUMANOVA                                    */}
        {/* ════════════════════════════════════════════════════ */}
        <AnimatedSection id="why-humanova" className="max-w-7xl mx-auto px-6 lg:px-10 pb-20 lg:pb-28">
          <div className="bg-gradient-to-br from-[#07312C] to-[#0A4A42] rounded-[32px] p-8 lg:p-14 overflow-hidden relative">
            {/* Decorative orb */}
            <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-[#D4F04A]/5 blur-[80px]" />

            <motion.div variants={fadeUp} className="relative z-10 mb-12">
              <h2
                className="text-white text-3xl md:text-4xl font-extrabold leading-tight"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Why <span className="text-[#D4F04A]">Humanova</span>
              </h2>
            </motion.div>

            <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {WHY_HUMANOVA.map(({ title, desc, icon }, i) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  custom={i}
                  className="bg-white/5 backdrop-blur-sm rounded-[20px] p-6 border border-white/8 hover:bg-white/10 hover:border-white/15 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#D4F04A]/15 text-[#D4F04A] grid place-items-center mb-4">
                    {icon}
                  </div>
                  <h4
                    className="text-white font-semibold text-base mb-2"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {title}
                  </h4>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ════════════════════════════════════════════════════ */}
        {/*  9. PRIVACY & SECURITY                              */}
        {/* ════════════════════════════════════════════════════ */}
        <AnimatedSection id="privacy" className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
              <motion.div variants={fadeUp}>
                <div className="inline-flex items-center gap-2 mb-5">
                  <ShieldCheck size={18} className="text-[#2C8C91]" />
                  <span className="text-[#1F2937] text-xs font-bold uppercase tracking-[0.15em]">
                    Trust & Privacy
                  </span>
                </div>
                <h2
                  className="text-[#1F2937] text-4xl md:text-5xl font-extrabold leading-tight mb-6"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Built for trust, privacy, and{" "}
                  <span className="text-[#2C8C91]">responsible</span> people insights
                </h2>
                <p className="text-[#5F6B73] text-base leading-relaxed max-w-lg">
                  Humanova is designed around employee confidentiality and responsible data use. Every layer of the platform respects individual privacy while giving HR meaningful, actionable team-level insights.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} custom={1} className="flex flex-col gap-4">
                {PRIVACY_POINTS.map((point, i) => (
                  <motion.div
                    key={point}
                    variants={fadeUp}
                    custom={i}
                    className="flex items-start gap-4 bg-[#FAF7F2] rounded-2xl p-5 border border-[#E5DED6]"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#2C8C91]/10 text-[#2C8C91] grid place-items-center shrink-0 mt-0.5">
                      <ShieldCheck size={16} />
                    </div>
                    <p className="text-[#1F2937] text-sm font-medium leading-relaxed">{point}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* ════════════════════════════════════════════════════ */}
        {/*  10. FAQ                                            */}
        {/* ════════════════════════════════════════════════════ */}
        <AnimatedSection id="faq" className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="grid lg:grid-cols-[420px_1fr] gap-10 lg:gap-16">
            {/* LEFT */}
            <motion.div variants={fadeUp} className="flex flex-col justify-between gap-10">
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
                  Common questions about our services
                </h2>
                <p className="mt-6 text-[#5F6B73] text-base leading-7 max-w-sm">
                  Clear answers on services, privacy, integration, and what makes Humanova different.
                </p>
              </div>

              <div className="rounded-[28px] bg-[#EAF6F4] p-8">
                <h3
                  className="text-[#0E3D39] text-2xl mb-3"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Still have questions?
                </h3>
                <p className="text-[#5F6B73] text-sm leading-relaxed mb-6">
                  Need clarity before rolling this out? Talk to our team and get direct answers for your organisation.
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
                    Talk to Our Team
                  </span>
                </button>
              </div>
            </motion.div>

            {/* RIGHT — accordion */}
            <motion.div variants={fadeUp} custom={1} className="flex flex-col gap-4">
              {FAQ_ITEMS.map((item, i) => {
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
            </motion.div>
          </div>
        </AnimatedSection>

        {/* ════════════════════════════════════════════════════ */}
        {/*  11. FINAL CTA                                      */}
        {/* ════════════════════════════════════════════════════ */}
        <section className="mx-4 mb-16">
          <div className="bg-gradient-to-br from-[#07312C] to-[#0A4A42] rounded-[32px] overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#D4F04A]/5 blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#2C8C91]/10 blur-[80px]" />

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 lg:py-24 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-white text-4xl lg:text-5xl font-extrabold leading-tight"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Ready to build a healthier, more{" "}
                <span className="text-[#D4F04A]">productive workforce?</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-5 text-white/55 text-lg max-w-2xl mx-auto leading-relaxed"
              >
                See how Humanova can help your organisation improve wellbeing, reduce burnout risk, and give HR leaders the insights they need to act with confidence.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-10 flex flex-wrap gap-4 justify-center"
              >
                <button
                  id="services-final-cta-demo"
                  type="button"
                  onClick={openModal}
                  className="group inline-flex items-center gap-2 rounded-full bg-[#D4F04A] px-8 py-4 text-sm font-bold text-black shadow-[0_8px_30px_rgba(212,240,74,0.3)] hover:shadow-[0_12px_48px_rgba(212,240,74,0.5)] transition-all duration-300 cursor-pointer"
                >
                  Book a Free Demo
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  id="services-final-cta-talk"
                  type="button"
                  onClick={openModal}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
                >
                  Talk to Our Team
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FAQ Schema (JSON-LD for SEO) ─── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQ_ITEMS.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      </main>

      <Footer />
    </div>
  );
}