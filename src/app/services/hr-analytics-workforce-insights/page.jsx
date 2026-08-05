"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useDemoModal } from "@/context/DemoModalContext";
import {
  motion, AnimatePresence, useInView, useScroll, useTransform, animate,
} from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { HR_ANALYTICS_SCHEMA } from "@/constants/schemas";
import {
  ArrowRight, ArrowLeft, ChevronDown, BarChart3, Zap, Lock, CheckCircle2,
  TrendingUp, FileBarChart, Users, BrainCircuit, ShieldCheck, Sparkles,
  Building2, Briefcase, Globe, Monitor, Stethoscope, Factory, Target,
  LayoutDashboard, Users2, LineChart, FileText, Settings, Compass, HelpCircle,
} from "lucide-react";

/* ─── Theme ──────────────────────────────────────────── */
const COLOR = {
  orange: "#E8A020",
  orangeDark: "#B87000",
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
  { value: 50, suffix: "%", label: "Reduction in manual reporting time" },
  { value: 94, suffix: "%", label: "Dashboard adoption rate by HR leaders" },
  { value: 5, suffix: "×", label: "More visibility into workforce trends" },
];

const COMPARISON_ROWS = [
  ["Static monthly or quarterly reports", "Continuous real-time workforce insights"],
  ["Historical workforce data", "Live workforce trends and analytics"],
  ["Manual reporting processes", "Automated dashboards and reporting"],
  ["Reactive HR decisions", "Proactive workforce planning"],
  ["Limited visibility across departments", "Organization-wide workforce intelligence"],
  ["Difficult to identify emerging risks", "Early detection of workforce challenges"],
];

const WHY_MODERN_LIST = [
  "Understand employee engagement across teams and departments.",
  "Monitor workplace wellbeing and identify emerging risks.",
  "Improve workforce planning using accurate data.",
  "Measure the impact of HR and wellbeing initiatives.",
  "Support managers with meaningful workforce intelligence.",
  "Create evidence-based strategies that improve employee experience.",
];

const WHY_MATTERS = [
  { title: "Improve Workforce Planning", icon: <Briefcase size={22} />, desc: "Humanova helps HR leaders understand workforce capacity, employee wellbeing, participation trends, and organizational needs through real-time analytics." },
  { title: "Make Data-Driven HR Decisions", icon: <CheckCircle2 size={22} />, desc: "Successful HR strategies are built on evidence rather than assumptions. Humanova transforms workforce data into actionable insights that help HR teams evaluate employee engagement." },
  { title: "Increase Employee Productivity", icon: <TrendingUp size={22} />, desc: "Employee productivity is closely connected to wellbeing, engagement, and workplace satisfaction. HR Analytics & Workforce Insights helps organizations identify factors influencing performance." },
  { title: "Reduce Employee Turnover", icon: <Users size={22} />, desc: "By identifying trends related to employee engagement, wellbeing, and workplace experience, Humanova enables organizations to address potential concerns early, improving long-term retention." },
  { title: "Identify Workforce Trends", icon: <LineChart size={22} />, desc: "Workforce trends often develop gradually. Humanova continuously monitors engagement, attendance, participation, wellbeing, and organizational patterns to spot risks early." },
  { title: "Improve Organizational Performance", icon: <Target size={22} />, desc: "When HR leaders understand employee experiences and organizational trends, they can implement strategies that strengthen workplace culture, collaboration, and performance." },
];

