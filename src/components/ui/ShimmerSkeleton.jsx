"use client";

import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";

/* ── Base Shimmer Box ─────────────────────────────────────── */
export function SkeletonBox({ className = "", style = {} }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-[#E8E2D9]/60 ${className}`}
      style={style}
    >
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent animate-[shimmerSweep_1.6s_infinite]" />
    </div>
  );
}

/* ── Top Header Bar with Glowing Humanova Logo ────────────── */
export function ShimmerHeader({ title = "Loading content…" }) {
  return (
    <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E5DED6]">
      <div className="flex items-center gap-3">
        {/* Shiny Logo Box */}
        <div className="relative overflow-hidden rounded-xl px-4 py-2 bg-white border border-[#2C8C91]/20 shadow-sm flex items-center justify-center">
          <img
            src="https://humanova-docs-app.s3.amazonaws.com/Logo/Vasu_-_Humanova_Logo_500_x_100_px_1_op9ppj.png"
            alt="Humanova Logo"
            className="h-6 w-auto object-contain relative z-10"
          />
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent animate-[shimmerSweep_1.8s_infinite]" />
          </div>
        </div>
        <SkeletonBox className="h-4 w-36 rounded-full" />
      </div>
      <SkeletonBox className="h-9 w-28 rounded-full" />
    </div>
  );
}

