"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Headphones, Video, Search, Globe, Building2,
  Clock, Play, ExternalLink, X, Tag, Sparkles, AlertCircle,
  FileText, RefreshCw, Volume2
} from "lucide-react";
import { ResourcesSkeleton } from "@/components/ui/ShimmerSkeleton";
import { getResources } from "@/lib/api";
import Sidebar from "./Sidebar";

/* ── Helper: Extract YouTube Embed URL ───────────────────── */
function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  let videoId = "";
  if (url.includes("v=")) {
    videoId = url.split("v=")[1]?.split("&")[0];
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0];
  } else if (url.includes("embed/")) {
    videoId = url.split("embed/")[1]?.split("?")[0];
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : null;
}

/* ── Helper: Extract YouTube Thumbnail URL ───────────────── */
function getYouTubeThumbnail(url) {
  if (!url) return null;
  let videoId = "";
  if (url.includes("v=")) {
    videoId = url.split("v=")[1]?.split("&")[0];
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0];
  } else if (url.includes("embed/")) {
    videoId = url.split("embed/")[1]?.split("?")[0];
  }
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
}

/* ── Helper: Extract Google Drive File ID ─────────────────── */
function getGoogleDriveId(url) {
  if (!url) return null;
  if (
    !url.includes("drive.google.com") &&
    !url.includes("docs.google.com") &&
    !url.includes("googleusercontent.com")
  ) {
    return null;
  }
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
  return match && match[1] ? match[1] : null;
}

/* ── Helper: Extract Streamable Audio URL ─────────────────── */
function getAudioUrl(item) {
  if (!item) return null;
  const rawUrl =
    item.audioUrl ||
    item.url ||
    item.link ||
    item.fileUrl ||
    item.mediaUrl ||
    item.videoUrl;
  if (!rawUrl) return null;

  const driveId = getGoogleDriveId(rawUrl);
  if (driveId) {
    return `/api/audio?id=${driveId}`;
  }
  return rawUrl;
}

