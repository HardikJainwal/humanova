"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap,
  Ticket,
  Monitor,
  Smartphone,
  ArrowRight,
  Users,
  Shield,
  Clock,
  Calendar,
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";

const speakers = [
  {
    id: "spk-11",
    driveId: "1hwUQChberSP4WYReTdV_DDjcM8aLSwfa",
    img: "https://lh3.googleusercontent.com/d/1hwUQChberSP4WYReTdV_DDjcM8aLSwfa",
    fallbackImg: "/images/speakers/spk-11.webp",
    name: "Gunjan Jain",
    role: "CHRO & Corporate Communication Head",
    company: "Jindal Strategic Venture",
    desc: "Driving people strategy and purposeful communication to build engaged teams.",
  },
  {
    id: "spk-9",
    driveId: "1aM5Ye9jKoItj4-sJ7wpALDDK1-Q3134v",
    img: "https://lh3.googleusercontent.com/d/1aM5Ye9jKoItj4-sJ7wpALDDK1-Q3134v",
    fallbackImg: "/images/speakers/spk-9.webp",
    name: "Keynote Speaker",
    role: "CHRO & People Strategy Leader",
    company: "CHRO Roundtable 2026",
    desc: "Empowering HR leaders with data-backed workforce wellbeing strategies.",
  },
  {
    id: "spk-12",
    driveId: "1_Fh92f1z2USO2mhDhTPuBfret9k8hO4Z",
    img: "https://lh3.googleusercontent.com/d/1_Fh92f1z2USO2mhDhTPuBfret9k8hO4Z",
    fallbackImg: "/images/speakers/spk-12.webp",
    name: "Executive Speaker",
    role: "Workforce & Transformation Leader",
    company: "CHRO Roundtable 2026",
    desc: "Building future-ready organizations through empathetic leadership.",
  },
  {
    id: "spk-8",
    driveId: "1TvoVmHnMZjgc3FkxfUXdJEyeM95u7Zyj",
    img: "https://lh3.googleusercontent.com/d/1TvoVmHnMZjgc3FkxfUXdJEyeM95u7Zyj",
    fallbackImg: "/images/speakers/spk-8.webp",
    name: "Distinguished Speaker",
    role: "HR & Culture Leader",
    company: "CHRO Roundtable 2026",
    desc: "Scaling psychological safety and proactive employee support systems.",
  },
  {
    id: "spk-10",
    driveId: "1SdybMF-S_oboXPnUQhM878jYocSkZCjx",
    img: "https://lh3.googleusercontent.com/d/1SdybMF-S_oboXPnUQhM878jYocSkZCjx",
    fallbackImg: "/images/speakers/spk-10.webp",
    name: "Panelist Speaker",
    role: "Organizational Transformation Head",
    company: "CHRO Roundtable 2026",
    desc: "Designing resilient corporate cultures with actionable mental health metrics.",
  },
  {
    id: "spk-7",
    driveId: "1HgbyDEiHkCwBMugJ-iIN13Nd77iaxeex",
    img: "https://lh3.googleusercontent.com/d/1HgbyDEiHkCwBMugJ-iIN13Nd77iaxeex",
    fallbackImg: "/images/speakers/spk-7.webp",
    name: "Guest Speaker",
    role: "Strategic Leadership Expert",
    company: "CHRO Roundtable 2026",
    desc: "Bridging corporate growth and human-first workplace initiatives.",
  },
  {
    id: "spk-6",
    driveId: "15GaLqdIolYouM0KyOyLDeTgibmw-2oax",
    img: "https://lh3.googleusercontent.com/d/15GaLqdIolYouM0KyOyLDeTgibmw-2oax",
    fallbackImg: "/images/speakers/spk-6.webp",
    name: "Featured Speaker",
    role: "Corporate Communication Leader",
    company: "CHRO Roundtable 2026",
    desc: "Creating transparent communication channels across enterprise teams.",
  },
];

function EventCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-07-30T16:00:00+05:30").getTime();

    function update() {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-3xl border border-[#E5DED6] bg-white/90 backdrop-blur-md p-6 max-w-xl mx-auto my-7 text-[#1F2937] shadow-xl">
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#2C8C91] animate-ping" />
        <span className="text-xs font-black uppercase tracking-[3px] text-[#2C8C91] flex items-center gap-1.5">
          <Clock size={14} /> Roundtable Live Event Starts In:
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2.5 sm:gap-3 text-center">
        {[
          { label: "Days", val: String(timeLeft.days).padStart(2, "0") },
          { label: "Hours", val: String(timeLeft.hours).padStart(2, "0") },
          { label: "Mins", val: String(timeLeft.minutes).padStart(2, "0") },
          { label: "Secs", val: String(timeLeft.seconds).padStart(2, "0") },
        ].map(({ label, val }) => (
          <div key={label} className="rounded-2xl bg-[#EEF8F5] border border-[#2C8C91]/20 p-2.5 sm:p-3.5">
            <div className="text-2xl sm:text-4xl font-black text-[#2C8C91] font-mono leading-none">
              {val}
            </div>
            <div className="text-[10px] sm:text-xs font-bold text-[#07312C] uppercase tracking-wider mt-1.5">
              {label}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-[#5F6B73] mt-4 font-semibold">
        <Calendar size={14} className="text-[#2C8C91]" />
        <span>30 July 2026 @ 4:00 PM IST · Live Session</span>
      </div>
    </div>
  );
}

function SpeakersCarouselSection() {
  const swiperRef = useRef(null);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-b border-[#E5DED6]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2C8C91]/25 bg-[#2C8C91]/10 px-4 py-1.5 text-xs font-bold text-[#2C8C91] uppercase tracking-wider mb-3">
            <Star size={13} /> CHRO Roundtable 2026
          </span>
          <h2
            className="text-3xl sm:text-5xl font-black text-[#1F2937] tracking-tight"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Distinguished Speakers
          </h2>
          <p className="text-[#5F6B73] text-sm sm:text-base mt-2 max-w-lg">
            Hover or swipe to discover our roundtable speakers driving people strategy and organization transformation.
          </p>
        </div>

        {/* Carousel Prev/Next Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous speaker"
            className="w-11 h-11 rounded-full border border-[#E5DED6] bg-white flex items-center justify-center hover:bg-[#07312C] hover:text-[#D4F04A] hover:border-[#07312C] transition-all shadow-sm cursor-pointer active:scale-95 text-[#1F2937]"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next speaker"
            className="w-11 h-11 rounded-full border border-[#E5DED6] bg-white flex items-center justify-center hover:bg-[#07312C] hover:text-[#D4F04A] hover:border-[#07312C] transition-all shadow-sm cursor-pointer active:scale-95 text-[#1F2937]"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Autoplay, Navigation]}
        onSwiper={(s) => (swiperRef.current = s)}
        spaceBetween={24}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="!pb-4"
      >
        {speakers.map((spk) => (
          <SwiperSlide key={spk.id} className="!h-auto">
            <div className="group relative rounded-3xl overflow-hidden bg-white border border-[#E5DED6] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col h-full cursor-pointer">
              {/* Graphic Poster Image */}
              <div className="relative w-full aspect-square bg-[#FAF7F2] overflow-hidden">
                <img
                  src={spk.img}
                  alt={spk.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = spk.fallbackImg;
                  }}
                />

                {/* Subtle Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-xs font-bold text-[#D4F04A] uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Quote size={12} /> {spk.company}
                    </p>
                    <p className="text-xs text-white/90 leading-relaxed italic">
                      "{spk.desc}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Speaker Info Bar */}
              <div className="p-4 bg-white border-t border-[#F0EAE3] flex flex-col gap-0.5 group-hover:bg-[#07312C] transition-colors duration-300">
                <h3 className="font-extrabold text-[#1F2937] text-base group-hover:text-white transition-colors duration-300" style={{ fontFamily: "var(--font-outfit)" }}>
                  {spk.name}
                </h3>
                <p className="text-xs font-medium text-[#2C8C91] group-hover:text-[#D4F04A] transition-colors duration-300">
                  {spk.role}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

const steps = [
  {
    icon: Monitor,
    title: "Host opens console",
    desc: "Open /tambola?admin=1, enter the event PIN to unlock the host console.",
  },
  {
    icon: Users,
    title: "Generate participant links",
    desc: "Generate custom URLs for participants and share via chat or calendar invite.",
  },
  {
    icon: Smartphone,
    title: "Participants join",
    desc: "Participants open their unique ticket link on mobile or laptop.",
  },
  {
    icon: Zap,
    title: "Draw numbers & signals",
    desc: "Host draws signals live; participant tickets update automatically.",
  },
  {
    icon: Ticket,
    title: "Claim pattern & win",
    desc: "First to complete a pattern clicks 'Claim' to notify the host live.",
  },
];

export default function TambolaHome() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* ── Hero section ─────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-28 sm:pt-32 pb-20 border-b border-[#E5DED6]"
        style={{ background: "linear-gradient(135deg, #EEF8F5 0%, #FAF7F2 50%, #E6F4EF 100%)" }}
      >
        {/* decorative soft glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-35"
          style={{ background: "radial-gradient(circle,#2C8C91 0%,transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -left-16 w-80 h-80 rounded-full opacity-25"
          style={{ background: "radial-gradient(circle,#B7E4C7 0%,transparent 70%)" }}
        />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[4px] text-[#2C8C91] mb-3"
          >
            CHRO Workforce Signals Roundtable 2026 · 30 July
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#1F2937] tracking-tight uppercase leading-[1.08] mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            CHRO{" "}
            <span
              className="italic font-normal text-[#2C8C91] normal-case px-1"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              workforce
            </span><br />
            Signals Roundtable
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#5F6B73] text-base sm:text-lg max-w-xl mx-auto mb-4"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Let's make every number a workforce signal. Play along live during the roundtable.
          </motion.p>

          <EventCountdown />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/chroevent?ticket=1&name=Sample+Participant"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#2C8C91]
                text-white font-black px-7 py-4 text-sm hover:bg-[#1F6E73] transition-all
                shadow-lg shadow-[#2C8C91]/25 active:scale-95"
            >
              <Ticket size={18} /> Open Sample Ticket
            </Link>
            <Link
              href="/chroevent?admin=1"
              className="inline-flex items-center justify-center gap-2 rounded-2xl
                border border-[#E5DED6] bg-white text-[#1F2937] font-bold px-7 py-4 text-sm
                hover:border-[#2C8C91] hover:bg-[#EEF8F5] transition-all active:scale-95 shadow-sm"
            >
              <Shield size={18} /> Host Console
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Speakers Swiper Carousel Section ───────────── */}
      <SpeakersCarouselSection />

      {/* ── How it works ─────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2C8C91]/25 bg-[#2C8C91]/10 px-4 py-1.5 text-xs font-bold text-[#2C8C91] uppercase tracking-wider mb-3">
            How it works
          </span>
          <h2
            className="text-3xl sm:text-4xl font-black text-[#1F2937]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Five simple steps
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="rounded-2xl border border-[#E5DED6] bg-white p-6 hover:border-[#2C8C91]/30 hover:shadow-lg hover:shadow-[#2C8C91]/5 transition-all"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "linear-gradient(135deg,#07312C,#2C8C91)" }}
              >
                <step.icon size={20} className="text-[#D4F04A]" />
              </div>
              <div className="text-xs font-black text-[#2C8C91] uppercase tracking-wider mb-2">
                Step {i + 1}
              </div>
              <h3 className="font-black text-[#1F2937] mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                {step.title}
              </h3>
              <p className="text-sm text-[#5F6B73] leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Winning patterns ─────────────────────────── */}
      <section className="bg-white border-t border-[#E5DED6] py-14">
        <div className="max-w-5xl mx-auto px-6">
          <h2
            className="text-2xl font-black text-[#1F2937] mb-6 text-center"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Winning Patterns
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: "Top Row", desc: "Row 1" },
              { label: "Middle Row", desc: "Row 3" },
              { label: "Bottom Row", desc: "Row 5" },
              { label: "Left Column", desc: "Col 1" },
              { label: "Diagonal", desc: "↘ corner to corner" },
              { label: "Full House", desc: "All 25 signals" },
            ].map((p) => (
              <div
                key={p.label}
                className="rounded-xl border border-[#E5DED6] bg-[#FAF7F2] p-4 text-center"
              >
                <p className="font-black text-sm text-[#07312C]" style={{ fontFamily: "var(--font-outfit)" }}>
                  {p.label}
                </p>
                <p className="text-xs text-[#5F6B73] mt-1">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
