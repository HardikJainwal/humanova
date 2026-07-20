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
  ArrowRight, ArrowLeft, ChevronDown, Activity, Zap, Lock, CheckCircle2,
  TrendingUp, FileBarChart, Users, BrainCircuit, BarChart3,
  ShieldCheck, Sparkles, Building2, Briefcase, Globe, Monitor, Stethoscope,
  Factory, GraduationCap, Heart, MessageSquare, Calendar, Signal,
  Lightbulb, Eye, PieChart, Megaphone, Handshake, Award,
} from "lucide-react";

/* ─── Theme ──────────────────────────────────────────── */
const COLOR = {
  blue: "#4A90D9",
  blueDark: "#1A5FA8",
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
  { value: 35, suffix: "%", label: "Improvement in engagement scores" },
  { value: 88, suffix: "%", label: "Employee participation rate" },
  { value: 4, suffix: "×", label: "Faster insights vs. annual surveys" },
];

const COMPARISON_ROWS = [
  ["Conducted annually or quarterly", "Continuous engagement monitoring"],
  ["Static employee feedback", "Real-time engagement insights"],
  ["Limited visibility into trends", "Ongoing workforce analytics"],
  ["Reactive HR decisions", "Proactive employee support"],
  ["Lower participation over time", "Short, consistent engagement check-ins"],
  ["Difficult to measure progress", "Continuous improvement tracking"],
];

const WHY_MODERN_LIST = [
  "Understand employee needs throughout the year.",
  "Improve communication across teams.",
  "Identify disengagement before productivity declines.",
  "Strengthen employee experience and workplace culture.",
  "Make confident HR decisions based on real data.",
];

const WHY_MATTERS = [
  { title: "Improve Employee Engagement", icon: <Activity size={22} />, desc: "Employees who feel heard are more engaged in their work. Continuous engagement analytics help organizations understand employee experiences through regular feedback and participation data." },
  { title: "Identify Disengagement Early", icon: <Eye size={22} />, desc: "Disengagement often develops gradually and may go unnoticed until performance declines. Employee engagement analytics identifies early warning signs before they impact morale or retention." },
  { title: "Reduce Employee Turnover", icon: <Users size={22} />, desc: "Employees are more likely to stay with organizations that actively listen and respond to their needs. Engagement analytics help HR teams understand the factors affecting employee satisfaction." },
  { title: "Increase Productivity", icon: <TrendingUp size={22} />, desc: "Engaged employees are more focused, collaborative, and committed to achieving organizational goals. Monitoring engagement continuously helps identify opportunities to improve performance." },
  { title: "Improve Workplace Culture", icon: <Heart size={22} />, desc: "Strong workplace cultures are built on trust, communication, and employee involvement. Engagement analytics helps measure the effectiveness of workplace initiatives." },
  { title: "Support Better HR Decisions", icon: <FileBarChart size={22} />, desc: "Reliable engagement data enables HR leaders to make informed decisions based on real workforce insights rather than assumptions." },
];

const FEATURES = [
  { title: "Participation Analytics", icon: <BarChart3 size={24} />, color: COLOR.blue, desc: "Tracks how employees engage with wellbeing programs, surveys, workshops, learning sessions, and organizational initiatives. HR teams can understand participation trends across departments and identify which programs create the greatest employee involvement." },
  { title: "Feedback Intelligence", icon: <MessageSquare size={24} />, color: "#E05FA0", desc: "Centralizes employee responses from multiple touchpoints into one easy-to-understand dashboard. Humanova analyzes feedback trends, helping HR leaders understand employee concerns and prioritize improvements." },
  { title: "Session Analytics", icon: <Calendar size={24} />, color: "#1AAF7E", desc: "Measures participation in counseling sessions, wellbeing check-ins, coaching programs, and employee support initiatives. HR teams gain visibility into engagement levels while maintaining complete employee privacy." },
  { title: "Event Engagement", icon: <Megaphone size={24} />, color: "#E8A020", desc: "Helps organizations measure attendance, participation, and employee involvement across company initiatives. HR teams can identify which programs generate the highest engagement and continuously improve future activities." },
  { title: "Workplace Signals", icon: <Signal size={24} />, color: "#7C5CDB", desc: "Combines anonymous feedback, participation data, wellbeing interactions, and behavioral trends to provide a comprehensive view of employee engagement instead of relying on a single metric." },
  { title: "AI Engagement Insights", icon: <BrainCircuit size={24} />, color: COLOR.teal, desc: "Transforms engagement data into practical recommendations through AI. HR teams receive intelligent insights that highlight engagement opportunities, identify emerging risks, and recommend actions." },
];