const FEATURES = [
  { title: "HR Dashboards", icon: <LayoutDashboard size={24} />, color: COLOR.orange, desc: "Provide HR teams with a centralized view of workforce performance, employee wellbeing, engagement, attendance, and key HR metrics. Real-time dashboards simplify decision-making." },
  { title: "Manager Dashboards", icon: <Users2 size={24} />, color: "#4A90D9", desc: "Provide department-level visibility into employee engagement, wellbeing trends, participation, and workforce performance. Managers receive actionable information without accessing confidential employee data." },
  { title: "Department Insights", icon: <LineChart size={24} />, color: "#E05FA0", desc: "Enables HR leaders to compare employee wellbeing, engagement, attendance, productivity, and participation across teams. Identify departments that may require additional support." },
  { title: "Organization Reports", icon: <FileText size={24} />, color: "#1AAF7E", desc: "Generates comprehensive organization reports that provide leadership teams with a complete overview of workforce performance and organizational health to support strategic planning." },
  { title: "Exportable Analytics", icon: <FileBarChart size={24} />, color: "#7C5CDB", desc: "Allows organizations to generate and export customized reports for board meetings, leadership reviews, compliance reporting, and strategic planning. Professionally organized and easy to access." },
  { title: "Action Recommendations", icon: <Compass size={24} />, color: COLOR.teal, desc: "Uses intelligent analytics to generate action recommendations based on workforce trends, engagement patterns, and wellbeing insights, helping HR leaders prioritize initiatives." },
];

const HOW_IT_WORKS = [
  { title: "Employees Interact with Humanova", desc: "Employees engage with Humanova through wellbeing assessments, anonymous surveys, engagement activities, coaching sessions, and workplace programs." },
  { title: "Securely Collects Anonymous Data", desc: "Humanova gathers workforce information using a privacy-first approach. Employee responses are securely processed and anonymized." },
  { title: "AI Analyzes Metrics & Trends", desc: "Humanova's AI analyzes engagement levels, attendance patterns, wellbeing signals, participation data, and other workforce metrics to identify trends." },
  { title: "HR Leaders Access Dashboards", desc: "HR professionals and managers receive easy-to-understand dashboards that display workforce performance, department insights, and key HR metrics." },
  { title: "Organizations Make Proactive Decisions", desc: "Using Humanova's workforce insights, organizations strengthen employee wellbeing, improve engagement, optimize workforce planning, and develop people-first strategies." },
];

const HR_BENEFITS = [
  { title: "Real-Time Workforce Visibility", desc: "Monitor workforce wellbeing, engagement, attendance, productivity, and participation through centralized dashboards as it changes." },
  { title: "Faster HR Reporting", desc: "Automate workforce reporting by generating real-time dashboards and organized reports, reducing administrative effort." },
  { title: "Better Workforce Planning", desc: "Support hiring, succession planning, employee development, and resource allocation decisions with reliable data reflecting current needs." },
  { title: "Improved Leadership Decisions", desc: "Provide HR teams and managers with actionable insights that improve communication, employee support, and strategic initiatives." },
  { title: "Reduced Administrative Work", desc: "Automate data collection, reporting, and workforce analysis, allowing HR professionals to focus on employee development and strategic priorities." },
  { title: "Stronger Organizational Performance", desc: "Create healthier workplaces, improve employee engagement, strengthen leadership effectiveness, and support sustainable business growth." },
];

const EMPLOYEE_BENEFITS = [
  { title: "Better Workplace Experience", desc: "Benefit from initiatives based on real workforce insights rather than assumptions, improving wellbeing, communication, and culture." },
  { title: "Fairer HR Decisions", desc: "Objective HR decisions supported by data-driven workforce analytics reduce bias related to engagement initiatives and planning." },
  { title: "Personalized Wellbeing Initiatives", desc: "Deliver more relevant wellbeing programs, learning opportunities, and employee support initiatives tailored to actual workforce needs." },
  { title: "Improved Communication", desc: "Continuous insights strengthen communication between employees, managers, and HR leaders, encouraging openness and trust." },
  { title: "Greater Transparency", desc: "Promote transparency by helping leaders understand workplace trends and communicate organizational priorities more effectively." },
  { title: "More Supportive Work Environment", desc: "Identify challenges early to introduce proactive wellbeing initiatives, improving leadership support and enabling employees to succeed with confidence." },
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
  { title: "AI-Powered Workforce Analytics", icon: <BrainCircuit size={20} />, desc: "Transforms workforce data into intelligent insights to help leaders identify trends and make proactive decisions." },
  { title: "Real-Time HR Dashboards", icon: <LayoutDashboard size={20} />, desc: "Access live dashboards that provide a complete view of workforce engagement, wellbeing, attendance, and productivity." },
  { title: "Anonymous Employee Insights", icon: <Lock size={20} />, desc: "Workforce data is collected and analyzed anonymously, encouraging honest participation while protecting confidentiality." },
  { title: "Enterprise-Grade Security", icon: <ShieldCheck size={20} />, desc: "Robust security standards to safeguard employee information and organizational data." },
  { title: "Evidence-Based Reporting", icon: <FileText size={20} />, desc: "Combines trusted HR practices with evidence-based wellbeing frameworks to measure workforce health accurately." },
  { title: "Easy Implementation", icon: <Settings size={20} />, desc: "Quick deployment and seamless adoption with minimal disruption to existing HR processes." },
  { title: "Actionable Recommendations", icon: <Compass size={20} />, desc: "AI-powered recommendations that help HR leaders improve engagement, strengthen culture, and reduce risks." },
];

