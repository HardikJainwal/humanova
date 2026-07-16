"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useDemoModal } from "@/context/DemoModalContext";

/* ── Icon SVGs ───────────────────────────────────────────── */
const Icons = {
  Enterprise: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    </svg>
  ),
  ScaleUp: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
    </svg>
  ),
  Startup: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  Healthcare: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
  Wellbeing: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  Life: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
    </svg>
  ),
  Performance: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
    </svg>
  ),
  Leadership: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  Sales: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  Overview: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  Tag: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  ),
  Compare: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/>
    </svg>
  ),
  ROI: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  Quote: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
    </svg>
  ),
};

/* ── Data ──────────────────────────────────────────────────── */
export const TABS = [
  {
    id: "solutions",
    label: "Solutions",
    badge: null,
    items: [
      { icon: Icons.Enterprise,  title: "For Enterprises",                desc: "Scalable wellness for large organisations",  href: "/solutions/enterprises" },
      { icon: Icons.ScaleUp,     title: "For Scale-Ups",                  desc: "Grow team resilience as you scale",           href: "/solutions/scale-ups"   },
      { icon: Icons.Startup,     title: "For Startups",                   desc: "Lightweight tools from day one",              href: "/solutions/startups"    },
      { icon: Icons.Healthcare,  title: "For Healthcare & Public Sector", desc: "Specialist support for high-pressure sectors", href: "/solutions/healthcare"  },
    ],
  },
  {
    id: "programs",
    label: "Programs",
    badge: "New",
    items: [
      { icon: Icons.Wellbeing,   title: "Employee Wellbeing",              desc: "Holistic mental health for every employee",   href: "/programs/employee-wellbeing"    },
      { icon: Icons.Life,        title: "Life Solutions",                  desc: "Personal coaching beyond the workplace",       href: "/programs/life-solutions"        },
      { icon: Icons.Performance, title: "Performance & Career Coaching",   desc: "Unlock potential with 1-on-1 guidance",        href: "/programs/performance-coaching"  },
      { icon: Icons.Leadership,  title: "Leadership & Culture",            desc: "Build psychologically safe leaders",           href: "/programs/leadership-culture"    },
      { icon: Icons.Sales,       title: "Sales Coaching & Revenue",        desc: "Resilience training for revenue teams",        href: "/programs/sales-coaching"        },
    ],
  },
  {
    id: "platform",
    label: "Platform",
    badge: null,
    items: [
      { icon: Icons.Overview, title: "Platform Overview", desc: "AI-powered wellness — all in one place", href: "/Platformoverviewpage" },
    ],
  },

];

/* ── Animation variants ─────────────────────────────────────── */
const panelVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.98 },
  show:   { opacity: 1, y: 0,   scale: 1,    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, y: -6,  scale: 0.98, transition: { duration: 0.15, ease: "easeIn" } },
};

const itemVars = {
  hidden: { opacity: 0, y: 8 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.25, delay: i * 0.05, ease: "easeOut" } }),
};

