"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { useDemoModal } from "@/context/DemoModalContext";
import {
  motion, AnimatePresence, useInView, useScroll, useSpring, useTransform, animate,
} from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { WORKPLACE_WELLBEING_SCHEMA } from "@/constants/schemas";
import {
  ArrowRight, ArrowLeft, ChevronDown, Heart, Zap, Lock, CheckCircle2,
  AlertTriangle, Activity, CalendarClock, TrendingUp, FileBarChart,
  Smile, Camera, MessageCircle, Gauge, Users, BrainCircuit, BarChart3,
  ShieldCheck, Sparkles, Building2, Briefcase, Globe, Monitor, Stethoscope,
  Factory, Target, GraduationCap,
} from "lucide-react";

/* ─── Theme (matches Humanova marketing site) ────────── */
const COLOR = {
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

function Reveal({ children, className = "", id, onEnter }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  useEffect(() => {
    if (inView && onEnter) onEnter(id);
  }, [inView]); // eslint-disable-line
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
  { value: 40, suffix: "%", label: "Reduction in burnout risk signals" },
  { value: 92, suffix: "%", label: "Employee check-in satisfaction" },
  { value: 3, suffix: "×", label: "Faster issue detection vs. annual surveys" },
];

const COMPARISON_ROWS = [
  ["Conducted once or twice a year", "Ongoing and continuous"],
  ["Static feedback", "Real-time wellbeing insights"],
  ["Problems discovered late", "Early identification of wellbeing concerns"],
  ["Limited employee participation", "Short, simple, regular check-ins"],
  ["Difficult to monitor trends", "Continuous trend analysis"],
  ["Reactive decisions", "Proactive wellbeing support"],
];

const WHY_MODERN_LIST = [
  "Understand employee wellbeing throughout the year.",
  "Identify workplace stress before burnout develops.",
  "Make informed HR decisions using reliable data.",
  "Create a culture where employees feel supported.",
  "Improve retention and workplace satisfaction.",
];

const WHY_MATTERS = [
  { title: "Detect Burnout Early", icon: <AlertTriangle size={22} />, desc: "Burnout usually develops gradually — increased stress, reduced motivation, lower energy — long before employees openly discuss it. Regular tracking surfaces these patterns early enough to act." },
  { title: "Improve Employee Engagement", icon: <Activity size={22} />, desc: "Short check-ins give employees an easy way to be heard without lengthy surveys. Acting on the insights builds trust and connection to the workplace." },
  { title: "Reduce Absenteeism", icon: <CalendarClock size={22} />, desc: "Workplace stress often drives sick leave and unplanned absences. Spotting concerns early lets teams introduce preventive support before it escalates." },
  { title: "Increase Productivity", icon: <TrendingUp size={22} />, desc: "Employees perform best when supported. Healthier teams show stronger focus, better collaboration, and higher output." },
  { title: "Support Better HR Decisions", icon: <FileBarChart size={22} />, desc: "Reliable wellbeing data replaces assumptions — HR can prioritize where support is actually needed." },
];

const FEATURES = [
  { title: "Mood Tracking", icon: <Smile size={24} />, color: COLOR.teal, desc: "Quick, regular emotional check-ins replace long surveys. HR receives anonymous trend reports that highlight morale shifts across teams before they become larger challenges." },
  { title: "Nova Selfie", icon: <Camera size={24} />, color: "#4A90D9", desc: "A fast self-assessment for emotional wellbeing. Higher participation than traditional surveys, with individual privacy fully respected." },
  { title: "Nova Reflections", icon: <MessageCircle size={24} />, color: "#E05FA0", desc: "Guided reflection prompts on motivation, achievements, and challenges — richer wellbeing data that helps HR improve policies and support programs." },
  { title: "Stress & Motivation Insights", icon: <Gauge size={24} />, color: "#E8A020", desc: "Intelligent analysis turns raw check-ins into clear patterns of rising stress or declining motivation, so HR knows exactly where to focus." },
  { title: "Anonymous Wellbeing Trends", icon: <Lock size={24} />, color: "#7C5CDB", desc: "Aggregated, department-level reporting — never individual responses — so employees can be honest and organizations still get a clear picture." },
  { title: "Burnout Risk Signals", icon: <AlertTriangle size={24} />, color: "#1AAF7E", desc: "Early indicators of rising stress or declining morale, well before disengagement or resignation — giving managers time to act." },
];

const HOW_IT_WORKS = [
  { title: "Employees Complete Short Check-Ins", desc: "Brief, frictionless check-ins that take a few minutes and don't interrupt the workday." },
  { title: "Humanova Collects Anonymous Data", desc: "Responses are securely collected and anonymized before analysis, so employees can be honest." },
  { title: "AI Identifies Wellbeing Trends", desc: "Patterns in stress, motivation, engagement, and burnout risk surface automatically." },
  { title: "HR Receives Actionable Insights", desc: "Clear dashboards highlight organization-wide trends and where to prioritize support." },
  { title: "Managers Take Proactive Action", desc: "Adjust workloads, strengthen support, and improve the work environment before issues grow." },
];

const HR_BENEFITS = [
  { title: "Better Employee Engagement", desc: "Regular check-ins help employees feel heard — and more likely to keep participating." },
  { title: "Data-Driven Decisions", desc: "Real-time data replaces assumptions when prioritizing wellbeing initiatives." },
  { title: "Reduced Burnout", desc: "Early warning signs let HR intervene before employees become overwhelmed." },
  { title: "Higher Retention", desc: "Timely support improves satisfaction and reduces voluntary turnover." },
  { title: "Improved Culture", desc: "Better visibility into communication, inclusion, and psychological safety gaps." },
  { title: "Stronger Leadership Visibility", desc: "A clearer read on how every team is doing, enabling proactive resource planning." },
];

const EMPLOYEE_BENEFITS = [
  { title: "Safe Way to Share Wellbeing", desc: "Simple check-ins, no lengthy surveys, full confidentiality." },
  { title: "Early Support", desc: "Concerns get addressed before they become serious challenges." },
  { title: "Less Workplace Stress", desc: "Common stress factors get identified and addressed at the source." },
  { title: "Better Work-Life Balance", desc: "Workload pressure becomes visible, supporting healthier practices." },
  { title: "Greater Trust in Leadership", desc: "Feedback that visibly leads to change builds real trust." },
];

const WHO_CAN_USE = [
  { title: "Startups", icon: <Sparkles size={18} /> },
  { title: "SMEs", icon: <Briefcase size={18} /> },
  { title: "Large Enterprises", icon: <Building2 size={18} /> },
  { title: "Remote Teams", icon: <Globe size={18} /> },
  { title: "Hybrid Teams", icon: <Monitor size={18} /> },
  { title: "Healthcare", icon: <Stethoscope size={18} /> },
  { title: "Technology Companies", icon: <Monitor size={18} /> },
  { title: "Financial Services", icon: <FileBarChart size={18} /> },
  { title: "Manufacturing", icon: <Factory size={18} /> },
];

const WHY_CHOOSE = [
  { title: "AI-Powered Insights", icon: <BrainCircuit size={20} />, desc: "Intelligent trend analysis for faster, more informed HR decisions." },
  { title: "Anonymous Tracking", icon: <Lock size={20} />, desc: "Individual responses stay confidential, always." },
  { title: "Evidence-Based Assessments", icon: <CheckCircle2 size={20} />, desc: "Structured around trusted wellbeing practices." },
  { title: "Simple Implementation", icon: <Zap size={20} />, desc: "Quick rollout, minimal training, fast time to value." },
  { title: "Comprehensive Dashboard", icon: <BarChart3 size={20} />, desc: "One clear view of trends, engagement, and risk areas." },
  { title: "Enterprise-Grade Security", icon: <ShieldCheck size={20} />, desc: "Strong practices to protect employee and organizational data." },
];

const FAQ = [
  { q: "What is workplace wellbeing tracking?", a: "A continuous process of monitoring employee wellbeing through regular check-ins, assessments, and trend analysis — so organizations can support people before issues become larger challenges." },
  { q: "How often should employees check in?", a: "Most organizations see the best results with short weekly or bi-weekly check-ins — frequent enough for accurate trends, light enough to sustain participation." },
  { q: "Is the wellbeing data anonymous?", a: "Yes. HR receives aggregated insights, not individual responses, which encourages honest participation." },
  { q: "Can managers identify individual employees?", a: "No. Humanova focuses on team-level trends rather than individual monitoring." },
  { q: "How does Humanova identify burnout risk?", a: "By analyzing ongoing patterns in mood, stress, motivation, and engagement to flag early risk signals." },
  { q: "Is it suitable for remote and hybrid teams?", a: "Yes — especially valuable where managers have fewer chances to observe wellbeing directly." },
  { q: "How quickly can it be implemented?", a: "Timelines vary by org size, but onboarding is designed to be straightforward with fast time to value." },
  { q: "How does this improve retention?", a: "By catching concerns early and enabling meaningful support, reducing the likelihood of burnout-driven turnover." },
];

/* ─── Page ───────────────────────────────────────────── */

export default function WorkplaceWellbeingTrackingPage() {
  const { open: openModal } = useDemoModal();
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  const heroRef = useRef(null);

  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <JsonLd data={WORKPLACE_WELLBEING_SCHEMA} />
      <Navbar />

      <main>
        {/* ═══════════ HERO ═══════════ */}
        <section ref={heroRef} className="relative w-full overflow-hidden -mt-24" style={{ minHeight: "620px" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#07312C] via-[#0E3D39] to-[#0A4A42]" />
          <motion.div
            className="absolute top-1/4 right-1/5 w-[420px] h-[420px] rounded-full bg-[#D4F04A]/8 blur-[110px]"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-1/6 w-[380px] h-[380px] rounded-full bg-[#2C8C91]/15 blur-[100px]"
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
                <Heart size={14} />
                Core Service
              </motion.span>

              <motion.h1
                variants={fadeUp}
                custom={2}
                className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Workplace Wellbeing{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#D4F04A]">Tracking</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 8C40 2 80 2 100 6C120 10 160 10 198 4" stroke="#D4F04A" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
                  </svg>
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} custom={3} className="text-white/65 text-lg lg:text-xl leading-[1.8] max-w-2xl mt-7">
                Understand how your workforce really feels — continuously, anonymously, and in time to act — instead of waiting for an annual survey to tell you what already went wrong.
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
              Employee wellbeing is no longer just an HR initiative — it's a business priority. Companies that understand how their people feel at work are better placed to reduce stress, improve engagement, and build healthier cultures.
            </p>
            <p className="text-[#3F4A50] text-[17px] leading-[1.9]">
              <strong className="text-[#1F2937]">Workplace wellbeing tracking</strong> is the process of monitoring employee wellbeing through regular check-ins, mood tracking, reflection prompts, and wellbeing insights — instead of relying on annual surveys, organizations understand how their workforce feels in real time and act before small concerns become larger problems.
            </p>
            <p className="text-[#3F4A50] text-[17px] leading-[1.9]">
              At Humanova, this combines evidence-based assessments, AI-powered insights, and anonymous reporting — helping teams identify risks early and build trust through meaningful action, not surveillance.
            </p>
          </motion.div>

          {/* Stat strip */}
          <motion.div variants={fadeUp} custom={1} className="grid sm:grid-cols-3 gap-6 mt-14">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="bg-white rounded-[24px] border border-[#E5DED6] p-7 text-center">
                <div
                  className="text-4xl font-extrabold mb-2"
                  style={{ fontFamily: "var(--font-outfit)", color: COLOR.teal }}
                >
                  <CountUp value={stat.value} suffix={stat.suffix} duration={1.2 + i * 0.2} />
                </div>
                <p className="text-[#5F6B73] text-sm leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </Reveal>

        {/* ═══════════ WHY IT MATTERS ═══════════ */}
        <Reveal id="why-it-matters" className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <p className="text-[#2C8C91] text-sm font-bold uppercase tracking-[0.2em] mb-4">Why It Matters</p>
            <h2 className="text-[#1F2937] text-3xl md:text-4xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              Annual surveys tell you what{" "}
              <span className="text-[#2C8C91]">already went wrong</span>
            </h2>
          </motion.div>

          {/* Comparison table */}
          <motion.div variants={fadeUp} custom={1} className="rounded-[24px] border border-[#E5DED6] overflow-hidden bg-white">
            <div className="grid grid-cols-2 bg-[#0E3D39] text-white text-sm font-semibold">
              <div className="px-6 py-4 border-r border-white/10">Traditional Surveys</div>
              <div className="px-6 py-4">Continuous Wellbeing Tracking</div>
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
                  <CheckCircle2 size={15} className="text-[#2C8C91] shrink-0" />
                  {row[1]}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* What this unlocks */}
          <div className="grid lg:grid-cols-12 gap-8 mt-16 items-stretch">
            {/* Left Column - Dark Card */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="lg:col-span-5 bg-gradient-to-br from-[#0E3D39] to-[#07312C] rounded-[28px] p-8 lg:p-10 text-white flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#D4F04A]/5 blur-3xl" />
              <div>
                <h3 className="text-white text-2xl lg:text-3xl font-extrabold mb-6 leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                  What continuous tracking unlocks
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
                const isLast = i === WHY_MATTERS.length - 1;
                return (
                  <div
                    key={item.title}
                    className={`flex gap-4 bg-white rounded-2xl border border-[#E5DED6] p-5 hover:border-[#2C8C91]/30 hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.05)] transition-all duration-300 ${
                      isLast ? "sm:col-span-2" : ""
                    }`}
                  >
                    <div className="w-11 h-11 rounded-xl grid place-items-center shrink-0 bg-[#2C8C91]/10 text-[#2C8C91]">
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
              <p className="text-[#2C8C91] text-sm font-bold uppercase tracking-[0.2em] mb-4">What's Inside</p>
              <h2 className="text-[#1F2937] text-3xl md:text-4xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                Features of Humanova{" "}
                <span className="text-[#2C8C91]">Wellbeing Tracking</span>
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
            <p className="text-[#2C8C91] text-sm font-bold uppercase tracking-[0.2em] mb-4">The Flow</p>
            <h2 className="text-[#1F2937] text-3xl md:text-4xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              How it works, start to finish
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
                className="bg-white rounded-[24px] border border-[#E5DED6] p-6 flex flex-col justify-between hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-[#2C8C91]/30 transition-all duration-300"
              >
                <div>
                  <div
                    className="w-10 h-10 rounded-full font-bold text-sm grid place-items-center mb-5"
                    style={{ backgroundColor: `${COLOR.teal}15`, color: COLOR.teal, fontFamily: "var(--font-outfit)" }}
                  >
                    0{i + 1}
                  </div>
                  <h4 className="text-[#1F2937] font-bold text-base mb-2 leading-snug" style={{ fontFamily: "var(--font-outfit)" }}>
                    {step.title}
                  </h4>
                </div>
                <p className="text-[#5F6B73] text-[13px] leading-relaxed mt-2">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* ═══════════ BENEFITS ═══════════ */}
        <Reveal id="benefits" className="bg-white py-20 lg:py-28">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-14">
              <motion.div variants={fadeUp}>
                <p className="text-[#2C8C91] text-sm font-bold uppercase tracking-[0.2em] mb-4">For HR Teams</p>
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
                      className="flex items-start gap-3 bg-[#FAF7F2] rounded-2xl border border-[#E5DED6] p-5"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#2C8C91]/10 text-[#2C8C91] grid place-items-center shrink-0 mt-0.5">
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
                <p className="text-[#E05FA0] text-sm font-bold uppercase tracking-[0.2em] mb-4">For Employees</p>
                <h3 className="text-[#1F2937] text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-outfit)" }}>
                  Five ways employees benefit
                </h3>
                <div className="flex flex-col gap-4">
                  {EMPLOYEE_BENEFITS.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-3 bg-[#FFF0F6] rounded-2xl border border-[#E5DED6] p-5"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#E05FA0]/10 text-[#E05FA0] grid place-items-center shrink-0 mt-0.5">
                        <Heart size={14} />
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
            <p className="text-[#2C8C91] text-sm font-bold uppercase tracking-[0.2em] mb-4">Built For Every Team</p>
            <h2 className="text-[#1F2937] text-3xl md:text-4xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              Who can use workplace wellbeing tracking?
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
                className="inline-flex items-center gap-3 bg-white rounded-full border border-[#E5DED6] px-6 py-3.5 hover:border-[#2C8C91]/30 hover:shadow-[0_8px_24px_-8px_rgba(44,140,145,0.1)] transition-all duration-300"
              >
                <span className="text-[#2C8C91]">{item.icon}</span>
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
            <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    Find answers to common questions about workplace wellbeing tracking, privacy, implementation, and reporting.
                  </p>
                </div>

                <div className="rounded-[28px] bg-[#EAF6F4] p-8">
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
                      className="rounded-[24px] bg-[#FAF7F2] border border-[#E5DED6] px-7 py-6 cursor-pointer transition-colors duration-200 hover:border-[#2C8C91]/30"
                      onClick={() => setOpenFaqIdx(isOpen ? -1 : i)}
                    >
                      <div className="flex items-center justify-between gap-6">
                        <h3 className="text-[#1F2937] text-lg lg:text-xl leading-snug" style={{ fontFamily: "'Instrument Serif', serif" }}>
                          {item.q}
                        </h3>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          className="shrink-0 grid place-items-center w-9 h-9 rounded-full transition-colors duration-200"
                          style={{ backgroundColor: isOpen ? COLOR.tealDark : "#EAF6F4", color: isOpen ? "#fff" : COLOR.tealDark }}
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
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#2C8C91]/10 blur-[80px]" />
            <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 lg:py-24 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-white text-4xl lg:text-5xl font-extrabold leading-tight"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                See wellbeing tracking{" "}
                <span className="text-[#D4F04A]">in action</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-5 text-white/55 text-lg max-w-2xl mx-auto leading-relaxed"
              >
                Book a free demo and see how Humanova helps your organization catch burnout risk early — without compromising employee privacy.
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