export default function ResourcesPage() {
  const { user, token, loading: authLoading } = useAuth();
  const { t } = useLanguage();

  const [allResources, setAllResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter States
  const [selectedType, setSelectedType] = useState("all"); // 'all', 'article', 'audio', 'youtube'
  const [scope, setScope] = useState("global"); // 'global' or 'school'
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  // Derive user schoolId if present
  const userSchoolId = useMemo(() => {
    if (!user) return null;
    if (typeof user.schoolId === "string") return user.schoolId;
    if (user.schoolId && typeof user.schoolId === "object" && user.schoolId._id) {
      return user.schoolId._id;
    }
    return null;
  }, [user]);

  /* Fetch all resources for the chosen scope (global vs school) */
  useEffect(() => {
    if (!token) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    const schoolIdParam = scope === "school" ? userSchoolId : null;
    const isGlobalParam = scope === "global";

    getResources(
      {
        type: "", // Fetch all to calculate accurate tab counts
        limit: 200,
        schoolId: schoolIdParam,
        isGlobal: isGlobalParam,
      },
      token
    )
      .then((data) => {
        if (!isMounted) return;
        const list = Array.isArray(data) ? data : (data?.results || data?.resources || []);
        setAllResources(list);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Failed to load discover resources:", err);
        setError(err.message || "Failed to fetch discover resources.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [token, scope, userSchoolId]);

  /* Client-side Search & Category Type Filter */
  const filteredResources = useMemo(() => {
    let list = allResources;

    if (selectedType && selectedType !== "all") {
      list = list.filter((r) => {
        if (selectedType === "youtube") {
          return r.type === "youtube" || r.type === "video";
        }
        return r.type === selectedType;
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((item) => {
        const titleMatch = item.title?.toLowerCase().includes(q);
        const descMatch = item.description?.toLowerCase().includes(q);
        const tagMatch = item.tags?.some((t) => t.toLowerCase().includes(q));
        return titleMatch || descMatch || tagMatch;
      });
    }

    return list;
  }, [allResources, selectedType, searchQuery]);

  /* Type Counts calculated from full library */
  const counts = useMemo(() => {
    const total = allResources.length;
    const articles = allResources.filter((r) => r.type === "article").length;
    const audios = allResources.filter((r) => r.type === "audio").length;
    const videos = allResources.filter((r) => r.type === "youtube" || r.type === "video").length;
    return { total, articles, audios, videos };
  }, [allResources]);

  if (authLoading) return <ResourcesSkeleton />;

  return (
    <Sidebar>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-10">
        
        {/* ── HEADER BANNER ─────────────────────────────────── */}
        <div className="bg-gradient-to-br from-[#165B5E] via-[#1B6E73] to-[#2C8C91] rounded-[28px] p-8 lg:p-10 mb-8 text-white relative overflow-hidden shadow-lg">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
            
              <h1
                className="text-3xl sm:text-4xl lg:text-[2.6rem] font-normal leading-tight mb-2"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Discover & <span className="text-[#D4F04A]">Learning</span>
              </h1>
              <p className="text-white/70 text-sm max-w-xl leading-relaxed">
                {t("resources.subtitle") ||
                  "Explore curated wellness articles, audio podcasts, and video masterclasses designed for employee wellbeing."}
              </p>
            </div>

            {/* Scope Switcher Pill */}
            <div className="bg-white/15 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 flex items-center shrink-0">
              <button
                type="button"
                onClick={() => setScope("global")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  scope === "global"
                    ? "bg-[#D4F04A] text-[#07312C] shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <Globe size={14} />
                {t("resources.globalScope") || "Global Library"}
              </button>

              {userSchoolId && (
                <button
                  type="button"
                  onClick={() => setScope("school")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    scope === "school"
                      ? "bg-[#D4F04A] text-[#07312C] shadow-md"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Building2 size={14} />
                  {t("resources.organizationScope") || "My Organization"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── SEARCH & FILTER TABS BAR ────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: "all", label: t("resources.all") || "All Resources", icon: <BookOpen size={16} />, count: counts.total },
              { id: "article", label: t("resources.articles") || "Articles", icon: <FileText size={16} />, count: counts.articles },
              { id: "audio", label: t("resources.audios") || "Audio & Podcasts", icon: <Headphones size={16} />, count: counts.audios },
              { id: "youtube", label: t("resources.youtube") || "Videos", icon: <Video size={16} />, count: counts.videos },
            ].map((tab) => {
              const isActive = selectedType === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedType(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                    isActive
                      ? "bg-[#165B5E] text-white border-[#165B5E] shadow-sm"
                      : "bg-white text-[#5F6B73] border-[#E5DED6] hover:bg-[#FAF7F2] hover:border-[#2C8C91]/30"
                  }`}
                >
                  <span className={isActive ? "text-[#D4F04A]" : "text-[#8FA8A3]"}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                  {!loading && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                        isActive ? "bg-white/20 text-white" : "bg-[#FAF7F2] text-[#8FA8A3]"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8FA8A3]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("resources.searchPlaceholder") || "Search articles, podcasts..."}
              className="w-full bg-white border border-[#E5DED6] rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#1F2937] placeholder-[#8FA8A3] focus:outline-none focus:border-[#2C8C91] focus:ring-1 focus:ring-[#2C8C91] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8FA8A3] hover:text-[#1F2937]"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* ── CONTENT GRID SECTION ───────────────────────── */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-[24px] border border-[#E5DED6] p-5 animate-pulse">
                <div className="w-full h-44 bg-[#FAF7F2] rounded-2xl mb-4" />
                <div className="h-4 bg-[#FAF7F2] rounded-full w-3/4 mb-2" />
                <div className="h-3 bg-[#FAF7F2] rounded-full w-1/2 mb-4" />
                <div className="h-8 bg-[#FAF7F2] rounded-xl w-full" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-white rounded-[24px] border border-red-200 p-8 text-center max-w-md mx-auto">
            <AlertCircle size={36} className="text-red-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#1F2937] mb-1">Failed to load resources</h3>
            <p className="text-xs text-[#8FA8A3] mb-4">{error}</p>
            <button
              onClick={() => setSelectedType(selectedType)}
              className="inline-flex items-center gap-2 bg-[#165B5E] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#124B4E]"
            >
              <RefreshCw size={14} />
              Try Again
            </button>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="bg-white rounded-[28px] border border-[#E5DED6] p-12 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] grid place-items-center mx-auto mb-4 text-[#8FA8A3]">
              <BookOpen size={28} />
            </div>
            <h3 className="text-base font-bold text-[#1F2937] mb-1">
              {t("resources.noResources") || "No resources found"}
            </h3>
            <p className="text-xs text-[#8FA8A3] leading-relaxed mb-6">
              {scope === "school"
                ? "There are currently no school-specific resources available. Switch to Global Library to explore all resources."
                : t("resources.noResourcesSub") || "Try clearing your search query or switching categories."}
            </p>
            {scope === "school" && (
              <button
                type="button"
                onClick={() => setScope("global")}
                className="inline-flex items-center gap-2 bg-[#2C8C91] text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#216B6F] transition-all"
              >
                <Globe size={14} />
                Switch to Global Library
              </button>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((item) => {
              const type = item.type || "article";
              const isYoutube = type === "youtube" || type === "video";
              const isAudio = type === "audio";
              const isArticle = type === "article";

              // Determine thumbnail image
              const thumbnail =
                item.imageUrl ||
                (isYoutube ? getYouTubeThumbnail(item.videoUrl) : null);

              return (
                <div
                  key={item._id}
                  className="group bg-white rounded-[24px] border border-[#E5DED6] overflow-hidden hover:border-[#2C8C91]/30 hover:shadow-[0_12px_32px_-8px_rgba(44,140,145,0.15)] transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Thumbnail / Header Area */}
                  <div className="relative h-48 bg-[#165B5E]/5 overflow-hidden">
                    {thumbnail ? (
                      <img
                        src={thumbnail}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#165B5E] to-[#2C8C91] grid place-items-center p-6 text-center text-white">
                        {isArticle && <FileText size={40} className="text-[#D4F04A]" />}
                        {isAudio && <Headphones size={40} className="text-[#D4F04A]" />}
                        {isYoutube && <Video size={40} className="text-[#D4F04A]" />}
                      </div>
                    )}

                    {/* Dark gradient overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Type Badge Top Left */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                      {isArticle && (
                        <>
                          <FileText size={12} className="text-[#D4F04A]" /> Article
                        </>
                      )}
                      {isAudio && (
                        <>
                          <Headphones size={12} className="text-[#8FD9C9]" /> Audio
                        </>
                      )}
                      {isYoutube && (
                        <>
                          <Video size={12} className="text-[#E05FA0]" /> Video
                        </>
                      )}
                    </div>

                    {/* Time Badge Top Right */}
                    {item.time && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white/90 text-[10px] font-semibold">
                        <Clock size={11} />
                        {item.time}
                      </div>
                    )}

                    {/* Quick Play Overlay Button */}
                    <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="w-12 h-12 rounded-full bg-[#D4F04A] text-[#07312C] grid place-items-center shadow-lg transform group-hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Play size={20} className="fill-[#07312C] ml-0.5" />
                      </button>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {item.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-bold uppercase tracking-wider text-[#2C8C91] bg-[#2C8C91]/10 px-2 py-0.5 rounded-md"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <h3
                        className="text-[#1F2937] font-semibold text-base mb-2 line-clamp-2 leading-snug group-hover:text-[#2C8C91] transition-colors"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        {item.title}
                      </h3>

                      {item.description && (
                        <p className="text-[#8FA8A3] text-xs line-clamp-2 leading-relaxed mb-4">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Card Footer Action */}
                    <div className="pt-3 border-t border-[#E5DED6] flex items-center justify-between">
                      <span className="text-[10px] text-[#8FA8A3] font-medium flex items-center gap-1">
                        {item.schoolId ? (
                          <>
                            <Building2 size={11} className="text-[#2C8C91]" /> School Exclusive
                          </>
                        ) : (
                          <>
                            <Globe size={11} className="text-[#7C5CDB]" /> Global Library
                          </>
                        )}
                      </span>

                      <button
                        onClick={() => setSelectedItem(item)}
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#165B5E] hover:text-[#2C8C91] group-hover:translate-x-0.5 transition-all cursor-pointer"
                      >
                        {isArticle && (t("resources.readArticle") || "Read Article")}
                        {isAudio && (t("resources.listenAudio") || "Listen Audio")}
                        {isYoutube && (t("resources.watchVideo") || "Watch Video")}
                        <ExternalLink size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* ── INTERACTIVE MEDIA PLAYER MODAL ───────────────── */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-[28px] max-w-3xl w-full overflow-hidden shadow-2xl relative border border-[#E5DED6]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5DED6] bg-[#FAF7F2]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#165B5E] text-[#D4F04A] grid place-items-center">
                    {selectedItem.type === "article" && <FileText size={16} />}
                    {selectedItem.type === "audio" && <Headphones size={16} />}
                    {(selectedItem.type === "youtube" || selectedItem.type === "video") && <Video size={16} />}
                  </div>
                  <div>
                    <h4 className="text-[#1F2937] text-sm font-bold truncate max-w-md">
                      {selectedItem.title}
                    </h4>
                    <span className="text-[#8FA8A3] text-[10px] uppercase font-bold tracking-wider">
                      {selectedItem.type} • {selectedItem.time || "Wellness Resource"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-8 h-8 rounded-full bg-white border border-[#E5DED6] text-[#5F6B73] hover:text-[#1F2937] grid place-items-center transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Media Content Body */}
              <div className="p-6">
                
                {/* 1. YOUTUBE / VIDEO EMBED */}
                {(selectedItem.type === "youtube" || selectedItem.type === "video") && (
                  <div className="mb-6">
                    {getYouTubeEmbedUrl(selectedItem.videoUrl) ? (
                      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-md bg-black">
                        <iframe
                          src={getYouTubeEmbedUrl(selectedItem.videoUrl)}
                          title={selectedItem.title}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <div className="bg-[#FAF7F2] rounded-2xl p-8 text-center border border-[#E5DED6]">
                        <Video size={48} className="text-[#2C8C91] mx-auto mb-3" />
                        <p className="text-sm font-bold text-[#1F2937] mb-2">Watch Video Resource</p>
                        <a
                          href={selectedItem.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#2C8C91] text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#216B6F]"
                        >
                          Open Video in New Tab <ExternalLink size={14} />
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. AUDIO PLAYER */}
                {selectedItem.type === "audio" && (
                  <div className="mb-6 bg-gradient-to-br from-[#165B5E] to-[#2C8C91] text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
                      {selectedItem.imageUrl ? (
                        <img
                          src={selectedItem.imageUrl}
                          alt={selectedItem.title}
                          className="w-24 h-24 rounded-2xl object-cover shadow-md shrink-0 border border-white/20"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-2xl bg-white/10 grid place-items-center shrink-0 border border-white/20">
                          <Headphones size={36} className="text-[#D4F04A]" />
                        </div>
                      )}

                      <div className="flex-1 text-center sm:text-left w-full">
                        <div className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-extrabold text-[#D4F04A] bg-white/15 px-2.5 py-0.5 rounded-full mb-2">
                          <Volume2 size={12} /> Audio Session
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">
                          {selectedItem.title}
                        </h3>
                        <p className="text-white/70 text-xs mb-4">
                          {selectedItem.time || "Duration: 3-5 mins"}
                        </p>

                        {/* Custom HTML5 Audio Player */}
                        {getAudioUrl(selectedItem) ? (
                          <div className="bg-white/15 p-3 rounded-2xl border border-white/20 space-y-2">
                            <audio
                              controls
                              src={getAudioUrl(selectedItem)}
                              className="w-full h-10 accent-[#D4F04A]"
                              autoPlay
                            />
                            <div className="flex justify-between items-center text-[11px] text-white/80 px-1 pt-1">
                              <span>Streaming Audio Track</span>
                              <a
                                href={selectedItem.audioUrl || selectedItem.url || getAudioUrl(selectedItem)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[#D4F04A] underline flex items-center gap-1"
                              >
                                Open Audio Source <ExternalLink size={12} />
                              </a>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-white/10 p-3 rounded-xl border border-white/20 text-center text-xs text-white/70">
                            Audio track URL is currently unavailable
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. ARTICLE VIEWER */}
                {selectedItem.type === "article" && (
                  <div className="mb-6 bg-[#FAF7F2] p-6 rounded-2xl border border-[#E5DED6] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {selectedItem.imageUrl ? (
                        <img
                          src={selectedItem.imageUrl}
                          alt={selectedItem.title}
                          className="w-20 h-20 rounded-xl object-cover border border-[#E5DED6] shrink-0"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-xl bg-[#2C8C91]/10 text-[#2C8C91] grid place-items-center shrink-0">
                          <FileText size={32} />
                        </div>
                      )}
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#2C8C91] bg-[#2C8C91]/10 px-2 py-0.5 rounded">
                          Article Document
                        </span>
                        <h4 className="text-base font-bold text-[#1F2937] mt-1 mb-0.5">
                          {selectedItem.title}
                        </h4>
                        <p className="text-xs text-[#8FA8A3]">
                          {selectedItem.time || "3 Min Read"}
                        </p>
                      </div>
                    </div>

                    {selectedItem.articleUrl && (
                      <a
                        href={selectedItem.articleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#165B5E] text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#124B4E] shadow-md transition-all shrink-0"
                      >
                        Read Full Article <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                )}

                {/* Additional Description & Tags */}
                {selectedItem.description && (
                  <div className="mb-4">
                    <h5 className="text-xs font-bold uppercase text-[#8FA8A3] tracking-wider mb-1">Overview</h5>
                    <p className="text-xs text-[#5F6B73] leading-relaxed">
                      {selectedItem.description}
                    </p>
                  </div>
                )}

                {selectedItem.tags && selectedItem.tags.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-[#E5DED6]">
                    <Tag size={12} className="text-[#8FA8A3]" />
                    {selectedItem.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-bold text-[#165B5E] bg-[#FAF7F2] border border-[#E5DED6] px-2.5 py-0.5 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Sidebar>
  );
}
