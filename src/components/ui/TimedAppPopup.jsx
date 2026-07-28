"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight, ShieldCheck, Download } from "lucide-react";
import { useDemoModal } from "@/context/DemoModalContext";

const PHONE_IMAGE =
  "https://res.cloudinary.com/dii2omqrm/image/upload/v1783055896/Untitled_design_3_bpe0gr.png";

export default function TimedAppPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const { open: openDemoModal } = useDemoModal();

  useEffect(() => {
    // Check if user dismissed popup in current session
    const hasClosed = sessionStorage.getItem("has_closed_humanova_popup");
    if (hasClosed) return;

    // Trigger after 5 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("has_closed_humanova_popup", "1");
  };

  const handleDemoClick = () => {
    handleClose();
    openDemoModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-[760px] rounded-[32px] overflow-hidden shadow-2xl border border-[#2C8C91]/30"
              style={{
                background: "linear-gradient(135deg, #07312C 0%, #0d463f 50%, #07312C 100%)",
              }}
            >
              {/* Decorative Glow */}
              <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-20 bg-[radial-gradient(circle,#D4F04A_0%,transparent_70%)]" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-15 bg-[radial-gradient(circle,#2C8C91_0%,transparent_70%)]" />

              {/* Close Button */}
              <button
                onClick={handleClose}
                aria-label="Close"
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
              >
                <X size={18} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 items-center p-6 sm:p-8 lg:p-10 gap-6">
                
                {/* LEFT: Content & Actions (7 cols) */}
                <div className="md:col-span-7 space-y-5 text-white z-10">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#D4F04A] px-3.5 py-1 text-xs font-black text-[#07312C] uppercase tracking-wider">
                    <Sparkles size={13} /> Mobile & Enterprise Care
                  </div>

                  <div>
                    <h2
                      className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight"
                      style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                    >
                      Experience <span className="text-[#D4F04A]">Humanova</span> On The Go
                    </h2>
                    <p
                      className="text-[#eef2ff]/80 text-xs sm:text-sm mt-2.5 leading-relaxed"
                      style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                    >
                      AI-powered mood detection, 24/7 mental wellness care, and real-time workplace reflection insights right in your pocket.
                    </p>
                  </div>

                  {/* Feature Bullets */}
                  <div className="space-y-2 pt-1 text-xs text-[#7FC7AE]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={16} className="text-[#D4F04A]" />
                      <span className="text-white font-medium">100% Confidential Employee Support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Download size={16} className="text-[#D4F04A]" />
                      <span className="text-white font-medium">Available on iOS & Android</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="pt-3 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleDemoClick}
                      className="flex-1 py-3.5 px-5 rounded-2xl bg-[#D4F04A] text-[#07312C] font-black text-xs sm:text-sm hover:bg-[#c8e83f] transition-all shadow-lg shadow-[#D4F04A]/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      Request Demo <ArrowRight size={16} />
                    </button>
                    <button
                      onClick={handleClose}
                      className="py-3.5 px-5 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all text-center cursor-pointer"
                    >
                      Explore Platform
                    </button>
                  </div>
                </div>

                {/* RIGHT: App Mockup Image (5 cols) */}
                <div className="md:col-span-5 flex items-center justify-center relative mt-2 md:mt-0">
                  <div className="relative h-[220px] sm:h-[280px] md:h-[320px] w-full flex items-center justify-center">
                    <motion.img
                      src={PHONE_IMAGE}
                      alt="Humanova App Showcase"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="h-full w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                    />
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
