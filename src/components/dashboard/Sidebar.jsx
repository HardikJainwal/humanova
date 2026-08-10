"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSelector from "@/components/ui/LanguageSelector";
import {
  LogOut, Clock, Activity, ClipboardList, CalendarClock, Heart,
  HeadphonesIcon, Shield, Menu, X, Bell, User, Users, BookOpen, Compass,
} from "lucide-react";

export default function Sidebar({ children }) {
  const { user, logout } = useAuth();
  const { t, lang } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      id: "home",
      label: t("features.home") || "Dashboard",
      icon: <Activity size={20} />,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      id: "resources",
      label: t("quickActions.resourceLibrary") || "Discovery & Library",
      icon: <BookOpen size={20} />,
      href: "/dashboard/resources",
      active: pathname.startsWith("/dashboard/resources"),
    },
    {
      id: "profile",
      label: t("features.profile") || "My Profile",
      icon: <User size={20} />,
      href: "/dashboard/profile",
      active: pathname === "/dashboard/profile",
    },
    {
      id: "attendance",
      label: t("quickActions.checkInOut") || "Clock In / Out",
      icon: <Clock size={20} />,
      href: "/dashboard/attendance",
      active: pathname === "/dashboard/attendance",
    },
    {
      id: "community",
      label: t("quickActions.community") || "Community",
      icon: <Users size={20} />,
      href: "/dashboard/community",
      active: pathname === "/dashboard/community",
    },
    {
      id: "leave",
      label: t("features.leaveManagement") || "Leave Management",
      icon: <ClipboardList size={20} />,
      href: "/dashboard/leave",
      active: pathname.startsWith("/dashboard/leave"),
    },
    {
      id: "records-policies",
      label: "Records & Policies",
      icon: <Shield size={20} />,
      href: "/dashboard/records-policies",
      active: pathname.startsWith("/dashboard/records-policies"),
    },
    {
      id: "shift",
      label: t("features.shiftSchedule") || "Shift Schedule",
      icon: <CalendarClock size={20} />,
      href: "#",
      disabled: true,
    },
    {
      id: "wellness",
      label: t("features.wellnessTracking") || "Wellness Tracking",
      icon: <Heart size={20} />,
      href: "#",
      disabled: true,
    },
  ];

  const initials = user ? `${(user.firstName?.[0] ?? "").toUpperCase()}${(user.lastName?.[0] ?? "").toUpperCase()}` : "U";
  const firstName = user?.firstName ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1) : "User";

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col md:flex-row">

      {/* MOBILE HEADER */}
      <header className="md:hidden flex items-center justify-between px-4 h-16 bg-white border-b border-[#E5DED6] sticky top-0 z-50">
        <Link href="/dashboard" className="flex items-center">
          <Image
            src="https://humanova-docs-app.s3.amazonaws.com/Logo/Vasu_-_Humanova_Logo_500_x_100_px_1_op9ppj.png"
            alt="Humanova"
            width={120}
            height={30}
            priority
            className="h-7 w-auto object-contain"
          />
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSelector compact />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-[#5F6B73] hover:text-[#1F2937]"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* SIDEBAR SIDE ELEMENT */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#165B5E] text-white flex flex-col justify-between transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0 overflow-y-auto ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        {/* Top brand logo section */}
        <div>
          <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-[#124B4E]">
            <Link href="/dashboard" className="flex items-center">
              <Image
                src="https://humanova-docs-app.s3.amazonaws.com/Logo/Vasu_-_Humanova_Logo_500_x_100_px_1_op9ppj.png"
                alt="Humanova"
                width={130}
                height={32}
                priority
                className="h-7 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <button className="md:hidden text-white/60 hover:text-white" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 py-6 flex flex-col gap-1.5">
            {menuItems.map((item) => {
              const content = (
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  item.active
                    ? "bg-[#D4F04A] text-[#07312C] shadow-[0_4px_16px_rgba(212,240,74,0.2)] font-extrabold"
                    : item.disabled
                    ? "opacity-40 cursor-not-allowed text-white/50"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}>
                  <span className={item.active ? "text-[#07312C]" : "text-white/70 group-hover:text-white"}>
                    {item.icon}
                  </span>
                  <span className="flex-1">{item.label}</span>
                  {item.disabled && (
                    <span className="text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-white/10 text-white/55">
                      Soon
                    </span>
                  )}
                </div>
              );

              if (item.disabled) {
                return (
                  <div key={item.id} className="cursor-not-allowed">
                    {content}
                  </div>
                );
              }

              return (
                <Link key={item.id} href={item.href} onClick={() => setIsOpen(false)}>
                  {content}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom profile / logout section */}
        <div className="border-t border-white/10 p-4 flex flex-col gap-4 bg-[#124B4E]/80">
          <Link
            href="/dashboard/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 group hover:bg-white/5 p-1.5 rounded-xl transition-colors cursor-pointer"
          >
            {user?.photo ? (
              <Image
                src={user.photo}
                alt={firstName}
                width={38}
                height={38}
                className="rounded-full object-cover border border-white/15"
              />
            ) : (
              <div className="w-[38px] h-[38px] rounded-full bg-white/15 text-white grid place-items-center text-xs font-bold border border-white/10 group-hover:border-[#D4F04A]/50">
                {initials}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate group-hover:text-[#D4F04A] transition-colors">{firstName}</p>
              <p className="text-white/40 text-[10px] uppercase tracking-wider truncate font-medium">
                {user?.employeeCode || "Employee"}
              </p>
            </div>
          </Link>

          <button
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-white/15 text-white/70 hover:text-[#E05FA0] hover:border-[#E05FA0]/30 hover:bg-[#FFF0F6]/5 text-xs font-bold transition-all"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header toolbar for desktops */}
        <header className="hidden md:flex items-center justify-end px-10 h-16 bg-white border-b border-[#E5DED6] sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <button className="relative p-2 rounded-xl text-[#5F6B73] hover:text-[#1F2937] hover:bg-[#FAF7F2] transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E05FA0] rounded-full" />
            </button>
            <Link href="/dashboard/profile" className="text-right group cursor-pointer">
              <p className="text-[#1F2937] text-xs font-bold leading-tight group-hover:text-[#2C8C91] transition-colors">{firstName}</p>
              <p className="text-[#8FA8A3] text-[10px] leading-tight font-medium">{user?.email ?? ""}</p>
            </Link>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>

      {/* Backdrop overlay for mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

    </div>
  );
}
