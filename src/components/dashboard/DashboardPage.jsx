"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut, Clock, Smartphone, BookOpen, Users, ArrowRight,
  CalendarDays, BarChart3, HeadphonesIcon, Heart, Trophy,
  Flame, Star, Shield, Sun, Moon, CloudSun, Sparkles,
  ChevronRight, Activity, Scan, Award, TrendingUp,
  ClipboardList, CalendarClock, Brain, Zap, Menu, X, Bell,
} from "lucide-react";

/* ── Greeting helper ─────────────────────────────────────── */
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return { text: "Good morning", icon: <Sun size={20} className="text-[#E8A020]" /> };
  if (h < 17) return { text: "Good afternoon", icon: <CloudSun size={20} className="text-[#E8A020]" /> };
  return { text: "Good evening", icon: <Moon size={20} className="text-[#7C5CDB]" /> };
}

/* ── Quick action cards data ─────────────────────────────── */
const QUICK_ACTIONS = [
  {
    id: "checkin",
    icon: <Clock size={24} />,
    title: "Check In / Out",
    desc: "Mark your attendance for today",
    color: "#2C8C91",
    gradient: "from-[#2C8C91] to-[#0E3D39]",
    shadow: "rgba(44,140,145,0.35)",
    interactive: true,
  },
  {
    id: "mood",
    icon: <Scan size={24} />,
    title: "Mood Scanner",
    desc: "AI face scan — available on app",
    color: "#7C5CDB",
    gradient: "from-[#7C5CDB] to-[#4A2EA8]",
    shadow: "rgba(124,92,219,0.35)",
    appOnly: true,
  },
  {
    id: "resources",
    icon: <BookOpen size={24} />,
    title: "Resource Library",
    desc: "Articles, videos & wellness guides",
    color: "#E8A020",
    gradient: "from-[#E8A020] to-[#B87000]",
    shadow: "rgba(232,160,32,0.35)",
  },
  {
    id: "community",
    icon: <Users size={24} />,
    title: "Community",
    desc: "Connect with your team",
    color: "#E05FA0",
    gradient: "from-[#E05FA0] to-[#A0336E]",
    shadow: "rgba(224,95,160,0.35)",
  },
];

/* ── Feature cards data ──────────────────────────────────── */
const FEATURES = [
  { icon: <ClipboardList size={20} />, title: "Leave Management", desc: "Request, approve and track time off", color: "#2C8C91", active: true },
  { icon: <CalendarClock size={20} />, title: "Shift Schedule", desc: "View and swap your upcoming shifts", color: "#4A90D9", active: true },
  { icon: <BarChart3 size={20} />, title: "HR Analytics", desc: "Personal performance insights", color: "#7C5CDB", active: false },
  { icon: <Heart size={20} />, title: "Wellness Tracking", desc: "Daily mood and reflection journal", color: "#E05FA0", active: true },
  { icon: <HeadphonesIcon size={20} />, title: "Support Chat", desc: "Confidential 1-on-1 support", color: "#1AAF7E", active: true },
  { icon: <Trophy size={20} />, title: "Rewards & Badges", desc: "Earn points, unlock achievements", color: "#E8A020", active: true },
];

