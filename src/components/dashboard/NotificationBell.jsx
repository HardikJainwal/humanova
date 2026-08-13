"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getNotifications, getUnreadNotificationCount, markNotificationAsRead, markAllNotificationsAsRead } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell, BellRing, CheckCheck, RefreshCw, Inbox, Clock, Check, ChevronRight,
  ClipboardList, Calendar, MessageSquare, Award, ShieldCheck, Info,
  Smartphone, QrCode, X, CalendarCheck, UserCheck, Camera, Flame, Heart
} from "lucide-react";

/**
 * Map backend favIcon keys to Lucide Icons
 */
const FAVICON_MAP = {
  calendarCheck: CalendarCheck,
  calendar: Calendar,
  userCheck: UserCheck,
  camera: Camera,
  flame: Flame,
  shield: ShieldCheck,
  award: Award,
  clock: Clock,
  bell: BellRing,
  heart: Heart,
  clipboardList: ClipboardList,
  messageSquare: MessageSquare,
};

/**
 * Helper to check if a notification belongs to an app-exclusive feature
 */
function isAppOnlyNotification(item) {
  const url = (item?.redirectUrl || "").toLowerCase();
  const type = (item?.type || "").toLowerCase();
  const platform = (item?.platform || "").toLowerCase();

  if (url.startsWith("/dashboard/")) return false;
  if (url === "/face-emotion-detector" || url === "/write-reflection" || url === "/mood-scanner") return true;
  if (type.includes("selfie") || type.includes("reflection") || type.includes("mood") || type.includes("detector")) return true;
  if (platform === "app" || platform === "mobile") return true;

  return Boolean(url && !url.startsWith("/dashboard"));
}

/**
 * Helper to format date/timestamp to relative time string.
 */
function formatTimeAgo(dateInput) {
  if (!dateInput) return "";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "";

  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 172800) return "Yesterday";
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/**
 * Render category-specific professional icon for notification item
 */
function renderNotificationItemIcon(item, isRead) {
  const favIconKey = item?.favIcon;
  if (favIconKey && FAVICON_MAP[favIconKey]) {
    const FavIconComponent = FAVICON_MAP[favIconKey];
    const bgStyle = !isRead
      ? "bg-gradient-to-br from-[#165B5E] to-[#2C8C91] text-white shadow-sm"
      : "bg-[#FAF7F2] text-[#5F6B73] border border-[#E5DED6]";
    return (
      <div className={`w-9 h-9 rounded-2xl grid place-items-center transition-all ${bgStyle}`}>
        <FavIconComponent size={16} />
      </div>
    );
  }

  const text = `${item?.type || ""} ${item?.title || ""} ${item?.heading || ""} ${item?.message || ""} ${item?.description || ""}`.toLowerCase();

  let IconComponent = BellRing;
  let bgStyle = !isRead
    ? "bg-gradient-to-br from-[#165B5E] to-[#2C8C91] text-white shadow-sm"
    : "bg-[#FAF7F2] text-[#5F6B73] border border-[#E5DED6]";

  if (text.includes("selfie") || text.includes("camera") || text.includes("vitals")) {
    IconComponent = Camera;
    if (!isRead) bgStyle = "bg-gradient-to-br from-[#2C8C91] to-[#165B5E] text-white shadow-sm";
  } else if (text.includes("leave") || text.includes("approval") || text.includes("request") || text.includes("reflection")) {
    IconComponent = ClipboardList;
    if (!isRead) bgStyle = "bg-gradient-to-br from-[#2C8C91] to-[#1B6E73] text-white shadow-sm";
  } else if (text.includes("shift") || text.includes("schedule") || text.includes("time") || text.includes("clock") || text.includes("attendance")) {
    IconComponent = Calendar;
    if (!isRead) bgStyle = "bg-gradient-to-br from-[#4A90D9] to-[#2B6CB0] text-white shadow-sm";
  } else if (text.includes("community") || text.includes("post") || text.includes("comment") || text.includes("message") || text.includes("chat")) {
    IconComponent = MessageSquare;
    if (!isRead) bgStyle = "bg-gradient-to-br from-[#E05FA0] to-[#A0336E] text-white shadow-sm";
  } else if (text.includes("badge") || text.includes("reward") || text.includes("point") || text.includes("achievement") || text.includes("streak")) {
    IconComponent = Award;
    if (!isRead) bgStyle = "bg-gradient-to-br from-[#E8A020] to-[#B87000] text-white shadow-sm";
  } else if (text.includes("security") || text.includes("system") || text.includes("policy") || text.includes("admin")) {
    IconComponent = ShieldCheck;
    if (!isRead) bgStyle = "bg-gradient-to-br from-[#7C5CDB] to-[#4A2EA8] text-white shadow-sm";
  } else if (isRead) {
    IconComponent = Bell;
  }

  return (
    <div className={`w-9 h-9 rounded-2xl grid place-items-center transition-all ${bgStyle}`}>
      <IconComponent size={16} />
    </div>
  );
}

