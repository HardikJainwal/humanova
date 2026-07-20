"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useDemoModal } from "@/context/DemoModalContext";
import {
  motion, AnimatePresence, useInView, useScroll, useTransform, animate,
} from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ArrowRight, ArrowLeft, ChevronDown, CalendarClock, Zap, Lock, CheckCircle2,
  TrendingUp, FileBarChart, Users, BrainCircuit, BarChart3,
  ShieldCheck, Sparkles, Building2, Briefcase, Globe, Monitor, Stethoscope,
  Factory, Target, Shield, Clock, Calendar, AlertOctagon, Heart,
} from "lucide-react";

/* ─── Theme ──────────────────────────────────────────── */
const COLOR = {
  purple: "#7C5CDB",
  purpleDark: "#4A2EA8",
  teal: "#2C8C91",
  tealDark: "#0E3D39",
  forest: "#07312C",
  lime: "#D4F04A",
  cream: "#FAF7F2",
  ink: "#1F2937",
  slate: "#5F6B73",
  line: "#E5DED6",
};

/* ─── Animation helpers ──────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

function Reveal({ children, className = "", id }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ value, suffix = "", duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [inView, value, duration]);
  return <span ref={ref}>{display}{suffix}</span>;
}

/* ─── Content ────────────────────────────────────────── */

const STATS = [
  { value: 28, suffix: "%", label: "Reduction in unplanned absenteeism" },
  { value: 85, suffix: "%", label: "Improvement in shift scheduling efficiency" },
  { value: 3, suffix: "×", label: "Faster detection of workload fatigue" },
];

const COMPARISON_ROWS = [
  ["Static manual tracking spreadsheets", "Continuous real-time pattern analysis"],
  ["Isolated attendance metrics", "Connected wellbeing and operational analytics"],
  ["Discovered after absence happens", "Early fatigue and burnout risk detection"],
  ["Reactive shift scheduling", "Proactive workload and fatigue warnings"],
  ["Limited insights into burnout causes", "Direct connection to workload and stress signals"],
  ["Difficult to identify organization trends", "Centralized, anonymous department comparison"],
];

const WHY_MODERN_LIST = [
  "Understand how workload and shift patterns affect employee health.",
  "Identify emerging absenteeism risks before they disrupt operations.",
  "Create flexible shift systems that prevent employee fatigue.",
  "Provide supportive leadership intervention based on real workload data.",
  "Evaluate the effectiveness of scheduling and leave policies.",
  "Enhance workforce planning while respecting employee privacy.",
];

const WHY_MATTERS = [
  { title: "Detect Workload Fatigue Early", icon: <AlertOctagon size={22} />, desc: "Prolonged shifts and heavy workloads trigger fatigue long before performance drops. Connecting attendance patterns to wellbeing signals helps you intervene before burnout." },
  { title: "Reduce Unplanned Absenteeism", icon: <Clock size={22} />, desc: "Frequent unplanned absences often indicate underlying stress or disengagement. Tracking patterns enables proactive HR support to address problems early." },
  { title: "Optimize Shift Planning", icon: <Calendar size={22} />, desc: "Ensure shift rotations and scheduling support employee wellness. Balanced scheduling improves morale, focus, and overall workplace safety." },
  { title: "Improve Employee Productivity", icon: <TrendingUp size={22} />, desc: "Well-rested, supported employees show higher concentration, better collaboration, and fewer errors, translating to stronger business performance." },
  { title: "Support Better HR Decision-Making", icon: <FileBarChart size={22} />, desc: "Transform operational attendance records into meaningful workforce intelligence to build smarter scheduling and wellbeing strategies." },
  { title: "Increase Employee Retention", icon: <Heart size={22} />, desc: "Employees remain loyal to companies that respect their time, distribute workloads fairly, and proactively support work-life balance." },
];

