"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock, ArrowLeft, CalendarDays, Activity, Play, Square,
  MapPin, Loader2, Sparkles, UserCheck, AlertTriangle, Compass,
  ChevronRight, CalendarClock, Shield, RefreshCw, LogIn, LogOut, CheckCircle2,
} from "lucide-react";
import { checkIn, checkOut, getAttendanceHistory } from "@/lib/api";
import Sidebar from "./Sidebar";

export default function AttendancePage() {
  const { user, token, loading } = useAuth();
  const { t, lang, translateName } = useLanguage();
  const router = useRouter();

  const [checkedIn, setCheckedIn] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyList, setHistoryList] = useState([]);
  const [translatedFirstName, setTranslatedFirstName] = useState("");

  // Custom modal config
  const [modalConfig, setModalConfig] = useState({ isOpen: false, title: "", message: "", type: "success" });

  const showModalNotification = (title, message, type = "success") => {
    setModalConfig({ isOpen: true, title, message, type });
  };

  // Timer states
  const [checkInTime, setCheckInTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef(null);

  /* Auth guard */
  useEffect(() => {
    if (!loading && !token) router.push("/login");
  }, [loading, token, router]);

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

  /* Fetch attendance history and active state */
  const fetchHistory = async () => {
    if (!token) return;
    setHistoryLoading(true);
    try {
      const data = await getAttendanceHistory(token);
      const array = Array.isArray(data) ? data : (data?.history || data?.data || []);
      setHistoryList(array);

      // Find if there is an active check-in (checkIn.time exists, checkOut or checkOut.time does not)
      // AND it must be less than 24 hours old.
      const activeRecord = array.find(item => {
        if (item && item.checkIn?.time && (!item.checkOut || !item.checkOut.time)) {
          const checkInTimeMs = new Date(item.checkIn.time).getTime();
          const timeDiff = Date.now() - checkInTimeMs;
          return timeDiff < 24 * 60 * 60 * 1000;
        }
        return false;
      });

      if (activeRecord) {
        setCheckedIn(true);
        setCheckInTime(new Date(activeRecord.checkIn.time).getTime());
      } else {
        setCheckedIn(false);
        setCheckInTime(null);
        setElapsedSeconds(0);
      }
    } catch (err) {
      console.error("Failed to load attendance history:", err);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchHistory();
    }
  }, [token]);

  /* Running timer hook */
  useEffect(() => {
    if (checkedIn && checkInTime) {
      const checkElapsed = () => {
        const diff = Math.floor((Date.now() - checkInTime) / 1000);
        if (diff >= 24 * 60 * 60) {
          // Force auto-logout on UI after 24 hours
          setCheckedIn(false);
          setCheckInTime(null);
          setElapsedSeconds(0);
          if (timerRef.current) clearInterval(timerRef.current);
          showModalNotification("Attendance System", "Your shift has exceeded 24 hours and was automatically closed.", "info");
        } else {
          setElapsedSeconds(diff);
        }
      };

      checkElapsed();
      timerRef.current = setInterval(checkElapsed, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setElapsedSeconds(0);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [checkedIn, checkInTime]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-[#2C8C91] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#5F6B73] text-sm">{t("loading.dashboard")}</p>
        </div>
      </div>
    );
  }

  if (!token) return null;

  // Timer formatter
  const formatTimer = (totalSecs) => {
    if (totalSecs < 0) totalSecs = 0;
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return [
      hrs.toString().padStart(2, "0"),
      mins.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0")
    ].join(":");
  };

  // Clock-in / out handler
  const handleToggleAttendance = async () => {
    if (actionLoading) return;
    setActionLoading(true);

    try {
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
          console.warn("Geolocation failed, using fallback:", geoErr);
        }
      }

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata";
      const payload = { lat, lng, appId: "fhdhskjh123123ssdfds", timezone };

      if (checkedIn) {
        // Clock Out
        await checkOut(payload, token);
        setCheckedIn(false);
        setCheckInTime(null);
        setElapsedSeconds(0);
        showModalNotification("Success", "Clocked out successfully!", "success");
      } else {
        // Clock In
        const response = await checkIn(payload, token);
        setCheckedIn(true);
        // Set state to current timestamp or response timestamp if available
        const parsedTime = response?.data?.checkIn?.time || response?.checkIn?.time || response?.data?.checkIn || response?.checkIn || new Date().toISOString();
        setCheckInTime(new Date(parsedTime).getTime());
        showModalNotification("Success", "Clocked in successfully!", "success");
      }
      // Reload history logs
      fetchHistory();
    } catch (err) {
      showModalNotification("Error", err.message || "Failed to process attendance request", "error");
    } finally {
      setActionLoading(false);
    }
  };

  // Duration parser for logs
  const calculateDuration = (inTime, outTime) => {
    if (!inTime) return "--";
    const start = new Date(inTime).getTime();
    const end = outTime ? new Date(outTime).getTime() : Date.now();
    const diffSecs = Math.floor((end - start) / 1000);
    
    if (diffSecs < 0) return "0s";
    const hrs = Math.floor(diffSecs / 3600);
    const mins = Math.floor((diffSecs % 3600) / 60);
    const secs = diffSecs % 60;
    
    if (!outTime) return "Active";
    return `${hrs > 0 ? `${hrs}h ` : ""}${mins > 0 ? `${mins}m ` : ""}${secs}s`;
  };

  // Stats Card Calculations
  const firstClockIn = historyList.length > 0 && historyList[0]?.checkIn?.time
    ? new Date(historyList[0].checkIn.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : "--";

  return (
    <Sidebar>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb / Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => router.push("/dashboard")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#5F6B73] hover:text-[#1F2937] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>

          <span className="text-xs font-semibold text-[#8FA8A3] bg-white border border-[#E5DED6] px-3.5 py-1.5 rounded-full">
            Shift Management
          </span>
        </div>

        {/* Title Block */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>
            Clock In / Out Panel
          </h1>
          <p className="text-[#5F6B73] text-sm mt-1">Real-time attendance intelligence & shift timer sync.</p>
        </div>

        {/* ── TOP STATS GRID (Pre-fill layout emptiness) ──────────────────── */}
        <section className="grid sm:grid-cols-3 gap-5 mb-8">
          {/* Card 1: Today's Status */}
          <div className="bg-white rounded-2xl border border-[#E5DED6] p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl grid place-items-center ${
              checkedIn ? "bg-[#EFFDF4] text-[#1AAF7E]" : "bg-[#FFF0F6] text-[#E05FA0]"
            }`}>
              <UserCheck size={22} />
            </div>
            <div>
              <p className="text-xs text-[#8FA8A3] uppercase tracking-wider font-bold">Shift Status</p>
              <p className="text-lg font-extrabold text-[#1F2937] mt-0.5">
                {checkedIn ? "Active Now" : "Inactive / Closed"}
              </p>
            </div>
          </div>

          {/* Card 2: Shift Start */}
          <div className="bg-white rounded-2xl border border-[#E5DED6] p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F4F9F8] text-[#2C8C91] grid place-items-center">
              <Clock size={22} />
            </div>
            <div>
              <p className="text-xs text-[#8FA8A3] uppercase tracking-wider font-bold">First Clock-in</p>
              <p className="text-lg font-extrabold text-[#1F2937] mt-0.5">
                {firstClockIn}
              </p>
            </div>
          </div>

          {/* Card 3: Total Logs Today */}
          <div className="bg-white rounded-2xl border border-[#E5DED6] p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FBF7F0] text-[#E8A020] grid place-items-center">
              <Activity size={22} />
            </div>
            <div>
              <p className="text-xs text-[#8FA8A3] uppercase tracking-wider font-bold">Active Time Today</p>
              <p className="text-lg font-extrabold text-[#1F2937] mt-0.5">
                {checkedIn ? formatTimer(elapsedSeconds) : (historyList[0] ? calculateDuration(historyList[0].checkIn?.time, historyList[0].checkOut?.time) : "--")}
              </p>
            </div>
          </div>
        </section>

        {/* Dial & Location details Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-10">
          
          {/* Main Dial Card */}
          <div className="lg:col-span-7 bg-white rounded-[28px] border border-[#E5DED6] p-8 text-center relative overflow-hidden flex flex-col items-center">
            
            {/* Soft decorative blur circles */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#2C8C91]/5 blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-[#E8A020]/5 blur-3xl -z-10" />

            {/* Glowing clock dial */}
            <div className={`w-64 h-64 rounded-full border-[6px] flex flex-col items-center justify-center mb-8 relative transition-all duration-500 ${
              checkedIn 
                ? "border-[#2C8C91] bg-gradient-to-b from-[#2C8C91]/5 to-transparent shadow-[0_12px_40px_rgba(44,140,145,0.15)]" 
                : "border-[#E5DED6] bg-transparent"
            }`}>
              
              {/* Pulsing visual feedback */}
              {checkedIn && (
                <motion.div 
                  animate={{ scale: [1, 1.06, 1], opacity: [0.12, 0.04, 0.12] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full bg-[#2C8C91]"
                />
              )}

              <Clock size={32} className={`mb-2.5 ${checkedIn ? "text-[#2C8C91]" : "text-[#8FA8A3]"}`} />
              
              <div className="text-4xl font-extrabold text-[#1F2937] tracking-tight font-mono">
                {formatTimer(elapsedSeconds)}
              </div>
              
              <div className="text-xs uppercase tracking-[0.15em] text-[#8FA8A3] font-bold mt-2.5 flex items-center gap-1.5">
                {checkedIn ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-[#1AAF7E] animate-ping" />
                    <span className="text-[#1AAF7E]">Logged In</span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-[#E05FA0]" />
                    <span className="text-[#E05FA0]">Logged Out</span>
                  </>
                )}
              </div>

              {checkedIn && checkInTime && (
                <div className="text-[10px] text-[#5F6B73] font-medium mt-2 bg-[#FAF7F2] border border-[#E5DED6] px-2.5 py-1 rounded-full">
                  Started: {new Date(checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              )}
            </div>

            {/* Core control toggle button */}
            <button
              onClick={handleToggleAttendance}
              disabled={actionLoading}
              className={`w-full max-w-xs group inline-flex items-center justify-center gap-3 rounded-full py-4 text-sm font-extrabold transition-all duration-300 cursor-pointer shadow-lg ${
                checkedIn 
                  ? "bg-[#FFF0F6] text-[#E05FA0] hover:bg-[#FFE0ED] hover:shadow-[0_8px_30px_rgba(224,95,160,0.2)]" 
                  : "bg-[#2C8C91] text-white hover:bg-[#216B6F] hover:shadow-[0_8px_30px_rgba(44,140,145,0.3)]"
              } ${actionLoading ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {actionLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Updating server logs...
                </>
              ) : checkedIn ? (
                <>
                  <Square size={14} fill="currentColor" className="text-[#E05FA0]" />
                  Clock Out Shift
                </>
              ) : (
                <>
                  <Play size={14} fill="currentColor" className="text-white" />
                  Clock In Shift
                </>
              )}
            </button>
          </div>
          

          {/* Details & Help Box */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Shift metadata details */}
            <div className="bg-white rounded-[28px] border border-[#E5DED6] p-6 shadow-sm">
              <h3 className="text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-5 flex items-center gap-2">
                <Compass size={16} className="text-[#2C8C91]" />
                Shift Details
              </h3>
              
              <ul className="flex flex-col gap-4 text-sm">
                <li className="flex justify-between py-2 border-b border-[#FAF7F2]">
                  <span className="text-[#5F6B73]">Current Status</span>
                  <span className={`font-semibold ${checkedIn ? "text-[#1AAF7E]" : "text-[#E05FA0]"}`}>
                    {checkedIn ? "Clocked In" : "Clocked Out"}
                  </span>
                </li>
                <li className="flex justify-between py-2 border-b border-[#FAF7F2]">
                  <span className="text-[#5F6B73]">Active Timezone</span>
                  <span className="text-[#1F2937] font-semibold">
                    {Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata"}
                  </span>
                </li>
                <li className="flex justify-between py-2">
                  <span className="text-[#5F6B73]">Location Status</span>
                  <span className="text-[#1AAF7E] font-semibold flex items-center gap-1">
                    <MapPin size={14} />
                    GPS Verified
                  </span>
                </li>
              </ul>
            </div>

            {/* Policy Info Box */}
            <div className="bg-[#EAF6F4] rounded-[28px] border border-[#2C8C91]/10 p-6 flex gap-4">
              <Shield size={24} className="text-[#2C8C91] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[#0E3D39] font-bold text-sm mb-1">Secure Attendance tracking</h4>
                <p className="text-[#2C8C91] text-xs leading-relaxed">
                  Location details are analyzed only at the exact moments of check-in and check-out to verify workspace presence.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Shift log table */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#1F2937] text-lg font-bold flex items-center gap-2" style={{ fontFamily: "var(--font-outfit)" }}>
              <CalendarDays size={20} className="text-[#2C8C91]" />
              Recent Shift History
            </h2>
            <button 
              onClick={fetchHistory}
              disabled={historyLoading}
              className="text-[#5F6B73] hover:text-[#1F2937] p-2 hover:bg-white border border-[#E5DED6] rounded-full transition-all cursor-pointer bg-white"
            >
              <RefreshCw size={14} className={historyLoading ? "animate-spin" : ""} />
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-[#E5DED6] overflow-hidden shadow-sm">
            {historyLoading ? (
              <div className="py-16 text-center text-[#8FA8A3] text-sm flex flex-col items-center gap-3">
                <Loader2 className="animate-spin text-[#2C8C91]" size={28} />
                Loading logs...
              </div>
            ) : historyList.length === 0 ? (
              <div className="py-16 text-center text-[#8FA8A3] text-sm flex flex-col items-center gap-3">
                <CalendarClock size={36} className="text-[#8FA8A3]/40" />
                No shift history found for this period.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#FAF7F2] text-[#5F6B73] font-semibold border-b border-[#E5DED6]">
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Clock In</th>
                      <th className="px-6 py-4">Clock Out</th>
                      <th className="px-6 py-4">Total Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#FAF7F2]">
                    {historyList.slice(0, 10).map((log, idx) => (
                      <tr key={log._id || idx} className="hover:bg-[#FAF7F2]/50 transition-colors">
                        <td className="px-6 py-4 font-semibold text-[#1F2937]">
                          {new Date(log.checkIn?.time || log.createdAt).toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' })}
                        </td>
                        <td className="px-6 py-4 text-[#5F6B73] font-mono">
                          {log.checkIn?.time ? new Date(log.checkIn.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : "--"}
                        </td>
                        <td className="px-6 py-4 text-[#5F6B73] font-mono">
                          {log.checkOut && log.checkOut.time 
                            ? new Date(log.checkOut.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                            : (log.checkIn?.time ? (
                              <span className="inline-flex items-center gap-1.5 text-[#1AAF7E] font-semibold bg-[#EFFDF4] px-2.5 py-0.5 rounded-full text-xs font-sans">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#1AAF7E] animate-pulse" />
                                Active Now
                              </span>
                            ) : "--")
                          }
                        </td>
                        <td className="px-6 py-4 font-semibold text-[#1F2937]">
                          {calculateDuration(log.checkIn?.time, log.checkOut?.time)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

      </main>

      {/* ── CUSTOM ALERT MODAL ────────────────────────── */}
      <AnimatePresence>
        {modalConfig.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-[28px] p-6 max-w-sm w-full text-center shadow-[0_24px_60px_-12px_rgba(0,0,0,0.25)] border border-[#E5DED6]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`w-14 h-14 rounded-full grid place-items-center mx-auto mb-4 ${
                modalConfig.type === "success" 
                  ? "bg-[#EFFDF4] text-[#1AAF7E]" 
                  : modalConfig.type === "error" 
                  ? "bg-[#FFF0F6] text-[#E05FA0]" 
                  : "bg-[#FAF7F2] text-[#2C8C91]"
              }`}>
                {modalConfig.type === "success" ? (
                  <CheckCircle2 size={28} />
                ) : modalConfig.type === "error" ? (
                  <AlertTriangle size={28} />
                ) : (
                  <Clock size={28} />
                )}
              </div>

              <h3
                className="text-[#0E3D39] text-xl font-bold mb-2"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {modalConfig.title}
              </h3>
              <p className="text-[#5F6B73] text-xs leading-relaxed mb-6">
                {modalConfig.message}
              </p>

              <button
                onClick={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
                className="w-full bg-[#0E3D39] text-white rounded-full py-2.5 text-xs font-bold hover:bg-[#215B54] transition-colors cursor-pointer"
              >
                Okay
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Sidebar>
  );
}