const FAQ = [
  { q: "What is HR Analytics & Workforce Insights?", a: "HR analytics & workforce insights is the process of collecting and analyzing workforce data to help organizations improve employee wellbeing, engagement, productivity, and HR decision-making. It transforms workforce information into actionable insights that support better business outcomes." },
  { q: "How does HR analytics improve decision-making?", a: "HR analytics provides real-time workforce insights that help HR leaders identify trends, measure employee engagement, improve workforce planning, and make evidence-based decisions instead of relying on assumptions or outdated reports." },
  { q: "What data does Humanova analyze?", a: "Humanova analyzes anonymous workforce data, including employee wellbeing, engagement, attendance, participation, workplace activities, HR metrics, and organizational trends. These insights help organizations better understand workforce performance while maintaining employee privacy." },
  { q: "Is employee information anonymous?", a: "Yes. Humanova uses a privacy-first approach that anonymizes workforce data before analysis. HR teams receive aggregated insights and reports without access to individual employee responses." },
  { q: "Can managers view department-level reports?", a: "Yes. Humanova provides managers with department-level dashboards and workforce insights that help them understand team performance, engagement, and wellbeing trends while protecting employee confidentiality." },
  { q: "How do workforce insights improve productivity?", a: "By identifying engagement patterns, wellbeing trends, and operational challenges early, workforce insights help organizations implement targeted improvements that strengthen collaboration, reduce workplace stress, and improve overall productivity." },
  { q: "Is Humanova suitable for large organizations?", a: "Absolutely. Humanova is built to support startups, SMEs, and large enterprises. The platform scales easily across multiple departments, business units, and global locations while providing centralized workforce analytics and reporting." },
  { q: "How quickly can HR dashboards be implemented?", a: "Humanova is designed for fast and straightforward implementation. Most organizations can begin accessing workforce dashboards and actionable insights within a short onboarding period, allowing HR teams to start making data-driven decisions quickly." },
];

/* ─── Page ───────────────────────────────────────────── */

