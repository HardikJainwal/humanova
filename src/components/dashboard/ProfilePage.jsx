"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Shield, Award, Bookmark, Flame, Star, Activity,
  RefreshCw, Loader2, Mail, Hash, Building, Calendar,
  ExternalLink, Trash2, Heart, MessageSquare, Clock, CheckCircle2,
  Sparkles, AlertCircle, ArrowUpRight, Check, ChevronRight,
  CalendarDays, Video, MapPin, CheckCircle, Clock3
} from "lucide-react";
import {
  getStudentDetails,
  getStudentBadgesDetails,
  getMyBookmarks,
  toggleBookmark,
  getBookingStatus
} from "@/lib/api";
import Sidebar from "./Sidebar";

export default function ProfilePage() {
  const { user: contextUser, token, loading: authLoading } = useAuth();
  const { t, lang } = useLanguage();
  const router = useRouter();

  /* Tab selection: "details" | "bookings" | "badges" | "bookmarks" */
  const [activeTab, setActiveTab] = useState("details");

  /* Data states for the APIs */
  const [studentDetails, setStudentDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [detailsError, setDetailsError] = useState(null);

  const [badgesData, setBadgesData] = useState([]);
  const [badgesSummary, setBadgesSummary] = useState(null);
  const [badgesLoading, setBadgesLoading] = useState(true);
  const [badgesError, setBadgesError] = useState(null);

  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarksLoading, setBookmarksLoading] = useState(true);
  const [bookmarksError, setBookmarksError] = useState(null);

  /* Bookings API States: status = "pending" | "confirmed" | "completed" */
  const [bookingStatusFilter, setBookingStatusFilter] = useState("pending");
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsError, setBookmarksError2] = useState(null);

  /* Lock for un-bookmark action */
  const [unbookmarkingId, setUnbookmarkingId] = useState(null);

  /* Auth Guard */
  useEffect(() => {
    if (!authLoading && !token) {
      router.push("/login");
    }
  }, [authLoading, token, router]);

  /* 1. Fetch initial profile details, badges, and bookmarks */
  useEffect(() => {
    if (!token) return;

    let isMounted = true;

    getStudentDetails(token)
      .then((data) => {
        if (isMounted) setStudentDetails(data?.student ?? data?.data ?? data);
      })
      .catch((err) => {
        if (isMounted) setDetailsError(err.message || "Failed to load details.");
      })
      .finally(() => {
        if (isMounted) setDetailsLoading(false);
      });

    getStudentBadgesDetails(token)
      .then((data) => {
        if (isMounted) {
          const list = Array.isArray(data) ? data : (data?.badges ?? data?.data ?? data?.details ?? []);
          setBadgesData(list);
          setBadgesSummary({
            totalEarned: data?.totalEarned ?? list.length,
            totalPoints: data?.totalPoints ?? data?.points,
            nextTier: data?.nextTier ?? data?.nextBadge,
          });
        }
      })
      .catch((err) => {
        if (isMounted) setBadgesError(err.message || "Failed to load badges.");
      })
      .finally(() => {
        if (isMounted) setBadgesLoading(false);
      });

    getMyBookmarks(token)
      .then((data) => {
        if (isMounted) {
          const list = Array.isArray(data) ? data : (data?.bookmarks ?? data?.myBookmarks ?? data?.data ?? data?.results ?? []);
          setBookmarks(list);
        }
      })
      .catch((err) => {
        if (isMounted) setBookmarksError(err.message || "Failed to load bookmarks.");
      })
      .finally(() => {
        if (isMounted) setBookmarksLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [token]);

  /* 2. Fetch bookings when bookingStatusFilter changes */
  useEffect(() => {
    if (!token) return;

    let isMounted = true;
    setBookingsLoading(true);
    setBookmarksError2(null);

    const orgId = studentDetails?.schoolId || studentDetails?.organizationId || contextUser?.schoolId || contextUser?.organizationId || "6a5f48415249b18dcac2a542";

    getBookingStatus(bookingStatusFilter, token, "serviceTaker", orgId)
      .then((data) => {
        if (!isMounted) return;
        const list = Array.isArray(data)
          ? data
          : data?.bookings ?? data?.data ?? data?.results ?? [];
        setBookings(list);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Error fetching booking status:", err);
        setBookmarksError2(err.message || "Failed to load booking details.");
        setBookings([]);
      })
      .finally(() => {
        if (isMounted) setBookingsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [token, bookingStatusFilter, studentDetails?.schoolId, studentDetails?.organizationId, contextUser?.schoolId, contextUser?.organizationId]);

  /* Unbookmark Handler */
  const handleRemoveBookmark = async (postId) => {
    if (!token || unbookmarkingId) return;
    setUnbookmarkingId(postId);
    try {
      await toggleBookmark(postId, token);
      setBookmarks((prev) => prev.filter((b) => (b.postId?._id || b.postId || b._id || b.id) !== postId));
    } catch (err) {
      alert(err.message || "Failed to remove bookmark.");
    } finally {
      setUnbookmarkingId(null);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-[#2C8C91] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#5F6B73] text-sm">Loading user profile...</p>
        </div>
      </div>
    );
  }

  if (!token) return null;

  /* Consolidated profile object combining API details + fallback from context */
  const profile = studentDetails || contextUser || {};
  const firstName = profile?.firstName ? profile.firstName.charAt(0).toUpperCase() + profile.firstName.slice(1) : "Employee";
  const lastName = profile?.lastName ? profile.lastName.charAt(0).toUpperCase() + profile.lastName.slice(1) : "";
  const fullName = profile?.name || `${firstName} ${lastName}`.trim();
  const initials = `${(firstName?.[0] ?? "E").toUpperCase()}${(lastName?.[0] ?? "").toUpperCase()}`;
  const photo = profile?.photo;
  const email = profile?.email || "No email available";
  const employeeCode = profile?.employeeCode || profile?.studentCode || profile?.rollNumber || "EMP-1029";
  const streak = profile?.consecutiveDaysStreak ?? contextUser?.consecutiveDaysStreak ?? 0;
  const points = profile?.totalPoints ?? contextUser?.totalPoints ?? 0;
  const activeDays = profile?.totalActiveDays ?? contextUser?.totalActiveDays ?? 0;

  /* Combine badges from details API or profile array */
  const displayBadges = badgesData.length > 0 ? badgesData : (profile?.badges || []);

  return (
    <Sidebar>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-10">

        {/* ── TOP HEADER BAR ────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1
              className="text-3xl sm:text-4xl text-[#1F2937] font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Employee Profile &amp; Achievements
            </h1>
            <p className="text-[#5F6B73] text-sm mt-1">
              Manage your personal credentials, session bookings, badges, and bookmarked community discussions.
            </p>
          </div>
        </div>

        {/* ── PROFILE HERO HEADER ──────────────────────── */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-[#165B5E] via-[#1B6E73] to-[#2C8C91] rounded-[28px] p-6 sm:p-8 lg:p-10 text-white relative overflow-hidden shadow-xl">
            {/* Background Texture */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />

            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
              
              {/* Left: Avatar + Details */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                <div className="relative shrink-0">
                  {photo ? (
                    <Image
                      src={photo}
                      alt={fullName}
                      width={100}
                      height={100}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white/20 shadow-2xl"
                    />
                  ) : (
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#2C8C91] to-[#1B6E73] text-white grid place-items-center text-3xl font-extrabold border-4 border-white/20 shadow-2xl">
                      {initials}
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-center">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                    <h2
                      className="text-2xl sm:text-3xl lg:text-4xl text-white font-normal"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      {fullName}
                    </h2>
                  </div>

                  <p className="text-white/60 text-sm flex items-center justify-center sm:justify-start gap-2 mb-3">
                    <Mail size={14} className="text-[#8FD9C9]" />
                    <span>{email}</span>
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-white/50">
                    <span className="bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10 font-mono">
                      ID: {employeeCode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Quick Stats Pills */}
              <div className="flex flex-wrap justify-center md:justify-end gap-3 shrink-0">
                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md border border-white/10 text-center min-w-[100px]">
                  <Flame size={20} className="text-[#E8A020] mx-auto mb-1" />
                  <p className="text-white text-xl font-extrabold" style={{ fontFamily: "var(--font-outfit)" }}>{streak}</p>
                  <p className="text-white/40 text-[9px] uppercase tracking-wider font-semibold">Streak</p>
                </div>

                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md border border-white/10 text-center min-w-[100px]">
                  <Star size={20} className="text-[#D4F04A] mx-auto mb-1" />
                  <p className="text-white text-xl font-extrabold" style={{ fontFamily: "var(--font-outfit)" }}>{points}</p>
                  <p className="text-white/40 text-[9px] uppercase tracking-wider font-semibold">Points</p>
                </div>

                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md border border-white/10 text-center min-w-[100px]">
                  <Activity size={20} className="text-[#8FD9C9] mx-auto mb-1" />
                  <p className="text-white text-xl font-extrabold" style={{ fontFamily: "var(--font-outfit)" }}>{activeDays}</p>
                  <p className="text-white/40 text-[9px] uppercase tracking-wider font-semibold">Active Days</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── NAVIGATION TABS ─────────────────────────────── */}
        <div className="flex items-center gap-2 border-b border-[#E5DED6] mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab("details")}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-extrabold tracking-wide transition-all cursor-pointer shrink-0 ${
              activeTab === "details"
                ? "bg-[#0E3D39] text-white shadow-md"
                : "text-[#5F6B73] hover:bg-white hover:text-[#1F2937]"
            }`}
          >
            <User size={16} />
            <span>Profile Details</span>
          </button>

          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-extrabold tracking-wide transition-all cursor-pointer shrink-0 ${
              activeTab === "bookings"
                ? "bg-[#0E3D39] text-white shadow-md"
                : "text-[#5F6B73] hover:bg-white hover:text-[#1F2937]"
            }`}
          >
            <CalendarDays size={16} />
            <span>My Bookings</span>
          </button>

          <button
            onClick={() => setActiveTab("badges")}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-extrabold tracking-wide transition-all cursor-pointer shrink-0 ${
              activeTab === "badges"
                ? "bg-[#0E3D39] text-white shadow-md"
                : "text-[#5F6B73] hover:bg-white hover:text-[#1F2937]"
            }`}
          >
            <Award size={16} />
            <span>Badges &amp; Achievements</span>
            <span className="text-[10px] opacity-75 font-mono px-1.5 py-0.5 rounded bg-white/20">
              {displayBadges.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("bookmarks")}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-extrabold tracking-wide transition-all cursor-pointer shrink-0 ${
              activeTab === "bookmarks"
                ? "bg-[#0E3D39] text-white shadow-md"
                : "text-[#5F6B73] hover:bg-white hover:text-[#1F2937]"
            }`}
          >
            <Bookmark size={16} />
            <span>My Bookmarks</span>
            <span className="text-[10px] opacity-75 font-mono px-1.5 py-0.5 rounded bg-white/20">
              {bookmarks.length}
            </span>
          </button>
        </div>

        {/* ── TAB CONTENT ────────────────────────────────── */}
        <div className="space-y-8">

          {/* TAB 1: PROFILE DETAILS */}
          {activeTab === "details" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="grid lg:grid-cols-12 gap-8"
            >
              {/* Main Info Card */}
              <div className="lg:col-span-8 space-y-6">
                <div className="bg-white rounded-[28px] border border-[#E5DED6] p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center justify-between border-b border-[#FAF7F2] pb-5 mb-6">
                    <div>
                      <h3
                        className="text-xl text-[#1F2937] font-semibold"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        Personal &amp; Professional Credentials
                      </h3>
                    </div>

                    {detailsLoading && (
                      <Loader2 size={18} className="animate-spin text-[#2C8C91]" />
                    )}
                  </div>

                  {detailsError ? (
                    <div className="p-4 bg-[#FFF0F6] border border-[#E05FA0]/30 rounded-2xl flex items-center gap-3 text-xs text-[#E05FA0]">
                      <AlertCircle size={16} />
                      <span>{detailsError}</span>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#E5DED6]/60">
                        <span className="text-[10px] text-[#8FA8A3] uppercase font-bold tracking-wider block mb-1">
                          First Name
                        </span>
                        <p className="text-base font-bold text-[#1F2937]">{firstName}</p>
                      </div>

                      <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#E5DED6]/60">
                        <span className="text-[10px] text-[#8FA8A3] uppercase font-bold tracking-wider block mb-1">
                          Last Name
                        </span>
                        <p className="text-base font-bold text-[#1F2937]">{lastName || "N/A"}</p>
                      </div>

                      <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#E5DED6]/60">
                        <span className="text-[10px] text-[#8FA8A3] uppercase font-bold tracking-wider block mb-1">
                          Work Email
                        </span>
                        <p className="text-sm font-bold text-[#1F2937] truncate">{email}</p>
                      </div>

                      <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#E5DED6]/60">
                        <span className="text-[10px] text-[#8FA8A3] uppercase font-bold tracking-wider block mb-1">
                          Employee Code
                        </span>
                        <p className="text-sm font-bold text-[#2C8C91] font-mono">{employeeCode}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Stats Breakdown */}
                <div className="bg-white rounded-[28px] border border-[#E5DED6] p-6 sm:p-8 shadow-sm">
                  <h3
                    className="text-xl text-[#1F2937] font-semibold mb-6"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    Engagement Summary
                  </h3>

                  <div className="grid sm:grid-cols-3 gap-5">
                    <div className="bg-gradient-to-br from-[#FAF7F2] to-[#F3EEFF] rounded-2xl p-5 border border-[#7C5CDB]/15">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-[#7C5CDB] uppercase tracking-wider">Streak</span>
                        <Flame size={18} className="text-[#E8A020]" />
                      </div>
                      <p className="text-3xl font-extrabold text-[#1F2937]" style={{ fontFamily: "var(--font-outfit)" }}>{streak} Days</p>
                      <p className="text-[11px] text-[#8FA8A3] mt-1">Consecutive log-ins</p>
                    </div>

                    <div className="bg-gradient-to-br from-[#FAF7F2] to-[#EFFDF4] rounded-2xl p-5 border border-[#1AAF7E]/15">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-[#1AAF7E] uppercase tracking-wider">Total Points</span>
                        <Star size={18} className="text-[#D4F04A]" />
                      </div>
                      <p className="text-3xl font-extrabold text-[#1F2937]" style={{ fontFamily: "var(--font-outfit)" }}>{points}</p>
                      <p className="text-[11px] text-[#8FA8A3] mt-1">Earned across activities</p>
                    </div>

                    <div className="bg-gradient-to-br from-[#FAF7F2] to-[#EAF6F4] rounded-2xl p-5 border border-[#2C8C91]/15">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-[#2C8C91] uppercase tracking-wider">Active Days</span>
                        <Activity size={18} className="text-[#2C8C91]" />
                      </div>
                      <p className="text-3xl font-extrabold text-[#1F2937]" style={{ fontFamily: "var(--font-outfit)" }}>{activeDays}</p>
                      <p className="text-[11px] text-[#8FA8A3] mt-1">Total active participation</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side Quick Links */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-[28px] border border-[#E5DED6] p-6 shadow-sm">
                  <h4 className="text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Sparkles size={16} className="text-[#E8A020]" />
                    Quick Actions
                  </h4>

                  <div className="space-y-3">
                    <Link
                      href="/dashboard/attendance"
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF7F2] hover:bg-[#EAF6F4] border border-[#E5DED6]/50 transition-colors text-xs font-bold text-[#0E3D39]"
                    >
                      <span>Check Attendance History</span>
                      <ChevronRight size={14} className="text-[#2C8C91]" />
                    </Link>

                    <Link
                      href="/dashboard/community"
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF7F2] hover:bg-[#EAF6F4] border border-[#E5DED6]/50 transition-colors text-xs font-bold text-[#0E3D39]"
                    >
                      <span>Explore Community Feed</span>
                      <ChevronRight size={14} className="text-[#2C8C91]" />
                    </Link>

                    <Link
                      href="/dashboard/leave"
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF7F2] hover:bg-[#EAF6F4] border border-[#E5DED6]/50 transition-colors text-xs font-bold text-[#0E3D39]"
                    >
                      <span>Apply for Leave</span>
                      <ChevronRight size={14} className="text-[#2C8C91]" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: MY BOOKINGS (GET /student/booking-status) */}
          {activeTab === "bookings" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-[28px] border border-[#E5DED6] p-6 sm:p-8 shadow-sm">
                
                {/* Header & Status Filter Pills */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#FAF7F2] pb-6 mb-6">
                  <div>
                    <h3
                      className="text-xl text-[#1F2937] font-semibold"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      Session &amp; Service Bookings
                    </h3>
                    <p className="text-xs text-[#5F6B73] mt-1">
                      Track and manage your upcoming, confirmed, and past completed appointments.
                    </p>
                  </div>

                  {/* 3 Status Toggle Buttons */}
                  <div className="flex items-center gap-2 bg-[#FAF7F2] p-1.5 rounded-2xl border border-[#E5DED6] shrink-0">
                    <button
                      onClick={() => setBookingStatusFilter("pending")}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                        bookingStatusFilter === "pending"
                          ? "bg-[#FEF3C7] text-[#92400E] shadow-sm border border-[#FCD34D]"
                          : "text-[#5F6B73] hover:text-[#1F2937]"
                      }`}
                    >
                      <Clock3 size={14} className="text-[#D97706]" />
                      <span>Pending</span>
                    </button>

                    <button
                      onClick={() => setBookingStatusFilter("confirmed")}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                        bookingStatusFilter === "confirmed"
                          ? "bg-[#EFFDF4] text-[#065F46] shadow-sm border border-[#6EE7B7]"
                          : "text-[#5F6B73] hover:text-[#1F2937]"
                      }`}
                    >
                      <CheckCircle2 size={14} className="text-[#1AAF7E]" />
                      <span>Confirmed</span>
                    </button>

                    <button
                      onClick={() => setBookingStatusFilter("completed")}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                        bookingStatusFilter === "completed"
                          ? "bg-[#EFF6FF] text-[#1E40AF] shadow-sm border border-[#93C5FD]"
                          : "text-[#5F6B73] hover:text-[#1F2937]"
                      }`}
                    >
                      <Check size={14} className="text-[#2563EB]" />
                      <span>Completed</span>
                    </button>
                  </div>
                </div>

                {/* Content List */}
                {bookingsLoading ? (
                  <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
                    <Loader2 size={32} className="animate-spin text-[#2C8C91]" />
                    <p className="text-xs text-[#8FA8A3] font-bold uppercase tracking-wider">Loading {bookingStatusFilter} bookings...</p>
                  </div>
                ) : bookingsError ? (
                  <div className="p-4 bg-[#FFF0F6] border border-[#E05FA0]/30 rounded-2xl flex items-center gap-3 text-xs text-[#E05FA0]">
                    <AlertCircle size={16} />
                    <span>{bookingsError}</span>
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="py-16 text-center flex flex-col items-center justify-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-[#FAF7F2] grid place-items-center text-[#8FA8A3]">
                      <CalendarDays size={26} />
                    </div>
                    <h4 className="text-base font-bold text-[#1F2937] capitalize">No {bookingStatusFilter} Bookings Found</h4>
                    <p className="text-xs text-[#8FA8A3] max-w-sm">
                      You currently don't have any sessions listed under <span className="font-bold text-[#2C8C91] capitalize">{bookingStatusFilter}</span> status.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-5">
                    {bookings.map((item, idx) => {
                      const bookingId = item._id || item.id || item.bookingId || `booking_${idx}`;
                      const title = item.serviceName || item.title || item.topic || item.service?.title || "Wellness / Support Session";
                      const providerName = item.serviceProvider?.name || item.provider?.name || item.expertName || "Humanova Expert Consultant";
                      const providerPhoto = item.serviceProvider?.photo || item.provider?.photo;
                      const dateStr = item.date || item.bookingDate || item.scheduledAt || item.createdAt;
                      const timeStr = item.time || item.slotTime || item.scheduledTime;
                      const status = item.bookingStatus || bookingStatusFilter;
                      const location = item.meetingLink || item.location || "Online Session (Video)";

                      return (
                        <div
                          key={bookingId + idx}
                          className="bg-[#FAF7F2] rounded-[24px] border border-[#E5DED6] p-6 hover:bg-white hover:border-[#2C8C91]/40 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white border border-[#E5DED6] grid place-items-center text-[#2C8C91] shrink-0 overflow-hidden shadow-sm">
                              {providerPhoto ? (
                                <Image src={providerPhoto} alt={providerName} width={48} height={48} className="object-cover w-full h-full" />
                              ) : (
                                <User size={20} />
                              )}
                            </div>

                            <div>
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h4 className="text-base font-bold text-[#1F2937]">{title}</h4>
                                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                                  status === "pending"
                                    ? "bg-[#FEF3C7] text-[#92400E] border-[#FCD34D]"
                                    : status === "confirmed"
                                    ? "bg-[#EFFDF4] text-[#065F46] border-[#6EE7B7]"
                                    : "bg-[#EFF6FF] text-[#1E40AF] border-[#93C5FD]"
                                }`}>
                                  {status}
                                </span>
                              </div>

                              <p className="text-xs text-[#5F6B73] font-medium mb-3">
                                Practitioner: <span className="text-[#1F2937] font-bold">{providerName}</span>
                              </p>

                              <div className="flex flex-wrap items-center gap-4 text-xs text-[#8FA8A3]">
                                {dateStr && (
                                  <span className="flex items-center gap-1.5">
                                    <Calendar size={14} className="text-[#2C8C91]" />
                                    {new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                                  </span>
                                )}
                                {timeStr && (
                                  <span className="flex items-center gap-1.5">
                                    <Clock size={14} className="text-[#E8A020]" />
                                    {timeStr}
                                  </span>
                                )}
                                <span className="flex items-center gap-1.5">
                                  <Video size={14} className="text-[#7C5CDB]" />
                                  {location}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 self-start md:self-center pt-3 md:pt-0 border-t md:border-t-0 border-[#E5DED6]">
                            {status === "confirmed" && item.meetingLink && (
                              <a
                                href={item.meetingLink}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-[#2C8C91] text-white rounded-full text-xs font-bold hover:bg-[#216B6F] transition-colors"
                              >
                                <Video size={14} />
                                <span>Join Call</span>
                              </a>
                            )}

                            <span className="text-xs text-[#8FA8A3] font-mono bg-white px-3 py-1.5 rounded-xl border border-[#E5DED6]">
                              Ref: {bookingId.toString().slice(-6).toUpperCase()}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            </motion.div>
          )}

          {/* TAB 3: BADGES DETAILS */}
          {activeTab === "badges" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-[28px] border border-[#E5DED6] p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#FAF7F2] pb-5 mb-6">
                  <div>
                    <h3
                      className="text-xl text-[#1F2937] font-semibold"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      Badge Showcase &amp; Unlock Progress
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#2C8C91] bg-[#FAF7F2] px-3.5 py-1.5 rounded-full border border-[#E5DED6]">
                      {displayBadges.length} Total Badges
                    </span>
                  </div>
                </div>

                {badgesLoading ? (
                  <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
                    <Loader2 size={32} className="animate-spin text-[#2C8C91]" />
                    <p className="text-xs text-[#8FA8A3] font-bold uppercase tracking-wider">Loading badge details...</p>
                  </div>
                ) : badgesError ? (
                  <div className="p-4 bg-[#FFF0F6] border border-[#E05FA0]/30 rounded-2xl flex items-center gap-3 text-xs text-[#E05FA0]">
                    <AlertCircle size={16} />
                    <span>{badgesError}</span>
                  </div>
                ) : displayBadges.length === 0 ? (
                  <div className="py-16 text-center flex flex-col items-center justify-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-[#FAF7F2] grid place-items-center text-[#8FA8A3]">
                      <Award size={24} />
                    </div>
                    <h4 className="text-base font-bold text-[#1F2937]">No Badges Earned Yet</h4>
                    <p className="text-xs text-[#8FA8A3] max-w-sm">
                      Complete daily tasks, log attendance, and engage in community activities to unlock your first badge!
                    </p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayBadges.map((badge, idx) => {
                      const badgeId = badge.badgeId || badge.id || badge.code || `badge_${idx}`;
                      const name = badge.name || badge.title || badgeId.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
                      const description = badge.description || badge.desc || "Awarded for exceptional performance & consistent engagement.";
                      const earnedAt = badge.earnedAt || badge.createdAt || badge.date;
                      const level = badge.level || badge.tier || "Tier 1";

                      return (
                        <div
                          key={badgeId + idx}
                          className="bg-white rounded-[24px] border border-[#E5DED6] p-6 hover:border-[#2C8C91]/40 hover:shadow-[0_8px_32px_-8px_rgba(44,140,145,0.15)] transition-all duration-300 group flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-start justify-between mb-4">
                              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4F04A] to-[#A8C73A] grid place-items-center shadow-md group-hover:scale-110 transition-transform">
                                <Shield size={24} className="text-[#2C8C91]" />
                              </div>
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2C8C91] bg-[#EAF6F4] px-2.5 py-1 rounded-full border border-[#2C8C91]/15">
                                {level}
                              </span>
                            </div>

                            <h4
                              className="text-base font-bold text-[#1F2937] mb-1 group-hover:text-[#2C8C91] transition-colors"
                              style={{ fontFamily: "var(--font-outfit)" }}
                            >
                              {name}
                            </h4>
                            <p className="text-xs text-[#8FA8A3] leading-relaxed mb-4">
                              {description}
                            </p>
                          </div>

                          <div className="pt-4 border-t border-[#FAF7F2] flex items-center justify-between text-[11px]">
                            <span className="text-[#1AAF7E] font-bold flex items-center gap-1">
                              <Check size={13} />
                              Unlocked
                            </span>
                            {earnedAt && (
                              <span className="text-[#8FA8A3] font-medium">
                                {new Date(earnedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 4: MY BOOKMARKS */}
          {activeTab === "bookmarks" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-[28px] border border-[#E5DED6] p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#FAF7F2] pb-5 mb-6">
                  <div>
                    <h3
                      className="text-xl text-[#1F2937] font-semibold"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      Saved Posts &amp; Community Bookmarks
                    </h3>
                  </div>

                  <span className="text-xs font-bold text-[#2C8C91] bg-[#FAF7F2] px-3.5 py-1.5 rounded-full border border-[#E5DED6]">
                    {bookmarks.length} Bookmarked Items
                  </span>
                </div>

                {bookmarksLoading ? (
                  <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
                    <Loader2 size={32} className="animate-spin text-[#2C8C91]" />
                    <p className="text-xs text-[#8FA8A3] font-bold uppercase tracking-wider">Loading saved bookmarks...</p>
                  </div>
                ) : bookmarksError ? (
                  <div className="p-4 bg-[#FFF0F6] border border-[#E05FA0]/30 rounded-2xl flex items-center gap-3 text-xs text-[#E05FA0]">
                    <AlertCircle size={16} />
                    <span>{bookmarksError}</span>
                  </div>
                ) : bookmarks.length === 0 ? (
                  <div className="py-16 text-center flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#FAF7F2] grid place-items-center text-[#8FA8A3]">
                      <Bookmark size={28} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#1F2937]">No Saved Bookmarks Yet</h4>
                      <p className="text-xs text-[#8FA8A3] max-w-sm mt-1">
                        Save informative community discussions, poll results, or articles to reference them anytime from your profile.
                      </p>
                    </div>
                    <Link
                      href="/dashboard/community"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2C8C91] text-white rounded-full text-xs font-bold hover:bg-[#216B6F] transition-colors mt-2"
                    >
                      <span>Explore Community Feed</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {bookmarks.map((item, idx) => {
                      const post = item.postId || item.post || item;
                      const postId = post._id || post.id || item._id || item.id;
                      const authorName = post.student?.name || post.author?.name || post.student?.firstName || "Community Member";
                      const authorRole = post.student?.role || post.author?.role || "Member";
                      const message = post.message || post.content || item.message || "Bookmarked post content";
                      const createdAt = post.createdAt || item.createdAt;

                      return (
                        <div
                          key={postId + idx}
                          className="bg-[#FAF7F2] rounded-[24px] border border-[#E5DED6] p-6 hover:bg-white hover:border-[#2C8C91]/30 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-white border border-[#E5DED6] grid place-items-center text-[#2C8C91] text-xs font-bold uppercase overflow-hidden shrink-0">
                                {post.student?.photo || post.author?.photo ? (
                                  <Image
                                    src={post.student?.photo || post.author?.photo}
                                    alt={authorName}
                                    width={36}
                                    height={36}
                                    className="object-cover w-full h-full"
                                  />
                                ) : (
                                  <User size={16} />
                                )}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h5 className="text-sm font-bold text-[#1F2937]">{authorName}</h5>
                                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#2C8C91] bg-white px-2 py-0.5 rounded border border-[#2C8C91]/10">
                                    {authorRole}
                                  </span>
                                </div>
                                {createdAt && (
                                  <p className="text-[10px] text-[#8FA8A3] font-semibold mt-0.5">
                                    {new Date(createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                                  </p>
                                )}
                              </div>
                            </div>

                            <button
                              onClick={() => handleRemoveBookmark(postId)}
                              disabled={unbookmarkingId === postId}
                              className="p-2 text-[#8FA8A3] hover:text-[#E05FA0] hover:bg-[#FFF0F6] rounded-full border border-transparent hover:border-[#E05FA0]/20 transition-all cursor-pointer"
                              title="Remove bookmark"
                            >
                              {unbookmarkingId === postId ? (
                                <Loader2 size={16} className="animate-spin text-[#E05FA0]" />
                              ) : (
                                <Trash2 size={16} />
                              )}
                            </button>
                          </div>

                          <p className="text-sm text-[#5F6B73] leading-relaxed mb-4 whitespace-pre-line">
                            {message}
                          </p>

                          {post.images && post.images.length > 0 && (
                            <div className="mb-4 rounded-2xl overflow-hidden border border-[#E5DED6] max-h-64 bg-white">
                              <Image
                                src={post.images[0]}
                                alt="Post attachment"
                                width={600}
                                height={260}
                                className="object-cover w-full max-h-64"
                              />
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-3 border-t border-[#E5DED6]/50 text-xs font-bold text-[#8FA8A3]">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Heart size={14} className="text-[#E05FA0]" />
                                {Array.isArray(post.reaction) ? post.reaction.length : (post.likes || 0)} Reactions
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare size={14} className="text-[#2C8C91]" />
                                {post.commentCount || 0} Comments
                              </span>
                            </div>

                            <Link
                              href="/dashboard/community"
                              className="inline-flex items-center gap-1 text-[#2C8C91] hover:underline"
                            >
                              <span>View in Community</span>
                              <ArrowUpRight size={13} />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </div>
      </main>
    </Sidebar>
  );
}