const FEATURES = [
  { title: "Leave Management", icon: <Calendar size={24} />, color: COLOR.purple, desc: "Streamline leave requests and tracking. Humanova helps identify department-level leave patterns to ensure teams maintain balanced coverage without overloading team members." },
  { title: "Attendance Tracking", icon: <Clock size={24} />, color: "#4A90D9", desc: "Monitor workforce presence in real time. Identify unusual attendance shifts or rising absenteeism rates at a department level to uncover potential team wellbeing challenges." },
  { title: "Shift Management", icon: <Users size={24} />, color: "#E05FA0", desc: "Plan, assign, and balance shifts effectively. Avoid scheduling conflicts, prevent consecutive double-shifts, and maintain healthy rotation patterns across the organization." },
  { title: "Punctuality Insights", icon: <TrendingUp size={24} />, color: "#E8A020", desc: "Gain visibility into check-in and check-out patterns. Subtle shifts in punctuality trends can act as early indicators of workload fatigue or waning engagement." },
  { title: "Absence Pattern Detection", icon: <AlertOctagon size={24} />, color: "#1AAF7E", desc: "AI-driven algorithms highlight unusual absence patterns, such as frequent Friday/Monday absences or recurring short-term sick leave, pointing to potential burnout." },
  { title: "Workload & Fatigue Signals", icon: <BrainCircuit size={24} />, color: COLOR.teal, desc: "Synthesize shift durations, overtime, and leave history into fatigue risk alerts, helping managers adjust workloads before safety or wellbeing is compromised." },
];

const HOW_IT_WORKS = [
  { title: "Employees Record Shifts & Leave", desc: "Employees request leave, log attendance, and manage their shifts easily through the intuitive Humanova platform." },
  { title: "Platform Gathers Anonymous Data", desc: "Attendance records and shift behaviors are securely compiled and processed using privacy-first standards." },
  { title: "AI Analyzes Operational Patterns", desc: "The platform's AI evaluates leave frequency, punctuality shifts, and shift workloads to pinpoint fatigue patterns." },
  { title: "HR Accesses Real-Time Dashboards", desc: "HR leaders view department-level scheduling efficiency, fatigue levels, and absence trends on centralized dashboards." },
  { title: "Managers Adjust Shifts & Support", desc: "Armed with actionable intelligence, managers optimize shifts, balance workloads, and provide targeted wellbeing support." },
];

const HR_BENEFITS = [
  { title: "Real-Time Shift Visibility", desc: "Track attendance, leave trends, and shift coverage live across all departments from a single intuitive dashboard." },
  { title: "Proactively Address Fatigue", desc: "Receive early warnings when overtime or shift density flags high fatigue risks, letting you adjust schedules in advance." },
  { title: "Smoother Shift Operations", desc: "Minimize scheduling gaps, handle sudden absences, and maintain balanced, fair workloads across your workforce." },
  { title: "Data-Driven Resourcing", desc: "Assess resourcing requirements accurately to guide smart hiring decisions, contract adjustments, and shift planning." },
  { title: "Reduce Absenteeism Rates", desc: "Spot the root causes of absenteeism early, allowing you to build supportive initiatives that encourage attendance." },
  { title: "Automate Resourcing Reports", desc: "Save valuable administrative time by generating clean, exportable compliance and attendance reports automatically." },
];

const EMPLOYEE_BENEFITS = [
  { title: "Fairer Workloads & Shifts", desc: "Balanced schedules prevent overloading, ensuring everyone receives adequate rest and recovery time between shifts." },
  { title: "Protected Work-Life Balance", desc: "Easy leave requests and predictable shift plans make it simpler for employees to balance personal commitments." },
  { title: "Early Fatigue Intervention", desc: "System alerts ensure managers adjust workloads before employees become overwhelmed or exhausted." },
  { title: "Safe Leave Request Channels", desc: "Private and confidential leave submission ensures employees feel comfortable requesting necessary time off." },
  { title: "Reduced Burnout Risk", desc: "Workplace stress and scheduling pressures are detected and managed at the source, supporting long-term health." },
  { title: "Greater Schedule Transparency", desc: "Clear visibility into shift schedules and rotation rules fosters a culture of trust and transparency across teams." },
];

const WHO_CAN_USE = [
  { title: "Startups", icon: <Sparkles size={18} /> },
  { title: "SMEs", icon: <Briefcase size={18} /> },
  { title: "Large Enterprises", icon: <Building2 size={18} /> },
  { title: "Remote Teams", icon: <Globe size={18} /> },
  { title: "Hybrid Teams", icon: <Monitor size={18} /> },
  { title: "Healthcare", icon: <Stethoscope size={18} /> },
  { title: "IT & Technology", icon: <Monitor size={18} /> },
  { title: "Financial Services", icon: <FileBarChart size={18} /> },
  { title: "Manufacturing", icon: <Factory size={18} /> },
];

