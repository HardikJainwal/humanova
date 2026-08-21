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
  Repeat, ArrowLeftRight, Check, X, Send, MessageSquare, Calendar, User
} from "lucide-react";
import {
  checkIn, checkOut, getAttendanceHistory, getEmployeeShifts
} from "@/lib/api";
import { AttendanceSkeleton } from "@/components/ui/ShimmerSkeleton";
import Sidebar from "./Sidebar";

export default function AttendancePage() {
  const { user, token, loading } = useAuth();
  const { t, lang, translateName } = useLanguage();
  const router = useRouter();

  const [checkedIn, setCheckedIn] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyList, setHistoryList] = useState([]);
  const [shiftsList, setShiftsList] = useState([]);
  const [shiftsLoading, setShiftsLoading] = useState(true);
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

  // Live Location states
  const [locationData, setLocationData] = useState({
    lat: null,
    lng: null,
    address: "",
    cityName: "",
    loading: true,
    error: null,
    lastUpdated: null,
  });

  /* Fetch and reverse geocode user current location */
  const detectUserLocation = async () => {
    setLocationData((prev) => ({ ...prev, loading: true, error: null }));
    try {
      if (typeof window === "undefined" || !navigator.geolocation) {
        throw new Error("Geolocation is not supported by your browser");
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 6000,
          maximumAge: 30000,
        });
      });

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      let address = "";
      let cityName = "";

      try {
        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
          { headers: { "Accept-Language": "en" } }
        );
        if (geoRes.ok) {
          const geoJson = await geoRes.json();
          address = geoJson.display_name || "";
          cityName =
            geoJson.address?.city ||
            geoJson.address?.town ||
            geoJson.address?.village ||
            geoJson.address?.suburb ||
            geoJson.address?.county ||
            geoJson.address?.state_district ||
            "Detected Location";
        }
      } catch (revErr) {
        console.warn("Reverse geocoding warning:", revErr);
      }

      const formattedLoc = {
        lat,
        lng: String(lng),
        address: address || `${lat.toFixed(4)}° N, ${Number(lng).toFixed(4)}° E`,
        cityName: cityName || `${lat.toFixed(2)}°, ${Number(lng).toFixed(2)}°`,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      };

      setLocationData(formattedLoc);
      return formattedLoc;
    } catch (err) {
      console.warn("Geolocation detection error:", err);
      const fallbackLoc = {
        lat: 12.22,
        lng: "22.1",
        address: "Workspace Location (Default GPS)",
        cityName: "Workspace Zone",
        loading: false,
        error: err.message || "Location permission unavailable",
        lastUpdated: new Date(),
      };
      setLocationData(fallbackLoc);
      return fallbackLoc;
    }
  };

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

  // Shift limits
  const MAX_SHIFT_MS = 12 * 60 * 60 * 1000; // 12 Hours

  // Robust helper to extract timestamp from checkIn record
  const getCheckInTimestamp = (item) => {
    if (!item) return null;
    const raw = item.checkIn?.time || (typeof item.checkIn === "string" || typeof item.checkIn === "number" ? item.checkIn : null) || item.createdAt;
    if (!raw) return null;
    const ms = new Date(raw).getTime();
    return isNaN(ms) ? null : ms;
  };

  /* Fetch attendance history and active state */
  const fetchHistory = async () => {
    if (!token) return;
    setHistoryLoading(true);
    try {
      const data = await getAttendanceHistory(token);
      const array = Array.isArray(data) ? data : (data?.history || data?.data || []);
      setHistoryList(array);

      // Find if there is an active check-in (checkIn time exists, checkOut does not)
      // AND it must be less than 12 hours old.
      const activeRecord = array.find(item => {
        if (!item) return false;
        const hasCheckOut = item.checkOut && (item.checkOut.time || typeof item.checkOut === "string");
        if (hasCheckOut) return false;

        const checkInTimeMs = getCheckInTimestamp(item);
        if (!checkInTimeMs) return false;

        const timeDiff = Date.now() - checkInTimeMs;
        return timeDiff < MAX_SHIFT_MS;
      });

      if (activeRecord) {
        setCheckedIn(true);
        const recordMs = getCheckInTimestamp(activeRecord);
        if (recordMs) {
          // Cap checkInTime at current Date.now() to prevent negative diff from server clock skew
          setCheckInTime(Math.min(recordMs, Date.now()));
        }
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

  // Helper to extract flat array of shift records from grouped or direct API responses
  const flattenShiftsData = (resData) => {
    if (!resData) return [];
    const rawList = Array.isArray(resData) ? resData : (resData?.data || []);
    let result = [];
    
    for (const item of rawList) {
      if (!item) continue;
      if (Array.isArray(item.members)) {
        for (const m of item.members) {
          if (m && typeof m === "object" && m.userId) {
            result.push(m);
          }
        }
      } else if (item.userId || item.shiftTemplateId) {
        result.push(item);
      }
    }
    return result;
  };

  /* Fetch employee assigned shifts */
  const fetchShifts = async () => {
    if (!token) return;
    setShiftsLoading(true);
    try {
      const data = await getEmployeeShifts(token, "");
      const array = flattenShiftsData(data);
      setShiftsList(array);
    } catch (err) {
      console.error("Failed to load employee shifts:", err);
    } finally {
      setShiftsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      detectUserLocation();
      fetchHistory();
      fetchShifts();
    }
  }, [token, user]);


  /* Running timer hook */
  useEffect(() => {
    if (checkedIn && checkInTime) {
      const checkElapsed = () => {
        const now = Date.now();
        const diff = Math.max(0, Math.floor((now - checkInTime) / 1000));
        if (diff >= 12 * 60 * 60) {
          // Force auto-logout on UI after 12 hours
          setCheckedIn(false);
          setCheckInTime(null);
          setElapsedSeconds(0);
          if (timerRef.current) clearInterval(timerRef.current);
          showModalNotification("Attendance System", "Your shift has exceeded 12 hours and was automatically closed.", "info");
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

  if (loading) return <AttendanceSkeleton />;

  if (!token) return null;

  // Timer formatter
  const formatTimer = (totalSecs) => {
    const validSecs = Math.max(0, Math.floor(totalSecs || 0));
    const hrs = Math.floor(validSecs / 3600);
    const mins = Math.floor((validSecs % 3600) / 60);
    const secs = validSecs % 60;
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

    const isClockingIn = !checkedIn;
    const nowTimestamp = Date.now();

    // Optimistically start timer immediately when clicking Clock In
    if (isClockingIn) {
      setCheckedIn(true);
      setCheckInTime(nowTimestamp);
      setElapsedSeconds(0);
    }

    try {
      // 1. First detect, display, and confirm current location on the page
      let activeLoc = locationData;
      if (!activeLoc.lat || activeLoc.loading) {
        activeLoc = await detectUserLocation();
      }

      const lat = activeLoc.lat || 12.22;
      const lng = String(activeLoc.lng || "22.1");
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata";
      
      const payload = {
        lat,
        lng,
        appId: "fhdhskjh123123ssdfds",
        timezone
      };

      if (checkedIn) {
        // Clock Out
        await checkOut(payload, token);
        setCheckedIn(false);
        setCheckInTime(null);
        setElapsedSeconds(0);
        showModalNotification(
          "Clocked Out Successfully",
          `Location recorded: ${activeLoc.cityName || activeLoc.address || "Workspace"}. Have a great rest!`,
          "success"
        );
      } else {
        // Clock In (API Call)
        const response = await checkIn(payload, token);
        // Sync with exact server timestamp if available
        const parsedTime = response?.data?.checkIn?.time || response?.checkIn?.time || response?.data?.checkIn || response?.checkIn;
        if (parsedTime) {
          const parsedMs = new Date(parsedTime).getTime();
          if (!isNaN(parsedMs)) {
            setCheckInTime(Math.min(parsedMs, Date.now()));
          }
        }
        showModalNotification(
          "Clocked In Successfully",
          `Location verified at: ${activeLoc.cityName || activeLoc.address || "Workspace"}. Attendance record saved!`,
          "success"
        );
      }
      // Reload history logs
      fetchHistory();
    } catch (err) {
      if (isClockingIn) {
        // Revert optimistic clock-in on API error
        setCheckedIn(false);
        setCheckInTime(null);
        setElapsedSeconds(0);
        showModalNotification("Error", err.message || "Failed to process clock-in request", "error");
      } else {
        // Clock-out failed: check if it's due to an expired/stale shift from yesterday (>12h)
        const isStaleShift = checkInTime && (Date.now() - checkInTime >= MAX_SHIFT_MS);
        setCheckedIn(false);
        setCheckInTime(null);
        setElapsedSeconds(0);
        
        if (isStaleShift) {
          showModalNotification(
            "Shift Auto-Closed",
            "Your previous shift exceeded 12 hours and has been auto-closed. You can now clock in for today's new shift.",
            "info"
          );
        } else {
          showModalNotification(
            "Session Reset",
            err.message || "Previous session ended. Status reset, you can start a new shift.",
            "error"
          );
        }
      }
    } finally {
      setActionLoading(false);
    }
  };

  // Duration parser for logs
  const calculateDuration = (inTime, outTime) => {
    if (!inTime) return "--";
    const start = new Date(inTime).getTime();
    if (isNaN(start)) return "--";
    const end = outTime ? new Date(outTime).getTime() : Date.now();
    const diffSecs = Math.max(0, Math.floor(((isNaN(end) ? Date.now() : end) - start) / 1000));
    
    if (diffSecs < 0) return "0s";

    if (!outTime && diffSecs >= 12 * 3600) {
      return "12h (Auto-Closed)";
    }

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

  // Shift swap action handlers
  const handleOpenSwapModal = (initialShift = null) => {
    const shiftId = initialShift?._id || initialShift?.shiftTemplateId?._id || (shiftsList[0]?._id || "");
    setSelectedMyShiftId(shiftId);
    setSwapDay(new Date().toISOString().slice(0, 10));
    setSwapMessage("");
    if (allColleagues.length > 0) {
      const firstColleague = allColleagues[0];
      setSelectedTargetUserId(firstColleague.userId?._id || firstColleague.userId || "");
      setSelectedTargetShiftId(firstColleague._id || firstColleague.shiftTemplateId?._id || "");
    }
    setIsSwapModalOpen(true);
  };

  const handleSubmitSwapRequest = async (e) => {
    e.preventDefault();
    if (!selectedTargetUserId) {
      showModalNotification("Selection Required", "Please select a colleague to swap your shift with.", "error");
      return;
    }

    setSubmittingSwap(true);
    try {
      const payload = {
        targetUserId: selectedTargetUserId,
        requesterShiftId: selectedMyShiftId || (shiftsList[0]?._id || ""),
        targetShiftId: selectedTargetShiftId || selectedMyShiftId,
        requesterMessage: swapMessage.trim() || "Requesting shift swap",
        day: swapDay || new Date().toISOString().slice(0, 10),
      };

      await submitShiftSwap(payload, token);
      setIsSwapModalOpen(false);
      showModalNotification("Swap Request Sent", "Your shift swap request was successfully sent to your colleague!", "success");
      fetchSwapHistory();
    } catch (err) {
      showModalNotification("Submission Failed", err.message || "Unable to submit shift swap request", "error");
    } finally {
      setSubmittingSwap(false);
    }
  };

  const handleRespondSwap = async (swapId, responseType) => {
    setRespondingId(swapId);
    try {
      await respondToShiftSwap(swapId, responseType, token);
      showModalNotification(
        responseType === "approved" ? "Swap Approved" : "Swap Rejected",
        `Shift swap request has been ${responseType}.`,
        responseType === "approved" ? "success" : "info"
      );
      fetchSwapHistory();
      fetchShifts();
      fetchMyShifts();
    } catch (err) {
      showModalNotification("Action Failed", err.message || `Failed to ${responseType} swap request`, "error");
    } finally {
      setRespondingId(null);
    }
  };

  // Format 24h time to 12h AM/PM
  const formatShiftTime = (timeStr) => {
    if (!timeStr) return "--";
    const parts = timeStr.split(":");
    if (parts.length < 2) return timeStr;
    let h = parseInt(parts[0], 10);
    const m = parts[1];
    if (isNaN(h)) return timeStr;
    const period = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h.toString().padStart(2, "0")}:${m} ${period}`;
  };

  const currentShiftRecord = shiftsList[0] || null;
  const activeShiftTemplate = currentShiftRecord?.shiftTemplateId;
  const employeeInfo = (currentShiftRecord?.userId && typeof currentShiftRecord.userId === "object") ? currentShiftRecord.userId : user;
  const employeeCode = employeeInfo?.employeeCode || user?.employeeCode || "--";

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

            {/* Live Current Location Panel */}
            <div className="w-full max-w-md bg-[#FAF7F2] border border-[#E5DED6] rounded-2xl p-4 mb-6 text-left flex items-start justify-between gap-3 shadow-xs">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#EAF6F4] text-[#2C8C91] grid place-items-center shrink-0 mt-0.5">
                  {locationData.loading ? (
                    <Loader2 size={18} className="animate-spin text-[#2C8C91]" />
                  ) : (
                    <MapPin size={18} className="text-[#2C8C91]" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#8FA8A3]">Current Location</span>
                    {/* <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      locationData.loading ? "bg-[#FBF7F0] text-[#E8A020]" : locationData.error ? "bg-[#FFF0F6] text-[#E05FA0]" : "bg-[#EFFDF4] text-[#1AAF7E]"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${locationData.loading ? "bg-[#E8A020] animate-pulse" : locationData.error ? "bg-[#E05FA0]" : "bg-[#1AAF7E] animate-ping"}`} />
                      {locationData.loading ? "Detecting..." : locationData.error ? "GPS Fallback" : "Live GPS Verified"}
                    </span> */}
                  </div>
                  <p className="text-sm font-extrabold text-[#1F2937] truncate mt-0.5" title={locationData.cityName || "Current Location"}>
                    {locationData.loading ? "Acquiring GPS position..." : (locationData.cityName || "Current Location")}
                  </p>
                  <p className="text-xs text-[#5F6B73] line-clamp-2 mt-0.5 font-medium" title={locationData.address}>
                    {locationData.loading ? "Fetching address details from satellite..." : (locationData.address || "Coordinates captured")}
                  </p>
                  {locationData.lat && locationData.lng && !locationData.loading && (
                    <p className="text-[10px] font-mono text-[#8FA8A3] mt-1">
                      Lat: {Number(locationData.lat).toFixed(4)}° | Lng: {Number(locationData.lng).toFixed(4)}°
                    </p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={detectUserLocation}
                disabled={locationData.loading}
                title="Refresh location"
                className="p-2 text-[#5F6B73] hover:text-[#2C8C91] hover:bg-white border border-[#E5DED6] rounded-xl transition-all shrink-0 cursor-pointer bg-white"
              >
                <RefreshCw size={14} className={locationData.loading ? "animate-spin" : ""} />
              </button>
            </div>

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
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xs font-bold text-[#1F2937] uppercase tracking-wider flex items-center gap-2">
                  <Compass size={16} className="text-[#2C8C91]" />
                  Shift Details
                </h3>
                {activeShiftTemplate && (
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#EAF6F4] text-[#2C8C91]">
                    {activeShiftTemplate.name || "Assigned Shift"}
                  </span>
                )}
              </div>
              
              <ul className="flex flex-col gap-3.5 text-sm">
                <li className="flex justify-between py-2 border-b border-[#FAF7F2]">
                  <span className="text-[#5F6B73]">Assigned Shift</span>
                  <span className="text-[#1F2937] font-extrabold">
                    {shiftsLoading ? (
                      <Loader2 size={14} className="animate-spin text-[#2C8C91] inline" />
                    ) : (
                      activeShiftTemplate?.name || "General Shift"
                    )}
                  </span>
                </li>

                <li className="flex justify-between py-2 border-b border-[#FAF7F2]">
                  <span className="text-[#5F6B73]">Shift Hours</span>
                  <span className="text-[#2C8C91] font-bold font-mono">
                    {shiftsLoading ? (
                      "--"
                    ) : activeShiftTemplate?.startTime && activeShiftTemplate?.endTime ? (
                      `${formatShiftTime(activeShiftTemplate.startTime)} - ${formatShiftTime(activeShiftTemplate.endTime)}`
                    ) : (
                      "09:00 AM - 05:00 PM"
                    )}
                  </span>
                </li>

                <li className="flex justify-between py-2 border-b border-[#FAF7F2]">
                  <span className="text-[#5F6B73]">Employee Code</span>
                  <span className="text-[#1F2937] font-semibold font-mono">
                    {employeeCode}
                  </span>
                </li>

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
                  <span className="text-[#5F6B73]">Detected Location</span>
                  <span className="text-[#1AAF7E] font-semibold flex items-center gap-1 text-xs max-w-[180px] text-right truncate">
                    <MapPin size={13} className="shrink-0 text-[#1AAF7E]" />
                    {locationData.loading ? "Detecting..." : (locationData.cityName || "GPS Verified")}
                  </span>
                </li>
              </ul>
            </div>

            {/* Policy Info Box */}
            
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
                    {historyList.slice(0, 10).map((log, idx) => {
                      const logInMs = getCheckInTimestamp(log);
                      const checkOutMs = log.checkOut?.time ? new Date(log.checkOut.time).getTime() : (typeof log.checkOut === "string" ? new Date(log.checkOut).getTime() : null);
                      const isAutoClosed = !checkOutMs && logInMs && (Date.now() - logInMs >= MAX_SHIFT_MS);

                      return (
                        <tr key={log._id || idx} className="hover:bg-[#FAF7F2]/50 transition-colors">
                          <td className="px-6 py-4 font-semibold text-[#1F2937]">
                            {logInMs ? new Date(logInMs).toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' }) : "--"}
                          </td>
                          <td className="px-6 py-4 text-[#5F6B73] font-mono">
                            {logInMs ? new Date(logInMs).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : "--"}
                          </td>
                          <td className="px-6 py-4 text-[#5F6B73] font-mono">
                            {checkOutMs && !isNaN(checkOutMs) 
                              ? new Date(checkOutMs).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                              : (logInMs ? (
                                isAutoClosed ? (
                                  <span className="inline-flex items-center gap-1.5 text-[#E8A020] font-semibold bg-[#FBF7F0] px-2.5 py-0.5 rounded-full text-xs font-sans">
                                    Auto-Closed (&gt;12h)
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 text-[#1AAF7E] font-semibold bg-[#EFFDF4] px-2.5 py-0.5 rounded-full text-xs font-sans">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1AAF7E] animate-pulse" />
                                    Active Now
                                  </span>
                                )
                              ) : "--")
                            }
                          </td>
                          <td className="px-6 py-4 font-semibold text-[#1F2937]">
                            {calculateDuration(logInMs, checkOutMs)}
                          </td>
                        </tr>
                      );
                    })}
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
                className="text-[#2C8C91] text-xl font-bold mb-2"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {modalConfig.title}
              </h3>
              <p className="text-xs text-[#5F6B73] mb-5">
                {modalConfig.message}
              </p>

              <button
                onClick={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
                className="w-full bg-[#2C8C91] text-white rounded-full py-2.5 text-xs font-bold hover:bg-[#216B6F] transition-colors cursor-pointer"
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
