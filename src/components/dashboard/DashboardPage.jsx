"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSelector from "@/components/ui/LanguageSelector";
import {
  LogOut, Clock, Smartphone, BookOpen, Users, ArrowRight,
  CalendarDays, BarChart3, HeadphonesIcon, Heart, Trophy,
  Flame, Star, Shield, Sun, Moon, CloudSun, Sparkles,
  ChevronRight, Activity, Scan, Award, TrendingUp,
  ClipboardList, CalendarClock, Brain, Zap, Menu, X, Bell, Play, FileText, Headphones, Video,
  Handshake, Compass, Camera, Eye, Globe, Target, ClipboardCheck, UserCheck, Crown, Lock, Bookmark,CheckCircle
} from "lucide-react";
import { checkIn, checkOut, getAttendanceHistory, getResources, getStudentBadgesDetails, getNovaScore } from "@/lib/api";
import { DashboardSkeleton } from "@/components/ui/ShimmerSkeleton";
import Sidebar from "./Sidebar";

/* ── Greeting helper ─────────────────────────────────────── */
function getGreetingKey() {
  const h = new Date().getHours();
  if (h < 12) return { key: "greeting.morning", icon: <Sun size={20} className="text-[#E8A020]" /> };
  if (h < 17) return { key: "greeting.afternoon", icon: <CloudSun size={20} className="text-[#E8A020]" /> };
  return { key: "greeting.evening", icon: <Moon size={20} className="text-[#7C5CDB]" /> };
}

/* ── ICON MAPPER FOR BACKEND BADGES ── */
const FA_ICON_MAP = {
  "fa-handshake": Handshake,
  "fa-id-badge": UserCheck,
  "fa-compass": Compass,
  "fa-calendar-days": CalendarDays,
  "fa-shield-halved": Shield,
  "fa-fire": Flame,
  "fa-crown": Crown,
  "fa-users": Users,
  "fa-bolt": Zap,
  "fa-camera": Camera,
  "fa-eye": Eye,
  "fa-globe": Globe,
  "fa-bullseye": Target,
  "fa-clipboard-check": ClipboardCheck,

  handshake: Handshake,
  "id-badge": UserCheck,
  compass: Compass,
  "calendar-days": CalendarDays,
  "shield-halved": Shield,
  fire: Flame,
  crown: Crown,
  users: Users,
  bolt: Zap,
  camera: Camera,
  eye: Eye,
  globe: Globe,
  bullseye: Target,
  "clipboard-check": ClipboardCheck,

  shield: Shield,
  award: Award,
  star: Star,
  flame: Flame,
  bookmark: Bookmark,
  activity: Activity,
  sparkles: Sparkles,
  heart: Heart,
  checkcircle: CheckCircle,
  clock: Clock,
  trophy: Trophy,
  zap: Zap,
  crown: Crown,
  target: Target,
  user: UserCheck,
  calendar: CalendarDays,
};

