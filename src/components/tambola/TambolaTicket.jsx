"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { makeTicket, marksKey, FREE_SPACE, PATTERNS } from "./tambola.utils";
import { CheckCircle2, Printer, Trash2, Trophy, Sparkles, TrendingUp, BarChart3, ShieldCheck, ArrowUpRight, Heart, Building2, Home, Globe } from "lucide-react";
import { useDemoModal } from "@/context/DemoModalContext";

export default function TambolaTicket({ ticketNo, participantName }) {
  const [grid, setGrid]   = useState([]);
  const [marks, setMarks] = useState(new Set());
  const [wins, setWins]   = useState([]);
  const { open: openDemoModal } = useDemoModal();

  // Build grid once
  useEffect(() => {
    if (!ticketNo) return;
    setGrid(makeTicket(ticketNo));
    const saved = JSON.parse(localStorage.getItem(marksKey(ticketNo)) || "[]");
    setMarks(new Set(saved));
  }, [ticketNo]);

  // Check winning patterns whenever marks change
  useEffect(() => {
    if (!grid.length) return;
    const flat = grid.flat();
    const completed = PATTERNS.filter(({ cells }) =>
      cells.every(([r, c]) => {
        const n = grid[r][c][0];
        return n === 0 || marks.has(cellIndex(r, c));
      })
    );
    setWins(completed.map((p) => p.label));
  }, [marks, grid]);

  function cellIndex(r, c) { return r * 5 + c; }

  const toggleMark = useCallback((r, c, isFree) => {
    if (isFree) return;
    const idx = cellIndex(r, c);
    setMarks((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      localStorage.setItem(marksKey(ticketNo), JSON.stringify([...next]));
      return next;
    });
  }, [ticketNo]);

  const clearAll = () => {
    setMarks(new Set());
    localStorage.removeItem(marksKey(ticketNo));
  };

  const paddedId = String(ticketNo).padStart(2, "0");

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* ── Participant Page Top Header Bar ── */}
        <div className="flex items-center justify-between bg-white border border-[#E5DED6] rounded-2xl px-5 py-3 shadow-xs no-print">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="https://res.cloudinary.com/dii2omqrm/image/upload/v1768221271/Vasu_-_Humanova_Logo_500_x_100_px_1_op9ppj.png"
              alt="Humanova Logo"
              width={160}
              height={40}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#2C8C91]/10 hover:bg-[#2C8C91] text-[#2C8C91] hover:text-white border border-[#2C8C91]/20 px-4 py-2 text-xs font-bold transition-all"
          >
            <Home size={14} /> Visit Website <Globe size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-6 items-start">
          
          {/* ── LEFT COLUMN: Ticket & Game Controls ──────────────── */}
          <div className="space-y-4 max-w-2xl mx-auto lg:max-w-none w-full">
            {/* Ticket Header Card */}
            <div
              className="rounded-2xl overflow-hidden shadow-xl"
              style={{ background: "linear-gradient(135deg,#07312C 0%,#2C8C91 100%)" }}
            >
              <div className="px-5 py-5 text-center flex flex-col items-center">
                <div className="mb-3">
                  <Image
                    src="https://res.cloudinary.com/dii2omqrm/image/upload/v1768221271/Vasu_-_Humanova_Logo_500_x_100_px_1_op9ppj.png"
                    alt="Humanova Logo"
                    width={180}
                    height={45}
                    className="h-9 w-auto object-contain brightness-0 invert"
                  />
                </div>
                <p className="text-xs font-bold uppercase tracking-[4px] text-[#7FC7AE] mb-1">
                  CHRO Workforce Signals Roundtable 2026
                </p>
                <h1
                  className="text-2xl sm:text-3xl font-black text-[#D4F04A] tracking-[3px] uppercase"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  CHRO Signals Game
                </h1>
                <p className="text-[#eef2ff] text-xs mt-1">Tap a signal to mark it when the host calls it</p>
              </div>
              <div className="flex justify-between items-center bg-white/10 px-5 py-2.5 text-sm">
                <span className="text-white font-bold">{participantName}</span>
                <span className="text-[#D4F04A] font-black">Ticket #{paddedId}</span>
              </div>
            </div>

            {/* Win banner */}
            <AnimatePresence>
              {wins.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl p-4 flex items-center gap-3 shadow-md"
                  style={{ background: "linear-gradient(135deg,#0E8F7A,#07312C)" }}
                >
                  <Trophy size={28} className="text-[#D4F04A] flex-shrink-0 animate-bounce" />
                  <div>
                    <p className="text-white font-black text-sm">🎉 You completed: {wins.join(", ")}</p>
                    <p className="text-[#7FC7AE] text-xs mt-0.5">
                      Claim in chat: <strong className="text-white">TAMBOLA {wins[0]} Ticket {paddedId}</strong>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ticket Grid */}
            <div className="rounded-2xl overflow-hidden border-2 border-[#07312C] shadow-lg bg-white">
              <div className="grid grid-cols-5">
                {grid.flat().map((cell, i) => {
                  const r = Math.floor(i / 5);
                  const c = i % 5;
                  const isFree = cell[0] === 0;
                  const isMarked = isFree || marks.has(i);

                  return (
                    <motion.button
                      key={i}
                      whileTap={isFree ? {} : { scale: 0.92 }}
                      onClick={() => toggleMark(r, c, isFree)}
                      className={`
                        relative border-b border-r border-[#E5DED6] last:border-r-0
                        [&:nth-child(5n)]:border-r-0
                        flex flex-col items-center justify-center
                        text-center px-1 py-2 min-h-[90px] sm:min-h-[110px]
                        transition-all duration-200
                        ${isFree
                          ? "bg-gradient-to-br from-[#07312C] to-[#2C8C91] cursor-default"
                          : isMarked
                            ? "bg-[#eaf8f4] cursor-pointer"
                            : "bg-white hover:bg-[#FAF7F2] cursor-pointer active:bg-[#eaf8f4]"
                        }
                      `}
                      aria-label={cell[1]}
                      disabled={isFree}
                    >
                      {/* Number badge */}
                      <span
                        className={`
                          absolute top-1.5 left-1.5 w-6 h-6 rounded-full flex items-center justify-center
                          text-[10px] font-black leading-none
                          ${isFree ? "bg-[#D4F04A] text-[#07312C]" : "bg-[#07312C] text-white"}
                        `}
                      >
                        {isFree ? "★" : cell[0]}
                      </span>

                      {/* Signal text */}
                      <span
                        className={`
                          text-[11px] sm:text-xs font-bold leading-tight px-1 pt-3
                          ${isFree ? "text-white" : isMarked ? "text-[#07312C]" : "text-[#1F2937]"}
                        `}
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        {cell[1].split("\n").map((line, li) => (
                          <span key={li} className="block">{line}</span>
                        ))}
                      </span>

                      {/* Checkmark */}
                      {isMarked && !isFree && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-1 right-1"
                        >
                          <CheckCircle2 size={16} className="text-[#2C8C91]" strokeWidth={2.5} />
                        </motion.span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 no-print">
              <button
                onClick={() => window.print()}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-[#E5DED6] bg-white text-[#5F6B73] font-semibold text-sm py-3 hover:border-[#2C8C91] hover:text-[#2C8C91] transition-all cursor-pointer shadow-sm"
              >
                <Printer size={16} /> Print Ticket
              </button>
              <button
                onClick={clearAll}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#E5DED6] bg-white text-[#5F6B73] font-semibold text-sm py-3 px-4 hover:border-red-400 hover:text-red-500 transition-all cursor-pointer shadow-sm"
              >
                <Trash2 size={16} /> Clear
              </button>
            </div>

            {/* Winning patterns guide */}
            <div className="rounded-2xl border border-[#E5DED6] bg-white p-5 no-print shadow-sm">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#07312C] mb-3" style={{ fontFamily: "var(--font-outfit)" }}>
                Winning Patterns
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PATTERNS.map((p) => (
                  <div key={p.id} className="rounded-xl bg-[#FAF7F2] border border-[#E5DED6] px-3 py-2 text-xs">
                    <span className="font-bold text-[#1F2937]">{p.label}</span>
                    <span className="block text-[#5F6B73] mt-0.5 leading-tight">
                      {p.id === "top" && "Complete row 1"}
                      {p.id === "middle" && "Complete row 3"}
                      {p.id === "bottom" && "Complete row 5"}
                      {p.id === "left" && "Complete column 1"}
                      {p.id === "diagonal" && "Top-left → bottom-right"}
                      {p.id === "full" && "Complete the whole card"}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-[#5F6B73]">
                To claim: type in Zoom chat →{" "}
                <strong className="text-[#07312C]">TAMBOLA [Pattern] Ticket {paddedId}</strong>
              </p>
            </div>
          </div>

          {/* ── RIGHT COLUMN: High-Converting Enterprise Marketing Spotlight ── */}
          <div className="space-y-4 no-print">
            <div
              className="rounded-3xl border border-[#2C8C91]/30 p-6 sm:p-7 relative overflow-hidden text-white shadow-xl"
              style={{ background: "linear-gradient(145deg, #07312C 0%, #0e453e 50%, #07312C 100%)" }}
            >
              {/* Soft ambient glow */}
              <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-20 bg-[radial-gradient(circle,#D4F04A_0%,transparent_70%)]" />

              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4F04A] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#07312C]">
                    <Sparkles size={13} /> Enterprise Wellness
                  </span>
                  <span className="text-[11px] font-bold text-[#7FC7AE] uppercase tracking-wider">
                    CHRO Roundtable
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-white leading-snug" style={{ fontFamily: "var(--font-outfit)" }}>
                    Empower Your Workforce with <span className="text-[#D4F04A]">Humanova</span>
                  </h2>
                  <p className="text-[#eef2ff]/80 text-xs sm:text-sm mt-2 leading-relaxed">
                    Evidence-based mental health support, real-time psychological safety analytics, and proactive burnout prevention for enterprise teams.
                  </p>
                </div>

                {/* Key Value Cards */}
                <div className="space-y-2.5 pt-1">
                  <div className="rounded-2xl bg-white/10 border border-white/10 p-3.5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#D4F04A]/20 flex items-center justify-center flex-shrink-0 text-[#D4F04A]">
                      <TrendingUp size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-white">85%+ Enrollment & Engagement</p>
                      <p className="text-[11px] text-[#7FC7AE] mt-0.5">Highest employee activation rate in corporate wellness</p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/10 border border-white/10 p-3.5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#D4F04A]/20 flex items-center justify-center flex-shrink-0 text-[#D4F04A]">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-white">100% Confidential & Secure</p>
                      <p className="text-[11px] text-[#7FC7AE] mt-0.5">Proactive burnout protection & 24/7 care</p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/10 border border-white/10 p-3.5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#D4F04A]/20 flex items-center justify-center flex-shrink-0 text-[#D4F04A]">
                      <BarChart3 size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-white">Real-Time CHRO Analytics</p>
                      <p className="text-[11px] text-[#7FC7AE] mt-0.5">Actionable organizational wellbeing insights</p>
                    </div>
                  </div>
                </div>

                {/* Interactive Demo Request CTA */}
                <div className="pt-3 border-t border-white/10 space-y-3">
                  <button
                    onClick={openDemoModal}
                    className="w-full py-4 rounded-2xl bg-[#D4F04A] text-[#07312C] font-black text-sm hover:bg-[#c8e83f] transition-all shadow-lg shadow-[#D4F04A]/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    Request Demo for Your Company <ArrowUpRight size={17} />
                  </button>
                  <Link
                    href="/"
                    className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
                  >
                    <Home size={14} /> Go to Website Landing Page
                  </Link>
                </div>
              </div>
            </div>

            {/* Trust Quote Card */}
            <div className="rounded-2xl border border-[#E5DED6] bg-white p-5 shadow-sm space-y-2">
              <div className="flex items-center gap-1.5 text-amber-500 text-xs">
                {"★".repeat(5)}
              </div>
              <p className="text-xs text-[#1F2937] italic font-medium leading-relaxed">
                &ldquo;Humanova gives our executive leadership full visibility into workforce wellbeing before burnout happens.&rdquo;
              </p>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <Building2 size={14} className="text-[#2C8C91]" />
                  <span className="text-[11px] font-bold text-[#5F6B73]">CHRO, Global Enterprise</span>
                </div>
                <Link href="/" className="text-xs font-bold text-[#2C8C91] hover:underline flex items-center gap-1">
                  Visit Site →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
        }
      `}</style>
    </div>
  );
}