/* ── Main Component ──────────────────────────────────────── */
export default function DashboardPage() {
  const { user, token, loading, logout } = useAuth();
  const router = useRouter();
  const [checkedIn, setCheckedIn] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* Auth guard */
  useEffect(() => {
    if (!loading && !token) router.push("/login");
  }, [loading, token, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-[#2C8C91] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#5F6B73] text-sm">Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  if (!token) return null;

  const greeting = getGreeting();
  const firstName = user?.firstName ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1) : "there";
  const initials = user ? `${(user.firstName?.[0] ?? "").toUpperCase()}${(user.lastName?.[0] ?? "").toUpperCase()}` : "U";
  const photo = user?.photo;
  const streak = user?.consecutiveDaysStreak ?? 0;
  const points = user?.totalPoints ?? 0;
  const activeDays = user?.totalActiveDays ?? 0;
  const badges = user?.badges ?? [];
  const employeeCode = user?.employeeCode ?? "";

  const handleQuickAction = (action) => {
    if (action.appOnly) {
      setShowAppModal(true);
      return;
    }
    if (action.id === "checkin") {
      setCheckedIn((prev) => !prev);
    }
    /* resources / community — UI shells for now */
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">

      {/* ── TOP NAV BAR ──────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#E5DED6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center shrink-0">
            <Image
              src="https://res.cloudinary.com/dii2omqrm/image/upload/v1768221271/Vasu_-_Humanova_Logo_500_x_100_px_1_op9ppj.png"
              alt="Humanova"
              width={140}
              height={36}
              priority
              className="h-8 w-auto object-contain"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-3">
            {employeeCode && (
              <span className="text-xs font-medium text-[#8FA8A3] bg-[#F4F9F8] px-3 py-1.5 rounded-full border border-[#E3EEEC]">
                {employeeCode}
              </span>
            )}
            <button className="relative p-2 rounded-xl text-[#5F6B73] hover:text-[#1F2937] hover:bg-[#FAF7F2] transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E05FA0] rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-3 border-l border-[#E5DED6]">
              {photo ? (
                <Image src={photo} alt={firstName} width={34} height={34} className="rounded-full object-cover" />
              ) : (
                <div className="w-[34px] h-[34px] rounded-full bg-[#0E3D39] text-white grid place-items-center text-xs font-bold">
                  {initials}
                </div>
              )}
              <div className="hidden lg:block">
                <p className="text-[#1F2937] text-sm font-semibold leading-tight">{firstName}</p>
                <p className="text-[#8FA8A3] text-xs leading-tight">{user?.email ?? ""}</p>
              </div>
            </div>
            <button
              onClick={() => { logout(); router.push("/login"); }}
              className="flex items-center gap-1.5 text-[#8FA8A3] hover:text-[#E05FA0] text-xs font-medium px-3 py-2 rounded-xl hover:bg-[#FFF0F6] transition-all"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>

          {/* Mobile menu btn */}
          <button
            className="md:hidden p-2 text-[#5F6B73]"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-[#E5DED6]"
            >
              <div className="px-4 py-4 flex flex-col gap-3 bg-white">
                <div className="flex items-center gap-3">
                  {photo ? (
                    <Image src={photo} alt={firstName} width={40} height={40} className="rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#0E3D39] text-white grid place-items-center text-sm font-bold">
                      {initials}
                    </div>
                  )}
                  <div>
                    <p className="text-[#1F2937] text-sm font-semibold">{firstName}</p>
                    <p className="text-[#8FA8A3] text-xs">{employeeCode}</p>
                  </div>
                </div>
                <button
                  onClick={() => { logout(); router.push("/login"); }}
                  className="flex items-center gap-2 text-[#E05FA0] text-sm font-medium px-3 py-2.5 rounded-xl bg-[#FFF0F6]"
                >
                  <LogOut size={15} /> Sign out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-10">

        {/* ── WELCOME HERO ────────────────────────────────── */}
        <section className="mb-10">
          <div className="bg-[#07312C] rounded-[28px] p-8 lg:p-10 overflow-hidden relative">
            {/* Dot grid texture */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Left — greeting */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  {greeting.icon}
                  <span className="text-white/50 text-sm font-medium">{greeting.text}</span>
                </div>
                <h1
                  className="text-white text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.15] mb-3"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Welcome back, <span className="text-[#D4F04A]">{firstName}</span>
                </h1>
                <p className="text-white/50 text-sm max-w-md leading-relaxed">
                  Track your wellness, connect with your team, and access all your HR tools in one place.
                </p>
              </div>

              {/* Right — streak + points pills */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2.5 backdrop-blur-sm">
                  <Flame size={18} className="text-[#E8A020]" />
                  <div>
                    <p className="text-white text-lg font-extrabold leading-none" style={{ fontFamily: "var(--font-outfit)" }}>{streak}</p>
                    <p className="text-white/40 text-[10px] uppercase tracking-wider font-medium">Day streak</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2.5 backdrop-blur-sm">
                  <Star size={18} className="text-[#D4F04A]" />
                  <div>
                    <p className="text-white text-lg font-extrabold leading-none" style={{ fontFamily: "var(--font-outfit)" }}>{points}</p>
                    <p className="text-white/40 text-[10px] uppercase tracking-wider font-medium">Points</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2.5 backdrop-blur-sm">
                  <Activity size={18} className="text-[#8FD9C9]" />
                  <div>
                    <p className="text-white text-lg font-extrabold leading-none" style={{ fontFamily: "var(--font-outfit)" }}>{activeDays}</p>
                    <p className="text-white/40 text-[10px] uppercase tracking-wider font-medium">Active days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── QUICK ACTIONS ──────────────────────────────── */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <Zap size={15} className="text-[#D4F04A] fill-[#D4F04A]" />
            <h2 className="text-[#1F2937] text-xs font-bold uppercase tracking-[0.15em]">
              Quick Actions
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => handleQuickAction(action)}
                className="group relative bg-white rounded-[24px] border border-[#E5DED6] p-6 text-left hover:border-[#2C8C91]/30 hover:shadow-[0_8px_32px_-8px_rgba(44,140,145,0.12)] transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Gradient accent line top */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${action.gradient} text-white grid place-items-center mb-4`}
                  style={{ boxShadow: `0 8px 20px -6px ${action.shadow}` }}
                >
                  {action.icon}
                </div>

                <h3
                  className="text-[#1F2937] font-semibold text-base mb-1"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {action.title}
                </h3>
                <p className="text-[#8FA8A3] text-xs leading-relaxed">
                  {action.desc}
                </p>

                {/* Check-in status badge */}
                {action.id === "checkin" && (
                  <div className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                    checkedIn
                      ? "bg-[#EFFDF4] text-[#1AAF7E]"
                      : "bg-[#FFF0F6] text-[#E05FA0]"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${checkedIn ? "bg-[#1AAF7E]" : "bg-[#E05FA0]"}`} />
                    {checkedIn ? "Checked In" : "Not Checked In"}
                  </div>
                )}

                {/* App-only badge */}
                {action.appOnly && (
                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#F3EEFF] text-[#7C5CDB] px-3 py-1 text-xs font-semibold">
                    <Smartphone size={12} />
                    App Only
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* ── STATS ROW ──────────────────────────────────── */}
        <section className="mb-10">
          <div className="bg-white rounded-[24px] border border-[#E5DED6] p-6 lg:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-[#E5DED6]">
              {[
                { icon: <Star size={18} className="text-[#D4F04A]" />, value: points, label: "Total Points" },
                { icon: <Activity size={18} className="text-[#2C8C91]" />, value: activeDays, label: "Active Days" },
                { icon: <Flame size={18} className="text-[#E8A020]" />, value: `${streak} days`, label: "Current Streak" },
                { icon: <Award size={18} className="text-[#7C5CDB]" />, value: badges.length, label: "Badges Earned" },
              ].map(({ icon, value, label }) => (
                <div key={label} className="flex flex-col items-center text-center px-4 first:pl-0 last:pr-0">
                  <div className="mb-2">{icon}</div>
                  <span className="text-2xl font-extrabold text-[#0E3D39]" style={{ fontFamily: "var(--font-outfit)" }}>
                    {value}
                  </span>
                  <span className="mt-1 text-[10px] text-[#8FA8A3] uppercase tracking-wider font-medium">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURE CARDS ──────────────────────────────── */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={15} className="text-[#D4F04A] fill-[#D4F04A]" />
            <h2 className="text-[#1F2937] text-xs font-bold uppercase tracking-[0.15em]">
              Your Tools
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon, title, desc, color, active }) => (
              <div
                key={title}
                className="group bg-white rounded-[24px] border border-[#E5DED6] p-6 hover:border-[#2C8C91]/30 hover:shadow-[0_8px_32px_-8px_rgba(44,140,145,0.12)] transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-2xl grid place-items-center"
                    style={{
                      background: `${color}15`,
                      color: color,
                    }}
                  >
                    {icon}
                  </div>
                  {active ? (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1AAF7E] bg-[#EFFDF4] px-2.5 py-1 rounded-full">
                      Active
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8FA8A3] bg-[#F4F9F8] px-2.5 py-1 rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>

                <h3
                  className="text-[#1F2937] font-semibold text-base mb-1"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {title}
                </h3>
                <p className="text-[#8FA8A3] text-xs leading-relaxed mb-4">{desc}</p>

                <div className="flex items-center gap-1 text-[#2C8C91] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {active ? "Open" : "Learn More"}
                  <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── APP PROMO BANNER ────────────────────────────── */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-[#0E3D39] to-[#07312C] rounded-[28px] p-8 lg:p-10 overflow-hidden relative">
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-[#D4F04A]/15 rounded-full px-3 py-1 text-xs font-semibold text-[#D4F04A] mb-4">
                  <Smartphone size={13} />
                  Mobile App
                </div>
                <h3
                  className="text-white text-2xl lg:text-3xl leading-[1.2] mb-3"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Unlock AI-powered features on the{" "}
                  <span className="text-[#D4F04A]">Humanova app</span>
                </h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-lg">
                  Face scan mood detection, real-time wellness alerts, guided meditation, and smart notifications — all available exclusively on mobile.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 bg-white rounded-full px-5 py-2.5 text-sm font-semibold text-[#0E3D39] hover:shadow-[0_8px_24px_-6px_rgba(255,255,255,0.25)] transition-shadow"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                    App Store
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 010 1.732l-2.808 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.3 2.3-8.636-8.632z"/></svg>
                    Google Play
                  </a>
                </div>
              </div>

              {/* Decorative phone mockup placeholder */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="w-[180px] h-[320px] rounded-[32px] bg-white/5 border border-white/10 grid place-items-center backdrop-blur-sm">
                  <div className="text-center">
                    <Scan size={40} className="text-[#D4F04A] mx-auto mb-3" />
                    <p className="text-white/40 text-xs font-medium">Mood Scanner</p>
                    <p className="text-white/25 text-[10px] mt-1">AI-Powered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BADGES ─────────────────────────────────────── */}
        {badges.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-6">
              <Award size={15} className="text-[#D4F04A] fill-[#D4F04A]" />
              <h2 className="text-[#1F2937] text-xs font-bold uppercase tracking-[0.15em]">
                Your Badges
              </h2>
            </div>

            <div className="flex flex-wrap gap-4">
              {badges.map(({ badgeId, earnedAt }) => (
                <div
                  key={badgeId}
                  className="bg-white rounded-[20px] border border-[#E5DED6] px-5 py-4 flex items-center gap-3 hover:shadow-[0_4px_16px_-4px_rgba(44,140,145,0.1)] transition-shadow"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4F04A] to-[#A8C73A] grid place-items-center">
                    <Shield size={18} className="text-[#0E3D39]" />
                  </div>
                  <div>
                    <p className="text-[#1F2937] text-sm font-semibold">
                      {badgeId.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </p>
                    <p className="text-[#8FA8A3] text-xs">
                      Earned {new Date(earnedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* ── APP-ONLY FEATURE MODAL ────────────────────────── */}
      <AnimatePresence>
        {showAppModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowAppModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-[28px] p-8 max-w-sm w-full text-center shadow-[0_24px_60px_-12px_rgba(0,0,0,0.25)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7C5CDB] to-[#4A2EA8] grid place-items-center mx-auto mb-5">
                <Scan size={28} className="text-white" />
              </div>

              <h3
                className="text-[#0E3D39] text-2xl mb-2"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                App-Only Feature
              </h3>
              <p className="text-[#5F6B73] text-sm leading-relaxed mb-6">
                The AI Mood Scanner uses your device camera for face scan analysis. Download the Humanova app to access this feature.
              </p>

              <div className="flex flex-col gap-2">
                <a
                  href="#"
                  className="flex items-center justify-center gap-2 bg-[#0E3D39] text-white rounded-full py-3 text-sm font-semibold hover:bg-[#215B54] transition-colors"
                >
                  <Smartphone size={16} />
                  Download the App
                </a>
                <button
                  onClick={() => setShowAppModal(false)}
                  className="text-[#8FA8A3] text-sm font-medium py-2 hover:text-[#1F2937] transition-colors"
                >
                  Maybe later
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