const WHY_CHOOSE = [
  { title: "Connected Wellbeing & Resourcing", icon: <BrainCircuit size={20} />, desc: "Links attendance patterns directly with wellbeing signals to uncover scheduling-related burnout risks." },
  { title: "Real-Time Shift Analytics", icon: <Clock size={20} />, desc: "Gain instant visibility into attendance, leave requests, and punctuality across multiple sites." },
  { title: "Privacy-First Insights", icon: <Lock size={20} />, desc: "Aggregated, team-level resourcing trends ensure employee confidentiality remains protected." },
  { title: "Evidence-Based Scheduling", icon: <CheckCircle2 size={20} />, desc: "Align shift guidelines and rotation patterns with trusted workplace fatigue and wellbeing standards." },
  { title: "Enterprise-Grade Security", icon: <ShieldCheck size={20} />, desc: "Robust data protection measures safeguard organizational schedules and personal resourcing records." },
  { title: "Easy Implementation", icon: <Zap size={20} />, desc: "Onboard teams quickly with a straightforward setup process that integrates seamlessly with existing workflows." },
  { title: "Actionable Operational Alerts", icon: <Target size={20} />, desc: "Go beyond basic tracking with intelligent resourcing recommendations that support workforce resilience." },
];

const FAQ = [
  { q: "What is Leave, Attendance & Shift Intelligence?", a: "It is the process of linking operational workforce data (like attendance, leave requests, shift histories, and punctuality) with employee wellbeing signals. This helps organizations understand how scheduling affects employee fatigue, stress, and overall burnout risk." },
  { q: "How does this platform protect employee privacy?", a: "Humanova prioritizes data privacy. HR teams and managers see aggregated, team-level attendance trends and fatigue warnings. Individual logs are analyzed securely without exposing private employee data to ensure trust." },
  { q: "How does the system identify workload fatigue?", a: "By evaluating cumulative shift hours, consecutive working days, overtime frequency, and patterns in leave or punctuality. The AI flags departments showing elevated fatigue risk markers." },
  { q: "Can we manage shift scheduling through Humanova?", a: "Yes. Humanova provides shift planning and management features that balance resourcing demands with employee rotation guidelines to support team health." },
  { q: "Is this suitable for remote or hybrid teams?", a: "Absolutely. Humanova tracks digital check-ins, flexible hours, and leave patterns, making it highly valuable for remote, hybrid, and distributed teams." },
  { q: "How does scheduling intelligence reduce turnover?", a: "By preventing excessive overtime, ensuring balanced shifts, and identifying fatigue early, organizations improve work conditions, which directly improves job satisfaction and retention." },
  { q: "Can we export reports for resourcing reviews?", a: "Yes. Humanova supports exportable resourcing reports, making it easy to share scheduling trends, attendance stats, and compliance logs with leadership during reviews." },
  { q: "How long does onboarding take?", a: "Onboarding is simple and fast. Teams can begin tracking attendance, managing leave, and analyzing scheduling intelligence within a short setup period." },
];

/* ─── Page ───────────────────────────────────────────── */

