"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  SIGNALS, PATTERNS, ADMIN_PIN,
  getGame, saveGame, verifyClaim,
} from "./tambola.utils";
import {
  Zap, RotateCcw, Trash2, Copy, Check,
  Link2, ShieldCheck, Users, Monitor,
  Settings, CheckCircle2, XCircle, Sparkles,
  TrendingUp, Heart, ArrowUpRight, BarChart3,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   PIN GATE
══════════════════════════════════════════════════════════════ */
function PinGate({ onUnlock }) {
  const [pin, setPin]   = useState("");
  const [err, setErr]   = useState(false);
  const [shake, setShake] = useState(false);

  function attempt() {
    if (pin.trim() === ADMIN_PIN) {
      sessionStorage.setItem("tambola_admin_auth", "1");
      onUnlock();
    } else {
      setErr(true); setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setErr(false), 2000);
      setPin("");
    }
  }

  return (
    <div className="min-h-screen bg-[#07312C] flex items-center justify-center px-4">
      <motion.div
        animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Image
              src="https://res.cloudinary.com/dii2omqrm/image/upload/v1768221271/Vasu_-_Humanova_Logo_500_x_100_px_1_op9ppj.png"
              alt="Humanova Logo"
              width={220}
              height={50}
              className="h-12 w-auto object-contain brightness-0 invert"
              priority
            />
          </div>
          <h1 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "var(--font-outfit)" }}>
            Host Console
          </h1>
          <p className="text-[#7FC7AE] text-xs">CHRO Roundtable 2026 · 30 July</p>
          <p className="text-white/40 text-xs mt-1">Enter event PIN to unlock</p>
        </div>

        <input
          type="password"
          placeholder="••••••••••••"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && attempt()}
          className={`w-full rounded-2xl px-5 py-4 text-center text-xl font-black tracking-[8px]
            bg-white/5 border-2 text-white placeholder:text-white/20 outline-none mb-3
            transition-colors ${err ? "border-red-400" : "border-white/10 focus:border-[#D4F04A]"}`}
          autoFocus
        />
        <AnimatePresence>
          {err && (
            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              className="text-red-400 text-sm text-center font-semibold mb-3">
              Incorrect PIN
            </motion.p>
          )}
        </AnimatePresence>
        <button
          onClick={attempt}
          className="w-full rounded-2xl bg-[#D4F04A] text-[#07312C] font-black py-4 text-base
            hover:bg-[#c8e83f] transition-colors shadow-lg shadow-[#D4F04A]/20"
        >
          Unlock Console
        </button>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   NUMBER DISPLAY (Cinematic, Super Big Stage for Screen Share)
══════════════════════════════════════════════════════════════ */
function NumberDisplay({ signal, remaining }) {
  return (
    <AnimatePresence mode="wait">
      {signal ? (
        <motion.div
          key={signal[0]}
          initial={{ scale: 0.5, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 1.1, opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="flex flex-col items-center justify-center py-12 px-6 text-center relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(212,240,74,0.15)_0%,transparent_70%)]" />

          {/* <div className="inline-flex items-center gap-2 rounded-full bg-[#D4F04A]/10 border border-[#D4F04A]/20 px-4 py-1 text-xs font-bold text-[#D4F04A] uppercase tracking-widest mb-4">
            <Sparkles size={13} /> Signal #{signal[0]}
          </div> */}

          <div
            className="text-[130px] sm:text-[180px] lg:text-[220px] font-black leading-none tracking-tight select-none"
            style={{
              color: "#D4F04A",
              fontFamily: "var(--font-outfit)",
              lineHeight: 0.9,
              // textShadow: "0 10px 40px rgba(212,240,74,0.35)",
            }}
          >
            {signal[0]}
          </div>

          <div className="text-white text-3xl sm:text-4xl lg:text-5xl font-black mt-6 max-w-2xl leading-tight drop-shadow-md" style={{ fontFamily: "var(--font-outfit)" }}>
            {signal[1]}
          </div>

          <div className="text-[#7FC7AE] text-sm sm:text-base mt-5 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4F04A] animate-pulse" />
            {remaining} signals remaining in pool
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="idle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center px-6"
        >
          <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-5">
            <Zap size={40} className="text-[#D4F04A]" />
          </div>
          <h2 className="text-white text-3xl font-black mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
            Ready to Begin Roundtable Tambola
          </h2>
          <p className="text-[#7FC7AE] text-base max-w-md">
            Click <strong>Call Next Signal</strong> to draw the first workforce signal.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════════════════
   CHRO MARKETING & ADVERTISING SPOTLIGHT CARD
   (Visible to all CHROs during Zoom screen share)
══════════════════════════════════════════════════════════════ */
function ChroMarketingCard() {
  return (
    <div
      className="rounded-3xl border border-[#2C8C91]/30 p-6 relative overflow-hidden text-white shadow-xl"
      style={{ background: "linear-gradient(135deg, #07312C 0%, #0c433c 50%, #07312C 100%)" }}
    >
      {/* Decorative ambient glow */}
      <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-20 bg-[radial-gradient(circle,#D4F04A_0%,transparent_70%)]" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4F04A] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#07312C]">
            <Sparkles size={12} /> Executive Spotlight
          </span>
          {/* <span className="text-[11px] font-bold text-[#7FC7AE] uppercase tracking-wider">
            Enterprise Mental Wellness
          </span> */}
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-black text-white leading-snug" style={{ fontFamily: "var(--font-outfit)" }}>
            Transform Workplace Wellbeing with <span className="text-[#D4F04A]">Humanova</span>
          </h3>
          <p className="text-[#eef2ff]/80 text-xs sm:text-sm mt-1.5 leading-relaxed">
            Real-time workforce intelligence, proactive burnout prevention, and 24/7 evidence-based mental health support for enterprise teams.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="rounded-xl bg-white/10 border border-white/10 p-3">
            <div className="flex items-center gap-1.5 text-[#D4F04A] font-black text-sm">
              <TrendingUp size={15} /> 85%+
            </div>
            <p className="text-[11px] text-white/80 font-medium mt-0.5">Average Program Engagement</p>
          </div>
          <div className="rounded-xl bg-white/10 border border-white/10 p-3">
            <div className="flex items-center gap-1.5 text-[#D4F04A] font-black text-sm">
              <BarChart3 size={15} /> Real-Time
            </div>
            <p className="text-[11px] text-white/80 font-medium mt-0.5">CHRO Intelligence Signals</p>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <Heart size={16} className="text-[#D4F04A]" />
            <span className="text-xs font-bold text-white">Trusted by 100+ Enterprise Leaders</span>
          </div>
          <a
            href="https://api.humanova.live"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 px-4 py-2 text-xs font-bold text-white transition-all w-full sm:w-auto justify-center"
          >
            Explore Platform <ArrowUpRight size={14} className="text-[#D4F04A]" />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   LIVE GAME TAB — Screen Share View
══════════════════════════════════════════════════════════════ */
function LiveGameTab({ game, callNext, reset, clearSaved }) {
  const [ticketNo, setTicketNo]   = useState("");
  const [patternId, setPatternId] = useState("top");
  const [result, setResult]       = useState(null);
  const [flash, setFlash]         = useState(false);

  const handleCall = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 700);
    callNext();
  };

  function verify() {
    const n = parseInt(ticketNo, 10);
    if (!n || n < 1) { setResult({ err: true }); return; }
    const calledSet = new Set(game.called);
    const { valid, missing } = verifyClaim(n, patternId, calledSet);
    setResult({ valid, missing, n, patternLabel: PATTERNS.find(p => p.id === patternId)?.label });
  }

  const lastSignal = game.called.length
    ? SIGNALS.find((s) => s[0] === game.called[game.called.length - 1])
    : null;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6">

      {/* ── Left: Number caller Stage ── */}
      <div className="space-y-5">

        {/* Big number display card */}
        <motion.div
          animate={flash
            ? { boxShadow: "0 0 0 5px #D4F04A, 0 0 60px 10px rgba(212,240,74,0.3)" }
            : { boxShadow: "0 10px 30px -10px rgba(7,49,44,0.3)" }
          }
          transition={{ duration: 0.35 }}
          className="rounded-3xl overflow-hidden border border-[#2C8C91]/30 shadow-2xl"
          style={{ background: "linear-gradient(150deg,#07312C 0%,#0e453e 50%,#07312C 100%)" }}
        >
          <NumberDisplay signal={lastSignal} remaining={game.remaining.length} />

          {/* Host Control Actions */}
          <div className="flex gap-3 p-5 border-t border-white/10 bg-black/20">
            <button
              onClick={handleCall}
              disabled={game.remaining.length === 0}
              className="flex-1 flex items-center justify-center gap-2.5 rounded-2xl bg-[#D4F04A]
                text-[#07312C] font-black py-4 text-base hover:bg-[#c8e83f] transition-all
                disabled:opacity-40 disabled:cursor-not-allowed
                shadow-lg shadow-[#D4F04A]/20 active:scale-95 cursor-pointer"
            >
              <Zap size={20} /> Call Next Signal
            </button>
            <button
              title="Reset game"
              onClick={reset}
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/20
                text-white/80 font-bold py-4 px-5 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            >
              <RotateCcw size={18} />
            </button>
            <button
              title="Clear saved data"
              onClick={clearSaved}
              className="flex items-center justify-center gap-2 rounded-2xl border border-red-400/30
                text-red-400/80 font-bold py-4 px-5 hover:bg-red-400/10 hover:text-red-400 transition-all cursor-pointer"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </motion.div>

        {/* Called signals chips */}
        {game.called.length > 0 && (
          <div className="rounded-3xl border border-[#E5DED6] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-black uppercase tracking-wider text-[#07312C]"
                style={{ fontFamily: "var(--font-outfit)" }}>
                Called Signals History
              </h2>
              <span className="rounded-full bg-[#07312C] text-[#D4F04A] text-xs font-black px-3.5 py-1">
                {game.called.length} / 25
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {game.called.map((n) => {
                const s = SIGNALS.find((x) => x[0] === n);
                const isLast = n === game.called[game.called.length - 1];
                return (
                  <span key={n}
                    className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold
                      transition-all ${isLast
                        ? "bg-[#D4F04A] text-[#07312C] scale-105 shadow-md ring-2 ring-[#07312C]"
                        : "bg-[#eaf8f4] border border-[#7FC7AE] text-[#07312C]"
                      }`}
                  >
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black
                      ${isLast ? "bg-[#07312C] text-[#D4F04A]" : "bg-[#07312C] text-white"}`}>
                      {n}
                    </span>
                    {s?.[1]}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Right Column: Claim Verifier & Marketing Spotlight ── */}
      <div className="space-y-5">
        {/* Claim Verifier */}
        <div className="rounded-3xl border border-[#E5DED6] bg-white p-6 shadow-sm space-y-4">
          <div>
            <h2 className="font-black text-[#07312C] text-lg mb-1" style={{ fontFamily: "var(--font-outfit)" }}>
              Verify Winner Claim
            </h2>
            <p className="text-xs text-[#5F6B73]">
              Verify winner claims in real-time.
            </p>
            <div className="mt-2.5 rounded-xl bg-[#07312C]/5 border border-[#07312C]/10 px-3.5 py-2">
              <p className="text-[10px] font-bold text-[#07312C] uppercase tracking-wider">Zoom Chat Claim Format</p>
              <p className="text-xs text-[#07312C] font-mono font-bold mt-0.5">TAMBOLA [Pattern] Ticket [Number]</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#5F6B73] block mb-1.5">
                Ticket Number
              </label>
              <input
                type="number" min="1" max="500" placeholder="e.g. 7"
                value={ticketNo}
                onChange={(e) => { setTicketNo(e.target.value); setResult(null); }}
                className="w-full border border-[#E5DED6] rounded-xl px-4 py-3 text-sm text-[#1F2937]
                  focus:outline-none focus:border-[#2C8C91] focus:ring-2 focus:ring-[#2C8C91]/15 font-semibold"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#5F6B73] block mb-1.5">
                Pattern Claimed
              </label>
              <select
                value={patternId}
                onChange={(e) => { setPatternId(e.target.value); setResult(null); }}
                className="w-full border border-[#E5DED6] rounded-xl px-4 py-3 text-sm text-[#1F2937]
                  focus:outline-none focus:border-[#2C8C91] bg-white font-semibold"
              >
                {PATTERNS.map((p) => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={verify}
            className="w-full rounded-xl bg-[#07312C] text-white font-bold text-sm py-3.5
              hover:bg-[#0a3d35] transition-colors active:scale-95 cursor-pointer shadow-md"
          >
            Verify Claim
          </button>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                className={`rounded-xl p-4 text-sm font-semibold flex items-start gap-3 ${
                  result.err
                    ? "bg-amber-50 border border-amber-200 text-amber-700"
                    : result.valid
                      ? "bg-[#eaf8f4] border-2 border-[#2C8C91] text-[#07312C]"
                      : "bg-red-50 border border-red-200 text-red-700"
                }`}
              >
                {!result.err && (
                  result.valid
                    ? <CheckCircle2 size={20} className="text-[#2C8C91] flex-shrink-0 mt-0.5" />
                    : <XCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  {result.err && "Enter a valid ticket number first."}
                  {result.valid && !result.err && (
                    <>
                      <p className="font-black text-[#07312C]">✅ VALID CLAIM!</p>
                      <p className="font-normal mt-0.5 text-xs text-[#07312C]">
                        Ticket {String(result.n).padStart(2, "0")} completed <strong>{result.patternLabel}</strong>.
                      </p>
                    </>
                  )}
                  {!result.valid && !result.err && (
                    <>
                      <p className="font-black text-red-700">❌ Not valid yet</p>
                      <p className="font-normal mt-0.5 text-xs text-red-600">
                        Missing: {result.missing.map(m => `${m[0]}. ${m[1]}`).join(" · ")}
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Marketing Spotlight Card for CHRO Audience */}
        <ChroMarketingCard />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SETUP TAB — Pre-event setup (Hidden from screen share)
══════════════════════════════════════════════════════════════ */
function SetupTab() {
  const [names, setNames]     = useState("");
  const [links, setLinks]     = useState([]);
  const [copied, setCopied]   = useState(null);
  const [allCopied, setAllCopied] = useState(false);

  function generate() {
    const base = `${window.location.origin}/tambola`;
    const list = names.split("\n").map((n) => n.trim()).filter(Boolean);
    setLinks(list.map((name, i) => ({
      name,
      url: `${base}?ticket=${i + 1}&name=${encodeURIComponent(name)}`,
    })));
  }

  async function copyOne(idx, url) {
    await navigator.clipboard.writeText(url);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  }

  async function copyAll() {
    const text = links.map((l) => `${l.name}: ${l.url}`).join("\n");
    await navigator.clipboard.writeText(text);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2500);
  }

  return (
    <div className="max-w-2xl space-y-5">
      <div className="rounded-3xl border border-[#E5DED6] bg-white p-6 space-y-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#07312C,#2C8C91)" }}>
            <Users size={18} className="text-[#D4F04A]" />
          </div>
          <div>
            <h2 className="font-black text-[#07312C] text-base" style={{ fontFamily: "var(--font-outfit)" }}>
              Generate Participant Links
            </h2>
            <p className="text-xs text-[#5F6B73]">Send before the event. Do this tab before going live.</p>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[#5F6B73] block mb-2">
            Participant names — one per line
          </label>
          <textarea
            rows={8}
            value={names}
            onChange={(e) => setNames(e.target.value)}
            placeholder={"Anita Sharma\nRahul Mehta\nPriya Nair\nVikram Bose"}
            className="w-full border border-[#E5DED6] rounded-xl px-4 py-3 text-sm text-[#1F2937]
              placeholder:text-[#5F6B73]/40 focus:outline-none focus:border-[#2C8C91]
              focus:ring-2 focus:ring-[#2C8C91]/15 resize-none font-mono"
          />
          <p className="text-xs text-[#5F6B73] mt-1.5">
            {names.split("\n").filter(n => n.trim()).length} participants entered
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={generate}
            disabled={!names.trim()}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#07312C] text-white
              font-bold text-sm py-3.5 hover:bg-[#0a3d35] transition-colors disabled:opacity-40 cursor-pointer"
          >
            <Link2 size={15} /> Generate Links
          </button>
          {links.length > 0 && (
            <button
              onClick={copyAll}
              className="flex items-center gap-2 rounded-xl border border-[#E5DED6] bg-white
                text-[#5F6B73] font-bold text-sm py-3.5 px-5
                hover:border-[#2C8C91] hover:text-[#2C8C91] transition-all cursor-pointer"
            >
              {allCopied ? <Check size={15} className="text-[#2C8C91]" /> : <Copy size={15} />}
              {allCopied ? "All copied!" : "Copy All"}
            </button>
          )}
        </div>

        {/* Generated links */}
        {links.length > 0 && (
          <div className="space-y-2 max-h-72 overflow-y-auto rounded-xl">
            <p className="text-xs font-bold uppercase tracking-wider text-[#5F6B73] px-1">
              {links.length} links generated — paste into WhatsApp/email
            </p>
            {links.map((l, i) => (
              <div key={i}
                className="flex items-center gap-3 rounded-xl border border-[#E5DED6] bg-[#FAF7F2] px-4 py-3">
                <div className="w-7 h-7 rounded-full bg-[#07312C] text-[#D4F04A] flex items-center justify-center
                  text-[11px] font-black flex-shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#1F2937] truncate">{l.name}</p>
                  <p className="text-[10px] text-[#5F6B73] font-mono truncate mt-0.5">{l.url}</p>
                </div>
                <button
                  onClick={() => copyOne(i, l.url)}
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                    border border-[#E5DED6] hover:border-[#2C8C91] hover:text-[#2C8C91]
                    transition-all text-[#5F6B73] cursor-pointer"
                >
                  {copied === i
                    ? <Check size={14} className="text-[#2C8C91]" />
                    : <Copy size={14} />
                  }
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-xs font-black uppercase tracking-wider text-amber-700 mb-2">
          ⚠️ Pre-event checklist
        </p>
        <ol className="text-sm text-amber-800 space-y-1.5 list-decimal list-inside">
          <li>Generate all participant links here (Setup tab)</li>
          <li>Copy all links and send via WhatsApp group or email</li>
          <li>Ask participants to open their link before the session</li>
          <li><strong>Switch to Live Game tab before screen-sharing on Zoom</strong></li>
          <li>Share only the Live Game tab — participants names stay private</li>
        </ol>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN ADMIN CONSOLE
══════════════════════════════════════════════════════════════ */
export default function TambolaAdmin() {
  const [authed, setAuthed] = useState(false);
  const [game, setGame]     = useState(null);
  const [tab, setTab]       = useState("live"); // "live" | "setup"

  useEffect(() => {
    if (sessionStorage.getItem("tambola_admin_auth") === "1") setAuthed(true);
  }, []);

  useEffect(() => {
    if (authed) setGame(getGame());
  }, [authed]);

  const callNext = useCallback(() => {
    setGame((prev) => {
      if (!prev || prev.remaining.length === 0) return prev;
      const idx = Math.floor(Math.random() * prev.remaining.length);
      const next = {
        called: [...prev.called, prev.remaining[idx]],
        remaining: prev.remaining.filter((_, i) => i !== idx),
      };
      saveGame(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    const fresh = { called: [], remaining: SIGNALS.map((s) => s[0]) };
    saveGame(fresh); setGame(fresh);
  }, []);

  const clearSaved = useCallback(() => {
    localStorage.removeItem("humanova_tambola_game_v2");
    const fresh = { called: [], remaining: SIGNALS.map((s) => s[0]) };
    setGame(fresh);
  }, []);

  if (!authed) return <PinGate onUnlock={() => setAuthed(true)} />;
  if (!game)   return null;

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-24">
      {/* ── Top Bar Header with Official Humanova Logo ── */}
      <div className="sticky top-0 z-20 border-b border-[#E5DED6] bg-white/95 backdrop-blur-md px-6 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          {/* Official Humanova Logo */}
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center">
              <Image
                src="https://res.cloudinary.com/dii2omqrm/image/upload/v1768221271/Vasu_-_Humanova_Logo_500_x_100_px_1_op9ppj.png"
                alt="Humanova Logo"
                width={170}
                height={45}
                priority
                className="w-auto h-9 object-contain"
              />
            </a>
            <div className="h-6 w-px bg-[#E5DED6] hidden sm:block" />
            <div className="hidden sm:block">
              <p className="text-[#07312C] font-black text-xs uppercase tracking-wider leading-none" style={{ fontFamily: "var(--font-outfit)" }}>
                CHRO Roundtable 2026
              </p>
              <p className="text-[#5F6B73] text-[10px] mt-0.5">CHRO Signals Host Console</p>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex bg-[#07312C]/5 border border-[#07312C]/10 rounded-2xl p-1 gap-1">
            <button
              onClick={() => setTab("live")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                tab === "live"
                  ? "bg-[#07312C] text-[#D4F04A] shadow"
                  : "text-[#5F6B73] hover:text-[#07312C]"
              }`}
            >
              <Monitor size={15} />
              Live Game
              {tab === "live" && (
                <span className="ml-1 flex items-center gap-1 text-[10px] font-black bg-[#D4F04A]/20 text-[#D4F04A] rounded-full px-2 py-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4F04A] animate-pulse" />
                  SCREEN SHARE
                </span>
              )}
            </button>
            <button
              onClick={() => setTab("setup")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                tab === "setup"
                  ? "bg-[#07312C] text-white shadow"
                  : "text-[#5F6B73] hover:text-[#07312C]"
              }`}
            >
              <Settings size={15} />
              Setup
            </button>
          </div>

          {/* Progress / Signal Counter */}
          <div className="text-right">
            <p className="text-[#07312C] font-black text-xl leading-none" style={{ fontFamily: "var(--font-outfit)" }}>
              {game.called.length}<span className="text-[#5F6B73] text-sm"> / 25</span>
            </p>
            <p className="text-[#5F6B73] text-[10px] font-bold uppercase tracking-wider mt-0.5">signals called</p>
          </div>
        </div>
      </div>

      {/* ── Main Screen Share Content ── */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <AnimatePresence mode="wait">
          {tab === "live" ? (
            <motion.div key="live"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <LiveGameTab game={game} callNext={callNext} reset={reset} clearSaved={clearSaved} />
            </motion.div>
          ) : (
            <motion.div key="setup"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <SetupTab />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
