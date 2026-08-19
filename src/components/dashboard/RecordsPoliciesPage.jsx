"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, FileText, Search, RefreshCw, Loader2, ArrowLeft,
  Calendar, CheckCircle2, AlertCircle, Building2, UserCheck,
  Copy, ExternalLink, Filter, Info, Sparkles, Check, Hash, User, Code
} from "lucide-react";
import {
  getSchoolPolicy,
  getStudentRecord,
  extractSchoolId,
  extractStudentId
} from "@/lib/api";
import { RecordsPoliciesSkeleton } from "@/components/ui/ShimmerSkeleton";
import Sidebar from "./Sidebar";

export default function RecordsPoliciesPage() {
  const { user, token, loading: authLoading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  /* Navigation Tab: "policies" | "records" */
  const [activeTab, setActiveTab] = useState("policies");

  /* Data states */
  const [policyData, setPolicyData] = useState(null);
  const [policyLoading, setPolicyLoading] = useState(true);
  const [policyError, setPolicyError] = useState(null);

  const [recordsList, setRecordsList] = useState([]);
  const [recordsLoading, setRecordsLoading] = useState(true);
  const [recordsError, setRecordsError] = useState(null);

  /* Search & Filter States */
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedPolicy, setCopiedPolicy] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  /* Derived IDs */
  const schoolId = useMemo(() => extractSchoolId(user, token), [user, token]);
  const studentId = useMemo(() => extractStudentId(user, token), [user, token]);

  /* Auth guard */
  useEffect(() => {
    if (!authLoading && !token) {
      router.push("/login");
    }
  }, [authLoading, token, router]);

  /* 1. Fetch Company Policy (GET /policy/:schoolId) */
  const fetchPolicy = async () => {
    if (!token || !schoolId) return;
    setPolicyLoading(true);
    setPolicyError(null);
    try {
      const data = await getSchoolPolicy(schoolId, token);
      setPolicyData(data);
    } catch (err) {
      console.error("Failed to load policy:", err);
      setPolicyError(err.message || "Failed to load company policies.");
    } finally {
      setPolicyLoading(false);
    }
  };

  /* 2. Fetch Student/Employee Records (GET /record/:schoolId/:studentId) */
  const fetchRecords = async () => {
    if (!token || !schoolId || !studentId) return;
    setRecordsLoading(true);
    setRecordsError(null);
    try {
      const data = await getStudentRecord(schoolId, studentId, token);
      const list = Array.isArray(data) ? data : (data?.records || data?.data || []);
      setRecordsList(list);
    } catch (err) {
      console.error("Failed to load records:", err);
      setRecordsError(err.message || "Failed to load student/employee records.");
    } finally {
      setRecordsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchPolicy();
      fetchRecords();
    }
  }, [token, schoolId, studentId]);

  /* Copy Policy Content Handler */
  const handleCopyPolicy = () => {
    if (!policyData?.content) return;
    navigator.clipboard.writeText(policyData.content);
    setCopiedPolicy(true);
    setTimeout(() => setCopiedPolicy(false), 2500);
  };

  /* Filtered Records */
  const filteredRecords = useMemo(() => {
    if (!searchQuery.trim()) return recordsList;
    const q = searchQuery.toLowerCase();
    return recordsList.filter((item) => {
      const titleMatch = (item.title || item.name || item.eventName || "").toLowerCase().includes(q);
      const typeMatch = (item.type || item.category || "").toLowerCase().includes(q);
      const descMatch = (item.description || item.note || "").toLowerCase().includes(q);
      return titleMatch || typeMatch || descMatch;
    });
  }, [recordsList, searchQuery]);

  if (authLoading) return <RecordsPoliciesSkeleton />;

  if (!token) return null;

  return (
    <Sidebar>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-10">

        {/* ── HEADER BREADCRUMB ─────────────────────────────── */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => router.push("/dashboard")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#5F6B73] hover:text-[#1F2937] transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>

          <span className="text-xs font-semibold text-[#8FA8A3] bg-white border border-[#E5DED6] px-3.5 py-1.5 rounded-full">
            Organization Governance
          </span>
        </div>

        {/* ── HERO BANNER ─────────────────────────────────── */}
        <div className="bg-gradient-to-br from-[#165B5E] via-[#1B6E73] to-[#2C8C91] rounded-[28px] p-8 lg:p-10 mb-8 text-white relative overflow-hidden shadow-lg">
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2 text-[#D4F04A] text-xs font-bold uppercase tracking-wider">
                <Shield size={16} />
                Compliance &amp; System Records
              </div>
              <h1
                className="text-3xl sm:text-4xl lg:text-[2.6rem] font-normal leading-tight mb-2"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Company <span className="text-[#D4F04A]">Policies &amp; Records</span>
              </h1>
              <p className="text-white/70 text-sm max-w-xl leading-relaxed">
                Access official organization policies, workplace regulations, and view your verified student/employee attendance &amp; activity records.
              </p>
            </div>

            {/* Quick Metadata Pill */}
           
          </div>
        </div>

        {/* ── NAVIGATION TABS & ACTIONS ─────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          
          {/* Tabs */}
          <div className="flex items-center gap-2 bg-[#FAF7F2] p-1.5 rounded-full border border-[#E5DED6] w-fit">
            <button
              onClick={() => setActiveTab("policies")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === "policies"
                  ? "bg-[#165B5E] text-white shadow-md"
                  : "text-[#5F6B73] hover:text-[#1F2937]"
              }`}
            >
              <FileText size={16} />
              <span>Company Policies</span>
            </button>

            <button
              onClick={() => setActiveTab("records")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === "records"
                  ? "bg-[#165B5E] text-white shadow-md"
                  : "text-[#5F6B73] hover:text-[#1F2937]"
              }`}
            >
              <Shield size={16} />
              <span>My Records</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 font-mono">
                {recordsList.length}
              </span>
            </button>
          </div>

          {/* Refresh Button */}
          <button
            onClick={activeTab === "policies" ? fetchPolicy : fetchRecords}
            disabled={activeTab === "policies" ? policyLoading : recordsLoading}
            className="inline-flex items-center gap-2 bg-white border border-[#E5DED6] text-[#5F6B73] hover:text-[#1F2937] px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer self-start sm:self-auto"
          >
            <RefreshCw size={14} className={(activeTab === "policies" ? policyLoading : recordsLoading) ? "animate-spin" : ""} />
            <span>Sync Latest Data</span>
          </button>
        </div>

        {/* ── TAB 1: COMPANY POLICIES ─────────────────────── */}
        {activeTab === "policies" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {policyLoading ? (
              <div className="bg-white rounded-[28px] border border-[#E5DED6] p-16 text-center">
                <Loader2 size={36} className="animate-spin text-[#2C8C91] mx-auto mb-3" />
                <p className="text-sm font-bold text-[#1F2937]">Fetching organization policy from server...</p>
                <p className="text-xs text-[#8FA8A3] mt-1 font-mono">GET /api/v1/policy/{schoolId}</p>
              </div>
            ) : policyError ? (
              <div className="bg-white rounded-[28px] border border-red-200 p-8 text-center max-w-md mx-auto">
                <AlertCircle size={36} className="text-red-500 mx-auto mb-3" />
                <h3 className="text-base font-bold text-[#1F2937] mb-1">Unable to Load Policy</h3>
                <p className="text-xs text-[#8FA8A3] mb-4">{policyError}</p>
                <button
                  onClick={fetchPolicy}
                  className="inline-flex items-center gap-2 bg-[#165B5E] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#124B4E]"
                >
                  <RefreshCw size={14} />
                  Retry Fetch
                </button>
              </div>
            ) : policyData ? (
              <div className="bg-white rounded-[28px] border border-[#E5DED6] overflow-hidden shadow-sm">
                
                {/* Policy Header Card */}
                <div className="bg-[#FAF7F2] p-6 sm:p-8 border-b border-[#E5DED6] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-[#EAF6F4] text-[#2C8C91] border border-[#2C8C91]/20">
                        Official Document
                      </span>
                      {policyData.updatedAt && (
                        <span className="text-xs text-[#8FA8A3] font-mono">
                          Updated: {new Date(policyData.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      )}
                    </div>

                    <h2
                      className="text-2xl sm:text-3xl font-extrabold text-[#1F2937]"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {policyData.title || "Organization Terms & Policy"}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleCopyPolicy}
                      className="inline-flex items-center gap-2 bg-white border border-[#E5DED6] hover:bg-[#FAF7F2] text-[#1F2937] px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer"
                    >
                      {copiedPolicy ? <Check size={14} className="text-[#1AAF7E]" /> : <Copy size={14} />}
                      <span>{copiedPolicy ? "Copied to Clipboard!" : "Copy Content"}</span>
                    </button>
                  </div>
                </div>

                {/* Policy Content Body */}
                <div className="p-6 sm:p-10 space-y-6">
                  <div className="prose max-w-none text-sm text-[#1F2937] leading-relaxed whitespace-pre-line bg-[#FAF7F2]/40 p-6 rounded-2xl border border-[#E5DED6]/60">
                    {policyData.content || "No policy content details published for this organization yet."}
                  </div>

                  {/* Metadata Footer Box */}
                  <div className="grid sm:grid-cols-3 gap-4 pt-6 border-t border-[#E5DED6] text-xs">
                    <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5DED6]/60">
                      <span className="text-[10px] text-[#8FA8A3] uppercase font-bold tracking-wider block mb-1">
                        Policy ID
                      </span>
                      <span className="font-mono text-[#2C8C91] font-bold">{policyData._id || "--"}</span>
                    </div>

                    <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5DED6]/60">
                      <span className="text-[10px] text-[#8FA8A3] uppercase font-bold tracking-wider block mb-1">
                        Target Organization
                      </span>
                      <span className="font-mono text-[#1F2937] font-semibold">{policyData.org || schoolId}</span>
                    </div>

                    <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5DED6]/60">
                      <span className="text-[10px] text-[#8FA8A3] uppercase font-bold tracking-wider block mb-1">
                        Created At
                      </span>
                      <span className="font-mono text-[#1F2937] font-semibold">
                        {policyData.createdAt ? new Date(policyData.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }) : "--"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[28px] border border-[#E5DED6] p-16 text-center">
                <Info size={36} className="text-[#8FA8A3] mx-auto mb-3" />
                <h3 className="text-base font-bold text-[#1F2937] mb-1">No Policy Published</h3>
                <p className="text-xs text-[#8FA8A3]">Your organization has not uploaded a policy document yet.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* ── TAB 2: MY RECORDS ───────────────────────────── */}
        {activeTab === "records" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8FA8A3]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search student records by title, event, category..."
                  className="w-full bg-white border border-[#E5DED6] rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#1F2937] placeholder-[#8FA8A3] focus:outline-none focus:border-[#2C8C91]"
                />
              </div>

             
            </div>

            {recordsLoading ? (
              <div className="bg-white rounded-[28px] border border-[#E5DED6] p-16 text-center">
                <Loader2 size={36} className="animate-spin text-[#2C8C91] mx-auto mb-3" />
                <p className="text-sm font-bold text-[#1F2937]">Loading student activity &amp; academic records...</p>
              </div>
            ) : recordsError ? (
              <div className="bg-white rounded-[28px] border border-red-200 p-8 text-center max-w-md mx-auto">
                <AlertCircle size={36} className="text-red-500 mx-auto mb-3" />
                <h3 className="text-base font-bold text-[#1F2937] mb-1">Failed to Load Records</h3>
                <p className="text-xs text-[#8FA8A3] mb-4">{recordsError}</p>
                <button
                  onClick={fetchRecords}
                  className="inline-flex items-center gap-2 bg-[#165B5E] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#124B4E]"
                >
                  <RefreshCw size={14} />
                  Retry Fetch
                </button>
              </div>
            ) : filteredRecords.length === 0 ? (
              <div className="bg-white rounded-[28px] border border-[#E5DED6] p-16 text-center">
                <div className="w-16 h-16 rounded-full bg-[#FAF7F2] grid place-items-center mx-auto mb-4 text-[#8FA8A3]">
                  <Shield size={28} />
                </div>
                <h3 className="text-base font-bold text-[#1F2937] mb-1">
                  {searchQuery ? "No matching records found" : "No Records logged yet"}
                </h3>
                <p className="text-xs text-[#8FA8A3] max-w-sm mx-auto">
                  {searchQuery
                    ? "Try adjusting your search query or clear filters."
                    : "No student records have been submitted for your user ID yet."}
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-[28px] border border-[#E5DED6] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-[#FAF7F2] text-[#5F6B73] font-semibold border-b border-[#E5DED6]">
                        <th className="px-6 py-4">Record Title / Event</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Status / Grade</th>
                        <th className="px-6 py-4">Timestamp</th>
                        <th className="px-6 py-4 text-right">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#FAF7F2]">
                      {filteredRecords.map((rec, idx) => (
                        <tr key={rec._id || idx} className="hover:bg-[#FAF7F2]/50 transition-colors">
                          <td className="px-6 py-4 font-bold text-[#1F2937]">
                            <div className="flex items-center gap-2">
                              <Shield size={16} className="text-[#2C8C91]" />
                              <span>{rec.title || rec.name || rec.eventName || `Record #${idx + 1}`}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-[#5F6B73] font-medium capitalize">
                            {rec.type || rec.category || "General Activity"}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EFFDF4] text-[#1AAF7E]">
                              <CheckCircle2 size={13} />
                              {rec.status || rec.grade || rec.result || "Verified"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-[#5F6B73] font-mono text-xs">
                            {rec.date || rec.createdAt
                              ? new Date(rec.date || rec.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
                              : "--"}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => setSelectedRecord(rec)}
                              className="text-xs font-bold text-[#2C8C91] hover:text-[#165B5E] transition-colors cursor-pointer"
                            >
                              View Payload →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        )}

      </main>

      {/* ── RECORD PAYLOAD DETAIL MODAL ───────────────────────── */}
      <AnimatePresence>
        {selectedRecord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedRecord(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[28px] max-w-lg w-full p-6 shadow-2xl border border-[#E5DED6]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F2] mb-4">
                <div className="flex items-center gap-2">
                  <Code size={18} className="text-[#2C8C91]" />
                  <h3 className="text-base font-bold text-[#1F2937]" style={{ fontFamily: "var(--font-outfit)" }}>
                    Record Detail Payload
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#8FA8A3] hover:text-[#1F2937] grid place-items-center"
                >
                  ✕
                </button>
              </div>

              <div className="bg-[#124B4E] text-[#D4F04A] p-4 rounded-2xl text-xs font-mono overflow-x-auto max-h-80 leading-relaxed mb-4">
                <pre>{JSON.stringify(selectedRecord, null, 2)}</pre>
              </div>

              <button
                onClick={() => setSelectedRecord(null)}
                className="w-full bg-[#165B5E] text-white py-2.5 rounded-full text-xs font-bold hover:bg-[#124B4E]"
              >
                Close Window
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Sidebar>
  );
}