export default function LeaveAttendanceShiftIntelligencePage() {
  const { open: openModal } = useDemoModal();
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">

      <Navbar />

      <main>
        {/* ═══════════ HERO ═══════════ */}
        <section ref={heroRef} className="relative w-full overflow-hidden -mt-24" style={{ minHeight: "620px" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#07312C] via-[#0E3D39] to-[#0A4A42]" />
          <motion.div
            className="absolute top-1/4 right-1/5 w-[420px] h-[420px] rounded-full bg-[#7C5CDB]/8 blur-[110px]"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-1/6 w-[380px] h-[380px] rounded-full bg-[#7C5CDB]/6 blur-[100px]"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 pt-36 pb-28 lg:pt-44 lg:pb-32"
          >
            <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col items-center text-center">
              <motion.div variants={fadeUp} custom={0}>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-8 transition-colors"
                >
                  <ArrowLeft size={14} />
                  Back to Services
                </Link>
              </motion.div>

              <motion.span
                variants={fadeUp}
                custom={1}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4F04A] backdrop-blur-sm mb-8"
              >
                <CalendarClock size={14} />
                Core Service
              </motion.span>

              <motion.h1
                variants={fadeUp}
                custom={2}
                className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Leave, Attendance &amp;{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#D4F04A]">Shift Intelligence</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 8C40 2 80 2 100 6C120 10 160 10 198 4" stroke="#D4F04A" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
                  </svg>
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} custom={3} className="text-white/65 text-lg lg:text-xl leading-[1.8] max-w-2xl mt-7">
                Connect resourcing schedules, absenteeism patterns, and shift operations directly with employee wellbeing to identify fatigue and burnout risks early.
              </motion.p>

              <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-4 pt-8 justify-center">
                <button
                  type="button"
                  onClick={openModal}
                  className="group inline-flex items-center gap-2 rounded-full bg-[#D4F04A] px-8 py-4 text-sm font-bold text-black shadow-[0_8px_30px_rgba(212,240,74,0.4)] hover:shadow-[0_12px_48px_rgba(212,240,74,0.6)] transition-all duration-300 cursor-pointer"
                >
                  Book a Free Demo
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href="#overview"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/8 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
                >
                  Explore the Feature
                  <ChevronDown size={16} />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
              <path d="M0 80V40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0Z" fill="#FAF7F2" />
            </svg>
          </div>
        </section>

        {/* ═══════════ OVERVIEW ═══════════ */}
        <Reveal id="overview" className="max-w-5xl mx-auto px-6 lg:px-10 pt-16 lg:pt-20 pb-6">
          <motion.div variants={fadeUp} className="flex flex-col gap-5">
            <p className="text-[#3F4A50] text-[17px] leading-[1.9]">
              Managing daily operations requires a clear view of your resourcing patterns. Leave, Attendance &amp; Shift Intelligence connects employee attendance, leave frequencies, and shift behaviors with overall wellbeing metrics. Instead of reviewing spreadsheets in isolation, organizations receive an automated, connected view that explains how workload distributions influence workforce health and productivity.
            </p>
            <p className="text-[#3F4A50] text-[17px] leading-[1.9]">
              Today&apos;s dynamic operational demands place severe pressure on scheduling. Frequent shift rotations, overtime, and holiday coverage can lead to chronic employee exhaustion. <strong className="text-[#1F2937]">Shift intelligence</strong> identifies elevated resourcing demands and fatigue risks early, giving HR teams and managers the insights they need to build supportive resourcing schedules.
            </p>
            <p className="text-[#3F4A50] text-[17px] leading-[1.9]">
              Humanova&apos;s platform automates data compilation using secure, privacy-first structures. HR leaders compare resourcing metrics across departments, helping schedule shifts fairly, prevent burnout, reduce absenteeism, and build a supportive work culture that keeps employees motivated.
            </p>
          </motion.div>

          {/* Stat strip */}
          <motion.div variants={fadeUp} custom={1} className="grid sm:grid-cols-3 gap-6 mt-14">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="bg-white rounded-[24px] border border-[#E5DED6] p-7 text-center">
                <div
                  className="text-4xl font-extrabold mb-2"
                  style={{ fontFamily: "var(--font-outfit)", color: COLOR.purple }}
                >
                  <CountUp value={stat.value} suffix={stat.suffix} duration={1.2 + i * 0.2} />
                </div>
                <p className="text-[#5F6B73] text-sm leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </Reveal>

        {/* ═══════════ WHAT IS IT + COMPARISON ═══════════ */}
        <Reveal id="what-is-it" className="max-w-5xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <motion.div variants={fadeUp} className="flex flex-col gap-5 mb-14">
            <h2
              className="text-[#1F2937] text-3xl md:text-4xl font-extrabold leading-tight"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              What is Leave, Attendance &amp;{" "}
              <span className="text-[#7C5CDB]">Shift Intelligence?</span>
            </h2>
            <p className="text-[#3F4A50] text-[17px] leading-[1.9]">
              Leave, Attendance &amp; Shift Intelligence is the practice of combining scheduling details (such as logged hours, shifts, overtime, and leave history) with employee wellbeing reflections. This unified data lets organizations analyze how scheduling choices directly impact employee fatigue, stress, and overall burnout risks.
            </p>
            <p className="text-[#3F4A50] text-[17px] leading-[1.9]">
              Instead of treating leave requests and shift workloads as isolated metrics, Humanova connects operational patterns to employee wellbeing. Rather than tracking attendance simply for compliance, organizations gain deep intelligence that supports healthier workloads, smarter hiring plans, and flexible resourcing.
            </p>
          </motion.div>

          {/* Comparison table */}
          <motion.div variants={fadeUp} custom={1} className="rounded-[24px] border border-[#E5DED6] overflow-hidden bg-white">
            <div className="grid grid-cols-2 bg-[#0E3D39] text-white text-sm font-semibold">
              <div className="px-6 py-4 border-r border-white/10">Traditional Resourcing Reports</div>
              <div className="px-6 py-4">Leave, Attendance &amp; Shift Intelligence</div>
            </div>
            {COMPARISON_ROWS.map((row, i) => (
              <motion.div
                key={row[0]}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className={`grid grid-cols-2 text-sm ${i % 2 === 0 ? "bg-white" : "bg-[#FAF7F2]"}`}
              >
                <div className="px-6 py-4 border-r border-[#E5DED6] text-[#5F6B73]">{row[0]}</div>
                <div className="px-6 py-4 text-[#1F2937] font-medium flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#7C5CDB] shrink-0" />
                  {row[1]}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>

        {/* ═══════════ WHY IT MATTERS ═══════════ */}
        <Reveal id="why-it-matters" className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <p className="text-[#7C5CDB] text-sm font-bold uppercase tracking-[0.2em] mb-4">Why It Matters</p>
            <h2 className="text-[#1F2937] text-3xl md:text-4xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              Why Leave, Attendance &amp; Shift Intelligence{" "}
              <span className="text-[#7C5CDB]">Matters</span>
            </h2>
            <p className="mt-5 text-[#5F6B73] text-lg max-w-2xl mx-auto leading-relaxed">
              Operational scheduling choices shape employee energy and motivation. Integrating shift details with wellbeing patterns creates healthy, sustainable, and productive workplaces.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column - Dark Card */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="lg:col-span-5 bg-gradient-to-br from-[#0E3D39] to-[#07312C] rounded-[28px] p-8 lg:p-10 text-white flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#7C5CDB]/10 blur-3xl" />
              <div>
                <h3 className="text-white text-2xl lg:text-3xl font-extrabold mb-6 leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                  Why modern organisations need resourcing insights
                </h3>
                <ul className="flex flex-col gap-4">
                  {WHY_MODERN_LIST.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-3 text-white/80 text-[15px]"
                    >
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#D4F04A]" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right Column - Cards Grid */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {WHY_MATTERS.map((item, i) => {
                const isLast = i === WHY_MATTERS.length - 1 && WHY_MATTERS.length % 2 !== 0;
                return (
                  <div
                    key={item.title}
                    className={`flex gap-4 bg-white rounded-2xl border border-[#E5DED6] p-5 hover:border-[#7C5CDB]/30 hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.05)] transition-all duration-300 ${
                      isLast ? "sm:col-span-2" : ""
                    }`}
                  >
                    <div className="w-11 h-11 rounded-xl grid place-items-center shrink-0 bg-[#7C5CDB]/10 text-[#7C5CDB]">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-[#1F2937] font-bold text-[15px] mb-1">{item.title}</h4>
                      <p className="text-[#5F6B73] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </Reveal>

        {/* ═══════════ FEATURES ═══════════ */}
        <Reveal id="features" className="bg-white py-20 lg:py-28">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <motion.div variants={fadeUp} className="text-center mb-16">
              <p className="text-[#7C5CDB] text-sm font-bold uppercase tracking-[0.2em] mb-4">What&apos;s Inside</p>
              <h2 className="text-[#1F2937] text-3xl md:text-4xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                Features of Humanova{" "}
                <span className="text-[#7C5CDB]">Leave, Attendance &amp; Shift Intelligence</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="bg-[#FAF7F2] rounded-[24px] border border-[#E5DED6] p-7 hover:shadow-[0_16px_40px_-14px_rgba(0,0,0,0.12)] hover:border-transparent transition-shadow duration-300"
                >
                  <div
                    className="w-14 h-14 rounded-2xl grid place-items-center mb-5"
                    style={{ backgroundColor: `${f.color}15`, color: f.color }}
                  >
                    {f.icon}
                  </div>
                  <h4 className="text-[#1F2937] font-bold text-lg mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                    {f.title}
                  </h4>
                  <p className="text-[#5F6B73] text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ═══════════ HOW IT WORKS ═══════════ */}
        <Reveal id="how-it-works" className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-[#7C5CDB] text-sm font-bold uppercase tracking-[0.2em] mb-4">The Flow</p>
            <h2 className="text-[#1F2937] text-3xl md:text-4xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              How Leave, Attendance &amp; Shift Intelligence{" "}
              <span className="text-[#7C5CDB]">Works</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="bg-white rounded-[24px] border border-[#E5DED6] p-6 flex flex-col justify-between hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-[#7C5CDB]/30 transition-all duration-300"
              >
                <div>
                  <div
                    className="w-10 h-10 rounded-full font-bold text-sm grid place-items-center mb-5"
                    style={{ backgroundColor: `${COLOR.purple}15`, color: COLOR.purple, fontFamily: "var(--font-outfit)" }}
                  >
                    0{i + 1}
                  </div>
                  <h4 className="text-[#1F2937] font-bold text-base mb-2 leading-snug" style={{ fontFamily: "var(--font-outfit)" }}>
                    {step.title}
                  </h4>
                </div>
                <p className="text-[#5F6B73] text-[13px] leading-relaxed mt-2">{step.desc}</p>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-4">
                    <ChevronDown size={18} className="text-[#7C5CDB]/40" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* ═══════════ BENEFITS ═══════════ */}
        <Reveal id="benefits" className="bg-white py-20 lg:py-28">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-14">
              <motion.div variants={fadeUp}>
                <p className="text-[#7C5CDB] text-sm font-bold uppercase tracking-[0.2em] mb-4">For HR Teams</p>
                <h3 className="text-[#1F2937] text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-outfit)" }}>
                  Six ways HR benefits
                </h3>
                <div className="flex flex-col gap-4">
                  {HR_BENEFITS.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-3 bg-[#F3EEFF] rounded-2xl border border-[#E5DED6] p-5"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#7C5CDB]/10 text-[#7C5CDB] grid place-items-center shrink-0 mt-0.5">
                        <CheckCircle2 size={15} />
                      </div>
                      <div>
                        <h4 className="text-[#1F2937] font-semibold text-sm mb-1">{item.title}</h4>
                        <p className="text-[#5F6B73] text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} custom={1}>
                <p className="text-[#2C8C91] text-sm font-bold uppercase tracking-[0.2em] mb-4">For Employees</p>
                <h3 className="text-[#1F2937] text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-outfit)" }}>
                  Six ways employees benefit
                </h3>
                <div className="flex flex-col gap-4">
                  {EMPLOYEE_BENEFITS.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-3 bg-[#EAF6F4] rounded-2xl border border-[#E5DED6] p-5"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#2C8C91]/10 text-[#2C8C91] grid place-items-center shrink-0 mt-0.5">
                        <Users size={14} />
                      </div>
                      <div>
                        <h4 className="text-[#1F2937] font-semibold text-sm mb-1">{item.title}</h4>
                        <p className="text-[#5F6B73] text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </Reveal>

        {/* ═══════════ WHO CAN USE ═══════════ */}
        <Reveal id="who-can-use" className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <p className="text-[#7C5CDB] text-sm font-bold uppercase tracking-[0.2em] mb-4">Built For Every Team</p>
            <h2 className="text-[#1F2937] text-3xl md:text-4xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              Who can use Leave, Attendance &amp; Shift Intelligence?
            </h2>
          </motion.div>
          <motion.div variants={fadeUp} custom={1} className="flex flex-wrap justify-center gap-4">
            {WHO_CAN_USE.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="inline-flex items-center gap-3 bg-white rounded-full border border-[#E5DED6] px-6 py-3.5 hover:border-[#7C5CDB]/30 hover:shadow-[0_8px_24px_-8px_rgba(124,92,219,0.1)] transition-all duration-300"
              >
                <span className="text-[#7C5CDB]">{item.icon}</span>
                <span className="text-[#1F2937] text-sm font-medium">{item.title}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Why choose Humanova — dark card */}
          <motion.div
            variants={fadeUp}
            custom={2}
            className="mt-16 bg-gradient-to-br from-[#07312C] to-[#0A4A42] rounded-[32px] p-8 lg:p-14 overflow-hidden relative"
          >
            <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-[#D4F04A]/5 blur-[80px]" />
            <h3 className="relative z-10 text-white text-2xl md:text-3xl font-extrabold mb-10" style={{ fontFamily: "var(--font-outfit)" }}>
              Why choose <span className="text-[#D4F04A]">Humanova</span>
            </h3>
            <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {WHY_CHOOSE.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white/5 backdrop-blur-sm rounded-[20px] p-6 border border-white/8 hover:bg-white/10 hover:border-white/15 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#D4F04A]/15 text-[#D4F04A] grid place-items-center mb-4">
                    {item.icon}
                  </div>
                  <h4 className="text-white font-semibold text-base mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                    {item.title}
                  </h4>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Reveal>

        {/* ═══════════ FAQ ═══════════ */}
        <Reveal id="faq" className="bg-white py-20 lg:py-28">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-[380px_1fr] gap-10 lg:gap-16">
              {/* LEFT */}
              <motion.div variants={fadeUp} className="lg:sticky lg:top-24 flex flex-col gap-8 self-start">
                <div>
                  <div className="inline-flex items-center gap-2 mb-5">
                    <Zap size={15} className="text-[#D4F04A] fill-[#D4F04A]" />
                    <span className="text-[#1F2937] text-xs font-bold uppercase tracking-[0.15em]">Questions &amp; Answers</span>
                  </div>
                  <h2 className="text-[#0E3D39] text-4xl lg:text-5xl leading-[1.15]" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    Common questions
                  </h2>
                  <p className="mt-6 text-[#5F6B73] text-base leading-7 max-w-sm">
                    Find answers to common questions about leave management, attendance intelligence, and shift rotations.
                  </p>
                </div>

                <div className="rounded-[28px] bg-[#F3EEFF] p-8">
                  <h3 className="text-[#0E3D39] text-2xl mb-3" style={{ fontFamily: "'Instrument Serif', serif" }}>
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

              {/* RIGHT — Accordion */}
              <motion.div variants={fadeUp} custom={1} className="flex flex-col gap-4">
                {FAQ.map((item, i) => {
                  const isOpen = openFaqIdx === i;
                  return (
                    <div
                      key={item.q}
                      className="rounded-[24px] bg-[#FAF7F2] border border-[#E5DED6] px-7 py-6 cursor-pointer transition-colors duration-200 hover:border-[#7C5CDB]/30"
                      onClick={() => setOpenFaqIdx(isOpen ? -1 : i)}
                    >
                      <div className="flex items-center justify-between gap-6">
                        <h3 className="text-[#1F2937] text-lg lg:text-xl leading-snug" style={{ fontFamily: "'Instrument Serif', serif" }}>
                          {item.q}
                        </h3>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          className="shrink-0 grid place-items-center w-9 h-9 rounded-full transition-colors duration-200"
                          style={{ backgroundColor: isOpen ? COLOR.purpleDark : "#F3EEFF", color: isOpen ? "#fff" : COLOR.purpleDark }}
                        >
                          <ChevronDown size={16} />
                        </motion.span>
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
                            <p className="text-[#5F6B73] text-sm leading-relaxed pt-4 pr-10">{item.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </Reveal>

        {/* ═══════════ FINAL CTA ═══════════ */}
        <section className="mx-4 mb-16">
          <div className="bg-gradient-to-br from-[#07312C] to-[#0A4A42] rounded-[32px] overflow-hidden relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#D4F04A]/5 blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#7C5CDB]/10 blur-[80px]" />
            <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 lg:py-24 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-white text-4xl lg:text-5xl font-extrabold leading-tight"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                See leave &amp; shift intelligence{" "}
                <span className="text-[#D4F04A]">in action</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-5 text-white/55 text-lg max-w-2xl mx-auto leading-relaxed"
              >
                Book a free demo and see how Humanova helps your organization connect attendance patterns with wellbeing to optimize resourcing and support healthy operations.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-10 flex flex-wrap gap-4 justify-center"
              >
                <button
                  type="button"
                  onClick={openModal}
                  className="group inline-flex items-center gap-2 rounded-full bg-[#D4F04A] px-8 py-4 text-sm font-bold text-black shadow-[0_8px_30px_rgba(212,240,74,0.3)] hover:shadow-[0_12px_48px_rgba(212,240,74,0.5)] transition-all duration-300 cursor-pointer"
                >
                  Book a Free Demo
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 transition-all duration-300"
                >
                  Explore All Services
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQ.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            }),
          }}
        />
      </main>

      <Footer />

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