export default function NotificationBell() {
  const { token } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [markingAll, setMarkingAll] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [filter, setFilter] = useState("all"); // "all" | "unread"
  const [selectedAppNotification, setSelectedAppNotification] = useState(null);

  const popoverRef = useRef(null);

  // Helper to fetch unread count for user interactions
  const fetchUnreadCount = useCallback(async () => {
    if (!token) return;
    try {
      const res = await getUnreadNotificationCount(token);
      const count =
        typeof res === "number"
          ? res
          : res?.unreadCount ?? res?.count ?? res?.data?.unreadCount ?? res?.data?.count ?? res?.unread ?? 0;
      setUnreadCount(Number(count) || 0);
    } catch (err) {
      console.error("Failed to fetch unread notification count:", err);
    }
  }, [token]);

  // Fetch unread count periodically & on token change
  useEffect(() => {
    if (!token) return;

    let isMounted = true;
    getUnreadNotificationCount(token)
      .then((res) => {
        if (!isMounted) return;
        const count =
          typeof res === "number"
            ? res
            : res?.unreadCount ?? res?.count ?? res?.data?.unreadCount ?? res?.data?.count ?? res?.unread ?? 0;
        setUnreadCount(Number(count) || 0);
      })
      .catch((err) => console.error("Failed to fetch unread count:", err));

    const interval = setInterval(() => {
      getUnreadNotificationCount(token)
        .then((res) => {
          if (!isMounted) return;
          const count =
            typeof res === "number"
              ? res
              : res?.unreadCount ?? res?.count ?? res?.data?.unreadCount ?? res?.data?.count ?? res?.unread ?? 0;
          setUnreadCount(Number(count) || 0);
        })
        .catch(() => {});
    }, 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [token]);

  // Fetch list of notifications
  const fetchNotificationsList = async (pageNum = 1, append = false) => {
    if (!token) return;
    if (append) setLoadingMore(true);
    else setLoading(true);

    try {
      const data = await getNotifications(token, pageNum, 10);
      
      let list = [];
      if (Array.isArray(data)) {
        list = data;
      } else if (Array.isArray(data?.notifications)) {
        list = data.notifications;
      } else if (Array.isArray(data?.results)) {
        list = data.results;
      } else if (Array.isArray(data?.data)) {
        list = data.data;
      } else if (Array.isArray(data?.docs)) {
        list = data.docs;
      }

      if (append) {
        setNotifications((prev) => [...prev, ...list]);
      } else {
        setNotifications(list);
      }

      const totalPages = data?.totalPages ?? data?.pages ?? (list.length >= 10 ? pageNum + 1 : pageNum);
      setHasMore(pageNum < totalPages && list.length === 10);
      setPage(pageNum);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  // Toggle dropdown handler
  const handleToggle = () => {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);
    if (nextOpen) {
      fetchNotificationsList(1, false);
      fetchUnreadCount();
    }
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Mark single notification as read
  const handleMarkAsRead = async (id, e) => {
    if (e) e.stopPropagation();
    if (!token || !id) return;

    try {
      await markNotificationAsRead(id, token);
      setNotifications((prev) =>
        prev.map((item) => {
          const itemId = item._id || item.id;
          if (itemId === id) {
            return { ...item, isRead: true, read: true, status: "read" };
          }
          return item;
        })
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  // Handle clicking notification item (Web navigation vs Mobile App Modal)
  const handleNotificationClick = async (item, e) => {
    if (e) e.stopPropagation();
    const id = item._id || item.id;
    const isRead = item.isRead || item.read || item.status === "read";

    if (!isRead && id) {
      handleMarkAsRead(id);
    }

    if (isAppOnlyNotification(item)) {
      setSelectedAppNotification(item);
      setIsOpen(false);
    } else if (item.redirectUrl && item.redirectUrl.startsWith("/dashboard")) {
      setIsOpen(false);
      router.push(item.redirectUrl);
    }
  };

  // Mark all notifications as read via PATCH /notify/read?all=true
  const handleMarkAllAsRead = async () => {
    if (!token || markingAll) return;
    setMarkingAll(true);
    try {
      await markAllNotificationsAsRead(token);
      setNotifications((prev) =>
        prev.map((item) => ({ ...item, isRead: true, read: true, status: "read" }))
      );
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    } finally {
      setMarkingAll(false);
    }
  };

  // Filtered notifications list
  const displayedNotifications = filter === "unread"
    ? notifications.filter((item) => !item.isRead && !item.read && item.status !== "read")
    : notifications;

  return (
    <div className="relative inline-block" ref={popoverRef}>
      {/* BELL BUTTON */}
      <button
        type="button"
        onClick={handleToggle}
        className={`relative p-2.5 rounded-2xl transition-all duration-200 cursor-pointer ${
          isOpen
            ? "bg-[#165B5E] text-white shadow-md"
            : "text-[#5F6B73] hover:text-[#1F2937] hover:bg-[#FAF7F2] border border-transparent hover:border-[#E5DED6]"
        }`}
        aria-label="Notifications"
        title="Notifications"
      >
        <Bell size={19} />
        
        {/* UNREAD BADGE */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-gradient-to-r from-[#E05FA0] to-[#C93B7D] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-pulse">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* DROPDOWN POPOVER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-[24px] border border-[#E5DED6] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)] z-50 overflow-hidden flex flex-col max-h-[540px]"
          >
            {/* DROPDOWN HEADER */}
            <div className="p-4 sm:px-5 sm:py-4 bg-[#FAF7F2] border-b border-[#E5DED6] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#2C8C91]/15 text-[#2C8C91] grid place-items-center">
                  <Bell size={16} />
                </div>
                <div>
                  <h3 className="text-[#1F2937] font-bold text-sm leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                    Notifications
                  </h3>
                  <p className="text-[#8FA8A3] text-[11px] font-medium">
                    {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Refresh button */}
                <button
                  type="button"
                  onClick={() => {
                    setRefreshing(true);
                    fetchNotificationsList(1, false);
                    fetchUnreadCount();
                  }}
                  disabled={refreshing || loading}
                  className="p-1.5 rounded-xl text-[#5F6B73] hover:text-[#2C8C91] hover:bg-white transition-colors cursor-pointer"
                  title="Refresh notifications"
                >
                  <RefreshCw size={14} className={refreshing ? "animate-spin text-[#2C8C91]" : ""} />
                </button>

                {/* Mark all as read button */}
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={handleMarkAllAsRead}
                    disabled={markingAll}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold text-[#2C8C91] hover:bg-[#2C8C91]/10 transition-colors cursor-pointer"
                    title="Mark all as read"
                  >
                    <CheckCheck size={13} />
                    <span>Read all</span>
                  </button>
                )}
              </div>
            </div>

            {/* FILTER TABS */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white border-b border-[#E5DED6]/60 text-xs">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  filter === "all"
                    ? "bg-[#165B5E] text-white"
                    : "text-[#5F6B73] hover:bg-[#FAF7F2]"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFilter("unread")}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  filter === "unread"
                    ? "bg-[#165B5E] text-white"
                    : "text-[#5F6B73] hover:bg-[#FAF7F2]"
                }`}
              >
                <span>Unread</span>
                {unreadCount > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[9px] ${filter === "unread" ? "bg-white/20 text-white" : "bg-[#E05FA0] text-white"}`}>
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>

            {/* NOTIFICATIONS LIST CONTENT */}
            <div className="flex-1 overflow-y-auto divide-y divide-[#E5DED6]/40">
              {loading ? (
                /* Skeleton loader */
                <div className="p-4 space-y-3">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="flex gap-3 animate-pulse">
                      <div className="w-9 h-9 rounded-xl bg-[#E5DED6]/60 shrink-0" />
                      <div className="flex-1 space-y-2 py-1">
                        <div className="h-3 bg-[#E5DED6]/80 rounded w-3/4" />
                        <div className="h-2.5 bg-[#E5DED6]/50 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : displayedNotifications.length === 0 ? (
                /* Empty state */
                <div className="p-8 text-center flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E5DED6] grid place-items-center text-[#8FA8A3] mb-3">
                    <Inbox size={22} />
                  </div>
                  <p className="text-[#1F2937] text-xs font-bold mb-0.5">
                    {filter === "unread" ? "No unread notifications" : "No notifications yet"}
                  </p>
                  <p className="text-[#8FA8A3] text-[11px]">
                    We&apos;ll let you know when important updates arrive.
                  </p>
                </div>
              ) : (
                /* Item List */
                displayedNotifications.map((item, idx) => {
                  const id = item._id || item.id;
                  const isRead = item.isRead || item.read || item.status === "read";
                  const title = item.title || item.heading || item.type || "Notification";
                  const message = item.message || item.description || item.content || item.body || "";
                  const timestamp = item.createdAt || item.timestamp || item.date;
                  const isAppOnly = isAppOnlyNotification(item);

                  return (
                    <div
                      key={id || `notif_${idx}`}
                      onClick={(e) => handleNotificationClick(item, e)}
                      className={`group p-4 flex items-start gap-3 transition-colors duration-150 cursor-pointer ${
                        !isRead ? "bg-[#2C8C91]/[0.04] hover:bg-[#2C8C91]/[0.08]" : "bg-white hover:bg-[#FAF7F2]"
                      }`}
                    >
                      {/* Status indicator dot / Icon */}
                      <div className="relative shrink-0 mt-0.5">
                        {renderNotificationItemIcon(item, isRead)}
                        {!isRead && (
                          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#E05FA0] rounded-full border-2 border-white" />
                        )}
                      </div>

                      {/* Notification text content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <h4
                              className={`text-xs font-bold truncate ${
                                !isRead ? "text-[#1F2937]" : "text-[#5F6B73]"
                              }`}
                              style={{ fontFamily: "var(--font-outfit)" }}
                            >
                              {title}
                            </h4>
                            {isAppOnly && (
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#F3EEFF] text-[#7C5CDB] text-[9px] font-extrabold shrink-0">
                                <Smartphone size={9} /> App
                              </span>
                            )}
                          </div>

                          {timestamp && (
                            <span className="text-[10px] text-[#8FA8A3] font-medium shrink-0 flex items-center gap-1">
                              <Clock size={10} />
                              {formatTimeAgo(timestamp)}
                            </span>
                          )}
                        </div>

                        {message && (
                          <p className="text-[#5F6B73] text-[11px] leading-snug line-clamp-2">
                            {message}
                          </p>
                        )}
                      </div>

                      {/* Mark single as read button on hover */}
                      {!isRead && id && (
                        <button
                          type="button"
                          onClick={(e) => handleMarkAsRead(id, e)}
                          className="p-1 rounded-lg text-[#8FA8A3] hover:text-[#1AAF7E] hover:bg-white transition-colors opacity-80 group-hover:opacity-100 shrink-0 self-center"
                          title="Mark as read"
                        >
                          <Check size={14} />
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* FOOTER PAGINATION / LOAD MORE */}
            {hasMore && (
              <div className="p-3 bg-[#FAF7F2] border-t border-[#E5DED6] text-center">
                <button
                  type="button"
                  onClick={() => fetchNotificationsList(page + 1, true)}
                  disabled={loadingMore}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2C8C91] hover:text-[#165B5E] transition-colors cursor-pointer"
                >
                  {loadingMore ? (
                    <span className="flex items-center gap-1">
                      <RefreshCw size={12} className="animate-spin" /> Loading...
                    </span>
                  ) : (
                    <>
                      Load More Notifications <ChevronRight size={12} />
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* APP EXCLUSIVE FEATURE MODAL WITH QR CODE */}
      <AnimatePresence>
        {selectedAppNotification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedAppNotification(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-[28px] p-6 sm:p-8 max-w-md w-full text-center shadow-[0_24px_60px_-12px_rgba(0,0,0,0.3)] relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedAppNotification(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-[#8FA8A3] hover:text-[#1F2937] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* Feature Icon Header */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#165B5E] via-[#1B6E73] to-[#2C8C91] grid place-items-center mx-auto mb-4 text-white shadow-md">
                {renderNotificationItemIcon(selectedAppNotification, false)}
              </div>

              {/* App-Only Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EEFF] text-[#7C5CDB] text-xs font-bold mb-3">
                <Smartphone size={13} />
                <span>Humanova App Feature</span>
              </div>

              {/* Notification Title & Message */}
              <h3 className="text-[#1F2937] font-extrabold text-xl mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                {selectedAppNotification.title || "App Exclusive Feature"}
              </h3>
              <p className="text-[#5F6B73] text-xs leading-relaxed mb-6">
                {selectedAppNotification.message || "This feature requires the Humanova Mobile App."}
              </p>

              {/* QR Code Container */}
              <div className="bg-[#FAF7F2] rounded-2xl border border-[#E5DED6] p-5 mb-6 flex flex-col items-center">
                <div className="w-40 h-40 bg-white rounded-xl border border-[#E5DED6] p-2 flex flex-col items-center justify-center shadow-inner relative group">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://humanova.live/app"
                    alt="Scan QR Code to Download App"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="text-[#1F2937] text-xs font-bold flex items-center justify-center gap-1">
                    <QrCode size={13} className="text-[#2C8C91]" /> Scan to open feature on phone
                  </p>
                  <p className="text-[#8FA8A3] text-[10px] mt-0.5">
                    Point camera at QR code to open in Humanova Mobile App
                  </p>
                </div>
              </div>

              {/* App Store / Google Play links */}
              <div className="flex items-center justify-center gap-2">
                <a
                  href="#"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#165B5E] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#124B4E] transition-colors"
                >
                  <Smartphone size={14} /> App Store
                </a>
                <a
                  href="#"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#FAF7F2] border border-[#E5DED6] text-[#1F2937] text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#E5DED6]/40 transition-colors"
                >
                  Google Play
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
