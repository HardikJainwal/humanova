"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const problems = [
  {
    id: 1,
    title: "Burnout & Chronic Stress",
    desc: "Constant deadlines and pressure push employees into exhaustion, cutting focus and long-term output.",
    bg: "#D9F0F1",
    accent: "#2C8C91",
    icon: "burnout",
  },
  {
    id: 2,
    title: "Presenteeism",
    desc: "Employees show up physically but mentally checked out, quietly draining team productivity.",
    bg: "#FCEAD8",
    accent: "#D98E4A",
    icon: "presenteeism",
  },
  {
    id: 3,
    title: "Rising Attrition",
    desc: "Unaddressed mental health issues push top talent to quit, spiking hiring and training costs.",
    bg: "#E4F5E9",
    accent: "#5FA876",
    icon: "attrition",
  },
  {
    id: 4,
    title: "Low Team Morale",
    desc: "Stress spreads across teams, weakening collaboration, trust, and workplace culture.",
    bg: "#FDE4E4",
    accent: "#C96B6B",
    icon: "morale",
  },
];

const GAP = 20;
const LARGE_RATIO = 0.44;
const CARD_HEIGHT = 380;
const MOBILE_BREAKPOINT = 720;

export default function CorporateMentalHealth() {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    setContainerWidth(el.offsetWidth);
    return () => observer.disconnect();
  }, []);

  const isMobile = containerWidth > 0 && containerWidth < MOBILE_BREAKPOINT;

  const n = problems.length;
  const totalGaps = (n - 1) * GAP;
  const usable = Math.max(containerWidth - totalGaps, 0);
  const LARGE_WIDTH = usable * LARGE_RATIO;
  const SMALL_WIDTH = n > 1 ? (usable - LARGE_WIDTH) / (n - 1) : usable;

  const next = () => setActive((a) => Math.min(a + 1, n - 1));
  const prev = () => setActive((a) => Math.max(a - 1, 0));

  return (
    <section className="w-full py-10 md:py-16" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <h2
              className="text-[#1F2937] text-3xl md:text-4xl font-semibold leading-tight"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Discover <span className="text-[#2C8C91]">The Hidden Cost</span>
              <br />
              Mental Health at Work
            </h2>
          </div>

          <div className="flex gap-3">
            <NavButton onClick={prev} disabled={active === 0} direction="left" />
            <NavButton onClick={next} disabled={active === n - 1} direction="right" />
          </div>
        </div>

        {/* Mobile View Card Carousel */}
        <div className="block md:hidden">
          <MobileTrack problems={problems} active={active} setActive={setActive} />
        </div>

        {/* Desktop View Accordion Grid */}
        <div ref={containerRef} className="hidden md:block relative w-full" style={{ height: `${CARD_HEIGHT}px` }}>
          {containerWidth > 0 &&
            problems.map((card, i) => {
              const isActive = i === active;
              let left = 0;

              if (i <= active) {
                left = i * (SMALL_WIDTH + GAP);
              } else {
                left =
                  active * (SMALL_WIDTH + GAP) +
                  LARGE_WIDTH +
                  GAP +
                  (i - active - 1) * (SMALL_WIDTH + GAP);
              }

              return (
                <motion.div
                  key={card.id}
                  onClick={() => setActive(i)}
                  animate={{
                    left,
                    width: isActive ? LARGE_WIDTH : SMALL_WIDTH,
                    boxShadow: isActive
                      ? "0 20px 45px rgba(10,61,98,0.16)"
                      : "0 4px 14px rgba(10,61,98,0.04)",
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-0 rounded-[28px] overflow-hidden p-7 md:p-8 flex flex-col justify-between cursor-pointer"
                  style={{
                    background: card.bg,
                    height: CARD_HEIGHT,
                    zIndex: isActive ? 10 : 1,
                  }}
                >
                  {/* decorative background pattern */}
                  <DunesPattern color={card.accent} isActive={isActive} />

                  <div className="min-w-0 relative z-10">
                    <motion.span
                      animate={{
                        backgroundColor: isActive ? "#0A3D62" : "transparent",
                        color: isActive ? "#FFFFFF" : "#0A3D62",
                      }}
                      transition={{ duration: 0.4 }}
                      className="w-10 h-10 rounded-full border-2 border-[#0A3D62] flex items-center justify-center font-semibold shrink-0"
                    >
                      {card.id}
                    </motion.span>

                    <h3
                      className={`text-[#1F2937] font-semibold mt-6 transition-all duration-300 ${
                        isActive ? "text-2xl" : "text-base leading-snug"
                      }`}
                    >
                      {card.title}
                    </h3>

                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.35, delay: 0.1 }}
                          className="text-[#5F6B73] text-sm leading-7 mt-4 max-w-[85%]"
                        >
                          {card.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* icon anchored bottom — fills empty space on every card */}
                  <motion.div
                    animate={{
                      scale: isActive ? 1 : 0.75,
                      opacity: isActive ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 self-end"
                  >
                    <ProblemIcon type={card.icon} color={card.accent} isActive={isActive} />
                  </motion.div>
                </motion.div>
              );
            })}
        </div>

        <div className="flex items-center gap-2 mt-8 justify-center">
          {problems.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to card ${i + 1}`}
              className="h-2 rounded-full transition-all duration-400 cursor-pointer"
              style={{
                width: active === i ? "24px" : "8px",
                backgroundColor: active === i ? "#0A3D62" : "#D8D2C4",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── nav button (fixed: disabled state stays legible, not a blank grey blob) ── */
function NavButton({ onClick, disabled, direction }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous" : "Next"}
      className="w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-300 border-2"
      style={{
        backgroundColor: disabled ? "transparent" : "#0A3D62",
        borderColor: disabled ? "#D8D2C4" : "#0A3D62",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={disabled ? "#B7BFC4" : "#FFFFFF"} strokeWidth="2">
        {direction === "left" ? (
          <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

/* ── subtle dune/wave pattern filling card background ── */
function DunesPattern({ color, isActive }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
      viewBox="0 0 400 380"
      aria-hidden="true"
    >
      <motion.path
        d="M0 260C60 230 100 290 160 265C220 240 260 300 320 270C360 250 380 260 400 250V380H0Z"
        fill={color}
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.14 : 0.1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d="M0 310C70 285 110 330 180 310C250 290 290 335 400 305V380H0Z"
        fill={color}
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.22 : 0.16 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      />
    </svg>
  );
}

/* ── per-problem line-art icons ── */
function ProblemIcon({ type, color, isActive }) {
  const size = isActive ? 72 : 44;

  const icons = {
    burnout: (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="26" stroke={color} strokeWidth="2" opacity="0.35" />
        <path
          d="M32 18c-6 6-6 12-2 16 2-3 4-3 4-3s1 4-2 7c6-1 10-6 8-13-1-3-3-5-8-7Z"
          fill={color}
        />
      </svg>
    ),
    presenteeism: (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="26" stroke={color} strokeWidth="2" opacity="0.35" />
        <ellipse cx="24" cy="30" rx="3" ry="4" fill={color} />
        <ellipse cx="40" cy="30" rx="3" ry="4" fill={color} />
        <path d="M22 42c4-3 16-3 20 0" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    attrition: (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="26" stroke={color} strokeWidth="2" opacity="0.35" />
        <path d="M22 20v24M22 32h16m-6-6l6 6-6 6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    morale: (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="26" stroke={color} strokeWidth="2" opacity="0.35" />
        <circle cx="24" cy="28" r="5" stroke={color} strokeWidth="2.5" />
        <circle cx="40" cy="28" r="5" stroke={color} strokeWidth="2.5" />
        <path d="M18 42c3-4 8-6 14-6s11 2 14 6" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  };

  return icons[type] || null;
}

function MobileTrack({ problems, active, setActive }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[active];
    if (card) {
      const scrollLeft = card.offsetLeft - (el.offsetWidth - card.offsetWidth) / 2;
      el.scrollTo({ left: Math.max(0, scrollLeft), behavior: "smooth" });
    }
  }, [active]);

  return (
    <div
      ref={trackRef}
      className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-4 -mx-6 px-6 no-scrollbar"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {problems.map((card, i) => (
        <div
          key={card.id}
          onClick={() => setActive(i)}
          className="relative snap-center shrink-0 rounded-[28px] p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 overflow-hidden shadow-sm"
          style={{
            background: card.bg,
            width: "82vw",
            maxWidth: "330px",
            height: `${CARD_HEIGHT}px`,
            transform: active === i ? "scale(1)" : "scale(0.97)",
            opacity: active === i ? 1 : 0.88,
            boxShadow: active === i ? "0 12px 30px rgba(10,61,98,0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <DunesPattern color={card.accent} isActive={active === i} />
          <div className="relative z-10">
            <span
              className="w-10 h-10 rounded-full border-2 border-[#0A3D62] flex items-center justify-center font-semibold text-sm transition-colors duration-300"
              style={{
                backgroundColor: active === i ? "#0A3D62" : "transparent",
                color: active === i ? "#FFFFFF" : "#0A3D62",
              }}
            >
              {card.id}
            </span>
            <h3 className="text-[#1F2937] text-xl font-semibold mt-5">{card.title}</h3>
            <p className="text-[#5F6B73] text-sm leading-6 mt-3">{card.desc}</p>
          </div>
          <div className="relative z-10 self-end">
            <ProblemIcon type={card.icon} color={card.accent} isActive={active === i} />
          </div>
        </div>
      ))}
    </div>
  );
}