function renderBadgeIcon(iconData, name = "", badgeId = "") {
  let rawIcon = iconData;
  if (rawIcon && typeof rawIcon === "object") {
    rawIcon = rawIcon.url || rawIcon.src || rawIcon.path || rawIcon.icon || rawIcon.name || "";
  }

  if (typeof rawIcon === "string" && rawIcon.trim()) {
    const trimmed = rawIcon.trim().toLowerCase();
    if (
      trimmed.startsWith("http://") ||
      trimmed.startsWith("https://") ||
      trimmed.startsWith("data:") ||
      trimmed.startsWith("/") ||
      /\.(png|jpg|jpeg|svg|webp|gif)$/i.test(trimmed)
    ) {
      return <img src={rawIcon.trim()} alt="Badge Icon" className="w-6 h-6 object-contain" />;
    }

    const Component = FA_ICON_MAP[trimmed] || FA_ICON_MAP[trimmed.replace(/^fa-/, "")];
    if (Component) {
      return <Component size={20} className="text-[#0E3D39]" />;
    }
  }

  const textToMatch = `${name} ${badgeId}`.toLowerCase();
  let FallbackIcon = Shield;

  if (textToMatch.includes("welcome") || textToMatch.includes("board")) FallbackIcon = Handshake;
  else if (textToMatch.includes("profile")) FallbackIcon = UserCheck;
  else if (textToMatch.includes("app") || textToMatch.includes("explorer") || textToMatch.includes("compass")) FallbackIcon = Compass;
  else if (textToMatch.includes("learn") || textToMatch.includes("daily")) FallbackIcon = CalendarDays;
  else if (textToMatch.includes("wellness") || textToMatch.includes("warrior")) FallbackIcon = Shield;
  else if (textToMatch.includes("habit") || textToMatch.includes("hero") || textToMatch.includes("flame")) FallbackIcon = Flame;
  else if (textToMatch.includes("king") || textToMatch.includes("crown")) FallbackIcon = Crown;
  else if (textToMatch.includes("community")) FallbackIcon = Users;
  else if (textToMatch.includes("starter") || textToMatch.includes("fast") || textToMatch.includes("bolt")) FallbackIcon = Zap;
  else if (textToMatch.includes("camera") || textToMatch.includes("checkin") || textToMatch.includes("selfie")) FallbackIcon = Camera;
  else if (textToMatch.includes("awakening") || textToMatch.includes("eye")) FallbackIcon = Eye;
  else if (textToMatch.includes("global") || textToMatch.includes("resonance")) FallbackIcon = Globe;
  else if (textToMatch.includes("intentionality") || textToMatch.includes("bullseye")) FallbackIcon = Target;
  else if (textToMatch.includes("quiz") || textToMatch.includes("beginner")) FallbackIcon = ClipboardCheck;

  return <FallbackIcon size={20} className="text-[#0E3D39]" />;
}

function checkBadgeIsEarned(b) {
  if (!b) return false;
  const raw =
    b.hasEarned ??
    b.earned ??
    b.isEarned ??
    b.is_earned ??
    b.unlocked ??
    b.isUnlocked ??
    b.badge?.hasEarned ??
    b.badge?.earned ??
    b.badge?.isEarned;

  if (raw !== undefined && raw !== null) {
    if (typeof raw === "boolean") return raw;
    if (typeof raw === "string") return ["true", "earned", "unlocked", "yes", "1"].includes(raw.trim().toLowerCase());
    if (typeof raw === "number") return raw > 0;
  }
  if (b.status !== undefined && b.status !== null) {
    return ["earned", "unlocked", "active"].includes(String(b.status).trim().toLowerCase());
  }
  if (b.earnedAt !== undefined && b.earnedAt !== null) {
    return Boolean(b.earnedAt);
  }
  return false;
}

