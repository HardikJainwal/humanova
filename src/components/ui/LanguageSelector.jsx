"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LANGUAGES } from "@/lib/translations";

export default function LanguageSelector({ compact = false }) {
  const { lang, changeLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  /* Close on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 rounded-xl transition-all cursor-pointer ${
          compact
            ? "text-[#5F6B73] hover:text-[#1F2937] hover:bg-[#FAF7F2] p-2"
            : "text-[#5F6B73] hover:text-[#1F2937] hover:bg-[#FAF7F2] px-3 py-2"
        }`}
        aria-label="Select language"
        aria-expanded={open}
      >
        <Globe size={compact ? 16 : 18} />
        {!compact && (
          <>
            <span className="text-xs font-medium">{current.nativeLabel}</span>
            <ChevronDown
              size={13}
              className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 z-[60] w-52 bg-white rounded-2xl border border-[#E5DED6] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.15)] overflow-hidden"
          >
            <div className="px-3 pt-3 pb-1.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8FA8A3] px-2">
                Language
              </p>
            </div>
            <div className="px-1.5 pb-2 flex flex-col gap-0.5">
              {LANGUAGES.map((l) => {
                const isActive = l.code === lang;
                return (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => {
                      changeLang(l.code);
                      setOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#EAF6F4] text-[#0E3D39]"
                        : "hover:bg-[#FAF7F2] text-[#5F6B73]"
                    }`}
                  >
                    <span className="text-base">{l.flag}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight">{l.nativeLabel}</p>
                      <p className="text-[10px] text-[#8FA8A3] leading-tight">{l.label}</p>
                    </div>
                    {isActive && (
                      <Check size={14} className="text-[#2C8C91] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
