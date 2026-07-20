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
  ArrowRight, ArrowLeft, ChevronDown, HeadphonesIcon, Zap, Lock, CheckCircle2,
  TrendingUp, FileBarChart, Users, BrainCircuit, BarChart3,
  ShieldCheck, Sparkles, Building2, Briefcase, Globe, Monitor, Stethoscope,
  Factory, Heart, MessageCircle, Shield, UserCheck, Award,
  Smile, Brain, Target, Flame, GraduationCap, HandHeart,
} from "lucide-react";

/* ─── Theme ──────────────────────────────────────────── */
const COLOR = {
  pink: "#E05FA0",
  pinkDark: "#A0336E",
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
  { value: 45, suffix: "%", label: "Improvement in employee resilience" },
  { value: 90, suffix: "%", label: "Coaching satisfaction rate" },
  { value: 30, suffix: "%", label: "Reduction in workplace stress" },
];

const COMPARISON_ROWS = [
  ["Reactive support after issues arise", "Proactive and ongoing guidance"],
  ["Standardized solutions", "Personalized coaching plans"],
  ["Limited employee interaction", "Regular one-to-one coaching sessions"],
  ["Focus on problem resolution", "Focus on personal and professional growth"],
  ["Short-term assistance", "Continuous development and wellbeing support"],
  ["Limited progress tracking", "Ongoing coaching and measurable outcomes"],
];

const WHY_INVEST_LIST = [
  "Support employee wellbeing and mental resilience.",
  "Strengthen leadership and management capabilities.",
  "Improve employee confidence and motivation.",
  "Increase engagement and job satisfaction.",
  "Reduce workplace stress and burnout.",
  "Create a positive and supportive workplace culture.",
];

const WHY_MATTERS = [
  { title: "Improve Employee Wellbeing", icon: <Heart size={22} />, desc: "Personalized coaching gives employees a safe space to discuss workplace challenges, career goals, and personal development. Regular sessions encourage self-awareness and healthier work habits." },
  { title: "Reduce Workplace Stress", icon: <Flame size={22} />, desc: "Humanova provides employees with practical coping strategies, confidential support, and professional guidance that help reduce stress before it develops into burnout." },
  { title: "Build Resilience", icon: <Shield size={22} />, desc: "Coaching helps individuals build resilience by developing problem-solving skills, emotional intelligence, adaptability, and confidence when managing workplace change or pressure." },
  { title: "Support Leadership Development", icon: <Target size={22} />, desc: "Leadership coaching helps managers improve communication, decision-making, conflict resolution, and people management skills, enabling them to lead high-performing teams." },
  { title: "Increase Employee Confidence", icon: <Sparkles size={22} />, desc: "Coaching encourages continuous learning, constructive feedback, and personal growth, helping employees become more confident in their roles and career progression." },
  { title: "Improve Employee Retention", icon: <TrendingUp size={22} />, desc: "Personalized coaching demonstrates a genuine commitment to employee success, strengthening loyalty, engagement, and long-term retention." },
];

const FEATURES = [
  { title: "1:1 Coaching", icon: <UserCheck size={24} />, color: COLOR.pink, desc: "Connects employees with qualified coaches who provide personalized guidance based on individual goals, workplace challenges, and professional aspirations. Each session is tailored to unique needs." },
  { title: "Group Wellbeing Sessions", icon: <Users size={24} />, color: "#4A90D9", desc: "Brings employees together in guided discussions focused on resilience, stress management, teamwork, and overall wellbeing. Encourages open communication and stronger workplace relationships." },
  { title: "Emotional Wellness Support", icon: <Heart size={24} />, color: "#1AAF7E", desc: "Confidential conversations with qualified wellbeing professionals who help employees navigate stress, anxiety, work-life balance, and everyday workplace challenges in a safe environment." },
  { title: "Leadership Coaching", icon: <Award size={24} />, color: "#E8A020", desc: "Helps current and future leaders strengthen communication, emotional intelligence, strategic thinking, decision-making, and team leadership through personalized coaching sessions." },
  { title: "Stress Management", icon: <Brain size={24} />, color: "#7C5CDB", desc: "Equips employees with practical techniques, evidence-based strategies, and healthy coping mechanisms that improve resilience, reduce workplace stress, and support long-term wellbeing." },
  { title: "Confidential Conversations", icon: <Lock size={24} />, color: COLOR.teal, desc: "Employees can openly discuss workplace concerns, career challenges, or personal wellbeing with qualified professionals. Every conversation remains private and supportive." },
];