export default function HRAnalyticsWorkforceInsightsPage() {
  const { open: openModal } = useDemoModal();
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <JsonLd data={HR_ANALYTICS_SCHEMA} />
      <Navbar />

      <main>
        {/* ═══════════ HERO ═══════════ */}
        <section ref={heroRef} className="relative w-full overflow-hidden -mt-24" style={{ minHeight: "620px" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#07312C] via-[#0E3D39] to-[#0A4A42]" />
          <motion.div
            className="absolute top-1/4 right-1/5 w-[420px] h-[420px] rounded-full bg-[#E8A020]/8 blur-[110px]"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-1/6 w-[380px] h-[380px] rounded-full bg-[#E8A020]/6 blur-[100px]"
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
                <BarChart3 size={14} />
                Core Service
              </motion.span>

              <motion.h1
                variants={fadeUp}
                custom={2}
                className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                HR Analytics &amp;{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#D4F04A]">Workforce Insights</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 8C40 2 80 2 100 6C120 10 160 10 198 4" stroke="#D4F04A" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
                  </svg>
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} custom={3} className="text-white/65 text-lg lg:text-xl leading-[1.8] max-w-2xl mt-7">
                Make confident workforce decisions with real-time data on employee wellbeing, engagement, productivity, attendance, and organizational trends in one centralized dashboard.
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
              Making informed workforce decisions starts with having the right data. HR Analytics &amp; Workforce Insights helps organizations understand employee wellbeing, engagement, productivity, attendance, and workforce trends through real-time analytics. Instead of relying on scattered spreadsheets or outdated reports, HR leaders gain a clear, centralized view of their workforce, making it easier to identify challenges, improve employee experience, and support long-term business growth.
            </p>
            <p className="text-[#3F4A50] text-[17px] leading-[1.9]">
              Today&apos;s workplace is more dynamic than ever. Remote work, hybrid teams, changing employee expectations, and increasing business demands require HR teams to make faster and more informed decisions. Traditional HR reports often provide historical information, but they rarely explain what is happening now or where potential risks may emerge. <strong className="text-[#1F2937]">Real-time workforce analytics</strong> help organizations respond proactively instead of reactively.
            </p>
            <p className="text-[#3F4A50] text-[17px] leading-[1.9]">
              Humanova&apos;s HR Analytics &amp; Workforce Insights transforms employee wellbeing data, engagement metrics, participation trends, attendance records, and organizational signals into meaningful, actionable insights. Through AI-powered dashboards and evidence-based analytics, Humanova enables HR leaders to identify workforce patterns, improve decision-making, strengthen employee wellbeing, and create healthier, more productive workplaces.
            </p>
          </motion.div>

          {/* Stat strip */}
          <motion.div variants={fadeUp} custom={1} className="grid sm:grid-cols-3 gap-6 mt-14">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="bg-white rounded-[24px] border border-[#E5DED6] p-7 text-center">
                <div
                  className="text-4xl font-extrabold mb-2"
                  style={{ fontFamily: "var(--font-outfit)", color: COLOR.orange }}
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
              What is HR Analytics &amp;{" "}
              <span className="text-[#E8A020]">Workforce Insights?</span>
            </h2>
            <p className="text-[#3F4A50] text-[17px] leading-[1.9]">
              HR Analytics &amp; Workforce Insights is the process of collecting, analyzing, and interpreting workforce data to help organizations make informed human resource decisions. It combines information from employee engagement, wellbeing assessments, attendance, performance trends, participation, and workplace activities to provide HR leaders with a comprehensive understanding of their workforce.
            </p>
            <p className="text-[#3F4A50] text-[17px] leading-[1.9]">
              Rather than simply storing HR data, workforce analytics turns information into meaningful business intelligence. HR teams can identify trends, monitor organizational health, measure employee engagement, and evaluate the effectiveness of workplace initiatives using real-time insights instead of assumptions. The objective is not to monitor individual employees but to understand workforce patterns at a department, team, or organizational level to protect employee privacy.
            </p>
          </motion.div>

          {/* Comparison table */}
          <motion.div variants={fadeUp} custom={1} className="rounded-[24px] border border-[#E5DED6] overflow-hidden bg-white">
            <div className="grid grid-cols-2 bg-[#0E3D39] text-white text-sm font-semibold">
              <div className="px-6 py-4 border-r border-white/10">Traditional HR Reporting</div>
              <div className="px-6 py-4">HR Analytics &amp; Workforce Insights</div>
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
                  <CheckCircle2 size={15} className="text-[#E8A020] shrink-0" />
                  {row[1]}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>

        {/* ═══════════ WHY IT MATTERS ═══════════ */}
        <Reveal id="why-it-matters" className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <p className="text-[#E8A020] text-sm font-bold uppercase tracking-[0.2em] mb-4">Why It Matters</p>
            <h2 className="text-[#1F2937] text-3xl md:text-4xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              Why HR Analytics &amp; Workforce Insights{" "}
              <span className="text-[#E8A020]">Matters</span>
            </h2>
            <p className="mt-5 text-[#5F6B73] text-lg max-w-2xl mx-auto leading-relaxed">
              Organizations generate valuable workforce data every day, but the real value comes from understanding patterns and using those insights to build a proactive, people-focused HR strategy.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column - Dark Card */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="lg:col-span-5 bg-gradient-to-br from-[#0E3D39] to-[#07312C] rounded-[28px] p-8 lg:p-10 text-white flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#E8A020]/10 blur-3xl" />
              <div>
                <h3 className="text-white text-2xl lg:text-3xl font-extrabold mb-6 leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                  Why modern organisations need workforce insights
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
                    className={`flex gap-4 bg-white rounded-2xl border border-[#E5DED6] p-5 hover:border-[#E8A020]/30 hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.05)] transition-all duration-300 ${
                      isLast ? "sm:col-span-2" : ""
                    }`}
                  >
                    <div className="w-11 h-11 rounded-xl grid place-items-center shrink-0 bg-[#E8A020]/10 text-[#E8A020]">
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
              <p className="text-[#E8A020] text-sm font-bold uppercase tracking-[0.2em] mb-4">What&apos;s Inside</p>
              <h2 className="text-[#1F2937] text-3xl md:text-4xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                Features of Humanova{" "}
                <span className="text-[#E8A020]">HR Analytics &amp; Workforce Insights</span>
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
            <p className="text-[#E8A020] text-sm font-bold uppercase tracking-[0.2em] mb-4">The Flow</p>
            <h2 className="text-[#1F2937] text-3xl md:text-4xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              How HR Analytics &amp; Workforce Insights{" "}
              <span className="text-[#E8A020]">Works</span>
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
                className="bg-white rounded-[24px] border border-[#E5DED6] p-6 flex flex-col justify-between hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-[#E8A020]/30 transition-all duration-300"
              >
                <div>
                  <div
                    className="w-10 h-10 rounded-full font-bold text-sm grid place-items-center mb-5"
                    style={{ backgroundColor: `${COLOR.orange}15`, color: COLOR.orange, fontFamily: "var(--font-outfit)" }}
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
                    <ChevronDown size={18} className="text-[#E8A020]/40" />
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
                <p className="text-[#E8A020] text-sm font-bold uppercase tracking-[0.2em] mb-4">For HR Teams</p>
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
                      className="flex items-start gap-3 bg-[#FFF8E8] rounded-2xl border border-[#E5DED6] p-5"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#E8A020]/10 text-[#E8A020] grid place-items-center shrink-0 mt-0.5">
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
            <p className="text-[#E8A020] text-sm font-bold uppercase tracking-[0.2em] mb-4">Built For Every Team</p>
            <h2 className="text-[#1F2937] text-3xl md:text-4xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              Who can use HR Analytics &amp; Workforce Insights?
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
                className="inline-flex items-center gap-3 bg-white rounded-full border border-[#E5DED6] px-6 py-3.5 hover:border-[#E8A020]/30 hover:shadow-[0_8px_24px_-8px_rgba(232,160,32,0.1)] transition-all duration-300"
              >
                <span className="text-[#E8A020]">{item.icon}</span>
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
                    Find answers to common questions about HR analytics, real-time dashboards, security, and implementation.
                  </p>
                </div>

                <div className="rounded-[28px] bg-[#FFF8E8] p-8">
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
                      className="rounded-[24px] bg-[#FAF7F2] border border-[#E5DED6] px-7 py-6 cursor-pointer transition-colors duration-200 hover:border-[#E8A020]/30"
                      onClick={() => setOpenFaqIdx(isOpen ? -1 : i)}
                    >
                      <div className="flex items-center justify-between gap-6">
                        <h3 className="text-[#1F2937] text-lg lg:text-xl leading-snug" style={{ fontFamily: "'Instrument Serif', serif" }}>
                          {item.q}
                        </h3>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          className="shrink-0 grid place-items-center w-9 h-9 rounded-full transition-colors duration-200"
                          style={{ backgroundColor: isOpen ? COLOR.orangeDark : "#FFF8E8", color: isOpen ? "#fff" : COLOR.orangeDark }}
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
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#E8A020]/10 blur-[80px]" />
            <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 lg:py-24 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-white text-4xl lg:text-5xl font-extrabold leading-tight"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                See workforce insights &amp; analytics{" "}
                <span className="text-[#D4F04A]">in action</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-5 text-white/55 text-lg max-w-2xl mx-auto leading-relaxed"
              >
                Book a free demo and see how Humanova helps your organization transform everyday employee data into actionable workplace insights.
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
