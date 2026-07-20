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
  ArrowRight, ArrowLeft, ChevronDown, BookOpen, Zap, Lock, CheckCircle2,
  TrendingUp, FileBarChart, Users, BarChart3, ShieldCheck, Sparkles,
  Building2, Briefcase, Globe, Monitor, Stethoscope, Factory, Target,
  Award, Video, Headphones, FileText, CheckCircle, LineChart, Shield,
  Settings, Compass, Heart,
} from "lucide-react";

/* ─── Theme ────────────────---------------------------- */
const COLOR = {
  orange: "#D97B2A",
  orangeDark: "#A85A10",
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
  { value: 88, suffix: "%", label: "Overall learning engagement rate" },
  { value: 92, suffix: "%", label: "Satisfaction with self-paced content" },
  { value: 3, suffix: "×", label: "Faster skill development vs. traditional training" },
];

const COMPARISON_ROWS = [
  ["Scheduled classroom training", "Continuous, self-paced learning"],
  ["Standard content for all employees", "Personalized learning journeys"],
  ["Limited learning resources", "Diverse digital learning content"],
  ["One-time training sessions", "Ongoing capability development"],
  ["Difficult progress monitoring", "Real-time learning progress tracking"],
  ["Reactive skill development", "Proactive employee growth"],
];

const WHY_MODERN_LIST = [
  "Develop future-ready employees.",
  "Improve workplace performance.",
  "Strengthen employee engagement.",
  "Support leadership development.",
  "Increase employee retention.",
  "Build a culture of continuous improvement.",
];

const WHY_MATTERS = [
  { title: "Build Employee Skills", icon: <Award size={22} />, desc: "Structured learning pathways strengthen communication, leadership, problem-solving, and wellbeing capabilities." },
  { title: "Improve Workplace Performance", icon: <TrendingUp size={22} />, desc: "Providing relevant resources and practical exercises directly improves productivity, decision-making, and collaboration." },
  { title: "Increase Employee Engagement", icon: <Sparkles size={22} />, desc: "Investing in continuous growth builds motivation, active participation, and deepens engagement across teams." },
  { title: "Support Career Development", icon: <Compass size={22} />, desc: "Help employees identify growth opportunities, build key professional skills, and prepare for future roles." },
  { title: "Encourage Continuous Learning", icon: <BookOpen size={22} />, desc: "Interactive content and bite-sized learning resources fit naturally into daily schedules without disruption." },
  { title: "Strengthen Organizational Growth", icon: <Building2 size={22} />, desc: "Build a highly skilled workforce, enhance innovation, and establish healthy leadership pipelines." },
];

const FEATURES = [
  { title: "Learning Assignments", icon: <Target size={24} />, color: COLOR.orange, desc: "Personalized assignments created by managers and HR teams that align directly with employee roles, career paths, and development needs." },
  { title: "Resource Library", icon: <BookOpen size={24} />, color: "#4A90D9", desc: "A centralized digital collection of articles, self-help guides, leadership handbooks, and wellness materials accessible anytime." },
  { title: "Videos & Podcasts", icon: <Video size={24} />, color: "#E05FA0", desc: "Short, practical multimedia content created by industry experts and coaches that fits easily into daily schedules." },
  { title: "Articles & Exercises", icon: <FileText size={24} />, color: "#E8A020", desc: "Interactive exercises, reflection prompts, and self-assessments designed to reinforce knowledge and apply learning directly." },
  { title: "Skill-Building Content", icon: <CheckCircle size={24} />, color: "#7C5CDB", desc: "Targeted skill pathways focusing on emotional intelligence, communication, team dynamics, leadership, and operational wellness." },
  { title: "Progress Tracking", icon: <LineChart size={24} />, color: COLOR.teal, desc: "Real-time dashboards for HR leaders, managers, and employees to track milestones, completion rates, and development progress." },
];

const HOW_IT_WORKS = [
  { title: "HR Assigns Learning Journeys", desc: "HR teams assign customized pathways based on career goals, skill gaps, or organization requirements." },
  { title: "Employees Access Resources", desc: "Employees engage with assignments, videos, podcasts, and articles at their own pace from any location." },
  { title: "Humanova Tracks Progress", desc: "The platform automatically monitors milestones, course participation, and engagement patterns securely." },
  { title: "HR and Managers Review Insights", desc: "Access centralized dashboards showing team capability growth, participation trends, and skill development." },
  { title: "Build a Skilled Workforce", desc: "Combine continuous learning with wellbeing to create a capable, resilient, and future-ready workforce." },
];