const HOW_IT_WORKS = [
  { title: "Employees Request or Receive Coaching", desc: "Employees can request coaching directly or receive an invitation through HR as part of their organization's wellbeing and development programs." },
  { title: "Matched with Qualified Coaches", desc: "Based on individual goals and support needs, Humanova carefully matches employees with experienced coaches, counselors, or wellbeing professionals." },
  { title: "Confidential Coaching Sessions", desc: "Employees attend one-to-one coaching sessions or group wellbeing programs in a secure and supportive environment." },
  { title: "HR Gets Anonymous Insights", desc: "Humanova provides HR leaders with aggregated participation trends and program effectiveness reports while protecting employee confidentiality." },
  { title: "Employees Thrive at Work", desc: "With continuous coaching, employees develop healthier habits, stronger resilience, improved communication, and greater confidence." },
];

const HR_BENEFITS = [
  { title: "Improve Employee Wellbeing", desc: "Providing access to professional coaching demonstrates a genuine commitment to employee wellbeing, creating a healthier and more resilient workforce." },
  { title: "Reduce Workplace Burnout", desc: "Help employees address workplace challenges early through one-to-one coaching and wellbeing support, reducing burnout risks before they affect performance." },
  { title: "Increase Employee Engagement", desc: "Coaching encourages meaningful conversations, personal growth, and stronger workplace relationships that keep employees motivated and committed." },
  { title: "Support Leadership Development", desc: "Help current and future leaders improve communication, emotional intelligence, decision-making, and people management skills." },
  { title: "Improve Employee Retention", desc: "Personalized coaching helps employees feel valued, supported, and confident in their career development, reducing voluntary turnover." },
  { title: "Create a Healthier Culture", desc: "Employee coaching contributes to a workplace culture built on trust, collaboration, and continuous improvement." },
];

const EMPLOYEE_BENEFITS = [
  { title: "Personalized Coaching", desc: "One-to-one coaching sessions tailored to individual needs, helping employees develop practical skills and achieve meaningful career growth." },
  { title: "Emotional Wellbeing Support", desc: "Qualified coaches and wellbeing professionals provide confidential guidance that helps employees manage workplace pressures and build healthier habits." },
  { title: "Increased Confidence", desc: "Regular coaching encourages self-awareness, constructive feedback, and continuous learning, helping employees gain greater confidence." },
  { title: "Better Stress Management", desc: "Practical stress management techniques that improve resilience, emotional balance, and overall workplace wellbeing." },
  { title: "Career Development", desc: "Coaching supports both personal and professional development by helping employees identify goals and strengthen leadership capabilities." },
  { title: "Safe & Confidential Conversations", desc: "Openly discuss concerns, career aspirations, or personal challenges in a secure environment without fear of judgment." },
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
  { title: "Qualified Coaches & Professionals", icon: <UserCheck size={20} />, desc: "Experienced coaches, counselors, and wellbeing specialists providing personalized guidance." },
  { title: "Confidential 1:1 Support", icon: <Lock size={20} />, desc: "Every coaching session is conducted in a confidential and supportive environment." },
  { title: "Personalized Coaching Journeys", icon: <Target size={20} />, desc: "Coaching experiences aligned with individual career aspirations and wellbeing goals." },
  { title: "Evidence-Based Approach", icon: <CheckCircle2 size={20} />, desc: "Proven coaching techniques combined with evidence-based wellbeing practices." },
  { title: "Enterprise-Grade Security", icon: <ShieldCheck size={20} />, desc: "Strong security standards to ensure coaching conversations remain secure and confidential." },
  { title: "Easy Implementation", icon: <Zap size={20} />, desc: "Quick to introduce within existing HR initiatives with minimal administrative effort." },
  { title: "Actionable HR Insights", icon: <BarChart3 size={20} />, desc: "Anonymous program analytics highlighting participation trends and coaching effectiveness." },
];

