"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radar, Zap, Heart, CheckCircle2, TrendingUp, Settings, ShieldCheck,
  ChevronDown, ArrowRight, ArrowUpRight, Eye, EyeOff, Layers, Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DemoButton from "@/components/ui/DemoButton";

// const BANNER_IMG = "https://drive.google.com/file/d/1wi7gmeGNLxneDVKL9yAYlSMrJngexDZA/view?usp=drive_link";

export default function PlatformOverviewPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />
      <main>
        <HeroSection />
        <FlowStrip />
        <RoleExperiences />
        <CoreModules />
        <NovaScoreSection />
        <JourneyStepper />
        <PrivacySection />
        <UseCases />
        <OutcomesSection />
        <ComparisonTable />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/* HERO */
/* ────────────────────────────────────────────────────────── */

function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden -mt-24" style={{ minHeight: "680px" }}>
      {/* BG Image and Gradient */}
      <div className="absolute inset-0">
        <img
  src="https://drive.google.com/uc?export=view&id=1wi7gmeGNLxneDVKL9yAYlSMrJngexDZA"
  alt="Hero"
  className="absolute inset-0 h-full w-full object-cover"
/>
        <div className="absolute inset-0 bg-gradient-to-br from-[#07312C]/95 via-[#07312C]/80 to-[#0E3D39]/60" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#D4F04A]/5 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/6 w-[400px] h-[400px] rounded-full bg-[#2C8C91]/10 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-40 pb-28 lg:pt-48 lg:pb-36">
        <div className="max-w-4xl">
          <h1
            className="mt-6 text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            One intelligent platform for people, progress, and workplace insight.
          </h1>

          <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-2xl">
            Humanova connects employee check-ins, confidential support, learning,
            workforce operations, and role-based analytics so organisations can
            understand their people earlier, respond more effectively, and
            measure progress over time.
          </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#final-cta"
                className="inline-flex items-center gap-2 rounded-full bg-[#D4F04A] px-7 py-3.5 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(212,240,74,0.35)] hover:shadow-[0_8px_40px_rgba(212,240,74,0.55)] transition-shadow"
              >
                Book a Free Demo
                <ArrowUpRight size={15} />
              </a>
              <a
                href="#experiences"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Explore the Platform
              </a>
            </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {["Privacy-first by design", "Role-based experiences", "Built for measurable action"].map((t) => (
              <span key={t} className="flex items-center gap-2 text-white/60 text-sm">
                <CheckCircle2 size={15} className="text-[#D4F04A]" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 80V40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0Z" fill="#FAF7F2" />
        </svg>
      </div>
    </section>
  );
}



const FLOW = [
  { icon: Eye, title: "Listen", desc: "Employees check in, reflect, learn, participate, and access support through simple experiences." },
  { icon: Zap, title: "Understand", desc: "Approved signals are organised into role-based trends, scores, and contextual insights." },
  { icon: Heart, title: "Support", desc: "Employees receive relevant resources, coaching, sessions, learning, and guided actions." },
  { icon: CheckCircle2, title: "Act", desc: "Managers and HR teams receive practical next steps and organisation-level priorities." },
  { icon: TrendingUp, title: "Measure", desc: "Teams track participation, wellbeing, engagement, learning, and progress over time." },
];

function FlowStrip() {
  return (
    <section id="platform" className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
      <SectionHead
        eyebrow="Platform in one view"
        title="From everyday employee signals to meaningful organisational action."
        lead="Humanova brings together the information, support, and workflows that are often spread across separate wellness, learning, coaching, engagement, and HR systems."
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4 relative">
        <div className="hidden lg:block absolute top-9 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#2C8C91]/30 to-transparent" />
        {FLOW.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="relative text-center">
            <div className="w-[68px] h-[68px] mx-auto mb-4 rounded-2xl bg-white border border-[#E5DED6] shadow-sm grid place-items-center text-[#215B54]">
              <Icon size={24} />
            </div>
            <h3 className="text-[#1F2937] font-semibold text-base mb-1.5">{title}</h3>
            <p className="text-[#5F6B73] text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */
/* ROLE-BASED EXPERIENCES — tabs, replaces 4 stacked panels    */
/* ────────────────────────────────────────────────────────── */

const ROLE_CONTENT = {
  employee: {
    tabLabel: "Employees", tabSub: "Mobile app",
    eyebrow: "Employee experience",
    title: "A private space to check in, learn, connect, and receive support.",
    description: "Employees can reflect on how they feel, access coaching and resources, join sessions, complete learning activities, view their own progress, and engage with approved workplace programmes.",
    benefits: ["Quick mood and reflection check-ins", "Confidential coaching and support access", "Learning, events, and personal progress", "Clear control over personal information"],
    privacy: "Personal reflections and confidential support content are not shown to managers.",
    widget: "Your weekly overview",
    bars: [["Wellbeing", 74], ["Learning", 61], ["Engagement", 82]],
  },
  manager: {
    tabLabel: "Managers", tabSub: "Team dashboard",
    eyebrow: "Manager experience",
    title: "Better visibility for better people conversations.",
    description: "Managers receive team-level wellbeing and engagement trends, relevant operational patterns, action prompts, and guidance for better conversations—without access to private employee content.",
    benefits: ["Team NOVA Score and trend view", "Participation and programme summaries", "Workload and engagement action prompts", "Permission-based department benchmarks"],
    privacy: "Managers see team-level trends, not private reflections, counselling notes, or confidential chat content.",
    widget: "Team wellbeing and engagement",
    bars: [["Team wellbeing", 68], ["Participation", 79], ["Programme reach", 55]],
  },
  hr: {
    tabLabel: "HR & Admin", tabSub: "Organisation dashboard",
    eyebrow: "HR & admin experience",
    title: "One view of workforce wellbeing, engagement, learning, and action.",
    description: "HR teams can configure programmes, review organisation-level patterns, compare departments, manage content and access, and coordinate approved interventions.",
    benefits: ["Organisation and department dashboards", "Programme, content, and user administration", "Action queue and recommendation review", "Reporting, exports, and governance controls"],
    privacy: "HR access should follow approved purpose, permissions, aggregation thresholds, and organisation policy.",
    widget: "Workforce trends and action queue",
    bars: [["Org NOVA trend", 76], ["Action completion", 64], ["Department spread", 71]],
  },
  leadership: {
    tabLabel: "Leadership", tabSub: "Executive view",
    eyebrow: "Leadership experience",
    title: "See strategic workforce signals without losing the human context.",
    description: "Leadership receives concise organisation-level indicators, trends, programme outcomes, risks, and progress summaries for responsible decision-making.",
    benefits: ["Executive NOVA and people trends", "Outcome and participation summaries", "Strategic priorities and action status", "Organisation and business-unit comparison"],
    privacy: "Leadership views should remain aggregated and should not expose restricted employee-level information.",
    widget: "Organisation health and readiness",
    bars: [["Readiness", 78], ["Outcome trend", 70], ["Risk indicators", 42]],
  },
};

function RoleExperiences() {
  const [active, setActive] = useState("employee");
  const r = ROLE_CONTENT[active];

  return (
    <section id="experiences" className="bg-white py-16 lg:py-20 border-y border-[#E5DED6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHead
          eyebrow="Role-based experiences"
          title="One platform. The right experience for every role."
          lead="Employees use a mobile-first experience, while managers, HR teams, administrators, and leadership access web dashboards aligned to their responsibilities."
        />

        {/* Tabs — replaces 4 separately stacked role sections */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(ROLE_CONTENT).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`flex flex-col items-start px-5 py-2.5 rounded-2xl border text-left transition-colors ${
                active === key
                  ? "bg-[#0E3D39] border-[#0E3D39] text-white"
                  : "bg-white border-[#E5DED6] text-[#1F2937] hover:border-[#2C8C91]/40"
              }`}
            >
              <span className="text-sm font-semibold">{val.tabLabel}</span>
              <span className={`text-xs ${active === key ? "text-white/60" : "text-[#8FA8A3]"}`}>{val.tabSub}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 bg-[#FAF7F2] rounded-[28px] border border-[#E5DED6] p-8 lg:p-10"
          >
            <div>
              <span className="text-[#2C8C91] text-xs font-bold uppercase tracking-[0.15em]">{r.eyebrow}</span>
              <h3 className="mt-3 text-[#1F2937] text-2xl font-bold leading-snug">{r.title}</h3>
              <p className="mt-4 text-[#5F6B73] text-sm leading-relaxed">{r.description}</p>
              <ul className="mt-5 space-y-2.5">
                {r.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-[#1F2937] text-sm">
                    <CheckCircle2 size={16} className="text-[#2C8C91] mt-0.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-start gap-2.5 bg-[#EAF6F4] rounded-2xl p-4 text-sm text-[#215B54]">
                <EyeOff size={16} className="mt-0.5 shrink-0" />
                {r.privacy}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E5DED6]">
              <div className="flex items-center justify-between mb-5">
                <strong className="text-[#1F2937] text-sm">{r.widget}</strong>
                <span className="text-xs text-[#8FA8A3]">Last 7 days</span>
              </div>
              <div className="space-y-4">
                {r.bars.map(([label, pct]) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-[#5F6B73] mb-1.5">
                      <span>{label}</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#EAF6F4] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-[#2C8C91] to-[#0E3D39]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */
/* CORE MODULES — tabbed group switcher, replaces 3 stacked   */
/* 6-card grids                                               */
/* ────────────────────────────────────────────────────────── */

const MODULE_GROUPS = {
  wellbeing: {
    label: "Wellbeing & Support",
    heading: "Listen early and connect people to the right support.",
    desc: "Continuous, privacy-conscious experiences that help employees reflect and access support before challenges become more difficult.",
    items: [
      { chip: "Mobile", title: "Nova Selfie", desc: "A lightweight wellbeing check-in for personal awareness and approved trend analysis." },
      { chip: "Reflection", title: "Nova Reflections", desc: "Guided prompts that help employees pause, reflect, and identify personal patterns." },
      { chip: "Human support", title: "1:1 Sessions", desc: "Confidential access to qualified coaches, counsellors, and support professionals." },
      { chip: "Collective support", title: "Group Sessions", desc: "Structured sessions for resilience, leadership, communication, and shared wellbeing topics." },
      { chip: "Confidential", title: "Support Channels", desc: "Private routes to ask for help, explore options, and connect with approved services." },
      { chip: "Resources", title: "Content Library", desc: "Articles, videos, podcasts, exercises, and practical wellbeing content." },
    ],
  },
  engagement: {
    label: "Engagement & Growth",
    heading: "Create opportunities to learn, connect, and participate.",
    desc: "Bring capability development and employee engagement into the same experience as wellbeing and support.",
    items: [
      { chip: "Learning", title: "Assignments", desc: "Deliver structured tasks, exercises, assessments, and reflection-led development journeys." },
      { chip: "Capability", title: "Learning Pathways", desc: "Organise content and programmes around leadership, wellbeing, AI readiness, and future skills." },
      { chip: "Community", title: "Events", desc: "Promote internal or external events, sessions, and wellbeing campaigns." },
      { chip: "Engagement", title: "Social Interaction", desc: "Enable approved, positive participation and connection across workplace communities." },
      { chip: "Feedback", title: "Pulse Surveys", desc: "Collect focused feedback while respecting anonymity and minimum-data thresholds." },
      { chip: "Recognition", title: "Progress & Milestones", desc: "Help employees and teams see completion, participation, and improvement over time." },
    ],
  },
  operations: {
    label: "Operations & Insight",
    heading: "Connect people experience with the realities of work.",
    desc: "Where enabled, operational signals help HR teams understand patterns in context rather than treating wellbeing as a separate initiative.",
    items: [
      { chip: "Operations", title: "Attendance", desc: "Track approved attendance patterns and view trends alongside other workforce signals." },
      { chip: "Operations", title: "Leave Management", desc: "Manage requests, approvals, and patterns through a clear role-based workflow." },
      { chip: "Operations", title: "Shift Management", desc: "Plan, assign, and monitor shifts where workforce scheduling is relevant." },
      { chip: "Analytics", title: "Role-Based Dashboards", desc: "Provide managers, HR, admins, and leadership with views appropriate to their responsibility." },
      { chip: "Action", title: "Recommendations", desc: "Translate patterns into practical, reviewable next steps for people teams." },
      { chip: "Reporting", title: "Organisation Insights", desc: "Track trends, participation, programme outcomes, and action completion over time." },
    ],
  },
};

function CoreModules() {
  const [active, setActive] = useState("wellbeing");
  const g = MODULE_GROUPS[active];

  return (
    <section id="modules" className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
      <SectionHead
        eyebrow="Core modules"
        title="Everything needed to support, understand, and strengthen the workforce."
        lead="The platform can be configured around each organisation's priorities. Modules should be enabled only where they fit the approved implementation."
      />

      <div className="flex flex-wrap gap-2 mb-8">
        {Object.entries(MODULE_GROUPS).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-colors ${
              active === key
                ? "bg-[#215B54] border-[#215B54] text-white"
                : "bg-white border-[#E5DED6] text-[#5F6B73] hover:border-[#2C8C91]/40"
            }`}
          >
            {val.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          <div className="mb-6 max-w-2xl">
            <h3 className="text-[#1F2937] text-xl font-bold mb-2">{g.heading}</h3>
            <p className="text-[#5F6B73] text-sm leading-relaxed">{g.desc}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {g.items.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-[#E5DED6] p-6 hover:border-[#2C8C91]/30 hover:shadow-[0_8px_24px_-8px_rgba(44,140,145,0.15)] transition-all duration-300"
              >
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#2C8C91] bg-[#EAF6F4] rounded-full px-3 py-1 mb-4">
                  {item.chip}
                </span>
                <h4 className="text-[#1F2937] font-semibold text-base mb-2">{item.title}</h4>
                <p className="text-[#5F6B73] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */
/* NOVA SCORE — simplified radial gauge instead of custom CSS */
/* wheel                                                       */
/* ────────────────────────────────────────────────────────── */

function NovaScoreSection() {
  const dims = ["Discipline", "Learning", "Wellbeing", "Engagement"];
  const score = 78;
  const circumference = 2 * Math.PI * 70;
  const offset = circumference * (1 - score / 100);

  return (
    <section className="bg-[#0E3D39] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-[#D4F04A] text-xs font-bold uppercase tracking-[0.2em]">
            NOVA Score Framework
          </span>
          <h2 className="mt-4 text-white text-3xl lg:text-4xl font-bold leading-tight">
            A clearer view of workforce health and readiness.
          </h2>
          <p className="mt-4 text-white/60 text-base leading-relaxed max-w-lg">
            The NOVA Score brings approved platform signals into a consistent
            framework so people can understand progress at the level
            appropriate to their role.
          </p>
          <ul className="mt-6 space-y-2.5">
            {[
              "Configurable dimensions and organisation-approved weighting",
              "Trends, date ranges, and context—not isolated labels",
              "Minimum-data thresholds for team and organisation views",
              "Contextual recommendations rather than employee judgement",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-white/80 text-sm">
                <CheckCircle2 size={16} className="text-[#D4F04A] mt-0.5 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-white/40 text-xs leading-relaxed max-w-lg border-t border-white/10 pt-4">
            The NOVA Score is not a medical or psychological diagnosis and
            should not be used alone for disciplinary, compensation, promotion,
            termination, or selection decisions.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            {/* Dedicated 220px gauge wrapper for perfect vertical & horizontal centering */}
            <div className="relative w-[220px] h-[220px]">
              <svg width="220" height="220" viewBox="0 0 180 180">
                <circle cx="90" cy="90" r="70" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="14" />
                <circle
                  cx="90" cy="90" r="70" fill="none" stroke="#D4F04A" strokeWidth="14"
                  strokeDasharray={circumference} strokeDashoffset={offset}
                  strokeLinecap="round" transform="rotate(-90 90 90)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="text-white text-4xl font-black leading-none" style={{ fontFamily: "var(--font-outfit)" }}>
                  {score}
                </div>
                <div className="text-white/50 text-[10px] font-bold uppercase tracking-widest mt-1">
                  NOVA Score
                </div>
              </div>
            </div>

            {/* Dimension pills placed below the gauge */}
            <div className="grid grid-cols-2 gap-2.5 mt-6 max-w-[240px] mx-auto">
              {dims.map((d) => (
                <span key={d} className="text-center text-[11px] font-medium text-white/70 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */
/* JOURNEY STEPPER — 5-step tabbed flow, replaces click-driven */
/* vanilla JS stepper                                          */
/* ────────────────────────────────────────────────────────── */

const STEPS = [
  { num: 1, label: "Configure", title: "Configure the platform around your workforce.", text: "Select approved modules, user roles, departments, privacy settings, programmes, content, and integration requirements.", detail: "Humanova should adapt to the organisation's operating model rather than forcing every client into the same setup.", widgetLabel: "Configuration overview", widgetTitle: "Modules and permissions", tiles: [["Wellbeing", "Enabled"], ["Learning", "Enabled"], ["Operations", "Optional"], ["Privacy rules", "Reviewed"]] },
  { num: 2, label: "Launch", title: "Launch a clear, trusted employee experience.", text: "Onboard employees and role holders with simple communication, privacy explanations, guided setup, and access to the right tools.", detail: "A successful launch makes it clear what the platform is for, what is private, and how people can get value from it.", widgetLabel: "Launch readiness", widgetTitle: "Users, communication, and access", tiles: [["Employees invited", "1,240"], ["Comms sent", "Done"], ["Access reviewed", "Done"], ["Privacy notice", "Published"]] },
  { num: 3, label: "Understand", title: "Understand patterns in context.", text: "Humanova organises approved signals into trends, role-based dashboards, scores, and contextual insight.", detail: "The platform should show changes over time and explain the signals behind each insight.", widgetLabel: "Insight overview", widgetTitle: "Trends, thresholds, and context", tiles: [["NOVA trend", "+8.4%"], ["Participation", "76%"], ["Confidence", "High"], ["Thresholds met", "Yes"]] },
  { num: 4, label: "Act", title: "Turn insight into reviewable action.", text: "Managers and HR teams receive practical prompts such as workload review, team check-ins, programme promotion, learning, or support escalation.", detail: "Recommendations should support human judgement and remain explainable, role-appropriate, and configurable.", widgetLabel: "Action workspace", widgetTitle: "Recommended actions and ownership", tiles: [["Open actions", "24"], ["Owner assigned", "18"], ["Due this week", "9"], ["Escalated", "2"]] },
  { num: 5, label: "Measure", title: "Measure progress and improve.", text: "Track participation, wellbeing, engagement, learning, operational context, and action completion over time.", detail: "Review what changed, what was completed, what needs attention, and which programmes should be improved.", widgetLabel: "Outcome overview", widgetTitle: "Progress and programme impact", tiles: [["Participation", "+12%"], ["Actions closed", "89%"], ["Programmes reviewed", "6"], ["Next review", "Q3"]] },
];

function JourneyStepper() {
  const [active, setActive] = useState(0);
  const s = STEPS[active];

  return (
    <section className="bg-white py-16 lg:py-20 border-y border-[#E5DED6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHead
          eyebrow="How the platform works"
          title="A practical cycle from onboarding to measurable improvement."
        />

        <div className="flex flex-wrap gap-2 mb-6">
          {STEPS.map((step, i) => (
            <button
              key={step.label}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-colors ${
                active === i
                  ? "bg-[#0E3D39] border-[#0E3D39] text-white"
                  : "bg-white border-[#E5DED6] text-[#5F6B73] hover:border-[#2C8C91]/40"
              }`}
            >
              <span className={`w-5 h-5 rounded-full grid place-items-center text-[11px] ${active === i ? "bg-[#D4F04A] text-black" : "bg-[#EAF6F4] text-[#215B54]"}`}>
                {step.num}
              </span>
              {step.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 bg-[#FAF7F2] rounded-[28px] border border-[#E5DED6] p-8 lg:p-10"
          >
            <div>
              <h3 className="text-[#1F2937] text-2xl font-bold leading-snug mb-4">{s.title}</h3>
              <p className="text-[#5F6B73] text-sm leading-relaxed mb-4">{s.text}</p>
              <div className="text-[#215B54] text-sm bg-white rounded-2xl p-4 border border-[#E5DED6] leading-relaxed">
                {s.detail}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#E5DED6]">
              <span className="text-xs text-[#8FA8A3]">{s.widgetLabel}</span>
              <h4 className="text-[#1F2937] font-semibold text-sm mt-1 mb-4">{s.widgetTitle}</h4>
              <div className="grid grid-cols-2 gap-3">
                {s.tiles.map(([label, val]) => (
                  <div key={label} className="bg-[#FAF7F2] rounded-xl border border-[#E5DED6] p-3.5">
                    <div className="text-[#8FA8A3] text-xs">{label}</div>
                    <div className="text-[#1F2937] font-bold text-sm mt-1">{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */
/* PRIVACY */
/* ────────────────────────────────────────────────────────── */

const PRIVACY_CARDS = [
  { icon: Layers, title: "Access by responsibility", desc: "Employees, managers, HR, administrators, and leadership receive only the information appropriate to their role." },
  { icon: Radar, title: "Aggregation before exposure", desc: "Team and organisation insight should use minimum-data thresholds and avoid identifying individuals through small groups." },
  { icon: Settings, title: "Organisation-level governance", desc: "Permissions, enabled modules, data sources, retention, and programme access can be configured and reviewed." },
  { icon: CheckCircle2, title: "Claims that can be verified", desc: "Security certifications, standards, and integrations should be published only when current, implemented, and approved." },
];

function PrivacySection() {
  return (
    <section id="privacy" className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8">
        <div className="bg-white rounded-[28px] border border-[#E5DED6] p-8 lg:p-10">
          <span className="text-[#2C8C91] text-xs font-bold uppercase tracking-[0.15em]">
            Privacy, security, and trust
          </span>
          <h2 className="mt-3 text-[#1F2937] text-3xl font-bold leading-tight">
            Designed to support people without turning wellbeing into surveillance.
          </h2>
          <p className="mt-4 text-[#5F6B73] text-base leading-relaxed">
            Sensitive employee experiences require clear boundaries. Humanova
            should make access controls, confidentiality, aggregation, and
            responsible data use visible throughout the product and website.
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {["Role-based access", "Aggregated team insights", "Configurable thresholds", "Purpose-limited data use", "Human review"].map((p) => (
              <span key={p} className="text-xs font-medium text-[#215B54] bg-[#EAF6F4] rounded-full px-3.5 py-1.5">
                {p}
              </span>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mt-8">
            <div>
              <h4 className="flex items-center gap-2 text-[#1F2937] font-semibold text-sm mb-3">
                <Eye size={15} className="text-[#2C8C91]" /> Managers can see
              </h4>
              <ul className="space-y-2 text-sm text-[#5F6B73]">
                {["Team-level trends", "Participation summaries", "Approved operational patterns", "Recommended actions"].map((t) => (
                  <li key={t} className="flex items-start gap-2"><span className="text-[#2C8C91] mt-1">•</span>{t}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="flex items-center gap-2 text-[#1F2937] font-semibold text-sm mb-3">
                <EyeOff size={15} className="text-[#B5453B]" /> Managers cannot see
              </h4>
              <ul className="space-y-2 text-sm text-[#5F6B73]">
                {["Private reflection text", "Counselling notes", "Confidential chat content", "Restricted personal information"].map((t) => (
                  <li key={t} className="flex items-start gap-2"><span className="text-[#B5453B] mt-1">•</span>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-5">
          {PRIVACY_CARDS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl border border-[#E5DED6] p-6">
              <div className="w-11 h-11 rounded-xl bg-[#EAF6F4] text-[#215B54] grid place-items-center mb-4">
                <Icon size={19} />
              </div>
              <h3 className="text-[#1F2937] font-semibold text-sm mb-2">{title}</h3>
              <p className="text-[#5F6B73] text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */
/* USE CASES */
/* ────────────────────────────────────────────────────────── */

const USE_CASES = [
  { num: "01", title: "Identify emerging burnout risk", desc: "Combine participation, wellbeing trends, workload context, and support access to help HR plan earlier interventions." },
  { num: "02", title: "Strengthen leadership capability", desc: "Connect coaching, learning, reflections, group programmes, and manager action prompts in one journey." },
  { num: "03", title: "Improve engagement across locations", desc: "Track participation and sentiment across distributed teams while maintaining privacy and local relevance." },
  { num: "04", title: "Support frontline and shift teams", desc: "Bring together shift patterns, attendance context, check-ins, support, and team-level action where enabled." },
  { num: "05", title: "Measure programme outcomes", desc: "Move beyond attendance counts by tracking participation, follow-through, feedback, and improvement indicators." },
  { num: "06", title: "Build AI and future readiness", desc: "Combine capability pathways, assessments, learning activity, reflections, and role-based reporting." },
];

function UseCases() {
  return (
    <section className="bg-white py-16 lg:py-20 border-y border-[#E5DED6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHead eyebrow="Platform use cases" title="Built around real workforce challenges." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {USE_CASES.map(({ num, title, desc }) => (
            <div key={num} className="bg-[#FAF7F2] rounded-2xl border border-[#E5DED6] p-6 hover:border-[#2C8C91]/30 hover:shadow-[0_8px_24px_-8px_rgba(44,140,145,0.15)] transition-all duration-300 group">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8FA8A3]">Use case {num}</span>
              <h3 className="mt-2 text-[#1F2937] font-semibold text-base mb-2">{title}</h3>
              <p className="text-[#5F6B73] text-sm leading-relaxed mb-4">{desc}</p>
              <a href="#final-cta" className="inline-flex items-center gap-1.5 text-[#215B54] text-sm font-semibold">
                Explore this use case
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */
/* OUTCOMES */
/* ────────────────────────────────────────────────────────── */

const OUTCOMES = [
  { title: "Participation", desc: "Check-ins, sessions, learning, events, and programme reach." },
  { title: "Wellbeing trends", desc: "Changes in approved wellbeing indicators over time." },
  { title: "Engagement", desc: "Participation, feedback, connection, and activity trends." },
  { title: "Action completion", desc: "Recommended actions reviewed and completed by responsible teams." },
  { title: "Learning progress", desc: "Assignments, pathways, capability participation, and completion." },
  { title: "Operational context", desc: "Leave, attendance, and shift patterns where modules are enabled." },
];

function OutcomesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
        <div className="bg-white rounded-[28px] border border-[#E5DED6] p-8 lg:p-10">
          <span className="text-[#2C8C91] text-xs font-bold uppercase tracking-[0.15em]">Outcomes & measurement</span>
          <h2 className="mt-3 text-[#1F2937] text-2xl lg:text-3xl font-bold leading-tight mb-6">
            Measure participation, progress, and people outcomes—not just platform usage.
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {OUTCOMES.map(({ title, desc }) => (
              <div key={title}>
                <strong className="text-[#1F2937] text-sm">{title}</strong>
                <p className="text-[#5F6B73] text-sm leading-relaxed mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0E3D39] rounded-[28px] p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-white text-xl font-bold mb-3">Use proof that can be explained.</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Every public outcome claim should have a clear source, date range,
              sample, and measurement method. Where proof is not yet approved,
              show the indicators the platform can track.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <span className="text-4xl font-extrabold text-[#D4F04A]">6</span>
            <span className="text-white/50 text-xs leading-snug">
              Outcome categories<br />shown in this sample
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */
/* COMPARISON TABLE */
/* ────────────────────────────────────────────────────────── */

const COMPARISON_ROWS = [
  ["Employee check-ins", "Periodic surveys or separate apps", "Continuous, configurable experiences connected to support and action"],
  ["Support", "Reactive and disconnected from wider context", "Coaching, sessions, resources, and programmes within the same journey"],
  ["Learning", "Separate from wellbeing and engagement", "Capability pathways connected to personal and organisational progress"],
  ["Workforce operations", "Viewed without people context", "Approved attendance, leave, and shift patterns can be interpreted alongside other signals"],
  ["Insights", "Multiple reports with inconsistent definitions", "Role-based dashboards, trends, contextual scores, and recommended actions"],
  ["Privacy", "Different rules across separate systems", "Shared governance principles and clear visibility boundaries"],
];

function ComparisonTable() {
  return (
    <section className="bg-white py-16 lg:py-20 border-y border-[#E5DED6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHead eyebrow="Why Humanova" title="Replace fragmented tools with one connected people platform." />
        <div className="overflow-x-auto rounded-[28px] border border-[#E5DED6] bg-[#FAF7F2]">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b border-[#E5DED6]">
                <th className="text-left px-6 py-4 text-[#1F2937] font-semibold">Capability</th>
                <th className="text-left px-6 py-4 text-[#8FA8A3] font-semibold">Fragmented approach</th>
                <th className="text-left px-6 py-4 text-[#215B54] font-semibold">Humanova platform</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map(([cap, frag, huma], i) => (
                <tr key={cap} className={i !== COMPARISON_ROWS.length - 1 ? "border-b border-[#E5DED6]" : ""}>
                  <td className="px-6 py-4 font-medium text-[#1F2937] align-top">{cap}</td>
                  <td className="px-6 py-4 text-[#8FA8A3] align-top">{frag}</td>
                  <td className="px-6 py-4 text-[#374151] align-top bg-[#EEF5F3]">{huma}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */
/* FAQ */
/* ────────────────────────────────────────────────────────── */

const FAQS = [
  { q: "What is the Humanova platform?", a: "Humanova is a workplace wellbeing and workforce intelligence platform that connects employee check-ins, support, engagement, learning, operations, and role-based insights in one system." },
  { q: "Can managers see individual reflections?", a: "No. Managers should not see private reflection text, counselling notes, or confidential chat content. Their view focuses on approved, aggregated team trends and practical support actions." },
  { q: "Is the NOVA Score an employee performance rating?", a: "No. It is a contextual framework for understanding approved dimensions such as wellbeing, engagement, learning, and discipline. It should not be used alone for employment decisions." },
  { q: "Does the platform diagnose mental health conditions?", a: "No. Humanova should be positioned as a support, insight, and workforce action platform—not as a medical diagnosis or clinical monitoring system." },
  { q: "Can the platform integrate with existing systems?", a: "Humanova can be designed to work with relevant HR, identity, attendance, learning, and reporting systems. Specific integrations should be confirmed based on implementation status and client requirements." },
  { q: "How long does implementation take?", a: "The timeline depends on enabled modules, organisation structure, data requirements, integrations, privacy review, content configuration, and rollout scope. A discovery process should establish the final plan." },
];

function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-white py-16 lg:py-20 border-y border-[#E5DED6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-10">
          <div className="lg:sticky lg:top-24 flex flex-col gap-6 self-start">
            <span className="text-[#2C8C91] text-xs font-bold uppercase tracking-[0.15em]">Questions & answers</span>
            <h2 className="mt-3 text-[#1F2937] text-3xl font-bold leading-tight">
              Clear answers for employees, HR, IT, and leadership.
            </h2>
            <p className="mt-4 text-[#5F6B73] text-base leading-relaxed">
              This sample uses plain-language answers. Final security,
              compliance, integration, and AI claims should be reviewed before
              publication.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={item.q}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="bg-[#FAF7F2] rounded-2xl border border-[#E5DED6] px-6 py-5 cursor-pointer hover:border-[#2C8C91]/30 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-[#1F2937] font-semibold text-base">{item.q}</h3>
                    <span className={`shrink-0 grid place-items-center w-8 h-8 rounded-full transition-transform duration-200 ${isOpen ? "bg-[#D4F04A] rotate-45" : "bg-[#EAF6F4]"}`}>
                      <span className="text-[#0E3D39] font-bold text-lg leading-none">+</span>
                    </span>
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="text-[#5F6B73] text-sm leading-relaxed pt-3">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */
/* FINAL CTA */
/* ────────────────────────────────────────────────────────── */

function FinalCta() {
  return (
    <section id="final-cta" className="mx-4 mb-16 mt-12">
      <div className="relative rounded-[32px] bg-gradient-to-br from-[#07312C] to-[#0A4A42] overflow-hidden px-8 py-16 lg:px-16 lg:py-20 text-center">
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-[#D4F04A]/10 blur-3xl" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-white text-3xl lg:text-4xl font-extrabold leading-tight">
            See how Humanova can support your workforce.
          </h2>
          <p className="mt-4 text-white/60 text-base leading-relaxed">
            Explore a role-based platform designed to connect employee
            wellbeing, engagement, learning, support, workforce operations,
            and actionable insight.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <DemoButton
              variant="primary"
              className="inline-flex items-center gap-2 rounded-full bg-[#D4F04A] px-7 py-3.5 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(212,240,74,0.35)] hover:shadow-[0_8px_40px_rgba(212,240,74,0.55)] transition-shadow cursor-pointer"
            >
              Book a Free Demo
              <ArrowUpRight size={15} />
            </DemoButton>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Talk to Our Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */
/* SHARED */
/* ────────────────────────────────────────────────────────── */

function SectionHead({ eyebrow, title, lead }) {
  return (
    <div className="mb-10 max-w-2xl">
      <span className="text-[#2C8C91] text-xs font-bold uppercase tracking-[0.15em]">{eyebrow}</span>
      <h2
        className="mt-3 text-[#1F2937] text-3xl lg:text-4xl font-bold leading-tight"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        {title}
      </h2>
      {lead && <p className="mt-4 text-[#5F6B73] text-base leading-relaxed">{lead}</p>}
    </div>
  );
}