const HOW_IT_WORKS = [
  { title: "Employees Interact with Humanova", desc: "Employees participate in wellbeing check-ins, engagement surveys, workshops, events, and other workplace activities through the Humanova platform." },
  { title: "Platform Collects Anonymous Data", desc: "Humanova securely gathers engagement data while protecting employee privacy. Individual responses remain confidential." },
  { title: "AI Analyzes Trends", desc: "The platform uses AI to analyze engagement patterns across participation, feedback, workplace interactions, and wellbeing activities." },
  { title: "HR Receives Dashboards", desc: "HR leaders access intuitive dashboards that present organization-wide engagement trends, participation levels, and actionable metrics." },
  { title: "Managers Improve Experience", desc: "Using Humanova's insights, managers strengthen communication, enhance wellbeing programs, recognize achievements, and create targeted engagement strategies." },
];

const HR_BENEFITS = [
  { title: "Measure Engagement Continuously", desc: "Continuously measures engagement through participation, feedback, wellbeing activities, and workplace interactions for ongoing visibility." },
  { title: "Improve Employee Retention", desc: "Identify the factors influencing satisfaction and loyalty, making it easier to create initiatives that improve retention and reduce voluntary turnover." },
  { title: "Reduce Employee Disengagement", desc: "Identify early signs of declining participation, motivation, or workplace connection, allowing timely action before disengagement impacts productivity." },
  { title: "Better Leadership Decisions", desc: "Provide clear engagement analytics that help managers understand employee experiences and build stronger relationships with their teams." },
  { title: "Build a Data-Driven HR Strategy", desc: "Transform engagement data into actionable insights that support workforce planning, wellbeing programs, and long-term engagement strategies." },
  { title: "Create a Stronger Workplace Culture", desc: "Strengthen communication, encourage collaboration, and create an environment where employees feel valued, connected, and motivated." },
];

const EMPLOYEE_BENEFITS = [
  { title: "Better Communication", desc: "Regular engagement feedback creates open communication between employees and leadership, strengthening trust across the workplace." },
  { title: "Personalized Wellbeing Support", desc: "Identify engagement patterns and deliver more relevant wellbeing initiatives, learning opportunities, and support programs." },
  { title: "Increased Recognition", desc: "Highlight participation and involvement across workplace initiatives, helping organizations celebrate achievements that encourage motivation." },
  { title: "Improved Work Experience", desc: "Understand employee feedback to improve workplace policies, communication, and day-to-day experiences." },
  { title: "Stronger Connection with Leadership", desc: "Employees are more engaged when they believe leadership listens and responds. Insights help build trust and improve communication." },
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
  { title: "AI-Powered Engagement Insights", icon: <BrainCircuit size={20} />, desc: "Analyzes employee interactions, participation, and workplace feedback to deliver intelligent insights." },
  { title: "Anonymous Employee Analytics", icon: <Lock size={20} />, desc: "Collects and analyzes engagement data anonymously, encouraging honest participation." },
  { title: "Real-Time Dashboards", icon: <BarChart3 size={20} />, desc: "Easy-to-understand dashboards displaying engagement trends and workforce insights in real time." },
  { title: "Evidence-Based Assessments", icon: <CheckCircle2 size={20} />, desc: "Structured engagement and wellbeing assessments based on established workplace principles." },
  { title: "Enterprise-Grade Security", icon: <ShieldCheck size={20} />, desc: "Strong security standards to safeguard organizational information and employee privacy." },
  { title: "Easy Implementation", icon: <Zap size={20} />, desc: "Smooth onboarding experience with minimal disruption, allowing HR teams to begin collecting insights sooner." },
];

const FAQ = [
  { q: "What is Employee Engagement Analytics?", a: "Employee engagement analytics is the process of measuring and analyzing employee participation, feedback, workplace interactions, and engagement trends. It helps organizations understand how connected, motivated, and satisfied employees are, enabling HR teams to make informed decisions that improve workplace culture and performance." },
  { q: "How is employee engagement measured?", a: "Employee engagement is measured using multiple data points, including participation in workplace programs, employee feedback, wellbeing check-ins, surveys, events, and other workplace interactions. Humanova combines these signals to provide a comprehensive view of employee engagement." },
  { q: "Why is employee engagement analytics important?", a: "Employee engagement analytics help organizations identify engagement trends, improve employee satisfaction, reduce turnover, strengthen workplace culture, and make proactive HR decisions based on real workforce data rather than assumptions." },
  { q: "Is employee engagement data anonymous?", a: "Yes. Humanova protects employee privacy by collecting and analyzing engagement data anonymously. HR teams receive aggregated insights that help improve workplace engagement without revealing individual employee responses." },
  { q: "Can managers identify individual employees?", a: "No. Humanova focuses on team-level engagement insights instead of individual monitoring. Managers receive anonymous analytics that help them improve employee experience while maintaining trust and confidentiality." },
  { q: "How does Humanova improve employee engagement?", a: "Humanova combines engagement analytics, anonymous feedback, participation tracking, AI-powered insights, and actionable recommendations to help organizations identify engagement opportunities, strengthen workplace culture, and support employee wellbeing." },
  { q: "Is it suitable for remote and hybrid teams?", a: "Yes. Humanova is designed for office-based, remote, and hybrid workforces. Continuous engagement analytics help organizations stay connected with employees regardless of where they work." },
  { q: "How quickly can Humanova be implemented?", a: "Implementation depends on organizational requirements, but Humanova is designed for a simple onboarding process. Most organizations can begin using employee engagement analytics within a short period and start receiving meaningful workforce insights soon after." },
];