const FAQ = [
  { q: "What is Employee Coaching and 1:1 Support?", a: "Employee Coaching and 1:1 Support is a personalized workplace coaching service that connects employees with qualified coaches and wellbeing professionals. It helps employees improve their wellbeing, develop professional skills, manage workplace challenges, and achieve personal and career goals." },
  { q: "How does workplace coaching help employees?", a: "Workplace coaching helps employees build confidence, strengthen communication, improve leadership skills, manage stress, and overcome workplace challenges. It supports both personal wellbeing and long-term professional growth." },
  { q: "Are coaching sessions confidential?", a: "Yes. Humanova ensures that every coaching session is completely confidential. Individual conversations remain private, while HR teams receive only anonymous program insights to evaluate overall participation and effectiveness." },
  { q: "Who can access coaching through Humanova?", a: "Organizations can offer coaching to employees at all levels, including individual contributors, managers, senior leaders, and executive teams. Coaching programs can also be customized to align with organizational goals and employee needs." },
  { q: "Can organizations offer group coaching?", a: "Yes. In addition to one-to-one coaching, Humanova provides group wellbeing sessions, leadership workshops, and team coaching programs that encourage collaboration, resilience, and workplace wellbeing." },
  { q: "Is coaching suitable for remote employees?", a: "Absolutely. Humanova's coaching services are designed for office-based, remote, and hybrid employees. Virtual coaching sessions provide flexible and confidential support regardless of employee location." },
  { q: "How quickly can employees begin coaching?", a: "Organizations can implement Humanova's coaching programs quickly. Once onboarding is complete, employees can begin scheduling coaching sessions based on availability and organizational requirements." },
  { q: "How does Humanova measure coaching outcomes?", a: "Humanova measures coaching outcomes through anonymous participation data, employee feedback, engagement trends, and wellbeing insights. HR teams receive aggregated reports that help evaluate program effectiveness while protecting employee privacy." },
];

/* ─── Page ───────────────────────────────────────────── */

