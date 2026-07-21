"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, CalendarDays, Loader2, Sparkles, AlertTriangle,
  ChevronRight, CalendarClock, Shield, RefreshCw, CheckCircle2,
  Plus, Trash2, Edit3, ClipboardList, Info, MessageSquare, Check, X
} from "lucide-react";
import {
  getMyLeaves,
  applyLeave,
  getAllLeaveRequests,
  updateLeaveRequestStatus,
  getAllOrgLeaves,
  createOrgLeave,
  updateOrgLeave,
  deleteOrgLeave
} from "@/lib/leaveService";
import Sidebar from "./Sidebar";

export default function LeavePage() {
  const { user, token, loading } = useAuth();
  const { t, lang } = useLanguage();
  const router = useRouter();

  // Role details
  const isAdmin = user?.role === "schooladmin" || user?.role === "admin";

  // Navigation & Tabs
  const [activeTab, setActiveTab] = useState("my-requests"); // "my-requests" | "all-requests" | "holidays"

  // Data states
  const [myLeaves, setMyLeaves] = useState([]);
  const [allRequests, setAllRequests] = useState([]);
  const [orgLeaves, setOrgLeaves] = useState([]);

  // Loading states
  const [loadingMy, setLoadingMy] = useState(true);
  const [loadingAll, setLoadingAll] = useState(true);
  const [loadingOrg, setLoadingOrg] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Forms / Modals
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showHolidayModal, setShowHolidayModal] = useState(false);
  const [reviewingRequest, setReviewingRequest] = useState(null);
  const [editingHoliday, setEditingHoliday] = useState(null);

  // Leave Form Fields
  const [leaveType, setLeaveType] = useState("sick");
  const [leaveFromDate, setLeaveFromDate] = useState("");
  const [leaveToDate, setLeaveToDate] = useState("");
  const [leaveReason, setLeaveReason] = useState("");

  // Holiday Form Fields
  const [holidayName, setHolidayName] = useState("");
  const [holidayType, setHolidayType] = useState("holiday");
  const [holidayCount, setHolidayCount] = useState(1);
  const [holidayFromDate, setHolidayFromDate] = useState("");
  const [holidayToDate, setHolidayToDate] = useState("");
  const [holidayDesc, setHolidayDesc] = useState("");

  // Admin Review Form Fields
  const [adminResponseText, setAdminResponseText] = useState("");

  // Toast / Notification Modals
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "success"
  });

  const showNotification = (title, message, type = "success") => {
    setModalConfig({ isOpen: true, title, message, type });
  };

  // Auth check redirect
  useEffect(() => {
    if (!loading && !token) router.push("/login");
  }, [loading, token, router]);

  // Initial loads
  useEffect(() => {
    if (token) {
      fetchMyLeaves();
      fetchOrgLeaves();
      if (isAdmin) {
        fetchAllRequests();
      }
    }
  }, [token, isAdmin]);

  // Helper date conversions
  const toDDMMYYYY = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  const toYYYYMMDD = (dateStr) => {
    if (!dateStr) return "";
    if (dateStr.includes("-")) {
      const parts = dateStr.split("-");
      if (parts[0].length === 4) return dateStr; // Already YYYY-MM-DD
      const [day, month, year] = parts;
      return `${year}-${month}-${day}`;
    }
    return dateStr;
  };

  // API Call: Fetch my requests
  const fetchMyLeaves = async () => {
    if (!token) return;
    setLoadingMy(true);
    try {
      const data = await getMyLeaves(token);
      const list = Array.isArray(data) ? data : (data?.leaves ?? data?.data ?? []);
      // Sort: newest first
      list.sort((a, b) => new Date(b.createdAt || b.fromDate) - new Date(a.createdAt || a.fromDate));
      setMyLeaves(list);
    } catch (err) {
      console.error("Failed to fetch my leaves:", err);
    } finally {
      setLoadingMy(false);
    }
  };

  // API Call: Fetch all requests (admin only)
  const fetchAllRequests = async () => {
    if (!token || !isAdmin) return;
    setLoadingAll(true);
    try {
      const data = await getAllLeaveRequests(token);
      const list = Array.isArray(data) ? data : (data?.leaves ?? data?.data ?? []);
      list.sort((a, b) => new Date(b.createdAt || b.fromDate) - new Date(a.createdAt || a.fromDate));
      setAllRequests(list);
    } catch (err) {
      console.error("Failed to fetch all leaves:", err);
    } finally {
      setLoadingAll(false);
    }
  };

  // API Call: Fetch holidays
  const fetchOrgLeaves = async () => {
    if (!token) return;
    setLoadingOrg(true);
    try {
      const data = await getAllOrgLeaves(token);
      const list = Array.isArray(data) ? data : (data?.leaves ?? data?.data ?? []);
      setOrgLeaves(list);
    } catch (err) {
      console.error("Failed to fetch org leaves:", err);
    } finally {
      setLoadingOrg(false);
    }
  };

  // API Call: Request Leave
  const handleApplyLeave = async (e) => {
    e.preventDefault();
    if (!leaveFromDate || !leaveToDate || !leaveReason.trim()) {
      showNotification("Validation Failed", "Please fill in all details.", "error");
      return;
    }

    if (new Date(leaveFromDate) > new Date(leaveToDate)) {
      showNotification("Validation Failed", "From Date cannot be after To Date.", "error");
      return;
    }

    setActionLoading(true);
    try {
      const payload = {
        type: leaveType,
        fromDate: leaveFromDate,
        toDate: leaveToDate,
        reason: leaveReason
      };
      await applyLeave(payload, token);
      setShowApplyModal(false);
      showNotification("Success", "Leave requested successfully!", "success");
      
      // Reset form
      setLeaveReason("");
      setLeaveFromDate("");
      setLeaveToDate("");

      // Reload
      fetchMyLeaves();
      if (isAdmin) fetchAllRequests();
    } catch (err) {
      showNotification("Error", err.message || "Failed to submit leave request.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  // API Call: Review Request (Approve/Reject)
  const handleReviewRequest = async (status) => {
    if (!reviewingRequest) return;
    setActionLoading(true);

    try {
      const payload = {
        status,
        adminResponse: adminResponseText.trim() || (status === "approved" ? "Approved by Admin" : "Rejected by Admin")
      };
      await updateLeaveRequestStatus(reviewingRequest._id, payload, token);
      setReviewingRequest(null);
      setAdminResponseText("");
      showNotification("Updated", `Leave request ${status} successfully.`, "success");

      // Reload
      fetchMyLeaves();
      fetchAllRequests();
    } catch (err) {
      showNotification("Error", err.message || "Failed to update leave request.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  // API Call: Create or Update Holiday
  const handleSaveHoliday = async (e) => {
    e.preventDefault();
    if (!holidayName.trim() || !holidayFromDate || !holidayToDate || !holidayDesc.trim()) {
      showNotification("Validation Failed", "Please fill in all fields.", "error");
      return;
    }

    setActionLoading(true);
    try {
      const payload = {
        name: holidayName,
        type: holidayType,
        count: Number(holidayCount),
        fromDate: toDDMMYYYY(holidayFromDate),
        toDate: toDDMMYYYY(holidayToDate),
        year: String(new Date(holidayFromDate).getFullYear()),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata",
        description: holidayDesc
      };

      if (editingHoliday) {
        await updateOrgLeave(editingHoliday._id, payload, token);
        showNotification("Success", "Holiday updated successfully!", "success");
      } else {
        await createOrgLeave(payload, token);
        showNotification("Success", "Holiday added successfully!", "success");
      }

      // Reset
      setHolidayName("");
      setHolidayCount(1);
      setHolidayFromDate("");
      setHolidayToDate("");
      setHolidayDesc("");
      setEditingHoliday(null);
      setShowHolidayModal(false);

      // Reload
      fetchOrgLeaves();
    } catch (err) {
      showNotification("Error", err.message || "Failed to save holiday.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  // API Call: Delete Holiday
  const handleDeleteHoliday = async (id) => {
    if (!window.confirm("Are you sure you want to delete this holiday?")) return;
    setActionLoading(true);
    try {
      await deleteOrgLeave(id, token);
      showNotification("Deleted", "Holiday deleted successfully.", "success");
      fetchOrgLeaves();
    } catch (err) {
      showNotification("Error", err.message || "Failed to delete holiday.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  // Fill editing details
  const startEditHoliday = (holiday) => {
    setEditingHoliday(holiday);
    setHolidayName(holiday.name || "");
    setHolidayType(holiday.type || "holiday");
    setHolidayCount(holiday.count || 1);
    setHolidayFromDate(toYYYYMMDD(holiday.fromDate) || "");
    setHolidayToDate(toYYYYMMDD(holiday.toDate) || "");
    setHolidayDesc(holiday.description || "");
    setShowHolidayModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-[#2C8C91] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#5F6B73] text-sm">Loading Leave Panel…</p>
        </div>
      </div>
    );
  }

  if (!token) return null;

  // Simple statistics
  const totalApplied = myLeaves.length;
  const approvedLeaves = myLeaves.filter(l => l.status === "approved").length;
  const pendingLeaves = myLeaves.filter(l => l.status === "pending").length;

  return (
    <Sidebar>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb / Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => router.push("/dashboard")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#5F6B73] hover:text-[#1F2937] transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>

          <span className="text-xs font-semibold text-[#8FA8A3] bg-white border border-[#E5DED6] px-3.5 py-1.5 rounded-full">
            Time-Off Planner
          </span>
        </div>

        {/* Title Block */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              Leave Management
            </h1>
            <p className="text-[#5F6B73] text-sm mt-1">Submit leave applications, track pending approvals, and view organizational holidays.</p>
          </div>
          
          <button
            onClick={() => setShowApplyModal(true)}
            className="inline-flex items-center gap-2 bg-[#2C8C91] text-white hover:bg-[#216B6F] font-bold text-sm px-5 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer w-fit self-start sm:self-center"
          >
            <Plus size={16} />
            Apply For Leave
          </button>
        </div>

        {/* STATISTICS SUMMARY GRID */}
        <section className="grid sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl border border-[#E5DED6] p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#EFFDF4] text-[#1AAF7E] grid place-items-center">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p className="text-xs text-[#8FA8A3] uppercase tracking-wider font-bold">Approved Requests</p>
              <p className="text-lg font-extrabold text-[#1F2937] mt-0.5">{approvedLeaves} Days</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5DED6] p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FFFBEB] text-[#D97706] grid place-items-center">
              <CalendarClock size={22} />
            </div>
            <div>
              <p className="text-xs text-[#8FA8A3] uppercase tracking-wider font-bold">Pending Reviews</p>
              <p className="text-lg font-extrabold text-[#1F2937] mt-0.5">{pendingLeaves} Requests</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5DED6] p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F4F9F8] text-[#2C8C91] grid place-items-center">
              <ClipboardList size={22} />
            </div>
            <div>
              <p className="text-xs text-[#8FA8A3] uppercase tracking-wider font-bold">Total Applications</p>
              <p className="text-lg font-extrabold text-[#1F2937] mt-0.5">{totalApplied} Filed</p>
            </div>
          </div>
        </section>

        {/* TABS CONTAINER */}
        <div className="flex border-b border-[#E5DED6] mb-8 gap-6">
          <button
            onClick={() => setActiveTab("my-requests")}
            className={`pb-3 text-sm font-bold transition-all relative cursor-pointer ${
              activeTab === "my-requests" ? "text-[#2C8C91]" : "text-[#5F6B73] hover:text-[#1F2937]"
            }`}
          >
            My Leave Requests
            {activeTab === "my-requests" && (
              <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2C8C91]" />
            )}
          </button>
          
          {isAdmin && (
            <button
              onClick={() => setActiveTab("all-requests")}
              className={`pb-3 text-sm font-bold transition-all relative cursor-pointer ${
                activeTab === "all-requests" ? "text-[#2C8C91]" : "text-[#5F6B73] hover:text-[#1F2937]"
              }`}
            >
              All Requests (Admin)
              {activeTab === "all-requests" && (
                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2C8C91]" />
              )}
            </button>
          )}

          <button
            onClick={() => setActiveTab("holidays")}
            className={`pb-3 text-sm font-bold transition-all relative cursor-pointer ${
              activeTab === "holidays" ? "text-[#2C8C91]" : "text-[#5F6B73] hover:text-[#1F2937]"
            }`}
          >
            Holidays & Policies
            {activeTab === "holidays" && (
              <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2C8C91]" />
            )}
          </button>
        </div>

        {/* TAB 1: MY LEAVE REQUESTS */}
        {activeTab === "my-requests" && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[#1F2937] text-lg font-bold flex items-center gap-2" style={{ fontFamily: "var(--font-outfit)" }}>
                <ClipboardList size={20} className="text-[#2C8C91]" />
                Your Leave Application History
              </h2>
              <button 
                onClick={fetchMyLeaves}
                disabled={loadingMy}
                className="text-[#5F6B73] hover:text-[#1F2937] p-2 hover:bg-white border border-[#E5DED6] rounded-full transition-all cursor-pointer bg-white"
              >
                <RefreshCw size={14} className={loadingMy ? "animate-spin" : ""} />
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-[#E5DED6] overflow-hidden shadow-sm">
              {loadingMy ? (
                <div className="py-16 text-center text-[#8FA8A3] text-sm flex flex-col items-center gap-3">
                  <Loader2 className="animate-spin text-[#2C8C91]" size={28} />
                  Retrieving your leave history...
                </div>
              ) : myLeaves.length === 0 ? (
                <div className="py-16 text-center text-[#8FA8A3] text-sm flex flex-col items-center gap-3">
                  <CalendarClock size={36} className="text-[#8FA8A3]/40" />
                  No leave requests found. Click "Apply For Leave" to request time off.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-[#FAF7F2] text-[#5F6B73] font-semibold border-b border-[#E5DED6]">
                        <th className="px-6 py-4">User</th>
                        <th className="px-6 py-4">Leave Type</th>
                        <th className="px-6 py-4">Dates</th>
                        <th className="px-6 py-4">Reason</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Admin Response</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#FAF7F2]">
                      {myLeaves.map((leave, idx) => (
                        <tr key={leave._id || idx} className="hover:bg-[#FAF7F2]/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {leave.userId?.photo ? (
                                <img 
                                  src={leave.userId.photo} 
                                  alt={leave.userId.firstName || "Employee"} 
                                  className="w-7 h-7 rounded-full object-cover border border-[#E5DED6]"
                                />
                              ) : (
                                <div className="w-7 h-7 rounded-full bg-[#FAF7F2] text-[#5F6B73] font-bold text-[10px] grid place-items-center border border-[#E5DED6]">
                                  {(leave.userId?.firstName || leave.userEmail || "E").charAt(0).toUpperCase()}
                                </div>
                              )}
                              <span className="font-bold text-[#1F2937] whitespace-nowrap">
                                {leave.userId?.firstName 
                                  ? `${leave.userId.firstName} ${leave.userId.lastName || ""}` 
                                  : (leave.userEmail || "Employee")}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-semibold text-[#1F2937] capitalize">
                            {leave.type}
                            {leave.createdAt && (
                              <div className="text-[10px] text-[#8FA8A3] font-medium mt-0.5 font-sans normal-case">
                                Applied: {new Date(leave.createdAt).toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' })}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 text-[#5F6B73] whitespace-nowrap">
                            {new Date(leave.fromDate).toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' })}
                            <span className="mx-2 text-[#8FA8A3]">→</span>
                            {new Date(leave.toDate).toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' })}
                          </td>
                          <td className="px-6 py-4 text-[#5F6B73] max-w-[200px] truncate" title={leave.reason}>
                            {leave.reason}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border capitalize ${
                              leave.status === "approved" 
                                ? "bg-[#EFFDF4] text-[#1AAF7E] border-[#D1F7E2]" 
                                : leave.status === "rejected"
                                ? "bg-[#FFF0F6] text-[#E05FA0] border-[#FFD9EB]"
                                : "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]"
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                leave.status === "approved" 
                                  ? "bg-[#1AAF7E]" 
                                  : leave.status === "rejected"
                                  ? "bg-[#E05FA0]"
                                  : "bg-[#D97706] animate-pulse"
                              }`} />
                              {leave.status || "pending"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-[#5F6B73] italic">
                            {leave.adminResponse || "--"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}

        {/* TAB 2: ALL REQUESTS (ADMIN ONLY) */}
        {activeTab === "all-requests" && isAdmin && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[#1F2937] text-lg font-bold flex items-center gap-2" style={{ fontFamily: "var(--font-outfit)" }}>
                <ClipboardList size={20} className="text-[#2C8C91]" />
                Employee Leave Applications
              </h2>
              <button 
                onClick={fetchAllRequests}
                disabled={loadingAll}
                className="text-[#5F6B73] hover:text-[#1F2937] p-2 hover:bg-white border border-[#E5DED6] rounded-full transition-all cursor-pointer bg-white"
              >
                <RefreshCw size={14} className={loadingAll ? "animate-spin" : ""} />
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-[#E5DED6] overflow-hidden shadow-sm">
              {loadingAll ? (
                <div className="py-16 text-center text-[#8FA8A3] text-sm flex flex-col items-center gap-3">
                  <Loader2 className="animate-spin text-[#2C8C91]" size={28} />
                  Retrieving employee requests...
                </div>
              ) : allRequests.length === 0 ? (
                <div className="py-16 text-center text-[#8FA8A3] text-sm flex flex-col items-center gap-3">
                  <CalendarClock size={36} className="text-[#8FA8A3]/40" />
                  No leave requests logged in the system.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-[#FAF7F2] text-[#5F6B73] font-semibold border-b border-[#E5DED6]">
                        <th className="px-6 py-4">User</th>
                        <th className="px-6 py-4">Leave Type</th>
                        <th className="px-6 py-4">Dates</th>
                        <th className="px-6 py-4">Reason</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#FAF7F2]">
                      {allRequests.map((leave, idx) => (
                        <tr key={leave._id || idx} className="hover:bg-[#FAF7F2]/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {leave.userId?.photo ? (
                                <img 
                                  src={leave.userId.photo} 
                                  alt={leave.userId.firstName || "Employee"} 
                                  className="w-7 h-7 rounded-full object-cover border border-[#E5DED6]"
                                />
                              ) : (
                                <div className="w-7 h-7 rounded-full bg-[#FAF7F2] text-[#5F6B73] font-bold text-[10px] grid place-items-center border border-[#E5DED6]">
                                  {(leave.userId?.firstName || leave.userEmail || "E").charAt(0).toUpperCase()}
                                </div>
                              )}
                              <span className="font-bold text-[#1F2937] whitespace-nowrap">
                                {leave.userId?.firstName 
                                  ? `${leave.userId.firstName} ${leave.userId.lastName || ""}` 
                                  : (leave.userEmail || "Employee")}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-semibold text-[#1F2937] capitalize">
                            {leave.type}
                            {leave.createdAt && (
                              <div className="text-[10px] text-[#8FA8A3] font-medium mt-0.5 font-sans normal-case">
                                Applied: {new Date(leave.createdAt).toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' })}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 text-[#5F6B73] whitespace-nowrap">
                            {new Date(leave.fromDate).toLocaleDateString([], { day: 'numeric', month: 'short' })}
                            <span className="mx-2 text-[#8FA8A3]">→</span>
                            {new Date(leave.toDate).toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' })}
                          </td>
                          <td className="px-6 py-4 text-[#5F6B73] max-w-[150px] truncate" title={leave.reason}>
                            {leave.reason}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border capitalize ${
                              leave.status === "approved" 
                                ? "bg-[#EFFDF4] text-[#1AAF7E] border-[#D1F7E2]" 
                                : leave.status === "rejected"
                                ? "bg-[#FFF0F6] text-[#E05FA0] border-[#FFD9EB]"
                                : "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]"
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                leave.status === "approved" 
                                  ? "bg-[#1AAF7E]" 
                                  : leave.status === "rejected"
                                  ? "bg-[#E05FA0]"
                                  : "bg-[#D97706] animate-pulse"
                              }`} />
                              {leave.status || "pending"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {leave.status === "pending" || !leave.status ? (
                              <button
                                onClick={() => setReviewingRequest(leave)}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#0E3D39] hover:bg-[#1A5C55] px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
                              >
                                Review
                              </button>
                            ) : (
                              <button
                                onClick={() => setReviewingRequest(leave)}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5F6B73] hover:text-[#1F2937] border border-[#E5DED6] hover:bg-[#FAF7F2] px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
                              >
                                Details
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}

        {/* TAB 3: HOLIDAYS & POLICIES */}
        {activeTab === "holidays" && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[#1F2937] text-lg font-bold flex items-center gap-2" style={{ fontFamily: "var(--font-outfit)" }}>
                <CalendarDays size={20} className="text-[#2C8C91]" />
                School Holidays & Closures
              </h2>
              
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <button
                    onClick={() => {
                      setEditingHoliday(null);
                      setHolidayName("");
                      setHolidayType("holiday");
                      setHolidayCount(1);
                      setHolidayFromDate("");
                      setHolidayToDate("");
                      setHolidayDesc("");
                      setShowHolidayModal(true);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#2C8C91] hover:bg-[#216B6F] px-4 py-2.5 rounded-full shadow-sm hover:shadow transition-colors cursor-pointer"
                  >
                    <Plus size={14} />
                    Add Holiday
                  </button>
                )}
                
                <button 
                  onClick={fetchOrgLeaves}
                  disabled={loadingOrg}
                  className="text-[#5F6B73] hover:text-[#1F2937] p-2 hover:bg-white border border-[#E5DED6] rounded-full transition-all cursor-pointer bg-white"
                >
                  <RefreshCw size={14} className={loadingOrg ? "animate-spin" : ""} />
                </button>
              </div>
            </div>

            {/* Holiday Cards Grid */}
            {loadingOrg ? (
              <div className="py-16 text-center text-[#8FA8A3] text-sm flex flex-col items-center gap-3">
                <Loader2 className="animate-spin text-[#2C8C91]" size={28} />
                Loading holidays list...
              </div>
            ) : orgLeaves.length === 0 ? (
              <div className="py-16 text-center text-[#8FA8A3] text-sm flex flex-col items-center gap-3 bg-white rounded-3xl border border-[#E5DED6]">
                <CalendarClock size={36} className="text-[#8FA8A3]/40" />
                No holidays recorded for this year.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-5">
                {orgLeaves.map((holiday, idx) => (
                  <div key={holiday._id || idx} className="bg-white rounded-2xl border border-[#E5DED6] p-6 hover:shadow-md transition-shadow relative flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <span className="text-xs uppercase tracking-wider font-extrabold px-2.5 py-1 rounded bg-[#EAF6F4] text-[#2C8C91]">
                          {holiday.type || "Holiday"}
                        </span>
                        
                        {isAdmin && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => startEditHoliday(holiday)}
                              className="p-1.5 text-[#5F6B73] hover:text-[#2C8C91] hover:bg-[#FAF7F2] rounded-full transition-colors cursor-pointer"
                              title="Edit Holiday"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              onClick={() => handleDeleteHoliday(holiday._id)}
                              className="p-1.5 text-[#5F6B73] hover:text-[#E05FA0] hover:bg-[#FFF0F6] rounded-full transition-colors cursor-pointer"
                              title="Delete Holiday"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        )}
                      </div>

                      <h3 className="text-[#1F2937] font-extrabold text-base mb-1" style={{ fontFamily: "var(--font-outfit)" }}>
                        {holiday.name}
                      </h3>

                      <p className="text-xs text-[#8FA8A3] mb-3 flex items-center gap-1.5">
                        <CalendarClock size={13} className="text-[#5F6B73]" />
                        {holiday.fromDate} {holiday.toDate && holiday.toDate !== holiday.fromDate ? `to ${holiday.toDate}` : ""}
                        <span className="text-[#E5DED6]">•</span>
                        <span>{holiday.count} {holiday.count === 1 ? 'day' : 'days'}</span>
                      </p>

                      <p className="text-xs text-[#5F6B73] leading-relaxed">
                        {holiday.description || "No holiday policy details provided."}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#FAF7F2] text-[10px] text-[#8FA8A3] flex justify-between">
                      <span>TZ: {holiday.timeZone || "Asia/Kolkata"}</span>
                      <span>Year: {holiday.year || "--"}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

      </main>

      {/* ── MODAL: APPLY LEAVE ────────────────────────── */}
      <AnimatePresence>
        {showApplyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowApplyModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[28px] p-8 max-w-md w-full shadow-[0_24px_60px_-12px_rgba(0,0,0,0.25)] border border-[#E5DED6]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#0E3D39] text-xl font-bold" style={{ fontFamily: "var(--font-outfit)" }}>
                  Apply For Leave
                </h3>
                <button 
                  onClick={() => setShowApplyModal(false)}
                  className="text-[#8FA8A3] hover:text-[#1F2937] p-1 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleApplyLeave} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#8FA8A3] uppercase tracking-wider mb-1.5">
                    Leave Type
                  </label>
                  <select
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E5DED6] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2C8C91] text-[#1F2937] font-semibold"
                  >
                    <option value="sick">Sick Leave</option>
                    <option value="casual">Casual Leave</option>
                    <option value="annual">Annual Leave</option>
                    <option value="personal">Personal Leave</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#8FA8A3] uppercase tracking-wider mb-1.5">
                      From Date
                    </label>
                    <input
                      type="date"
                      value={leaveFromDate}
                      onChange={(e) => setLeaveFromDate(e.target.value)}
                      required
                      className="w-full bg-[#FAF7F2] border border-[#E5DED6] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2C8C91] text-[#1F2937] font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#8FA8A3] uppercase tracking-wider mb-1.5">
                      To Date
                    </label>
                    <input
                      type="date"
                      value={leaveToDate}
                      onChange={(e) => setLeaveToDate(e.target.value)}
                      required
                      className="w-full bg-[#FAF7F2] border border-[#E5DED6] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2C8C91] text-[#1F2937] font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#8FA8A3] uppercase tracking-wider mb-1.5">
                    Reason for Leave
                  </label>
                  <textarea
                    rows={4}
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                    placeholder="Provide details about your request..."
                    required
                    className="w-full bg-[#FAF7F2] border border-[#E5DED6] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2C8C91] text-[#1F2937] placeholder-[#8FA8A3]"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="flex-1 border border-[#E5DED6] text-[#5F6B73] hover:bg-[#FAF7F2] rounded-full py-3 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="flex-1 bg-[#2C8C91] text-white hover:bg-[#216B6F] rounded-full py-3 text-xs font-bold transition-colors cursor-pointer flex justify-center items-center gap-2"
                  >
                    {actionLoading && <Loader2 size={12} className="animate-spin" />}
                    Submit Request
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MODAL: ADMIN REVIEW REQUEST ────────────────── */}
      <AnimatePresence>
        {reviewingRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setReviewingRequest(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[28px] p-8 max-w-md w-full shadow-[0_24px_60px_-12px_rgba(0,0,0,0.25)] border border-[#E5DED6]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#0E3D39] text-xl font-bold" style={{ fontFamily: "var(--font-outfit)" }}>
                  Review Leave Request
                </h3>
                <button 
                  onClick={() => setReviewingRequest(null)}
                  className="text-[#8FA8A3] hover:text-[#1F2937] p-1 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 mb-6 text-sm">
                <div className="bg-[#FAF7F2] p-4 rounded-xl space-y-2 border border-[#E5DED6]">
                  <p className="text-xs text-[#8FA8A3] font-bold uppercase">Requester</p>
                  <div className="flex items-center gap-2 mt-1">
                    {reviewingRequest.userId?.photo ? (
                      <img 
                        src={reviewingRequest.userId.photo} 
                        alt={reviewingRequest.userId.firstName || "Employee"} 
                        className="w-8 h-8 rounded-full object-cover border border-[#E5DED6]"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#5F6B73] font-bold text-xs grid place-items-center border border-[#E5DED6]">
                        {(reviewingRequest.userId?.firstName || reviewingRequest.userEmail || "E").charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="font-semibold text-[#1F2937]">
                      {reviewingRequest.userId?.firstName 
                        ? `${reviewingRequest.userId.firstName} ${reviewingRequest.userId.lastName || ""}` 
                        : (reviewingRequest.userEmail || "Employee")}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <p className="text-[10px] text-[#8FA8A3] font-bold uppercase">Leave Type</p>
                      <p className="font-semibold capitalize text-[#1F2937]">{reviewingRequest.type}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#8FA8A3] font-bold uppercase">Status</p>
                      <p className="font-bold capitalize text-[#2C8C91]">{reviewingRequest.status || "Pending"}</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-[10px] text-[#8FA8A3] font-bold uppercase">Dates Requested</p>
                    <p className="font-semibold text-[#1F2937]">
                      {new Date(reviewingRequest.fromDate).toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' })}
                      <span className="mx-1.5">→</span>
                      {new Date(reviewingRequest.toDate).toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>

                  <div className="pt-2">
                    <p className="text-[10px] text-[#8FA8A3] font-bold uppercase">Reason</p>
                    <p className="text-[#5F6B73] leading-relaxed text-xs italic">{reviewingRequest.reason}</p>
                  </div>
                </div>

                {/* Response / Message comment */}
                <div>
                  <label className="block text-xs font-bold text-[#8FA8A3] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <MessageSquare size={13} />
                    Admin Response Notes
                  </label>
                  <textarea
                    rows={3}
                    value={adminResponseText}
                    onChange={(e) => setAdminResponseText(e.target.value)}
                    placeholder="Type comments or reasons for decision..."
                    className="w-full bg-[#FAF7F2] border border-[#E5DED6] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2C8C91] text-[#1F2937]"
                  />
                </div>
              </div>

              {reviewingRequest.status === "pending" || !reviewingRequest.status ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleReviewRequest("rejected")}
                    disabled={actionLoading}
                    className="flex-1 bg-[#FFF0F6] hover:bg-[#FFE0ED] text-[#E05FA0] border border-[#FFD9EB] rounded-full py-3 text-xs font-bold transition-all cursor-pointer flex justify-center items-center gap-1.5"
                  >
                    <X size={14} />
                    Reject
                  </button>
                  <button
                    onClick={() => handleReviewRequest("approved")}
                    disabled={actionLoading}
                    className="flex-1 bg-[#2C8C91] hover:bg-[#216B6F] text-white rounded-full py-3 text-xs font-bold transition-all cursor-pointer flex justify-center items-center gap-1.5"
                  >
                    <Check size={14} />
                    Approve
                  </button>
                </div>
              ) : (
                <div className="text-center text-xs text-[#8FA8A3]">
                  Decision already made. This record is finalized.
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MODAL: CREATE / EDIT HOLIDAY (ADMIN ONLY) ──── */}
      <AnimatePresence>
        {showHolidayModal && isAdmin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowHolidayModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[28px] p-8 max-w-md w-full shadow-[0_24px_60px_-12px_rgba(0,0,0,0.25)] border border-[#E5DED6]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#0E3D39] text-xl font-bold" style={{ fontFamily: "var(--font-outfit)" }}>
                  {editingHoliday ? "Edit Holiday Info" : "Create School Holiday"}
                </h3>
                <button 
                  onClick={() => setShowHolidayModal(false)}
                  className="text-[#8FA8A3] hover:text-[#1F2937] p-1 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveHoliday} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#8FA8A3] uppercase tracking-wider mb-1.5">
                    Holiday Name
                  </label>
                  <input
                    type="text"
                    value={holidayName}
                    onChange={(e) => setHolidayName(e.target.value)}
                    placeholder="e.g. Winter Break, Thanksgiving"
                    required
                    className="w-full bg-[#FAF7F2] border border-[#E5DED6] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2C8C91] text-[#1F2937] font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#8FA8A3] uppercase tracking-wider mb-1.5">
                      Type
                    </label>
                    <select
                      value={holidayType}
                      onChange={(e) => setHolidayType(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E5DED6] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2C8C91] text-[#1F2937] font-semibold"
                    >
                      <option value="holiday">Holiday</option>
                      <option value="optional">Optional / Restricted</option>
                      <option value="training">Staff Training Day</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#8FA8A3] uppercase tracking-wider mb-1.5">
                      Count (Days)
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={holidayCount}
                      onChange={(e) => setHolidayCount(e.target.value)}
                      required
                      className="w-full bg-[#FAF7F2] border border-[#E5DED6] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2C8C91] text-[#1F2937] font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#8FA8A3] uppercase tracking-wider mb-1.5">
                      From Date
                    </label>
                    <input
                      type="date"
                      value={holidayFromDate}
                      onChange={(e) => setHolidayFromDate(e.target.value)}
                      required
                      className="w-full bg-[#FAF7F2] border border-[#E5DED6] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2C8C91] text-[#1F2937] font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#8FA8A3] uppercase tracking-wider mb-1.5">
                      To Date
                    </label>
                    <input
                      type="date"
                      value={holidayToDate}
                      onChange={(e) => setHolidayToDate(e.target.value)}
                      required
                      className="w-full bg-[#FAF7F2] border border-[#E5DED6] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2C8C91] text-[#1F2937] font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#8FA8A3] uppercase tracking-wider mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={holidayDesc}
                    onChange={(e) => setHolidayDesc(e.target.value)}
                    placeholder="Short summary about this holiday..."
                    required
                    className="w-full bg-[#FAF7F2] border border-[#E5DED6] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2C8C91] text-[#1F2937]"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowHolidayModal(false)}
                    className="flex-1 border border-[#E5DED6] text-[#5F6B73] hover:bg-[#FAF7F2] rounded-full py-3 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="flex-1 bg-[#2C8C91] text-white hover:bg-[#216B6F] rounded-full py-3 text-xs font-bold transition-colors cursor-pointer flex justify-center items-center gap-2"
                  >
                    {actionLoading && <Loader2 size={12} className="animate-spin" />}
                    Save Holiday
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── GENERAL TOAST / ALERT MODAL ────────────────── */}
      <AnimatePresence>
        {modalConfig.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
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
                  <Info size={28} />
                )}
              </div>

              <h3 className="text-[#0E3D39] text-xl font-bold mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
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