const HR_BENEFITS = [
  { title: "Simplified Learning Management", desc: "Assign pathways, compile resource metrics, and manage development programs from one centralized platform." },
  { title: "Better Workforce Capability", desc: "Help employees build modern leadership, wellness, and technical capabilities to ensure organizational readiness." },
  { title: "Higher Employee Engagement", desc: "Deliver growth opportunities that build motivation and show employee-focused commitment." },
  { title: "Improved Learning Visibility", desc: "Track completion rates and skill progress in real time, making development programs easy to measure." },
  { title: "Data-Driven Development", desc: "Identify team resourcing needs and skill gaps, allocating development budgets with actual performance data." },
  { title: "Stronger Organizational Performance", desc: "Equip teams with communication, leadership, and resilience skills that drive sustainable business outcomes." },
];

const EMPLOYEE_BENEFITS = [
  { title: "Personalized Learning Journeys", desc: "Access recommended development tracks tailored to your career aspirations, role, and wellness goals." },
  { title: "Flexible, Self-Paced Learning", desc: "Engage with bite-sized training resources whenever it fits your daily schedule, without interrupting projects." },
  { title: "Continuous Skill Development", desc: "Build confidence and capabilities through regular practice, expert articles, podcasts, and practical assignments." },
  { title: "Better Career Growth", desc: "Acquire leadership and professional skills that prepare you for future promotions and career steps." },
  { title: "Increased Confidence", desc: "Boost your problem-solving abilities and take on new challenges with verified training credentials." },
  { title: "Improved Workplace Performance", desc: "Apply collaborative and communication skills directly to daily responsibilities, driving individual and team success." },
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
  { title: "Personalized Recommendations", icon: <Compass size={20} />, desc: "AI-based recommendations adapt training resources to employee roles, interests, and resourcing gaps." },
  { title: "Extensive Learning Library", icon: <BookOpen size={20} />, desc: "Access expert wellbeing materials, leadership guides, interactive exercises, and podcasts in one place." },
  { title: "Integrated Wellbeing & Growth", icon: <Heart size={20} />, desc: "Binds professional skill development with emotional resilience, supporting long-term employee success." },
  { title: "Progress Tracking Dashboards", icon: <LineChart size={20} />, desc: "Measure capability progress, program completion, and organizational learning development easily." },
  { title: "Enterprise-Grade Security", icon: <Shield size={20} />, desc: "Robust data protection guarantees that all development records and credentials remain secure and confidential." },
  { title: "Easy Implementation", icon: <Settings size={20} />, desc: "Designed for immediate onboarding and seamless integration with existing resourcing structures." },
  { title: "Actionable Learning Insights", icon: <Target size={20} />, desc: "Transform training completion logs into meaningful data to design future people strategies." },
];

const FAQ = [
  { q: "What is Learning & Capability Support?", a: "Learning & Capability Support is a continuous employee development solution that provides personalized learning resources, skill-building content, assignments, and progress tracking to help employees improve workplace performance and achieve long-term career growth." },
  { q: "How does Humanova support employee learning?", a: "Humanova supports employee learning through personalized learning journeys, resource libraries, videos, podcasts, articles, practical exercises, and progress tracking. The platform helps employees develop professional and wellbeing skills while supporting organizational learning goals." },
  { q: "What learning resources are available?", a: "Humanova offers a wide range of learning resources, including articles, videos, podcasts, learning assignments, interactive exercises, professional development guides, leadership content, and wellbeing materials that support continuous employee growth." },
  { q: "Can employees learn at their own pace?", a: "Yes. Humanova is designed for flexible, self-paced learning. Employees can access learning content whenever it suits their schedule, making it easy to balance professional development with daily work responsibilities." },
  { q: "How is learning progress tracked?", a: "Humanova automatically tracks assignment completion, learning participation, development milestones, and overall progress through intuitive dashboards. Employees, managers, and HR teams can monitor learning outcomes in real time." },
  { q: "Is learning & capability support suitable for remote teams?", a: "Absolutely. Humanova is built for office-based, remote, and hybrid teams. Employees can access learning resources from any location while managers monitor participation and progress through centralized dashboards." },
  { q: "Can HR assign personalized learning journeys?", a: "Yes. HR teams and managers can assign customized learning pathways based on employee roles, career goals, skill gaps, and organizational priorities. This ensures every employee receives relevant and meaningful development opportunities." },
  { q: "How quickly can organizations implement learning & capability support?", a: "Humanova is designed for fast implementation and easy onboarding. Most organizations can begin delivering personalized learning experiences within a short setup period, allowing employees to start developing new skills and capabilities quickly." },
];