export default function EmployeeCoachingSupportPage() {
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
            className="absolute top-1/4 right-1/5 w-[420px] h-[420px] rounded-full bg-[#E05FA0]/8 blur-[110px]"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-1/6 w-[380px] h-[380px] rounded-full bg-[#E05FA0]/6 blur-[100px]"
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
                <HeadphonesIcon size={14} />
                Core Service
              </motion.span>

              <motion.h1
                variants={fadeUp}
                custom={2}
                className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Employee Coaching &amp;{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#D4F04A]">1:1 Support</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 8C40 2 80 2 100 6C120 10 160 10 198 4" stroke="#D4F04A" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
                  </svg>
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} custom={3} className="text-white/65 text-lg lg:text-xl leading-[1.8] max-w-2xl mt-7">
                Give every employee access to confidential coaching, emotional wellbeing support, and personalized guidance — helping them build resilience, grow professionally, and thrive at work.
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
              Employees perform at their best when they feel supported, valued, and empowered to overcome workplace challenges. Employee coaching and 1:1 support give organizations a structured way to help employees improve their wellbeing, strengthen professional skills, and build resilience through personalized coaching and confidential guidance.
            </p>
            <p className="text-[#3F4A50] text-[17px] leading-[1.9]">
              Today&apos;s workplaces are more demanding than ever. Employees face increasing workloads, changing responsibilities, and the pressure to balance personal and professional commitments. <strong className="text-[#1F2937]">Personalized coaching</strong> helps employees navigate these challenges with confidence while improving engagement, wellbeing, and long-term performance.
            </p>
            <p className="text-[#3F4A50] text-[17px] leading-[1.9]">
              Humanova&apos;s Employee Coaching and 1:1 Support connects employees with qualified coaches, counselors, and wellbeing professionals through confidential one-to-one and group coaching sessions. Using a privacy-first approach, Humanova helps organizations support employee wellbeing while giving HR teams meaningful, anonymous insights into program participation and overall impact.
            </p>
          </motion.div>

          {/* Stat strip */}
          <motion.div variants={fadeUp} custom={1} className="grid sm:grid-cols-3 gap-6 mt-14">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="bg-white rounded-[24px] border border-[#E5DED6] p-7 text-center">
                <div
                  className="text-4xl font-extrabold mb-2"
                  style={{ fontFamily: "var(--font-outfit)", color: COLOR.pink }}
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
              What is Employee Coaching &amp;{" "}
              <span className="text-[#E05FA0]">1:1 Support?</span>
            </h2>
            <p className="text-[#3F4A50] text-[17px] leading-[1.9]">
              Employee Coaching and 1:1 Support is a personalized workplace wellbeing service that provides employees with confidential guidance from qualified coaches, counsellors, and wellbeing professionals. It helps individuals develop practical skills, improve emotional wellbeing, manage workplace challenges, and achieve personal and professional goals.
            </p>
            <p className="text-[#3F4A50] text-[17px] leading-[1.9]">
              Unlike traditional employee support programs that often focus only on resolving problems after they arise, personalized coaching provides continuous guidance tailored to each employee&apos;s unique needs. Employees receive practical support that helps them build confidence, strengthen resilience, and improve their overall workplace experience.
            </p>
          </motion.div>

          {/* Comparison table */}
          <motion.div variants={fadeUp} custom={1} className="rounded-[24px] border border-[#E5DED6] overflow-hidden bg-white">
            <div className="grid grid-cols-2 bg-[#0E3D39] text-white text-sm font-semibold">
              <div className="px-6 py-4 border-r border-white/10">Traditional Employee Support</div>
              <div className="px-6 py-4">Employee Coaching &amp; 1:1 Support</div>
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
                  <CheckCircle2 size={15} className="text-[#E05FA0] shrink-0" />
                  {row[1]}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>

        {/* ═══════════ WHY IT MATTERS ═══════════ */}
        <Reveal id="why-it-matters" className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <p className="text-[#E05FA0] text-sm font-bold uppercase tracking-[0.2em] mb-4">Why It Matters</p>
            <h2 className="text-[#1F2937] text-3xl md:text-4xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              Why Employee Coaching &amp; 1:1 Support{" "}
              <span className="text-[#E05FA0]">Matter</span>
            </h2>
            <p className="mt-5 text-[#5F6B73] text-lg max-w-2xl mx-auto leading-relaxed">
              Supporting employees through personalized coaching benefits both individuals and organizations. It creates a workplace where employees feel heard, supported, and equipped to succeed.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column - Dark Card */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="lg:col-span-5 bg-gradient-to-br from-[#0E3D39] to-[#07312C] rounded-[28px] p-8 lg:p-10 text-white flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#E05FA0]/10 blur-3xl" />
              <div>
                <h3 className="text-white text-2xl lg:text-3xl font-extrabold mb-6 leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                  Why organisations invest in coaching programs
                </h3>
                <ul className="flex flex-col gap-4">
                  {WHY_INVEST_LIST.map((item, i) => (
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
                    className={`flex gap-4 bg-white rounded-2xl border border-[#E5DED6] p-5 hover:border-[#E05FA0]/30 hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.05)] transition-all duration-300 ${
                      isLast ? "sm:col-span-2" : ""
                    }`}
                  >
                    <div className="w-11 h-11 rounded-xl grid place-items-center shrink-0 bg-[#E05FA0]/10 text-[#E05FA0]">
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
              <p className="text-[#E05FA0] text-sm font-bold uppercase tracking-[0.2em] mb-4">What&apos;s Inside</p>
              <h2 className="text-[#1F2937] text-3xl md:text-4xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                Features of Humanova{" "}
                <span className="text-[#E05FA0]">Coaching &amp; 1:1 Support</span>
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
            <p className="text-[#E05FA0] text-sm font-bold uppercase tracking-[0.2em] mb-4">The Flow</p>
            <h2 className="text-[#1F2937] text-3xl md:text-4xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              How Employee Coaching{" "}
              <span className="text-[#E05FA0]">Works</span>
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
                className="bg-white rounded-[24px] border border-[#E5DED6] p-6 flex flex-col justify-between hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-[#E05FA0]/30 transition-all duration-300"
              >
                <div>
                  <div
                    className="w-10 h-10 rounded-full font-bold text-sm grid place-items-center mb-5"
                    style={{ backgroundColor: `${COLOR.pink}15`, color: COLOR.pink, fontFamily: "var(--font-outfit)" }}
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
                    <ChevronDown size={18} className="text-[#E05FA0]/40" />
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
                <p className="text-[#E05FA0] text-sm font-bold uppercase tracking-[0.2em] mb-4">For HR Teams</p>
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
                      className="flex items-start gap-3 bg-[#FFF0F6] rounded-2xl border border-[#E5DED6] p-5"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#E05FA0]/10 text-[#E05FA0] grid place-items-center shrink-0 mt-0.5">
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
                <p className="text-[#7C5CDB] text-sm font-bold uppercase tracking-[0.2em] mb-4">For Employees</p>
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
                      className="flex items-start gap-3 bg-[#F3EEFF] rounded-2xl border border-[#E5DED6] p-5"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#7C5CDB]/10 text-[#7C5CDB] grid place-items-center shrink-0 mt-0.5">
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
            <p className="text-[#E05FA0] text-sm font-bold uppercase tracking-[0.2em] mb-4">Built For Every Team</p>
            <h2 className="text-[#1F2937] text-3xl md:text-4xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              Who can use employee coaching &amp; 1:1 support?
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
                className="inline-flex items-center gap-3 bg-white rounded-full border border-[#E5DED6] px-6 py-3.5 hover:border-[#E05FA0]/30 hover:shadow-[0_8px_24px_-8px_rgba(224,95,160,0.1)] transition-all duration-300"
              >
                <span className="text-[#E05FA0]">{item.icon}</span>
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
                    Find answers to common questions about employee coaching, confidentiality, implementation, and measuring outcomes.
                  </p>
                </div>

                <div className="rounded-[28px] bg-[#FFF0F6] p-8">
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
                      className="rounded-[24px] bg-[#FAF7F2] border border-[#E5DED6] px-7 py-6 cursor-pointer transition-colors duration-200 hover:border-[#E05FA0]/30"
                      onClick={() => setOpenFaqIdx(isOpen ? -1 : i)}
                    >
                      <div className="flex items-center justify-between gap-6">
                        <h3 className="text-[#1F2937] text-lg lg:text-xl leading-snug" style={{ fontFamily: "'Instrument Serif', serif" }}>
                          {item.q}
                        </h3>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          className="shrink-0 grid place-items-center w-9 h-9 rounded-full transition-colors duration-200"
                          style={{ backgroundColor: isOpen ? COLOR.pinkDark : "#FFF0F6", color: isOpen ? "#fff" : COLOR.pinkDark }}
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
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#E05FA0]/10 blur-[80px]" />
            <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 lg:py-24 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-white text-4xl lg:text-5xl font-extrabold leading-tight"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                See coaching &amp; 1:1 support{" "}
                <span className="text-[#D4F04A]">in action</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-5 text-white/55 text-lg max-w-2xl mx-auto leading-relaxed"
              >
                Book a free demo and see how Humanova helps your organization provide personalized coaching that builds resilience, strengthens leadership, and supports employee wellbeing.
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