/* ── DASHBOARD PAGE SKELETON ───────────────────────────────── */
export function DashboardSkeleton() {
  return (
    <Sidebar>
      <style jsx global>{`
        @keyframes shimmerSweep {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
      `}</style>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-10">
        <ShimmerHeader title="Dashboard" />

        {/* Hero Banner Shimmer */}
        <div className="bg-gradient-to-br from-[#165B5E]/90 to-[#2C8C91]/90 rounded-[28px] p-8 lg:p-10 mb-10 relative overflow-hidden shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <SkeletonBox className="h-4 w-32 bg-white/20" />
              <SkeletonBox className="h-10 w-72 bg-white/20 rounded-xl" />
              <SkeletonBox className="h-4 w-96 bg-white/15" />
            </div>
            <div className="flex gap-3">
              <SkeletonBox className="h-12 w-28 bg-white/20 rounded-full" />
              <SkeletonBox className="h-12 w-28 bg-white/20 rounded-full" />
              <SkeletonBox className="h-12 w-28 bg-white/20 rounded-full" />
            </div>
          </div>
        </div>

        {/* Quick Actions Shimmer Grid */}
        <div className="mb-10">
          <SkeletonBox className="h-4 w-36 mb-6 rounded-full" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-[24px] border border-[#E5DED6] p-6 space-y-4">
                <SkeletonBox className="w-12 h-12 rounded-2xl" />
                <SkeletonBox className="h-5 w-3/4 rounded-lg" />
                <SkeletonBox className="h-3 w-full rounded-md" />
                <SkeletonBox className="h-7 w-1/2 rounded-full mt-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Stats Row Shimmer */}
        <div className="bg-white rounded-[24px] border border-[#E5DED6] p-6 mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <SkeletonBox className="w-6 h-6 rounded-full" />
                <SkeletonBox className="h-8 w-16 rounded-lg" />
                <SkeletonBox className="h-3 w-20 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* Tools / Features Cards Shimmer Grid */}
        <div className="mb-10">
          <SkeletonBox className="h-4 w-32 mb-6 rounded-full" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-[24px] border border-[#E5DED6] p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <SkeletonBox className="w-10 h-10 rounded-2xl" />
                  <SkeletonBox className="h-5 w-16 rounded-full" />
                </div>
                <SkeletonBox className="h-5 w-2/3 rounded-lg" />
                <SkeletonBox className="h-3 w-full rounded-md" />
                <SkeletonBox className="h-4 w-1/3 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </Sidebar>
  );
}

/* ── PROFILE PAGE SKELETON ─────────────────────────────────── */
export function ProfileSkeleton() {
  return (
    <Sidebar>
      <style jsx global>{`
        @keyframes shimmerSweep {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
      `}</style>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-10">
        <ShimmerHeader title="Profile" />
        
        {/* Profile Hero Shimmer */}
        <div className="bg-gradient-to-br from-[#165B5E]/90 to-[#2C8C91]/90 rounded-[28px] p-8 lg:p-10 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <SkeletonBox className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/20" />
              <div className="space-y-3 text-center sm:text-left">
                <SkeletonBox className="h-8 w-48 bg-white/20 rounded-xl" />
                <SkeletonBox className="h-4 w-56 bg-white/15 rounded-md" />
                <SkeletonBox className="h-6 w-32 bg-white/20 rounded-lg" />
              </div>
            </div>
            <div className="flex gap-3">
              <SkeletonBox className="w-24 h-20 bg-white/20 rounded-2xl" />
              <SkeletonBox className="w-24 h-20 bg-white/20 rounded-2xl" />
              <SkeletonBox className="w-24 h-20 bg-white/20 rounded-2xl" />
            </div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex gap-3 mb-8">
          <SkeletonBox className="h-11 w-36 rounded-full" />
          <SkeletonBox className="h-11 w-36 rounded-full" />
          <SkeletonBox className="h-11 w-44 rounded-full" />
          <SkeletonBox className="h-11 w-36 rounded-full" />
        </div>

        {/* Content Card Shimmer */}
        <div className="bg-white rounded-[28px] border border-[#E5DED6] p-8 space-y-6">
          <SkeletonBox className="h-6 w-56 rounded-lg" />
          <div className="grid sm:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-[#FAF7F2] p-5 rounded-2xl space-y-2">
                <SkeletonBox className="h-3 w-20 rounded-md" />
                <SkeletonBox className="h-6 w-3/4 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </Sidebar>
  );
}

/* ── LEAVE PAGE SKELETON ───────────────────────────────────── */
export function LeaveSkeleton() {
  return (
    <Sidebar>
      <style jsx global>{`
        @keyframes shimmerSweep {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
      `}</style>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ShimmerHeader title="Leave Management" />

        <div className="flex justify-between items-center mb-8">
          <div className="space-y-2">
            <SkeletonBox className="h-8 w-64 rounded-xl" />
            <SkeletonBox className="h-4 w-96 rounded-md" />
          </div>
          <SkeletonBox className="h-12 w-40 rounded-full" />
        </div>

        {/* Leave Basket Shimmer Card */}
        <div className="bg-white rounded-3xl border border-[#E5DED6] p-6 mb-8 space-y-6">
          <div className="flex justify-between items-center">
            <SkeletonBox className="h-6 w-48 rounded-lg" />
            <SkeletonBox className="h-12 w-36 rounded-2xl" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-[#FAF7F2] rounded-2xl p-4 space-y-3">
                <SkeletonBox className="h-4 w-24 rounded-md" />
                <SkeletonBox className="h-8 w-16 rounded-xl" />
                <SkeletonBox className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Table Shimmer */}
        <div className="bg-white rounded-3xl border border-[#E5DED6] p-6 space-y-4">
          <SkeletonBox className="h-6 w-56 rounded-lg" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex justify-between items-center py-3 border-b border-[#FAF7F2]">
              <SkeletonBox className="h-6 w-32 rounded-lg" />
              <SkeletonBox className="h-6 w-28 rounded-lg" />
              <SkeletonBox className="h-6 w-48 rounded-lg" />
              <SkeletonBox className="h-6 w-20 rounded-full" />
            </div>
          ))}
        </div>
      </main>
    </Sidebar>
  );
}

/* ── ATTENDANCE PAGE SKELETON ──────────────────────────────── */
export function AttendanceSkeleton() {
  return (
    <Sidebar>
      <style jsx global>{`
        @keyframes shimmerSweep {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
      `}</style>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ShimmerHeader title="Attendance Panel" />

        {/* 3 Top Cards Shimmer */}
        <div className="grid sm:grid-cols-3 gap-5 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#E5DED6] p-5 flex items-center gap-4">
              <SkeletonBox className="w-12 h-12 rounded-xl" />
              <div className="space-y-2">
                <SkeletonBox className="h-3 w-24 rounded-md" />
                <SkeletonBox className="h-6 w-32 rounded-lg" />
              </div>
            </div>
          ))}
        </div>

        {/* Main Dial & Map Shimmer */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-10">
          <div className="lg:col-span-7 bg-white rounded-[28px] border border-[#E5DED6] p-8 text-center flex flex-col items-center space-y-6">
            <SkeletonBox className="w-full h-20 rounded-2xl" />
            <SkeletonBox className="w-64 h-64 rounded-full" />
            <SkeletonBox className="w-64 h-14 rounded-full" />
          </div>
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-[28px] border border-[#E5DED6] p-6 space-y-4">
              <SkeletonBox className="h-6 w-40 rounded-lg" />
              <SkeletonBox className="h-20 w-full rounded-2xl" />
              <SkeletonBox className="h-20 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </main>
    </Sidebar>
  );
}

