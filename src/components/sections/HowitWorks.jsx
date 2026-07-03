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
    img: "https://res.cloudinary.com/dii2omqrm/image/upload/v1782286349/Online_Therapy_Platform_India_A_Complete_Guide_to_Better_Mental_Wellness_socz7w.webp",
  },
  {
    id: 2,
    title: "We Analyze the Data",
    desc: "Our platform aggregates responses into team-level insights while keeping individuals anonymous.",
    icon: "chart",
    img: "https://res.cloudinary.com/dii2omqrm/image/upload/v1782381001/How_to_Reduce_Healthcare_Costs_Through_Preventive_Wellness_An_Indian_CFO_s_Guide_Devdoot_fqbmdp.webp",
  },
  {
    id: 3,
    title: "You Get Actionable Reports",
    desc: "HR leaders receive clear, prioritized recommendations delivered straight to their dashboard.",
    icon: "shield",
    img: "https://res.cloudinary.com/dii2omqrm/image/upload/v1781848755/events/anonymous/0dceab1c-90f0-43ea-932a-ee3489d02be1.png",
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
      style={{ height: `${steps.length * 100}vh`, backgroundColor: "#FAF7F2" }}
      className="relative w-full"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 w-full">
          <div className="text-center mb-14">
            <p className="text-[#2C8C91] text-sm font-semibold uppercase tracking-[3px] mb-3">
              Simple Steps
            </p>
            <h2
              className="text-[#1F2937] text-4xl md:text-5xl font-semibold"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              How It Works
            </h2>
            <p className="text-[#5F6B73] text-lg mt-3">
              No confusion or delays. Just clear, actionable insight.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* left image w/ rotating ring decoration */}
            <div className="relative">
              {/* slow-spinning dashed ring behind image */}
              {/* <motion.svg
                className="absolute -inset-6 md:-inset-10 pointer-events-none"
                viewBox="0 0 100 100"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="#2C8C91"
                  strokeWidth="0.5"
                  strokeDasharray="1 4"
                  opacity="0.4"
                />
              </motion.svg>
              <motion.svg
                className="absolute -inset-3 md:-inset-5 pointer-events-none"
                viewBox="0 0 100 100"
                animate={{ rotate: -360 }}
                transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="#D4A24E"
                  strokeWidth="0.4"
                  strokeDasharray="0.5 6"
                  opacity="0.3"
                />
              </motion.svg> */}

              <div className="relative w-full h-[380px] md:h-[440px] rounded-3xl overflow-hidden shadow-lg">
                <div className="absolute inset-0">
                  {steps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      className="absolute inset-0"
                      initial={false}
                      animate={{
                        opacity: active === index ? 1 : 0,
                        scale: active === index ? 1 : 1.05,
                      }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        src={step.img}
                        alt={step.title}
                        fill
                        priority={index === 0}
                        unoptimized
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* step counter badge, floating on image */}
                <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-md">
                  <span className="text-[#0A3D62] font-semibold text-sm">
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[#9CA6AC] text-sm">/</span>
                  <span className="text-[#9CA6AC] text-sm">
                    {String(steps.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>

            {/* right steps */}
            <div className="flex flex-col gap-10">
              {steps.map((step, i) => {
                const isActive = active === i;
                const isDone = i < active;
                const fill = isDone ? 1 : isActive ? stepProgress : 0;

                return (
                  <motion.div
                    key={step.id}
                    animate={{
                      opacity: isActive ? 1 : 0.4,
                      x: isActive ? 6 : 0,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex gap-5 items-start"
                  >
                    {/* circular progress ring around icon — the "spiral" effect */}
                    <div className="relative w-14 h-14 shrink-0">
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
                        className="absolute inset-[6px] rounded-full flex items-center justify-center transition-colors duration-500"
                        style={{ backgroundColor: isActive ? "#2C8C91" : "#F1EEE7" }}
                      >
                        <StepIcon type={step.icon} isActive={isActive} />
                      </div>
                    </div>

                    <div className="pt-2">
                      <h3
                        className="text-xl font-semibold mb-2 transition-colors duration-500"
                        style={{ color: isActive ? "#1F2937" : "#9CA6AC" }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed transition-colors duration-500"
                        style={{ color: isActive ? "#5F6B73" : "#B7BFC4" }}
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