/* ── Main Component ──────────────────────────────────────── */
export default function DashboardPage() {
  const { user, token, loading, logout } = useAuth();
  const { t, lang, translateName } = useLanguage();
  const router = useRouter();
  const [checkedIn, setCheckedIn] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [translatedFirstName, setTranslatedFirstName] = useState("");
  const [featuredResources, setFeaturedResources] = useState([]);
  const [userBadges, setUserBadges] = useState([]);
  const [novaScoreDetails, setNovaScoreDetails] = useState(null);

  /* Fetch Nova Score from backend API */
  useEffect(() => {
    if (!token) return;
    getNovaScore(token)
      .then((data) => {
        const resObj = data?.result ?? data?.data ?? data ?? {};
        const totalScore = resObj.totalScore ?? resObj.novaScore ?? resObj.score ?? 0;
        const maxScore = resObj.maxScore ?? 100;
        const bd = resObj.breakdown || {};

        setNovaScoreDetails({
          totalScore,
          maxScore,
          group: bd.group ?? resObj.group ?? 0,
          like: bd.like ?? resObj.like ?? 0,
          selfie: bd.selfie ?? resObj.selfie ?? 0,
          quiz: bd.quiz ?? resObj.quiz ?? 0,
          dailyBalance: bd.dailyBalance ?? resObj.dailyBalance ?? 0,
        });
      })
      .catch((err) => console.error("Dashboard Nova Score fetch error:", err));
  }, [token]);

  /* Fetch 3 featured resources for home preview */
  useEffect(() => {
    if (!token) return;
    getResources({ limit: 3, isGlobal: true }, token)
      .then((data) => {
        const list = Array.isArray(data) ? data : (data?.results || []);
        setFeaturedResources(list.slice(0, 3));
      })
      .catch((err) => console.error("Featured resources fetch error:", err));
  }, [token]);

  /* Fetch badges from backend API */
  useEffect(() => {
    if (!token) return;
    getStudentBadgesDetails(token)
      .then((data) => {
        const list = Array.isArray(data) ? data : (data?.badges ?? data?.data ?? data?.details ?? []);
        setUserBadges(list);
      })
      .catch((err) => console.error("Dashboard badges fetch error:", err));
  }, [token]);

  /* Auth guard */
  useEffect(() => {
    if (!loading && !token) router.push("/login");
  }, [loading, token, router]);

  /* Fetch initial check-in status from history */
  useEffect(() => {
    if (!token) return;
    getAttendanceHistory(token)
      .then((history) => {
        const historyArray = Array.isArray(history) ? history : (history?.history || history?.data || []);
        const activeRecord = historyArray.find(item => {
          if (!item) return false;
          const hasCheckOut = item.checkOut && (item.checkOut.time || typeof item.checkOut === "string");
          if (hasCheckOut) return false;
          const inTime = item.checkIn?.time || (typeof item.checkIn === "string" || typeof item.checkIn === "number" ? item.checkIn : null) || item.createdAt;
          if (!inTime) return false;
          const ms = new Date(inTime).getTime();
          return !isNaN(ms) && (Date.now() - ms < 12 * 60 * 60 * 1000);
        });
        if (activeRecord) {
          setCheckedIn(true);
        } else {
          setCheckedIn(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load attendance history:", err);
      });
  }, [token]);

  /* Translate first name when language changes */
  const rawFirstName = user?.firstName ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1) : "there";

  useEffect(() => {
    if (lang === "en") {
      setTranslatedFirstName(rawFirstName);
      return;
    }
    let cancelled = false;
    translateName(rawFirstName).then((name) => {
      if (!cancelled) setTranslatedFirstName(name);
    });
    return () => { cancelled = true; };
  }, [lang, rawFirstName, translateName]);

  if (loading) return <DashboardSkeleton />;

  if (!token) return null;

  const greetingData = getGreetingKey();
  const firstName = translatedFirstName || rawFirstName;
  const initials = user ? `${(user.firstName?.[0] ?? "").toUpperCase()}${(user.lastName?.[0] ?? "").toUpperCase()}` : "U";
  const photo = user?.photo;
  const streak = user?.consecutiveDaysStreak ?? 0;
  const points = novaScoreDetails?.totalScore ?? 0;
  const activeDays = user?.totalActiveDays ?? 0;
  const allBadgesList = userBadges.length > 0 ? userBadges : (user?.badges ?? []);
  const earnedBadges = allBadgesList.filter(checkBadgeIsEarned);
  const employeeCode = user?.employeeCode ?? "";

  /* Quick actions data — translated */
  const QUICK_ACTIONS = [
    {
      id: "checkin",
      icon: <Clock size={24} />,
      title: t("quickActions.checkInOut"),
      desc: t("quickActions.checkInDesc"),
      color: "#2C8C91",
      gradient: "from-[#2C8C91] to-[#1B6E73]",
      shadow: "rgba(44,140,145,0.35)",
      interactive: true,
    },
    {
      id: "mood",
      icon: <Scan size={24} />,
      title: t("quickActions.moodScanner"),
      desc: t("quickActions.moodDesc"),
      color: "#7C5CDB",
      gradient: "from-[#7C5CDB] to-[#4A2EA8]",
      shadow: "rgba(124,92,219,0.35)",
      appOnly: true,
    },
    {
      id: "resources",
      icon: <BookOpen size={24} />,
      title: t("quickActions.resourceLibrary"),
      desc: t("quickActions.resourceDesc"),
      color: "#E8A020",
      gradient: "from-[#E8A020] to-[#B87000]",
      shadow: "rgba(232,160,32,0.35)",
    },
    {
      id: "community",
      icon: <Users size={24} />,
      title: t("quickActions.community"),
      desc: t("quickActions.communityDesc"),
      color: "#E05FA0",
      gradient: "from-[#E05FA0] to-[#A0336E]",
      shadow: "rgba(224,95,160,0.35)",
    },
  ];

  /* Feature cards data — translated */
  const FEATURES = [
    { icon: <ClipboardList size={20} />, title: t("features.leaveManagement"), desc: t("features.leaveDesc"), color: "#2C8C91", active: true, href: "/dashboard/leave" },
    { icon: <CalendarClock size={20} />, title: t("features.shiftSchedule"), desc: t("features.shiftDesc"), color: "#4A90D9", active: true, href: "#" },
    { icon: <BarChart3 size={20} />, title: t("features.hrAnalytics"), desc: t("features.hrDesc"), color: "#7C5CDB", active: false, href: "#" },
    { icon: <Heart size={20} />, title: t("features.wellnessTracking"), desc: t("features.wellnessDesc"), color: "#E05FA0", active: true, href: "#" },
    { icon: <HeadphonesIcon size={20} />, title: t("features.supportChat"), desc: t("features.supportDesc"), color: "#1AAF7E", active: true, href: "#" },
    { icon: <Trophy size={20} />, title: t("features.rewardsBadges"), desc: t("features.rewardsDesc"), color: "#E8A020", active: true, href: "#" },
  ];

  /* Stats row — translated */
  const STATS = [
    { icon: <Star size={18} className="text-[#D4F04A]" />, value: points, label: "Nova Score" },
    { icon: <Activity size={18} className="text-[#2C8C91]" />, value: activeDays, label: t("stats.activeDays") },
    { icon: <Flame size={18} className="text-[#E8A020]" />, value: `${streak} ${lang === "en" ? "days" : ""}`, label: t("stats.currentStreak") },
    { icon: <Award size={18} className="text-[#7C5CDB]" />, value: earnedBadges.length, label: t("stats.badgesEarned") },
  ];

  const handleCheckInOutToggle = async () => {
    if (actionLoading) return;
    setActionLoading(true);

    try {
      // Get location coordinates or fallback to defaults
      let lat = 12.22;
      let lng = "22.1";

      if (navigator.geolocation) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 4000 });
          });
          lat = position.coords.latitude;
          lng = String(position.coords.longitude);
        } catch (geoErr) {
          console.warn("Geolocation failed, using default coords:", geoErr);
        }
      }

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata";
      const payload = {
        lat,
        lng,
        appId: "fhdhskjh123123ssdfds",
        timezone
      };

      if (checkedIn) {
        // Perform Check-Out
        await checkOut(payload, token);
        setCheckedIn(false);
        alert(t("attendance.checkedOutSuccess") || "Checked out successfully!");
      } else {
        // Perform Check-In
        await checkIn(payload, token);
        setCheckedIn(true);
        alert(t("attendance.checkedInSuccess") || "Checked in successfully!");
      }
    } catch (err) {
      alert(err.message || "Failed to process attendance action");
    } finally {
      setActionLoading(false);
    }
  };

  const handleQuickAction = (action) => {
    if (action.appOnly) {
      setShowAppModal(true);
      return;
    }
    if (action.id === "checkin") {
      router.push("/dashboard/attendance");
    } else if (action.id === "resources") {
      router.push("/dashboard/resources");
    } else if (action.id === "community") {
      router.push("/dashboard/community");
    }
  };

  return (
    <Sidebar>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-10">

        {/* ── HERO BANNER ─────────────────────────────────── */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-[#165B5E] via-[#1B6E73] to-[#2C8C91] rounded-[28px] p-8 lg:p-10 overflow-hidden relative shadow-lg">
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
                  {greetingData.icon}
                  <span className="text-white/50 text-sm font-medium">{t(greetingData.key)}</span>
                </div>
                <h1
                  className="text-white text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.15] mb-3"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {t("greeting.welcomeBack")} <span className="text-[#D4F04A]">{firstName}</span>
                </h1>
                <p className="text-white/50 text-sm max-w-md leading-relaxed">
                  {t("greeting.subtitle")}
                </p>
              </div>

              {/* Right — streak + points pills */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2.5 backdrop-blur-sm">
                  <Flame size={18} className="text-[#E8A020]" />
                  <div>
                    <p className="text-white text-lg font-extrabold leading-none" style={{ fontFamily: "var(--font-outfit)" }}>{streak}</p>
                    <p className="text-white/40 text-[10px] uppercase tracking-wider font-medium">{t("stats.dayStreak")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2.5 backdrop-blur-sm">
                  <Star size={18} className="text-[#D4F04A]" />
                  <div>
                    <p className="text-white text-lg font-extrabold leading-none" style={{ fontFamily: "var(--font-outfit)" }}>{points}</p>
                    <p className="text-white/40 text-[10px] uppercase tracking-wider font-medium">Nova Score</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2.5 backdrop-blur-sm">
                  <Activity size={18} className="text-[#8FD9C9]" />
                  <div>
                    <p className="text-white text-lg font-extrabold leading-none" style={{ fontFamily: "var(--font-outfit)" }}>{activeDays}</p>
                    <p className="text-white/40 text-[10px] uppercase tracking-wider font-medium">{t("stats.activeDays")}</p>
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
              {t("quickActions.title")}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.id}
                type="button"
                disabled={action.id === "checkin" && actionLoading}
                onClick={() => handleQuickAction(action)}
                className={`group relative bg-white rounded-[24px] border border-[#E5DED6] p-6 text-left hover:border-[#2C8C91]/30 hover:shadow-[0_8px_32px_-8px_rgba(44,140,145,0.12)] transition-all duration-300 cursor-pointer overflow-hidden ${
                  action.id === "checkin" && actionLoading ? "opacity-60 cursor-not-allowed" : ""
                }`}
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
                    actionLoading
                      ? "bg-[#FAF7F2] text-[#8FA8A3]"
                      : checkedIn
                      ? "bg-[#EFFDF4] text-[#1AAF7E]"
                      : "bg-[#FFF0F6] text-[#E05FA0]"
                  }`}>
                    {actionLoading ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8FA8A3] animate-pulse" />
                        {t("attendance.processing") || "Processing..."}
                      </>
                    ) : (
                      <>
                        <span className={`w-1.5 h-1.5 rounded-full ${checkedIn ? "bg-[#1AAF7E]" : "bg-[#E05FA0]"}`} />
                        {checkedIn ? t("quickActions.checkedIn") : t("quickActions.notCheckedIn")}
                      </>
                    )}
                  </div>
                )}

                {/* App-only badge */}
                {action.appOnly && (
                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#F3EEFF] text-[#7C5CDB] px-3 py-1 text-xs font-semibold">
                    <Smartphone size={12} />
                    {t("quickActions.appOnly")}
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
              {STATS.map(({ icon, value, label }) => (
                <div key={label} className="flex flex-col items-center text-center px-4 first:pl-0 last:pr-0">
                  <div className="mb-2">{icon}</div>
                  <span className="text-2xl font-extrabold text-[#2C8C91]" style={{ fontFamily: "var(--font-outfit)" }}>
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
              {t("features.title")}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon, title, desc, color, active, href }) => (
              <div
                key={title}
                onClick={() => {
                  if (active && href && href !== "#") {
                    router.push(href);
                  }
                }}
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
                      {t("features.active")}
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8FA8A3] bg-[#F4F9F8] px-2.5 py-1 rounded-full">
                      {t("features.comingSoon")}
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
                  {active ? t("features.open") : t("features.learnMore")}
                  <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── DISCOVERY & RESOURCES PREVIEW ────────────────── */}
        {featuredResources.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-[#2C8C91]" />
                <h2 className="text-[#1F2937] text-xs font-bold uppercase tracking-[0.15em]">
                  {t("resources.title") || "Discovery & Learning Highlights"}
                </h2>
              </div>
              <button
                onClick={() => router.push("/dashboard/resources")}
                className="flex items-center gap-1 text-[#2C8C91] hover:text-[#165B5E] text-xs font-bold transition-colors cursor-pointer"
              >
                Explore Discover <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid sm:grid-cols-3 gap-5">
              {featuredResources.map((res) => {
                const isVideo = res.type === "youtube" || res.type === "video";
                const isAudio = res.type === "audio";
                let thumb = res.imageUrl;
                if (!thumb && isVideo && res.videoUrl) {
                  let vId = "";
                  if (res.videoUrl.includes("v=")) vId = res.videoUrl.split("v=")[1]?.split("&")[0];
                  else if (res.videoUrl.includes("youtu.be/")) vId = res.videoUrl.split("youtu.be/")[1]?.split("?")[0];
                  if (vId) thumb = `https://img.youtube.com/vi/${vId}/hqdefault.jpg`;
                }

                return (
                  <div
                    key={res._id}
                    onClick={() => router.push("/dashboard/resources")}
                    className="group bg-white rounded-[24px] border border-[#E5DED6] overflow-hidden hover:border-[#2C8C91]/30 hover:shadow-[0_8px_24px_-6px_rgba(44,140,145,0.12)] transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="relative h-36 bg-[#165B5E]/5 overflow-hidden">
                      {thumb ? (
                        <img src={thumb} alt={res.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#165B5E] to-[#2C8C91] grid place-items-center text-white">
                          {isAudio ? <Headphones size={32} className="text-[#D4F04A]" /> : isVideo ? <Video size={32} className="text-[#D4F04A]" /> : <FileText size={32} className="text-[#D4F04A]" />}
                        </div>
                      )}
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-white text-[10px] font-bold uppercase">
                        {res.type}
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <h4 className="text-[#1F2937] font-semibold text-sm line-clamp-2 mb-2 group-hover:text-[#2C8C91] transition-colors" style={{ fontFamily: "var(--font-outfit)" }}>
                        {res.title}
                      </h4>
                      <div className="flex items-center justify-between text-[11px] text-[#8FA8A3] font-medium pt-2 border-t border-[#E5DED6]">
                        <span>{res.time || "3 Mins"}</span>
                        <span className="text-[#2C8C91] font-bold group-hover:translate-x-0.5 transition-transform">View →</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── APP PROMO BANNER ────────────────────────────── */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-[#1B6E73] via-[#2C8C91] to-[#257D82] rounded-[28px] p-8 lg:p-10 overflow-hidden relative shadow-lg">
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
                  {t("appPromo.mobileApp")}
                </div>
                <h3
                  className="text-white text-2xl lg:text-3xl leading-[1.2] mb-3"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {t("appPromo.headline")}{" "}
                  <span className="text-[#D4F04A]">{t("appPromo.humanovaApp")}</span>
                </h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-lg">
                  {t("appPromo.desc")}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 bg-white rounded-full px-5 py-2.5 text-sm font-semibold text-[#2C8C91] hover:shadow-[0_8px_24px_-6px_rgba(255,255,255,0.25)] transition-shadow"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                    {t("appPromo.appStore")}
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 010 1.732l-2.808 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.3 2.3-8.636-8.632z"/></svg>
                    {t("appPromo.googlePlay")}
                  </a>
                </div>
              </div>

              {/* Decorative phone mockup placeholder */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="w-[180px] h-[320px] rounded-[32px] bg-white/5 border border-white/10 grid place-items-center backdrop-blur-sm">
                  <div className="text-center">
                    <Scan size={40} className="text-[#D4F04A] mx-auto mb-3" />
                    <p className="text-white/40 text-xs font-medium">{t("appPromo.moodScannerLabel")}</p>
                    <p className="text-white/25 text-[10px] mt-1">{t("appPromo.aiPowered")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BADGES ─────────────────────────────────────── */}
        {earnedBadges.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Award size={15} className="text-[#D4F04A] fill-[#D4F04A]" />
                <h2 className="text-[#1F2937] text-xs font-bold uppercase tracking-[0.15em]">
                  {t("badges.title") || "Earned Badges & Achievements"}
                </h2>
              </div>
              <button
                onClick={() => router.push("/dashboard/profile")}
                className="flex items-center gap-1 text-[#2C8C91] hover:text-[#165B5E] text-xs font-bold transition-colors cursor-pointer"
              >
                View All Badges ({earnedBadges.length}) <ChevronRight size={14} />
              </button>
            </div>

            <div className="flex flex-wrap gap-4">
              {earnedBadges.map((badge, idx) => {
                const badgeId = badge.badgeId || badge.id || badge.code || `badge_${idx}`;
                const name = badge.name || badge.title || badge.badgeName || badgeId.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
                const earnedAt = badge.earnedAt || badge.createdAt || badge.date;
                const iconData = badge.icon || badge.imageUrl || badge.image || badge.badgeIcon || badge.iconUrl || badge.badge_icon;

                return (
                  <div
                    key={badgeId + idx}
                    onClick={() => router.push("/dashboard/profile")}
                    className="bg-white rounded-[20px] border border-[#E5DED6] px-5 py-4 flex items-center gap-3.5 hover:border-[#2C8C91]/40 hover:shadow-[0_6px_20px_-4px_rgba(44,140,145,0.15)] transition-all duration-200 cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D4F04A] to-[#A8C73A] grid place-items-center shadow-sm group-hover:scale-105 transition-transform shrink-0">
                      {renderBadgeIcon(iconData, name, badgeId)}
                    </div>
                    <div>
                      <p className="text-[#1F2937] text-sm font-bold group-hover:text-[#2C8C91] transition-colors leading-snug">
                        {name}
                      </p>
                      {earnedAt && (
                        <p className="text-[#8FA8A3] text-[11px] font-medium mt-0.5">
                          {t("badges.earned") || "Earned"} {new Date(earnedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
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
                className="text-[#2C8C91] text-2xl mb-2"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {t("modal.appOnlyTitle")}
              </h3>
              <p className="text-[#5F6B73] text-sm leading-relaxed mb-6">
                {t("modal.appOnlyDesc")}
              </p>

              <div className="flex flex-col gap-2">
                <a
                  href="#"
                  className="flex items-center justify-center gap-2 bg-[#2C8C91] text-white rounded-full py-3 text-sm font-semibold hover:bg-[#216B6F] transition-colors"
                >
                  <Smartphone size={16} />
                  {t("modal.downloadApp")}
                </a>
                <button
                  onClick={() => setShowAppModal(false)}
                  className="text-[#8FA8A3] text-sm font-medium py-2 hover:text-[#1F2937] transition-colors"
                >
                  {t("modal.maybeLater")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Sidebar>
  );
}