/* ── SWAP PAGE SKELETON ────────────────────────────────────── */


export function SwapSkeleton() {
  return (
    <Sidebar>
      <style jsx global>{`
        @keyframes shimmerSweep {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
      `}</style>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ShimmerHeader title="Shift Swap" />

        {/* Roster 7 Days Shimmer */}
        <div className="mb-10 space-y-4">
          <SkeletonBox className="h-5 w-48 rounded-lg" />
          <div className="grid grid-cols-2 sm:grid-cols-7 gap-3">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#E5DED6] p-4 flex flex-col items-center gap-2">
                <SkeletonBox className="h-3 w-10 rounded-md" />
                <SkeletonBox className="h-7 w-12 rounded-lg" />
                <SkeletonBox className="h-6 w-16 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* Swap Cards Grid Shimmer */}
        <div className="bg-white rounded-[28px] border border-[#E5DED6] p-6 space-y-6">
          <div className="flex gap-3">
            <SkeletonBox className="h-10 w-36 rounded-xl" />
            <SkeletonBox className="h-10 w-36 rounded-xl" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-[#FAF7F2] rounded-2xl p-5 space-y-3">
                <SkeletonBox className="h-4 w-28 rounded-md" />
                <div className="flex items-center gap-3">
                  <SkeletonBox className="w-11 h-11 rounded-full" />
                  <SkeletonBox className="h-5 w-40 rounded-lg" />
                </div>
                <SkeletonBox className="h-10 w-full rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </Sidebar>
  );
}

/* ── RECORDS & POLICIES SKELETON ────────────────────────────── */
export function RecordsPoliciesSkeleton() {
  return (
    <Sidebar>
      <style jsx global>{`
        @keyframes shimmerSweep {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
      `}</style>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-10">
        <ShimmerHeader title="Governance & Records" />

        <div className="bg-gradient-to-br from-[#165B5E]/90 to-[#2C8C91]/90 rounded-[28px] p-8 lg:p-10 mb-8 space-y-3">
          <SkeletonBox className="h-4 w-40 bg-white/20" />
          <SkeletonBox className="h-10 w-80 bg-white/20 rounded-xl" />
          <SkeletonBox className="h-4 w-full bg-white/15 rounded-md" />
        </div>

        <div className="bg-white rounded-[28px] border border-[#E5DED6] p-8 space-y-6">
          <SkeletonBox className="h-6 w-48 rounded-lg" />
          <SkeletonBox className="h-48 w-full rounded-2xl" />
        </div>
      </main>
    </Sidebar>
  );
}

/* ── DISCOVER & RESOURCES SKELETON ─────────────────────────── */
export function ResourcesSkeleton() {
  return (
    <Sidebar>
      <style jsx global>{`
        @keyframes shimmerSweep {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
      `}</style>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-10">
        <ShimmerHeader title="Discover" />

        <div className="bg-gradient-to-br from-[#165B5E]/90 to-[#2C8C91]/90 rounded-[28px] p-8 lg:p-10 mb-8">
          <SkeletonBox className="h-10 w-72 bg-white/20 rounded-xl mb-3" />
          <SkeletonBox className="h-4 w-96 bg-white/15 rounded-md" />
        </div>

        {/* Card Grid Shimmer */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-[24px] border border-[#E5DED6] p-5 space-y-4">
              <SkeletonBox className="w-full h-44 rounded-2xl" />
              <SkeletonBox className="h-5 w-3/4 rounded-lg" />
              <SkeletonBox className="h-3 w-full rounded-md" />
              <SkeletonBox className="h-8 w-full rounded-xl" />
            </div>
          ))}
        </div>
      </main>
    </Sidebar>
  );
}
