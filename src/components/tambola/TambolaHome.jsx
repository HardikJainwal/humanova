"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Ticket, Monitor, Smartphone, ArrowRight, Users, Shield, Clock, Calendar } from "lucide-react";

function EventCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-07-30T16:00:00+05:30").getTime();

    function update() {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-3xl border border-white/20 bg-black/25 backdrop-blur-md p-6 max-w-xl mx-auto my-7 text-white shadow-2xl">
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-ping" />
        <span className="text-xs font-black uppercase tracking-[3px] text-[#D4F04A] flex items-center gap-1.5">
          <Clock size={14} /> Roundtable Live Event Starts In:
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2.5 sm:gap-3 text-center">
        {[
          { label: "Days", val: String(timeLeft.days).padStart(2, "0") },
          { label: "Hours", val: String(timeLeft.hours).padStart(2, "0") },
          { label: "Mins", val: String(timeLeft.minutes).padStart(2, "0") },
          { label: "Secs", val: String(timeLeft.seconds).padStart(2, "0") },
        ].map(({ label, val }) => (
          <div key={label} className="rounded-2xl bg-white/10 border border-white/10 p-2.5 sm:p-3.5">
            <div className="text-2xl sm:text-4xl font-black text-[#D4F04A] font-mono leading-none">
              {val}
            </div>
            <div className="text-[10px] sm:text-xs font-bold text-[#7FC7AE] uppercase tracking-wider mt-1.5">
              {label}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-[#eef2ff]/80 mt-4 font-semibold">
        <Calendar size={14} className="text-[#D4F04A]" />
        <span>30 July 2026 @ 4:00 PM IST · Live Session</span>
      </div>
    </div>
  );
}

const steps = [
  {
    icon: Monitor,
    title: "Host opens console",
    desc: "Open /tambola?admin=1, enter the event PIN to unlock the host console.",
  },
  {
    icon: Users,
    title: "Generate participant links",
    desc: "Paste participant names in the console. Each person gets a unique, private ticket link.",
  },
  {
    icon: Smartphone,
    title: "Participants open their link",
    desc: "Each participant opens their link on mobile. Tap any cell to mark it when the signal is called.",
  },
  {
    icon: Zap,
    title: "Host calls signals live",
    desc: "Use the Call Next Signal button. Screen-share the console on Zoom so everyone can see the number.",
  },
  {
    icon: Ticket,
    title: "Claim in Zoom chat",
    desc: 'Winners type: TAMBOLA [Pattern] Ticket [Number]. Host verifies in the console instantly.',
  },
];

export default function TambolaHome() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* ── Hero ──────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#07312C 0%,#061033 55%,#2C8C91 100%)" }}
      >
        {/* decorative blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle,#D4F04A 0%,transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle,#2C8C91 0%,transparent 70%)" }}
        />

        <div className="relative max-w-5xl mx-auto px-6 pt-28 sm:pt-32 pb-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[5px] text-[#7FC7AE] mb-4"
          >
            CHRO Workforce Signals Roundtable 2026 · 30 July
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase leading-[1.08] mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            CHRO{" "}
            <span
              className="italic font-normal text-[#D4F04A] normal-case px-1"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              workforce
            </span><br />
            Signals Roundtable
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#eef2ff] text-lg max-w-xl mx-auto mb-4"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Let's make every number a workforce signal. Play along live during the roundtable.
          </motion.p>

          <EventCountdown />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/tambola?ticket=1&name=Sample+Participant"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4F04A]
                text-[#07312C] font-black px-7 py-4 text-sm hover:bg-[#c8e83f] transition-colors
                shadow-lg shadow-[#D4F04A]/20"
            >
              <Ticket size={18} /> Open Sample Ticket
            </Link>
            <Link
              href="/tambola?admin=1"
              className="inline-flex items-center justify-center gap-2 rounded-2xl
                border-2 border-white/25 text-white font-bold px-7 py-4 text-sm
                hover:border-white/50 hover:bg-white/10 transition-all"
            >
              <Shield size={18} /> Host Console
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2C8C91]/25 bg-[#2C8C91]/10 px-4 py-1.5 text-xs font-bold text-[#2C8C91] uppercase tracking-wider mb-3">
            How it works
          </span>
          <h2
            className="text-3xl sm:text-4xl font-black text-[#1F2937]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Five simple steps
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="rounded-2xl border border-[#E5DED6] bg-white p-6 hover:border-[#2C8C91]/30 hover:shadow-lg hover:shadow-[#2C8C91]/5 transition-all"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "linear-gradient(135deg,#07312C,#2C8C91)" }}>
                <step.icon size={20} className="text-[#D4F04A]" />
              </div>
              <div className="text-xs font-black text-[#2C8C91] uppercase tracking-wider mb-2">
                Step {i + 1}
              </div>
              <h3 className="font-black text-[#1F2937] mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                {step.title}
              </h3>
              <p className="text-sm text-[#5F6B73] leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Winning patterns ─────────────────────────── */}
      <section className="bg-white border-t border-[#E5DED6] py-14">
        <div className="max-w-5xl mx-auto px-6">
          <h2
            className="text-2xl font-black text-[#1F2937] mb-6 text-center"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Winning Patterns
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: "Top Row", desc: "Row 1" },
              { label: "Middle Row", desc: "Row 3" },
              { label: "Bottom Row", desc: "Row 5" },
              { label: "Left Column", desc: "Col 1" },
              { label: "Diagonal", desc: "↘ corner to corner" },
              { label: "Full House", desc: "All 25 signals" },
            ].map((p) => (
              <div
                key={p.label}
                className="rounded-xl border border-[#E5DED6] bg-[#FAF7F2] p-4 text-center"
              >
                <p className="font-black text-sm text-[#07312C]" style={{ fontFamily: "var(--font-outfit)" }}>
                  {p.label}
                </p>
                <p className="text-xs text-[#5F6B73] mt-1">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────── */}
      <div className="text-center py-8 text-xs text-[#5F6B73]">
        Powered by{" "}
        <Link href="/" className="font-bold text-[#2C8C91] hover:underline">
          Humanova
        </Link>{" "}
        · CHRO Workforce Signals Roundtable 2026
      </div>
    </div>
  );
}
