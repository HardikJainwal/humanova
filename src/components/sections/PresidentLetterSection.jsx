"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Award,
  Maximize2,
  X,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  FileText,
  ZoomIn,
} from "lucide-react";

const LETTER_IMAGE_URL =
  "https://humanova-docs-app.s3.ap-south-1.amazonaws.com/uploads/presidentletter_iyr6na.jpg";

export default function PresidentLetterSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <section className="w-full py-10 md:py-14 bg-[#FAF7F2] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2C8C91]/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4F04A]/10 rounded-full filter blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#0E3D39 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-[1140px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[#0E3D39] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-outfit, sans-serif)" }}
          >
            Commendation by{" "}
            <span className="relative inline-block text-[#2C8C91]">
              Shri Ram Nath Kovind
              <svg
                className="absolute left-0 -bottom-1.5 w-full h-2.5 text-[#2C8C91]/40 pointer-events-none"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,10 Q50,18 100,10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-[#5F6B73] text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
          >
            Former President of India commends Devdoot and its founder Shri Vasu Shobhit. Humanova, as Devdoot&apos;s corporate mental health platform, carries forward this presidential vision for workplace wellbeing.
          </motion.p>
        </div>

        {/* Content Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-center">
          {/* Left Column: Interactive Document Showcase Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group w-full max-w-[400px]">
              {/* Outer Glow & Ambient Ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#2C8C91]/25 via-[#D4F04A]/15 to-[#0E3D39]/25 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition duration-500" />

              <div className="relative bg-white rounded-2xl p-3.5 md:p-4 border border-[#E5DED6] shadow-[0_12px_36px_rgba(14,61,57,0.1)] transition-all duration-300">
                {/* Ribbon Badge */}
                <div className="absolute -top-3 left-4 z-20 bg-[#2C8C91] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full border border-[#2C8C91]/40 flex items-center gap-1.5 shadow-md">
                  <ShieldCheck size={13} />
                  <span>Message from Former President of India</span>
                </div>

                {/* Image Container with Hover Trigger */}
                <div
                  onClick={() => setIsModalOpen(true)}
                  className="relative w-full aspect-[3/4.25] rounded-xl overflow-hidden cursor-pointer bg-[#FAF7F2] border border-[#E3EEEC] group/img"
                >
                  <Image
                    src={LETTER_IMAGE_URL}
                    alt="Official Message from Shri Ram Nath Kovind, Former President of India"
                    fill
                    priority
                    className="object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                  />

                  {/* Glassmorphic Hover Overlay */}
                  <div className="absolute inset-0 bg-[#0E3D39]/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 p-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 text-[#0E3D39] grid place-items-center shadow-md transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
                      <ZoomIn size={22} />
                    </div>
                    <span className="text-white font-medium text-xs bg-[#0E3D39]/80 px-3 py-1.5 rounded-full border border-white/20">
                      Click to View Letter
                    </span>
                  </div>
                </div>

                {/* Document Card Footer Bar */}
                <div className="mt-3 pt-3 border-t border-[#F0EAE3] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <FileText size={16} className="text-[#2C8C91]" />
                    <span className="text-[11px] font-semibold text-[#0E3D39]">
                      Message from Shri Ram Nath Kovind
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2C8C91] hover:text-[#0E3D39] transition-colors"
                  >
                    <span>Inspect</span>
                    <Maximize2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Executive Narrative & Key Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center space-y-5"
          >
            {/* Highlighted Callout Quote Box */}
            <div className="bg-white rounded-2xl p-5 md:p-6 border border-[#E3EEEC] shadow-sm relative">
              
              <blockquote className="text-[#0E3D39] text-base md:text-lg lg:text-xl font-bold leading-relaxed">
                &ldquo;Devdoot&apos;s focus on timely healthcare support, mental well-being, and emotional resilience carries significant national and social value.&rdquo;
              </blockquote>
              <div className="mt-4 flex items-center gap-3 pt-3.5 border-t border-[#F0EAE3]">
                <div className="w-10 h-10 rounded-full bg-[#2C8C91] text-white font-bold text-xs grid place-items-center text-center leading-none">
                  RNK
                </div>
                <div>
                  <h4 className="text-[#0E3D39] font-bold text-sm md:text-base">
                    Shri Ram Nath Kovind
                  </h4>
                  <p className="text-[#5F6B73] text-xs md:text-sm font-medium">
                    Former President of India &bull; Devdoot &amp; Humanova Corporate Initiative
                  </p>
                </div>
              </div>
            </div>

            {/* Key Recognition Highlights */}
            <div className="space-y-3.5">
              {[
                {
                  title: "Commendable Spirit of Service",
                  desc: "Founded by Shri Vasu Shobhit after US master's studies, dedicating expertise to public health. Humanova carries this mission into corporate wellness.",
                },
                {
                  title: "Significant National & Social Value",
                  desc: "Commended for enabling timely healthcare, mental well-being, and emotional resilience for workforce health across India.",
                },
                {
                  title: "Nurturing a Confident Society",
                  desc: "Empowering organizations and teams to build a healthier, more resilient workforce in a growing nation.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-4 md:p-4.5 rounded-2xl bg-white/80 border border-[#E5DED6] hover:bg-white hover:border-[#2C8C91]/30 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-[#EAF6F4] text-[#2C8C91] grid place-items-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h5 className="text-[#0E3D39] font-bold text-sm md:text-base">
                      {item.title}
                    </h5>
                    <p className="text-[#5F6B73] text-xs md:text-sm leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-50 bg-[#0E3D39]/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl border border-white/20 shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header Bar */}
              <div className="px-6 py-4 bg-[#0E3D39] text-white flex items-center justify-between flex-shrink-0 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Award size={20} className="text-[#D4F04A]" />
                  <span className="font-bold text-sm md:text-base">
                    Message from Shri Ram Nath Kovind (Former President of India)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center transition-colors"
                  aria-label="Close letter modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body: Scrollable Image Area */}
              <div className="p-4 md:p-6 overflow-y-auto flex justify-center bg-[#FAF7F2] max-h-[calc(90vh-70px)]">
                <div className="relative w-full max-w-2xl aspect-[3/4] min-h-[600px] shadow-lg rounded-xl overflow-hidden bg-white border border-[#E3EEEC]">
                  <Image
                    src={LETTER_IMAGE_URL}
                    alt="Presidential Recognition Letter Full View"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