/* ─── Page ───────────────────────────────────────────── */

export default function LearningCapabilitySupportPage() {
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
            className="absolute top-1/4 right-1/5 w-[420px] h-[420px] rounded-full bg-[#D97B2A]/8 blur-[110px]"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-1/6 w-[380px] h-[380px] rounded-full bg-[#D97B2A]/6 blur-[100px]"
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
                <BookOpen size={14} />
                Core Service
              </motion.span>

              <motion.h1
                variants={fadeUp}
                custom={2}
                className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Learning &amp;{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#D4F04A]">Capability Support</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 8C40 2 80 2 100 6C120 10 160 10 198 4" stroke="#D4F04A" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
                  </svg>
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} custom={3} className="text-white/65 text-lg lg:text-xl leading-[1.8] max-w-2xl mt-7">
                Build a culture of continuous learning by providing employees with personalized journeys, skill-building content, and expert resources that support growth and wellbeing.
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
              Employees learn best when development becomes part of their everyday work rather than a one-time training event. Learning &amp; Capability Support helps organizations build a culture of continuous learning by providing employees with personalized resources, practical assignments, and skill-building content that supports both professional growth and workplace wellbeing.
            </p>
            <p className="text-[#3F4A50] text-[17px] leading-[1.9]">
              Today&apos;s workplace is evolving rapidly. New technologies, changing business priorities, and shifting employee expectations require people to continuously develop new skills. Traditional classroom training or annual learning programs are no longer enough to keep employees engaged and prepared for future challenges. Organizations need flexible learning experiences that are accessible, relevant, and personalized.
            </p>
            <p className="text-[#3F4A50] text-[17px] leading-[1.9]">
              Humanova&apos;s Learning &amp; Capability Support combines employee wellbeing with continuous learning by delivering personalized learning journeys, expert resources, videos, podcasts, practical exercises, and skill-building content through one intelligent platform. Employees can learn at their own pace while HR teams gain visibility into learning progress, participation, and development outcomes. This approach helps organizations improve employee performance, strengthen engagement, and build future-ready teams.
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
              What is Learning &amp;{" "}
              <span className="text-[#D97B2A]">Capability Support?</span>
            </h2>
            <p className="text-[#3F4A50] text-[17px] leading-[1.9]">
              Learning &amp; Capability Support is a structured approach to employee development that provides continuous access to learning resources, personalized assignments, professional development content, and skill-building opportunities. It helps employees improve workplace skills while supporting long-term career growth, employee wellbeing, and organizational performance.
            </p>
            <p className="text-[#3F4A50] text-[17px] leading-[1.9]">
              Unlike traditional learning programs that often focus on scheduled training sessions, continuous capability development encourages employees to learn regularly through short, practical, and personalized learning experiences. This approach makes learning more engaging, flexible, and relevant to everyday workplace challenges.
            </p>
          </motion.div>

          {/* Comparison table */}
          <motion.div variants={fadeUp} custom={1} className="rounded-[24px] border border-[#E5DED6] overflow-hidden bg-white">
            <div className="grid grid-cols-2 bg-[#0E3D39] text-white text-sm font-semibold">
              <div className="px-6 py-4 border-r border-white/10">Traditional Learning Programs</div>
              <div className="px-6 py-4">Learning &amp; Capability Support</div>
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
                  <CheckCircle2 size={15} className="text-[#D97B2A] shrink-0" />
                  {row[1]}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>

        {/* ═══════════ WHY IT MATTERS ═══════════ */}
        <Reveal id="why-it-matters" className="max-w-6xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <p className="text-[#D97B2A] text-sm font-bold uppercase tracking-[0.2em] mb-4">Why It Matters</p>
            <h2 className="text-[#1F2937] text-3xl md:text-4xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              Why Learning &amp; Capability Support{" "}
              <span className="text-[#D97B2A]">Matters</span>
            </h2>
            <p className="mt-5 text-[#5F6B73] text-lg max-w-2xl mx-auto leading-relaxed">
              Continuous capability development helps employees learn consistently while enabling organizations to build a more skilled, adaptable, and future-ready workforce.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column - Dark Card */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="lg:col-span-5 bg-gradient-to-br from-[#0E3D39] to-[#07312C] rounded-[28px] p-8 lg:p-10 text-white flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#D97B2A]/10 blur-3xl" />
              <div>
                <h3 className="text-white text-2xl lg:text-3xl font-extrabold mb-6 leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                  Why modern organisations invest in learning
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
                    className={`flex gap-4 bg-white rounded-2xl border border-[#E5DED6] p-5 hover:border-[#D97B2A]/30 hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.05)] transition-all duration-300 ${
                      isLast ? "sm:col-span-2" : ""
                    }`}
                  >
                    <div className="w-11 h-11 rounded-xl grid place-items-center shrink-0 bg-[#D97B2A]/10 text-[#D97B2A]">
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
              <p className="text-[#D97B2A] text-sm font-bold uppercase tracking-[0.2em] mb-4">What&apos;s Inside</p>
              <h2 className="text-[#1F2937] text-3xl md:text-4xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                Features of Humanova{" "}
                <span className="text-[#D97B2A]">Learning &amp; Capability Support</span>
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
            <p className="text-[#D97B2A] text-sm font-bold uppercase tracking-[0.2em] mb-4">The Flow</p>
            <h2 className="text-[#1F2937] text-3xl md:text-4xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              How Learning &amp; Capability Support{" "}
              <span className="text-[#D97B2A]">Works</span>
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
                className="bg-white rounded-[24px] border border-[#E5DED6] p-6 flex flex-col justify-between hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-[#D97B2A]/30 transition-all duration-300"
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
                    <ChevronDown size={18} className="text-[#D97B2A]/40" />
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
                <p className="text-[#D97B2A] text-sm font-bold uppercase tracking-[0.2em] mb-4">For HR Teams</p>
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
                      className="flex items-start gap-3 bg-[#FEF3E8] rounded-2xl border border-[#E5DED6] p-5"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#D97B2A]/10 text-[#D97B2A] grid place-items-center shrink-0 mt-0.5">
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
            <p className="text-[#D97B2A] text-sm font-bold uppercase tracking-[0.2em] mb-4">Built For Every Team</p>
            <h2 className="text-[#1F2937] text-3xl md:text-4xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              Who can use Learning &amp; Capability Support?
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
                className="inline-flex items-center gap-3 bg-white rounded-full border border-[#E5DED6] px-6 py-3.5 hover:border-[#D97B2A]/30 hover:shadow-[0_8px_24px_-8px_rgba(217,123,42,0.1)] transition-all duration-300"
              >
                <span className="text-[#D97B2A]">{item.icon}</span>
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
                    Find answers to common questions about learning, assignments, self-paced content, and progress tracking.
                  </p>
                </div>

                <div className="rounded-[28px] bg-[#FEF3E8] p-8">
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
                      className="rounded-[24px] bg-[#FAF7F2] border border-[#E5DED6] px-7 py-6 cursor-pointer transition-colors duration-200 hover:border-[#D97B2A]/30"
                      onClick={() => setOpenFaqIdx(isOpen ? -1 : i)}
                    >
                      <div className="flex items-center justify-between gap-6">
                        <h3 className="text-[#1F2937] text-lg lg:text-xl leading-snug" style={{ fontFamily: "'Instrument Serif', serif" }}>
                          {item.q}
                        </h3>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          className="shrink-0 grid place-items-center w-9 h-9 rounded-full transition-colors duration-200"
                          style={{ backgroundColor: isOpen ? COLOR.orangeDark : "#FEF3E8", color: isOpen ? "#fff" : COLOR.orangeDark }}
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
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#D97B2A]/10 blur-[80px]" />
            <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 lg:py-24 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-white text-4xl lg:text-5xl font-extrabold leading-tight"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                See learning &amp; capability support{" "}
                <span className="text-[#D4F04A]">in action</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-5 text-white/55 text-lg max-w-2xl mx-auto leading-relaxed"
              >
                Book a free demo and see how Humanova helps your organization build a culture of continuous learning and development tailored to employee wellbeing.
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
