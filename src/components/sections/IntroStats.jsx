"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const stats = [
  { value: 40, suffix: "+", label: "Teams onboarded" },
  { value: 1200, suffix: "+", label: "Employees supported" },
  { value: 98, suffix: "%", label: "Check-in satisfaction" },
];

export default function IntroStats() {
  return (
    <section
      className="w-full py-20 md:py-24 relative overflow-hidden"
      style={{ backgroundColor: "#0A2E3B" }}
    >
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
          {/* headline */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="absolute -top-5 right-8 md:right-24 text-[#2C8C91]"
              aria-hidden="true"
            >
              {/* <SparkleBurst /> */}
            </motion.div>

          <h2 className="relative text-white text-4xl font-semibold">
  A new standard for

  <span className="relative inline-block">
    workplace

    <span className="absolute -top-5 -right-8">
      <SparkleBurst />
    </span>
  </span>

  <br />

  wellbeing,
  <br />

  built from day one.
</h2>
          </div>

          {/* right: description + stats */}
          <div className="flex flex-col gap-10">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-[#A8B4B8] text-base leading-relaxed max-w-[480px]"
            >
              When your team joins Humanova, our goal is to give every
              employee a personalized wellbeing path built around their needs.
              Every counselor on our platform is licensed and trained to
              support challenges like burnout, anxiety, and stress.
            </motion.p>

            <div className="grid grid-cols-3 gap-6">
              {stats.map((s, i) => (
                <StatItem key={i} {...s} delay={i * 0.15} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute -right-32 -bottom-32 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(44,140,145,0.15) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}

function SparkleBurst() {
  return (
    <motion.svg
      width="40"
      height="28"
      viewBox="0 0 40 28"
      fill="none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {[
        "M5 24 C8 20 10 16 13 10",
        "M19 16 C21 11 22 7 24 2",
        "M28 18 C31 14 34 11 37 8",
      ].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="#F6D365"
          strokeWidth="3"
          strokeLinecap="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: { pathLength: 1, opacity: 1 },
          }}
          transition={{
            duration: 0.5,
            delay: i * 0.12,
            ease: "easeOut",
          }}
        />
      ))}
    </motion.svg>
  );
}


function StatItem({ value, suffix, label, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return () => controls.stop();
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <p
        className="text-[#4FBFC4] text-2xl md:text-3xl font-bold"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        {display.toLocaleString()}
        {suffix}
      </p>
      <p className="text-[#7A8B90] text-xs md:text-sm mt-2 leading-snug max-w-[110px]">
        {label}
      </p>
    </motion.div>
  );
}