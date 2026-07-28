"use client";
import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";

const steps = [
  {
    id: 1,
    title: "Take the Assessment",
    desc: "Employees complete a short, confidential wellbeing check-in. No jargon, just honest signals.",
    icon: "clipboard",
    img: "/images/how-it-works/step1.jpg",
  },
  {
    id: 2,
    title: "We Analyze the Data",
    desc: "Our platform aggregates responses into team-level insights while keeping individuals anonymous.",
    icon: "chart",
    img: "/images/how-it-works/step2.jpg",
  },
  {
    id: 3,
    title: "You Get Actionable Reports",
    desc: "HR leaders receive clear, prioritized recommendations delivered straight to their dashboard.",
    icon: "shield",
    img: "/images/how-it-works/step3.jpg",
  },
];

export default function HowItWorksScroll() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const raw = latest * steps.length;
    const idx = Math.min(steps.length - 1, Math.floor(raw));
    setActive(idx);
    setStepProgress(raw - idx);
  });

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: "#FAF7F2" }}
      className="relative w-full py-12 lg:py-0 lg:h-[300vh]"
    >
      <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center lg:overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 w-full py-4 lg:py-0">
          <div className="text-center mb-8 lg:mb-14">
            <p className="text-[#2C8C91] text-xs sm:text-sm font-semibold uppercase tracking-[3px] mb-2">
              Simple Steps
            </p>
            <h2
              className="text-[#1F2937] text-3xl sm:text-4xl md:text-5xl font-semibold"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              How It Works
            </h2>
            <p className="text-[#5F6B73] text-base sm:text-lg mt-2">
              No confusion or delays. Just clear, actionable insight.
            </p>
          </div>

          {/* Mobile step selector tabs */}
          <div className="flex lg:hidden justify-center gap-2 mb-6">
            {steps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => setActive(idx)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  active === idx
                    ? "bg-[#2C8C91] text-white shadow-sm"
                    : "bg-[#EAE4D9] text-[#4B5563] hover:bg-[#DDD5C5]"
                }`}
              >
                Step {idx + 1}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* left image — full graphic showcase card */}
            <div className="relative flex items-center justify-center py-4">
              {/* Background glowing aura */}
              <div
                className="absolute inset-0 rounded-[40px] blur-3xl opacity-25 bg-gradient-to-r from-[#2C8C91] via-[#7FC7AE] to-[#D4F04A]"
                style={{ transform: "scale(1.04)" }}
              />

              <div
                className="relative w-full h-[320px] sm:h-[460px] lg:h-[520px] overflow-hidden rounded-[32px] sm:rounded-[40px] bg-white border border-[#E5DED6] shadow-[0_20px_50px_rgba(44,140,145,0.15)]"
              >
                <div className="absolute inset-0 p-3 sm:p-5 flex items-center justify-center bg-white">
                  {steps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      className="absolute inset-3 sm:inset-5 flex items-center justify-center"
                      initial={false}
                      animate={{
                        opacity: active === index ? 1 : 0,
                        scale: active === index ? 1 : 0.96,
                      }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        src={step.img}
                        alt={step.title}
                        fill
                        priority={index === 0}
                        unoptimized
                        className="object-contain"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* step counter badge */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/95 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 shadow-lg border border-[#E5DED6] z-10">
                  <span className="text-[#07312C] font-black text-xs sm:text-sm">
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[#9CA6AC] text-xs sm:text-sm">/</span>
                  <span className="text-[#9CA6AC] text-xs sm:text-sm">
                    {String(steps.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>

            {/* right steps list */}
            <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
              {steps.map((step, i) => {
                const isActive = active === i;
                const isDone = i < active;
                const fill = isDone ? 1 : isActive ? stepProgress : 0;

                return (
                  <motion.div
                    key={step.id}
                    onClick={() => setActive(i)}
                    animate={{
                      opacity: isActive ? 1 : 0.7,
                      x: isActive ? 6 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex gap-4 sm:gap-5 items-start cursor-pointer p-3 sm:p-0 rounded-2xl transition-colors hover:bg-[#FAF7F2]/50"
                  >
                    {/* circular progress ring around icon */}
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0">
                      <svg viewBox="0 0 56 56" className="absolute inset-0 -rotate-90">
                        <circle
                          cx="28"
                          cy="28"
                          r="25"
                          fill="none"
                          stroke="#E5E1D8"
                          strokeWidth="2.5"
                        />
                        <motion.circle
                          cx="28"
                          cy="28"
                          r="25"
                          fill="none"
                          stroke="#2C8C91"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 25}
                          animate={{
                            strokeDashoffset: 2 * Math.PI * 25 * (1 - fill),
                          }}
                          transition={{ duration: 0.1, ease: "linear" }}
                        />
                      </svg>
                      <div
                        className="absolute inset-[6px] rounded-full flex items-center justify-center transition-colors duration-400"
                        style={{ backgroundColor: isActive ? "#2C8C91" : "#F1EEE7" }}
                      >
                        <StepIcon type={step.icon} isActive={isActive} />
                      </div>
                    </div>

                    <div className="pt-1 sm:pt-2">
                      <h3
                        className="text-lg sm:text-xl font-semibold mb-1.5 transition-colors duration-400"
                        style={{ color: isActive ? "#1F2937" : "#4B5563" }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="text-xs sm:text-sm leading-relaxed transition-colors duration-400"
                        style={{ color: isActive ? "#5F6B73" : "#6B7280" }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── clean line-art step icons, no external dependency ── */
function StepIcon({ type, isActive }) {
  const color = isActive ? "#FFFFFF" : "#2C8C91";

  const icons = {
    clipboard: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <rect x="6" y="4" width="12" height="17" rx="2" strokeLinejoin="round" />
        <rect x="9" y="2" width="6" height="4" rx="1" strokeLinejoin="round" />
        <path d="M9 12h6M9 16h4" strokeLinecap="round" />
      </svg>
    ),
    chart: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M4 20V10M11 20V4M18 20v-7" strokeLinecap="round" />
        <path d="M3 20h18" strokeLinecap="round" />
      </svg>
    ),
    shield: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  };

  return icons[type] || null;
}