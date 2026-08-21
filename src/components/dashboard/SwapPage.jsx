"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeftRight, CalendarClock, Clock, User, Users,
  CheckCircle2, AlertCircle, RefreshCw, Send,
  ChevronDown, ArrowLeft, Plus, Check, X, Calendar, MessageSquare, Loader2
} from "lucide-react";
import {
  getMyShifts,
  getEmployeeShifts,
  getShiftSwapHistory,
  submitShiftSwap,
  respondToShiftSwap,
  extractSchoolId,
  extractStudentId
} from "@/lib/api";
import { SwapSkeleton } from "@/components/ui/ShimmerSkeleton";
import Sidebar from "./Sidebar";

export default function SwapPage() {
  const { user, token, loading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  // Data states
  const [myShifts, setMyShifts] = useState([]);
  const [allColleaguesShifts, setAllColleaguesShifts] = useState([]);
  const [swapHistory, setSwapHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("incoming"); // "incoming" | "outgoing"

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [respondingId, setRespondingId] = useState(null);

  // Form Fields
  const [selectedDateStr, setSelectedDateStr] = useState("");
  const [selectedMyShiftId, setSelectedMyShiftId] = useState("");
  const [selectedTargetUserId, setSelectedTargetUserId] = useState("");
  const [selectedTargetShiftId, setSelectedTargetShiftId] = useState("");
  const [reason, setReason] = useState("");

  // Notification Toast Modal
  const [notification, setNotification] = useState({ isOpen: false, title: "", message: "", type: "success" });

  const showNotification = (title, message, type = "success") => {
    setNotification({ isOpen: true, title, message, type });
  };

  // Auth Guard
  useEffect(() => {
    if (!loading && !token) router.push("/login");
  }, [loading, token, router]);

  // Generate 7 upcoming dates starting today
  const getUpcoming7Days = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      const dayName = d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
      const dayNum = d.getDate();
      const monthNum = d.getMonth() + 1;
      const yearNum = d.getFullYear();

      const formattedIso = d.toISOString().slice(0, 10);
      const displayLabel = `${d.toLocaleDateString("en-US", { weekday: "short" })}, ${dayNum}/${monthNum}/${yearNum}`;

      dates.push({
        iso: formattedIso,
        label: displayLabel,
        dayName,
        dateFormatted: `${dayNum}/${monthNum}`,
        dateObj: d,
        isToday: i === 0,
      });
    }
    return dates;
  };

  const upcoming7Days = getUpcoming7Days();

  // Set default selected date
  useEffect(() => {
    if (upcoming7Days.length > 0 && !selectedDateStr) {
      setSelectedDateStr(upcoming7Days[0].iso);
    }
  }, []);

  // Helper to extract flat list from API shifts data
  const flattenShifts = (resData) => {
    if (!resData) return [];
    const rawList = Array.isArray(resData) ? resData : (resData?.data || resData?.shifts || []);
    let result = [];
    for (const item of rawList) {
      if (!item) continue;
      if (Array.isArray(item.members)) {
        for (const m of item.members) {
          if (m && typeof m === "object") {
            result.push(m);
          }
        }
      } else if (item.userId || item.studentId || item.shiftTemplateId || item._id) {
        result.push(item);
      }
    }
    return result;
  };

  // Robust User Object Extractor & Name Formatter
  const currentUserId = user?._id || user?.id || user?.studentId || extractStudentId(user, token) || "";

  const formatUserName = (userEntity, fallbackLabel = "Employee") => {
    if (!userEntity) return fallbackLabel;

    let targetObj = userEntity;
    if (typeof userEntity === "object") {
      targetObj = userEntity.userId || userEntity.studentId || userEntity.user || userEntity;
    }

    if (typeof targetObj === "object" && targetObj !== null) {
      const fn = (targetObj.firstName || targetObj.first_name || targetObj.givenName || "").trim();
      const ln = (targetObj.lastName || targetObj.last_name || targetObj.familyName || "").trim();
      if (fn || ln) return `${fn} ${ln}`.trim();
      if (targetObj.name) return targetObj.name;
      if (targetObj.fullName) return targetObj.fullName;
      if (targetObj.studentName) return targetObj.studentName;
      if (targetObj.email) return targetObj.email.split("@")[0];
      if (targetObj.employeeCode) return `Employee ${targetObj.employeeCode}`;
    }

    if (typeof userEntity === "string" && userEntity.trim()) {
      const idStr = userEntity.trim();
      if (idStr === currentUserId) {
        const myName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
        if (myName) return myName;
        if (user?.email) return user.email.split("@")[0];
        return "You";
      }

      // Check in colleagues shifts list
      const matchedShift = allColleaguesShifts.find((s) => {
        const u = s.userId || s.studentId || s.user;
        const uId = typeof u === "object" ? (u._id || u.id) : u;
        return uId === idStr;
      });

      if (matchedShift) {
        const uObj = matchedShift.userId || matchedShift.studentId || matchedShift.user;
        if (typeof uObj === "object" && uObj) {
          const fn = (uObj.firstName || uObj.first_name || "").trim();
          const ln = (uObj.lastName || uObj.last_name || "").trim();
          if (fn || ln) return `${fn} ${ln}`.trim();
          if (uObj.email) return uObj.email.split("@")[0];
        }
      }
    }

    return fallbackLabel;
  };

  // Helper to format date strings nicely (e.g. "Wed, 12 Aug 2026")
  const formatDateNice = (dateVal) => {
    if (!dateVal) return "Upcoming Shift";
    try {
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return String(dateVal);
      return d.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return String(dateVal);
    }
  };

  // Helper to format shift template time string
  const formatShiftTemplate = (shiftItem) => {
    if (!shiftItem) return "Standard Shift";
    const template = shiftItem.shiftTemplateId || shiftItem.template || shiftItem;
    if (typeof template === "object" && template) {
      const name = template.name || template.type || "Shift";
      const start = template.startTime || template.start || "";
      const end = template.endTime || template.end || "";
      if (start && end) return `${name} (${start} - ${end})`;
      if (name) return name;
    }
    if (shiftItem.shiftName) return shiftItem.shiftName;
    if (shiftItem.name) return shiftItem.name;
    return "Assigned Shift";
  };

  // Helper to format comprehensive swap status for target employee vs admin status
  const getSwapStatusInfo = (req, targetName = "Colleague") => {
    const status = (req.status || "").toLowerCase();
    const targetStatus = (req.targetStatus || "").toLowerCase();
    const adminStatus = (req.adminStatus || "").toLowerCase();

    if (status === "approved" || (targetStatus === "accepted" && adminStatus === "approved")) {
      return {
        label: "Approved",
        detail: "Shift swap completed",
        badgeClass: "bg-[#EFFDF4] text-[#1AAF7E] border border-[#1AAF7E]/20",
      };
    }

    if (
      status === "pending_admin" ||
      targetStatus === "accepted" ||
      targetStatus === "approved" ||
      targetStatus === "accept"
    ) {
      return {
        label: "Accepted (Admin Pending)",
        detail: `Accepted by ${targetName} • Awaiting Admin Approval`,
        badgeClass: "bg-[#EAF6F4] text-[#2C8C91] border border-[#2C8C91]/30 font-extrabold",
      };
    }

    if (
      status === "rejected" ||
      status === "declined" ||
      targetStatus === "rejected" ||
      targetStatus === "declined" ||
      adminStatus === "rejected"
    ) {
      return {
        label: targetStatus === "rejected" || targetStatus === "declined" ? `Declined by ${targetName}` : "Declined by Admin",
        detail: "Swap request cancelled",
        badgeClass: "bg-[#FFF0F6] text-[#E05FA0] border border-[#E05FA0]/20",
      };
    }

    return {
      label: `Pending ${targetName}'s Acceptance`,
      detail: "Awaiting colleague response",
      badgeClass: "bg-[#FBF7F0] text-[#E8A020] border border-[#E8A020]/20",
    };
  };

  // Load backend data
  const loadData = async () => {
    if (!token) return;
    setIsLoading(true);
    const schoolId = extractSchoolId(user, token);

    try {
      const [myRes, allRes, historyRes] = await Promise.allSettled([
        getMyShifts(token),
        getEmployeeShifts(token, "", schoolId),
        getShiftSwapHistory(token),
      ]);

      if (myRes.status === "fulfilled") {
        const array = Array.isArray(myRes.value) ? myRes.value : (myRes.value?.data || myRes.value?.shifts || []);
        setMyShifts(array);
      }

      if (allRes.status === "fulfilled") {
        const array = flattenShifts(allRes.value);
        setAllColleaguesShifts(array);
      }

      if (historyRes.status === "fulfilled") {
        const array = Array.isArray(historyRes.value) ? historyRes.value : (historyRes.value?.data || historyRes.value?.history || historyRes.value?.swaps || []);
        setSwapHistory(array);
      }
    } catch (err) {
      console.error("Failed to load shift swap data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadData();
    }
  }, [token, user]);

  // Extract unique colleague options from API response
  const colleaguesMap = new Map();
  allColleaguesShifts.forEach((s) => {
    const u = s.userId || s.studentId || s.user;
    if (!u) return;
    const uId = typeof u === "object" ? (u._id || u.id) : u;

    if (uId && uId !== currentUserId && !colleaguesMap.has(uId)) {
      const nameStr = formatUserName(u, "Colleague");
      colleaguesMap.set(uId, {
        id: uId,
        name: nameStr,
        email: typeof u === "object" ? u.email : "",
        photo: typeof u === "object" ? u.photo : null,
        employeeCode: typeof u === "object" ? u.employeeCode : "",
        rawShift: s,
      });
    }
  });

  const colleaguesList = Array.from(colleaguesMap.values());

  // Modal Opener
  const openSwapModal = (preselectedDateIso = null) => {
    if (preselectedDateIso) {
      setSelectedDateStr(preselectedDateIso);
    } else if (!selectedDateStr && upcoming7Days.length > 0) {
      setSelectedDateStr(upcoming7Days[0].iso);
    }

    const firstMyShift = myShifts[0]?._id || myShifts[0]?.id || "";
    setSelectedMyShiftId(firstMyShift);
    setSelectedTargetUserId("");
    setSelectedTargetShiftId("");
    setReason("");
    setIsModalOpen(true);
  };

  // Target Colleague Selection Change
  const handleColleagueChange = (targetId) => {
    setSelectedTargetUserId(targetId);
    if (!targetId) {
      setSelectedTargetShiftId("");
      return;
    }
    const colleagueObj = colleaguesMap.get(targetId);
    const targetShiftId = colleagueObj?.rawShift?._id || colleagueObj?.rawShift?.id || "";
    setSelectedTargetShiftId(targetShiftId);
  };

  // Submit Shift Swap
  const handleSubmitSwap = async (e) => {
    e.preventDefault();
    if (!selectedTargetUserId) {
      showNotification("Selection Required", "Please select an employee to swap shifts with.", "error");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        targetUserId: selectedTargetUserId,
        requesterShiftId: selectedMyShiftId || (myShifts[0]?._id || myShifts[0]?.id || ""),
        targetShiftId: selectedTargetShiftId || selectedMyShiftId || "",
        requesterMessage: reason.trim() || "Requesting shift swap",
        day: selectedDateStr || upcoming7Days[0].iso,
      };

      await submitShiftSwap(payload, token);
      setIsModalOpen(false);
      showNotification("Swap Request Submitted", "Your shift swap request was sent successfully to your colleague!", "success");
      loadData();
    } catch (err) {
      showNotification("Submission Error", err.message || "Failed to submit shift swap request.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Respond to incoming swap request (Approved / Rejected)
  const handleRespond = async (swapId, responseType) => {
    setRespondingId(swapId);
    try {
      await respondToShiftSwap(swapId, responseType, token);
      showNotification(
        responseType === "approved" ? "Swap Approved" : "Swap Rejected",
        `Shift swap request has been ${responseType}.`,
        responseType === "approved" ? "success" : "info"
      );
      loadData();
    } catch (err) {
      showNotification("Action Failed", err.message || `Failed to ${responseType} request.`, "error");
    } finally {
      setRespondingId(null);
    }
  };

  // Categorize incoming and outgoing requests
  const incomingRequests = swapHistory.filter((item) => {
    const tId = item.targetUserId?._id || item.targetUserId?.id || item.targetUserId || item.targetId;
    const rId = item.requesterUserId?._id || item.requesterUserId?.id || item.requesterUserId || item.requesterId?._id || item.requesterId?.id || item.requesterId || item.requestedBy?._id || item.requestedBy || item.userId?._id || item.userId;
    if (rId && String(rId) === String(currentUserId)) return false;
    return (tId && String(tId) === String(currentUserId)) || item.isIncoming === true;
  });

  const outgoingRequests = swapHistory.filter((item) => {
    const rId = item.requesterUserId?._id || item.requesterUserId?.id || item.requesterUserId || item.requesterId?._id || item.requesterId?.id || item.requesterId || item.requestedBy?._id || item.requestedBy || item.userId?._id || item.userId;
    return (rId && String(rId) === String(currentUserId)) || item.isOutgoing === true || (!incomingRequests.includes(item));
  });

  if (loading) return <SwapSkeleton />;

  if (!token) return null;

  return (
    <Sidebar>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => router.push("/dashboard")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#5F6B73] hover:text-[#1F2937] transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>

          <span className="text-xs font-extrabold text-[#2C8C91] bg-[#EAF6F4] border border-[#2C8C91]/20 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs">
            <ArrowLeftRight size={14} />
            Shift Swap Management
          </span>
        </div>

        {/* Title Header & Main Action */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1
              className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] tracking-tight"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Shift Schedule & Swap Requests
            </h1>
            <p className="text-[#5F6B73] text-sm mt-1">
              View upcoming 7 days roster and request shift exchanges with team members.
            </p>
          </div>

          <button
            onClick={() => openSwapModal()}
            className="inline-flex items-center justify-center gap-2 bg-[#2C8C91] hover:bg-[#216B6F] text-white text-sm font-extrabold px-5 py-3.5 rounded-2xl shadow-md hover:shadow-[0_8px_25px_rgba(44,140,145,0.3)] transition-all cursor-pointer shrink-0"
          >
            <Plus size={18} />
            Request Shift Swap
          </button>
        </div>

        {/* ── UPCOMING 7 DAYS ROSTER CAROUSEL / BAR ───────────────────── */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-3.5">
            <h2 className="text-base font-extrabold text-[#1F2937] flex items-center gap-2">
              <CalendarClock size={18} className="text-[#2C8C91]" />
              Upcoming 7 Days Roster
            </h2>
            <span className="text-xs text-[#8FA8A3] font-bold">Select date to initiate swap</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {upcoming7Days.map((item) => {
              const isSelected = selectedDateStr === item.iso;
              return (
                <button
                  key={item.iso}
                  type="button"
                  onClick={() => openSwapModal(item.iso)}
                  className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-2.5 relative overflow-hidden group ${
                    isSelected
                      ? "bg-[#2C8C91] text-white border-[#2C8C91] shadow-md scale-[1.02]"
                      : item.isToday
                      ? "bg-white border-[#2C8C91] text-[#1F2937] shadow-sm hover:border-[#2C8C91]"
                      : "bg-white border-[#E5DED6] text-[#1F2937] hover:border-[#2C8C91]/50 hover:bg-[#FAF7F2]"
                  }`}
                >
                  {item.isToday && (
                    <span className={`absolute top-0 right-0 text-[9px] uppercase tracking-wider font-black px-2 py-0.5 rounded-bl-lg ${
                      isSelected ? "bg-[#EAF6F4] text-[#2C8C91]" : "bg-[#2C8C91] text-white"
                    }`}>
                      Today
                    </span>
                  )}
                  <span className={`text-xs font-extrabold tracking-wider ${isSelected ? "text-white/80" : "text-[#8FA8A3]"}`}>
                    {item.dayName}
                  </span>
                  <span className={`text-xl font-black ${isSelected ? "text-white" : "text-[#1F2937]"}`}>
                    {item.dateFormatted}
                  </span>
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg transition-colors ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-[#FAF7F2] text-[#5F6B73] group-hover:bg-[#2C8C91] group-hover:text-white"
                  }`}>
                    Swap Shift
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── SWAP REQUESTS MANAGEMENT TABS ───────────────────────────── */}
        <section className="bg-white rounded-[28px] border border-[#E5DED6] p-6 sm:p-8 shadow-xs">
          
          {/* Tab Controls & Refresh */}
          <div className="flex items-center justify-between border-b border-[#E5DED6] pb-4 mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-[#FAF7F2] p-1.5 rounded-2xl border border-[#E5DED6]">
              <button
                type="button"
                onClick={() => setActiveTab("incoming")}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === "incoming"
                    ? "bg-[#2C8C91] text-white shadow-xs"
                    : "text-[#5F6B73] hover:text-[#1F2937]"
                }`}
              >
                Incoming Requests
                {incomingRequests.length > 0 && (
                  <span className="bg-[#EAF6F4] text-[#2C8C91] text-[10px] font-black px-2 py-0.5 rounded-full">
                    {incomingRequests.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("outgoing")}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === "outgoing"
                    ? "bg-[#2C8C91] text-white shadow-xs"
                    : "text-[#5F6B73] hover:text-[#1F2937]"
                }`}
              >
                Outgoing Requests
                {outgoingRequests.length > 0 && (
                  <span className="bg-white/20 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                    {outgoingRequests.length}
                  </span>
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={loadData}
              disabled={isLoading}
              className="text-xs text-[#5F6B73] hover:text-[#2C8C91] flex items-center gap-1.5 font-extrabold cursor-pointer bg-[#FAF7F2] border border-[#E5DED6] px-4 py-2.5 rounded-xl transition-all"
            >
              <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
              Refresh Data
            </button>
          </div>

          {/* TAB CONTENT: INCOMING REQUESTS */}
          {activeTab === "incoming" && (
            <div>
              {isLoading ? (
                <div className="py-16 text-center text-[#8FA8A3] flex flex-col items-center gap-3">
                  <Loader2 size={32} className="animate-spin text-[#2C8C91]" />
                  <p className="text-sm font-bold">Fetching incoming swap requests...</p>
                </div>
              ) : incomingRequests.length === 0 ? (
                <div className="text-center py-14 bg-[#FAF7F2] rounded-2xl border border-dashed border-[#E5DED6] px-4">
                  <ArrowLeftRight size={40} className="mx-auto text-[#8FA8A3] mb-3 opacity-60" />
                  <p className="text-base font-extrabold text-[#1F2937]">No Pending Incoming Requests</p>
                  <p className="text-xs text-[#5F6B73] mt-1 max-w-md mx-auto font-medium">
                    When colleagues request to exchange a shift with you, their requests will appear here for approval.
                  </p>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2">
                  {incomingRequests.map((req) => {
                    const reqUser = req.requesterUserId || req.requesterId || req.requestedBy || req.user;
                    const reqName = formatUserName(reqUser, "Colleague");
                    const dateFormatted = formatDateNice(req.day || req.date || req.createdAt);
                    const isPending = req.status === "pending" || !req.status || req.status === "pending_target";

                    const rId = req.requesterUserId?._id || req.requesterUserId?.id || req.requesterUserId || req.requesterId?._id || req.requesterId?.id || req.requesterId || req.requestedBy?._id || req.requestedBy || req.userId?._id || req.userId;
                    const isRequester = rId && String(rId) === String(currentUserId);
                    const statusInfo = getSwapStatusInfo(req, reqName);

                    return (
                      <div
                        key={req._id || req.id}
                        className="bg-[#FAF7F2] border border-[#E5DED6] rounded-2xl p-5 flex flex-col justify-between gap-4 hover:border-[#2C8C91]/40 transition-all shadow-xs"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3 gap-2">
                            <span className="text-[10px] uppercase tracking-wider font-black px-2.5 py-1 rounded-full bg-[#EAF6F4] text-[#2C8C91]">
                              Swap Request
                            </span>
                            <span className="text-xs font-bold text-[#8FA8A3]">
                              {dateFormatted}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-11 h-11 rounded-full bg-[#2C8C91] text-white grid place-items-center font-black text-sm border-2 border-white shadow-xs shrink-0">
                              {reqName.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-extrabold text-[#1F2937] truncate">{reqName}</p>
                              <p className="text-xs text-[#5F6B73] font-medium">Offered shift swap exchange</p>
                              {statusInfo.detail && (
                                <p className="text-[11px] font-bold text-[#2C8C91] mt-0.5">{statusInfo.detail}</p>
                              )}
                            </div>
                          </div>

                          {req.requesterMessage && (
                            <div className="bg-white border border-[#E5DED6] rounded-xl p-3 text-xs text-[#5F6B73] italic mb-1 font-medium">
                              "{req.requesterMessage}"
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        {isPending && !isRequester ? (
                          <div className="flex items-center gap-2 pt-3 border-t border-[#E5DED6]">
                            <button
                              type="button"
                              onClick={() => handleRespond(req._id || req.id, "approved")}
                              disabled={respondingId === (req._id || req.id)}
                              className="flex-1 bg-[#2C8C91] hover:bg-[#216B6F] text-white text-xs font-extrabold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                            >
                              <Check size={15} />
                              Approve Swap
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRespond(req._id || req.id, "rejected")}
                              disabled={respondingId === (req._id || req.id)}
                              className="flex-1 bg-white border border-[#E5DED6] text-[#E05FA0] hover:bg-[#FFF0F6] text-xs font-extrabold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                            >
                              <X size={15} />
                              Reject
                            </button>
                          </div>
                        ) : (
                          <div className="pt-3 border-t border-[#E5DED6] text-right">
                            <span className={`text-xs font-black px-3.5 py-1 rounded-full ${statusInfo.badgeClass}`}>
                              {statusInfo.label}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: OUTGOING REQUESTS */}
          {activeTab === "outgoing" && (
            <div>
              {isLoading ? (
                <div className="py-16 text-center text-[#8FA8A3] flex flex-col items-center gap-3">
                  <Loader2 size={32} className="animate-spin text-[#2C8C91]" />
                  <p className="text-sm font-bold">Fetching outgoing swap requests...</p>
                </div>
              ) : outgoingRequests.length === 0 ? (
                <div className="text-center py-14 bg-[#FAF7F2] rounded-2xl border border-dashed border-[#E5DED6] px-4">
                  <Send size={40} className="mx-auto text-[#8FA8A3] mb-3 opacity-60" />
                  <p className="text-base font-extrabold text-[#1F2937]">No Sent Swap Requests</p>
                  <p className="text-xs text-[#5F6B73] mt-1 max-w-md mx-auto font-medium">
                    You haven't initiated any shift swap requests yet. Click "Request Shift Swap" to swap with a teammate.
                  </p>
                  <button
                    type="button"
                    onClick={() => openSwapModal()}
                    className="mt-4 inline-flex items-center gap-2 bg-[#2C8C91] text-white text-xs font-extrabold px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    <Plus size={14} />
                    New Swap Request
                  </button>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2">
                  {outgoingRequests.map((req) => {
                    const targetUser = req.targetUserId || req.targetId || req.requestedTo || req.user;
                    const targetName = formatUserName(targetUser, "Colleague");
                    const dateFormatted = formatDateNice(req.day || req.date || req.createdAt);
                    const statusInfo = getSwapStatusInfo(req, targetName);

                    return (
                      <div
                        key={req._id || req.id}
                        className="bg-[#FAF7F2] border border-[#E5DED6] rounded-2xl p-5 flex flex-col justify-between gap-4 hover:border-[#2C8C91]/40 transition-all shadow-xs"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3 gap-2">
                            <span className="text-[10px] uppercase tracking-wider font-black px-2.5 py-1 rounded-full bg-[#EAF6F4] text-[#2C8C91]">
                              Sent Swap Request
                            </span>
                            <span className={`text-xs font-black px-3 py-1 rounded-full ${statusInfo.badgeClass}`}>
                              {statusInfo.label}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-11 h-11 rounded-full bg-[#E5DED6] text-[#1F2937] grid place-items-center font-black text-sm shrink-0">
                              {targetName.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-extrabold text-[#1F2937] truncate">Swap with {targetName}</p>
                              <p className="text-xs text-[#5F6B73] font-medium">Date: {dateFormatted}</p>
                              {statusInfo.detail && (
                                <p className="text-[11px] font-bold text-[#2C8C91] mt-0.5">{statusInfo.detail}</p>
                              )}
                            </div>
                          </div>

                          {req.requesterMessage && (
                            <div className="bg-white border border-[#E5DED6] rounded-xl p-3 text-xs text-[#5F6B73] italic font-medium">
                              "{req.requesterMessage}"
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </section>

      </main>

      {/* ───────────────────────────────────────────────────────────── */}
      {/*  SHIFT SWAP MODAL (Clean Mobile Modal Layout Matching Spec)   */}
      {/* ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#F6F8FA] w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl border border-white/40"
            >
              {/* Drag Handle & Header */}
              <div className="pt-3 pb-1 flex flex-col items-center relative">
                <div className="w-12 h-1.5 bg-[#D1D5DB] rounded-full mb-3" />
                <h2
                  className="text-2xl font-black text-[#1A2533] tracking-tight text-center"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Request Shift Swap
                </h2>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="absolute right-5 top-4 text-[#8C9AA8] hover:text-[#1A2533] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmitSwap} className="p-6 pt-3 space-y-4">
                
                {/* 1. Select Date Field */}
                <div>
                  <label className="block text-xs font-semibold text-[#8C9AA8] mb-1.5">
                    Select Date
                  </label>
                  <div className="relative">
                    <select
                      value={selectedDateStr}
                      onChange={(e) => setSelectedDateStr(e.target.value)}
                      className="w-full bg-white border border-[#DCE2E8] text-[#1A2533] text-sm font-bold rounded-2xl px-4 py-3.5 appearance-none focus:outline-none focus:border-[#2C8C91] shadow-xs cursor-pointer"
                    >
                      {upcoming7Days.map((d) => (
                        <option key={d.iso} value={d.iso}>
                          {d.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
                  </div>
                </div>

                {/* 2. Your Shift Field */}
                <div>
                  <label className="block text-xs font-semibold text-[#8C9AA8] mb-1.5">
                    Your Shift
                  </label>
                  <div className="relative">
                    <select
                      value={selectedMyShiftId}
                      onChange={(e) => setSelectedMyShiftId(e.target.value)}
                      className="w-full bg-white border border-[#DCE2E8] text-[#1A2533] text-sm font-bold rounded-2xl px-4 py-3.5 appearance-none focus:outline-none focus:border-[#2C8C91] shadow-xs cursor-pointer"
                    >
                      {myShifts.length > 0 ? (
                        myShifts.map((s) => (
                          <option key={s._id || s.id} value={s._id || s.id}>
                            {formatShiftTemplate(s)}
                          </option>
                        ))
                      ) : (
                        <option value="">No specific shift template assigned for date</option>
                      )}
                    </select>
                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
                  </div>
                </div>

                {/* 3. Swap With Field */}
                <div>
                  <label className="block text-xs font-semibold text-[#8C9AA8] mb-1.5">
                    Swap With
                  </label>
                  <div className="relative">
                    <select
                      value={selectedTargetUserId}
                      onChange={(e) => handleColleagueChange(e.target.value)}
                      className="w-full bg-white border border-[#DCE2E8] text-[#1A2533] text-sm font-bold rounded-2xl px-4 py-3.5 appearance-none focus:outline-none focus:border-[#2C8C91] shadow-xs cursor-pointer"
                    >
                      <option value="">Select Person</option>
                      {colleaguesList.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} {c.employeeCode ? `(${c.employeeCode})` : ""}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
                  </div>
                </div>

                {/* 4. Target Shift Field */}
                <div>
                  <label className="block text-xs font-semibold text-[#8C9AA8] mb-1.5">
                    Target Shift
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={
                      !selectedTargetUserId
                        ? "Select a person to see their shift"
                        : formatShiftTemplate(colleaguesMap.get(selectedTargetUserId)?.rawShift)
                    }
                    className="w-full bg-[#FAF7F2] border border-[#DCE2E8] text-[#5F6B73] text-sm font-medium rounded-2xl px-4 py-3.5 shadow-xs focus:outline-none cursor-not-allowed"
                  />
                </div>

                {/* 5. Reason Field */}
                <div>
                  <label className="block text-xs font-semibold text-[#8C9AA8] mb-1.5">
                    Reason (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Enter your Reason"
                    className="w-full bg-white border border-[#DCE2E8] text-[#1A2533] text-sm font-medium rounded-2xl p-4 shadow-xs focus:outline-none focus:border-[#2C8C91] placeholder:text-[#9CA3AF] resize-none"
                  />
                </div>

                {/* Modal Buttons Action Group */}
                <div className="grid grid-cols-2 gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-full py-3.5 border border-[#DCE2E8] text-[#1A2533] text-sm font-extrabold rounded-2xl hover:bg-white transition-all cursor-pointer bg-transparent"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-[#2C8C91] hover:bg-[#216B6F] text-white text-sm font-extrabold rounded-2xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification Modal */}
      <AnimatePresence>
        {notification.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center border border-[#E5DED6]"
            >
              <div className={`w-12 h-12 rounded-full mx-auto grid place-items-center mb-3 ${
                notification.type === "success" ? "bg-[#EFFDF4] text-[#1AAF7E]" : "bg-[#FFF0F6] text-[#E05FA0]"
              }`}>
                {notification.type === "success" ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
              </div>
              <h3 className="text-lg font-black text-[#1F2937]">{notification.title}</h3>
              <p className="text-xs text-[#5F6B73] mt-1.5 mb-5">{notification.message}</p>
              <button
                type="button"
                onClick={() => setNotification((prev) => ({ ...prev, isOpen: false }))}
                className="w-full bg-[#2C8C91] text-white text-xs font-extrabold py-3 rounded-xl cursor-pointer"
              >
                Dismiss
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </Sidebar>
  );
}