/* ── Trigger button ─────────────────────────────────────────── */
export function BusinessTrigger({ open }) {
  return (
    <button
      id="nav-business"
      aria-haspopup="true"
      aria-expanded={open}
      className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-150 select-none ${
        open
          ? "text-[#2C8C91] bg-[#EEF8F5]"
          : "text-[#5F6B73] hover:text-[#1F2937] hover:bg-[#FAF7F2]"
      }`}
    >
      Business
      <svg
        width="11" height="11" viewBox="0 0 12 12" fill="none"
        className={`transition-transform duration-200 ${open ? "rotate-180 text-[#2C8C91]" : "text-[#9BA9B4]"}`}
      >
        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

/* ── Mega panel ─────────────────────────────────────────────── */
export function BusinessMegaPanel({ open, onClose, activeTab, setActiveTab }) {
  const { open: openModal } = useDemoModal();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mega-panel"
          variants={panelVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          /* 
            Positioned absolute from the <header> which has position:relative.
            left-1/2 -translate-x-1/2 + max-w-[1080px] = perfectly centred under navbar pill.
            px-4 = same horizontal padding as the header so it aligns flush.
          */
          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-full max-w-[1080px] px-4 z-50"
        >
          <div
            className="rounded-[24px] border border-[#E5DED6] overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 24px 60px -12px rgba(0,0,0,0.13), 0 4px 16px -4px rgba(44,140,145,0.07)",
            }}
          >
            <div className="flex">

              {/* ── LEFT: tab rail ── */}
              <div
                className="shrink-0 flex flex-col gap-0.5 p-4 border-r border-[#F0EAE3]"
                style={{ width: "192px", background: "#FDFAF7" }}
              >
                <p className="text-[10px] uppercase tracking-widest text-[#9BA9B4] font-semibold px-3 py-2">
                  Business
                </p>

                {TABS.map((tab) => {
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onMouseEnter={() => setActiveTab(tab.id)}
                      onClick={() => setActiveTab(tab.id)}
                      className={`group flex items-center justify-between w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                        active
                          ? "bg-white text-[#1F2937] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.07)] border border-[#E5DED6]"
                          : "text-[#5F6B73] hover:text-[#1F2937] hover:bg-white/70"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {tab.label}
                        {tab.badge && (
                          <span className="text-[9px] font-bold bg-[#D4F04A] text-[#1F2937] px-1.5 py-0.5 rounded-full leading-none">
                            {tab.badge}
                          </span>
                        )}
                      </span>
                      <svg
                        width="12" height="12" viewBox="0 0 13 13" fill="none"
                        className={`transition-all duration-150 ${active ? "text-[#2C8C91] translate-x-0.5" : "text-[#D0D8DC] group-hover:text-[#9BA9B4]"}`}
                      >
                        <path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  );
                })}

                {/* Talk to sales */}
                <div className="mt-auto pt-3 border-t border-[#F0EAE3]">
                  <button
                    type="button"
                    onClick={() => { onClose(); openModal(); }}
                    className="flex items-center gap-2 w-full text-left text-xs font-semibold text-[#2C8C91] hover:text-[#1B6E73] transition-colors px-3 py-2 rounded-xl hover:bg-[#EEF8F5]"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.58 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 5.38 5.38l1.91-1.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 14.92z"/>
                    </svg>
                    Talk to Sales
                  </button>
                </div>
              </div>

              {/* ── RIGHT: items ── */}
              <div className="flex-1 min-w-0 p-6">
                {/* Section heading */}
                <div className="mb-5">
                  <h3 className="text-[#1F2937] text-base font-semibold" style={{ fontFamily: "var(--font-outfit)" }}>
                    {TABS.find((t) => t.id === activeTab)?.label}
                  </h3>
                  <div className="mt-1.5 w-8 h-0.5 rounded-full bg-[#2C8C91]" />
                </div>

                {/* Items grid */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.15 } }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    className="grid grid-cols-2 gap-2"
                  >
                    {TABS.find((t) => t.id === activeTab)?.items.map((item, i) => (
                      <motion.div
                        key={item.title}
                        custom={i}
                        variants={itemVars}
                        initial="hidden"
                        animate="show"
                      >
                        <Link
                          href={item.href ?? "#"}
                          onClick={onClose}
                          className="group flex items-start gap-3 p-3.5 rounded-2xl hover:bg-[#F4F9F8] transition-all duration-200 border border-transparent hover:border-[#DCF0ED]"
                        >
                          {/* Icon */}
                          <span
                            className="shrink-0 w-9 h-9 rounded-xl grid place-items-center transition-transform duration-200 group-hover:scale-110"
                            style={{ background: "linear-gradient(135deg,#EEF8F5 0%,#D9F0E9 100%)", color: "#2C8C91" }}
                          >
                            <item.icon />
                          </span>

                          <div className="min-w-0 flex-1">
                            <p className="text-[#1F2937] text-sm font-semibold leading-snug group-hover:text-[#2C8C91] transition-colors duration-150">
                              {item.title}
                            </p>
                            <p className="text-[#8FA8A3] text-xs mt-0.5 leading-relaxed line-clamp-2">
                              {item.desc}
                            </p>
                          </div>

                          <svg
                            width="13" height="13" viewBox="0 0 14 14" fill="none"
                            className="shrink-0 mt-0.5 text-[#D0D8DC] group-hover:text-[#2C8C91] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150"
                          >
                            <path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Footer */}
                <div className="mt-5 pt-4 border-t border-[#F0EAE3] flex items-center justify-between">
                  <p className="text-xs text-[#9BA9B4]">
                    Trusted by <span className="font-semibold text-[#1F2937]">50+</span> organisations worldwide
                  </p>
                  <button
                    type="button"
                    onClick={() => { onClose(); openModal(); }}
                    className="text-xs font-semibold text-[#2C8C91] hover:text-[#1B6E73] transition-colors flex items-center gap-1"
                  >
                    Get a free demo
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