/* ─── Page ───────────────────────────────────────────── */

export default function EmployeeEngagementAnalyticsPage() {
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
            className="absolute top-1/4 right-1/5 w-[420px] h-[420px] rounded-full bg-[#4A90D9]/10 blur-[110px]"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-1/6 w-[380px] h-[380px] rounded-full bg-[#4A90D9]/8 blur-[100px]"
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
                <Activity size={14} />
                Core Service
              </motion.span>

              <motion.h1
                variants={fadeUp}
                custom={2}
                className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Employee Engagement{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#D4F04A]">Analytics</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 8C40 2 80 2 100 6C120 10 160 10 198 4" stroke="#D4F04A" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
                  </svg>
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} custom={3} className="text-white/65 text-lg lg:text-xl leading-[1.8] max-w-2xl mt-7">
                Understand how connected, supported, and committed your employees feel — continuously, anonymously, and in time to act — instead of relying on occasional surveys to tell you what already happened.
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
              Understanding employee engagement is essential for building a productive and motivated workforce. Employee engagement analytics help organizations measure how connected, supported, and committed employees feel throughout their journey. Instead of relying on occasional surveys, businesses can continuously monitor engagement trends and make informed decisions that improve employee experience and workplace performance.
            </p>
            <p className="text-[#3F4A50] text-[17px] leading-[1.9]">
              As workplaces become more dynamic, HR teams need real-time insights to understand employee needs. <strong className="text-[#1F2937]">Continuous engagement analytics</strong> help identify changes in motivation, participation, and workplace satisfaction before they impact productivity or retention.
            </p>
            <p className="text-[#3F4A50] text-[17px] leading-[1.9]">
              Humanova&apos;s Employee Engagement Analytics combines participation data, employee feedback, wellbeing interactions, and workplace signals into one intelligent platform. HR leaders receive actionable insights that help strengthen engagement, improve workplace culture, and create an environment where employees can thrive.
            </p>
          </motion.div>

          {/* Stat strip */}
          <motion.div variants={fadeUp} custom={1} className="grid sm:grid-cols-3 gap-6 mt-14">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="bg-white rounded-[24px] border border-[#E5DED6] p-7 text-center">
                <div
                  className="text-4xl font-extrabold mb-2"
                  style={{ fontFamily: "var(--font-outfit)", color: COLOR.blue }}
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
              What is Employee Engagement{" "}
              <span className="text-[#4A90D9]">Analytics?</span>
            </h2>
            <p className="text-[#3F4A50] text-[17px] leading-[1.9]">
              Employee engagement analytics is the process of collecting, measuring, and analyzing employee interactions, feedback, and workplace behaviors to understand how engaged employees are within an organization. It provides HR teams with continuous insights into employee motivation, participation, satisfaction, and overall workplace experience.
            </p>
            <p className="text-[#3F4A50] text-[17px] leading-[1.9]">
              Unlike traditional engagement surveys that provide feedback only once or twice a year, continuous engagement analytics deliver ongoing visibility into workforce trends. Organizations can monitor engagement levels in real time, identify emerging concerns, and take proactive action before small issues become larger business challenges.
            </p>
          </motion.div>

          {/* Comparison table */}
          <motion.div variants={fadeUp} custom={1} className="rounded-[24px] border border-[#E5DED6] overflow-hidden bg-white">
            <div className="grid grid-cols-2 bg-[#0E3D39] text-white text-sm font-semibold">
              <div className="px-6 py-4 border-r border-white/10">Traditional Engagement Surveys</div>
              <div className="px-6 py-4">Employee Engagement Analytics</div>
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
                  <CheckCircle2 size={15} className="text-[#4A90D9] shrink-0" />
                  {row[1]}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>

        {/* ═══════════ WHY IT MATTERS ═══════════ */}
        <Reveal id="why-it-matters" className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <p className="text-[#4A90D9] text-sm font-bold uppercase tracking-[0.2em] mb-4">Why It Matters</p>
            <h2 className="text-[#1F2937] text-3xl md:text-4xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              Why Employee Engagement Analytics{" "}
              <span className="text-[#4A90D9]">Matters</span>
            </h2>
            <p className="mt-5 text-[#5F6B73] text-lg max-w-2xl mx-auto leading-relaxed">
              Employee engagement directly influences productivity, collaboration, innovation, and employee retention. Continuous measurement delivers the insights needed to create a thriving workplace.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column - Dark Card */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="lg:col-span-5 bg-gradient-to-br from-[#0E3D39] to-[#07312C] rounded-[28px] p-8 lg:p-10 text-white flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#4A90D9]/10 blur-3xl" />
              <div>
                <h3 className="text-white text-2xl lg:text-3xl font-extrabold mb-6 leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                  Why modern organisations need engagement analytics
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
                    className={`flex gap-4 bg-white rounded-2xl border border-[#E5DED6] p-5 hover:border-[#4A90D9]/30 hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.05)] transition-all duration-300 ${
                      isLast ? "sm:col-span-2" : ""
                    }`}
                  >
                    <div className="w-11 h-11 rounded-xl grid place-items-center shrink-0 bg-[#4A90D9]/10 text-[#4A90D9]">
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
              <p className="text-[#4A90D9] text-sm font-bold uppercase tracking-[0.2em] mb-4">What&apos;s Inside</p>
              <h2 className="text-[#1F2937] text-3xl md:text-4xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                Features of Humanova{" "}
                <span className="text-[#4A90D9]">Engagement Analytics</span>
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
            <p className="text-[#4A90D9] text-sm font-bold uppercase tracking-[0.2em] mb-4">The Flow</p>
            <h2 className="text-[#1F2937] text-3xl md:text-4xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              How Employee Engagement Analytics{" "}
              <span className="text-[#4A90D9]">Works</span>
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
                className="bg-white rounded-[24px] border border-[#E5DED6] p-6 flex flex-col justify-between hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-[#4A90D9]/30 transition-all duration-300"
              >
                <div>
                  <div
                    className="w-10 h-10 rounded-full font-bold text-sm grid place-items-center mb-5"
                    style={{ backgroundColor: `${COLOR.blue}15`, color: COLOR.blue, fontFamily: "var(--font-outfit)" }}
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
                    <ChevronDown size={18} className="text-[#4A90D9]/40" />
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
                <p className="text-[#4A90D9] text-sm font-bold uppercase tracking-[0.2em] mb-4">For HR Teams</p>
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
                      className="flex items-start gap-3 bg-[#F0F6FF] rounded-2xl border border-[#E5DED6] p-5"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#4A90D9]/10 text-[#4A90D9] grid place-items-center shrink-0 mt-0.5">
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
                <p className="text-[#1AAF7E] text-sm font-bold uppercase tracking-[0.2em] mb-4">For Employees</p>
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
                      className="flex items-start gap-3 bg-[#E8FDF4] rounded-2xl border border-[#E5DED6] p-5"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#1AAF7E]/10 text-[#1AAF7E] grid place-items-center shrink-0 mt-0.5">
                        <Handshake size={14} />
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
            <p className="text-[#4A90D9] text-sm font-bold uppercase tracking-[0.2em] mb-4">Built For Every Team</p>
            <h2 className="text-[#1F2937] text-3xl md:text-4xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              Who can use employee engagement analytics?
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
                className="inline-flex items-center gap-3 bg-white rounded-full border border-[#E5DED6] px-6 py-3.5 hover:border-[#4A90D9]/30 hover:shadow-[0_8px_24px_-8px_rgba(74,144,217,0.1)] transition-all duration-300"
              >
                <span className="text-[#4A90D9]">{item.icon}</span>
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
                    Find answers to common questions about employee engagement analytics, privacy, implementation, and reporting.
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
                      className="rounded-[24px] bg-[#FAF7F2] border border-[#E5DED6] px-7 py-6 cursor-pointer transition-colors duration-200 hover:border-[#4A90D9]/30"
                      onClick={() => setOpenFaqIdx(isOpen ? -1 : i)}
                    >
                      <div className="flex items-center justify-between gap-6">
                        <h3 className="text-[#1F2937] text-lg lg:text-xl leading-snug" style={{ fontFamily: "'Instrument Serif', serif" }}>
                          {item.q}
                        </h3>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          className="shrink-0 grid place-items-center w-9 h-9 rounded-full transition-colors duration-200"
                          style={{ backgroundColor: isOpen ? COLOR.blueDark : "#E8F4FF", color: isOpen ? "#fff" : COLOR.blueDark }}
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
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#4A90D9]/10 blur-[80px]" />
            <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 lg:py-24 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-white text-4xl lg:text-5xl font-extrabold leading-tight"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                See engagement analytics{" "}
                <span className="text-[#D4F04A]">in action</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-5 text-white/55 text-lg max-w-2xl mx-auto leading-relaxed"
              >
                Book a free demo and see how Humanova helps your organization measure employee engagement continuously — without compromising employee privacy.
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
