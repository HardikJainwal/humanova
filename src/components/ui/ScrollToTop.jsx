"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Scroll to top"
          className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-[#2C8C91] to-[#236F73] text-white border border-white/20 shadow-[0_8px_24px_-4px_rgba(44,140,145,0.45)] hover:shadow-[0_12px_32px_-4px_rgba(44,140,145,0.65)] hover:scale-110 active:scale-95 transition-all duration-300 grid place-items-center cursor-pointer group"
        >
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 11l-5-5-5 5" />
            <path d="M17 17l-5-5-5 5" opacity="0.45" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
