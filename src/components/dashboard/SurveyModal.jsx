"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, MessageSquareHeart, AlertCircle } from "lucide-react";
import { getPendingSurvey, submitSurveyResponse } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function SurveyModal() {
  const { token } = useAuth();
  const [survey, setSurvey] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Check for pending survey on EVERY page load / mount
  useEffect(() => {
    if (!token) return;

    let isMounted = true;

    getPendingSurvey(token)
      .then((data) => {
        if (!isMounted) return;

        console.log("Pending survey API response:", data);

        const hasSurvey = data?.hasSurvey !== false;
        const payload = data?.survey || data?.data || data?.result || data;
        const surveyId = payload?._id || payload?.surveyId || payload?.id;
        const questionText = payload?.question || payload?.title || payload?.prompt || "";
        const optionsList = Array.isArray(payload?.options) ? payload.options : [];

        // Strictly require valid surveyId, question text, and non-empty options from API
        if (hasSurvey && surveyId && questionText && optionsList.length > 0) {
          setSurvey({
            surveyId,
            question: questionText,
            options: optionsList,
          });
          setIsOpen(true);
        } else {
          setSurvey(null);
          setIsOpen(false);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch pending survey:", err);
        if (isMounted) {
          setSurvey(null);
          setIsOpen(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [token]);

  const handleSubmit = async () => {
    if (!selectedAnswer || !survey || submitting) return;
    setSubmitting(true);
    setErrorMsg("");

    try {
      await submitSurveyResponse(survey.surveyId, selectedAnswer, token);
      // On success, close modal and clear state
      setIsOpen(false);
      setSurvey(null);
    } catch (err) {
      console.error("Survey submission error:", err);
      setErrorMsg(err.message || "Failed to submit survey response. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen || !survey) return null;

  return (
    <AnimatePresence>
      {/* 
        SCREEN-LOCK BACKDROP:
        - High z-index z-[999]
        - High contrast dark backdrop with blur
        - No pointer events to pass through, no dismissal by backdrop click
      */}
      <div className="fixed inset-0 z-[999] bg-black/65 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-[28px] p-6 sm:p-8 max-w-lg w-full shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] relative border border-[#E2ECEB] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Light Green Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#2C8C91] via-[#56C1C7] to-[#1AAF7E]" />

          {/* Top Header Row: Logo & Required Survey Badge */}
          <div className="flex items-center justify-between mb-6 pt-1">
            <div className="flex items-center gap-3">
              <div className="h-8 w-auto relative flex items-center">
                <Image
                  src="https://humanova-docs-app.s3.amazonaws.com/Logo/Vasu_-_Humanova_Logo_500_x_100_px_1_op9ppj.png"
                  alt="Humanova Logo"
                  width={130}
                  height={30}
                  priority
                  className="h-7 w-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Question Title & Prompt */}
          <div className="mb-6">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#EFF8F8] text-[#2C8C91] grid place-items-center shrink-0 mt-0.5 border border-[#2C8C91]/20">
                <MessageSquareHeart size={22} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1F2937] leading-snug" style={{ fontFamily: "var(--font-outfit)" }}>
                  {survey.question}
                </h3>
                <p className="text-xs text-[#6B7280] mt-1 font-medium">
                  Please submit your response to proceed to your dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Options Grid — Clean text + selection indicator (supports 4, 5, 6+ options seamlessly) */}
          <div className="flex flex-col gap-2.5 mb-6 max-h-72 overflow-y-auto p-1.5 -mx-1.5">
            {survey.options.map((opt, idx) => {
              const optionText = typeof opt === "string" ? opt : (opt.label || opt.text || opt.answer || String(opt));
              const isSelected = selectedAnswer === optionText;

              return (
                <button
                  key={optionText + idx}
                  type="button"
                  onClick={() => setSelectedAnswer(optionText)}
                  className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl border-2 transition-all duration-200 text-left cursor-pointer group ${
                    isSelected
                      ? "border-[#2C8C91] bg-[#EFF8F8] shadow-sm"
                      : "border-[#E2ECEB] bg-white hover:border-[#2C8C91]/40 hover:bg-[#F9FDFD]"
                  }`}
                >
                  <span
                    className={`text-sm font-bold transition-colors ${
                      isSelected ? "text-[#2C8C91]" : "text-[#374151] group-hover:text-[#1F2937]"
                    }`}
                  >
                    {optionText}
                  </span>

                  {/* Radio / Selection Circle */}
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                      isSelected
                        ? "border-[#2C8C91] bg-[#2C8C91] text-white"
                        : "border-gray-300 bg-white group-hover:border-[#2C8C91]/50"
                    }`}
                  >
                    {isSelected && <CheckCircle2 size={14} className="text-white" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mandatory Submit Action */}
          <div className="pt-2 border-t border-[#E2ECEB]">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!selectedAnswer || submitting}
              className="w-full py-3.5 rounded-2xl text-sm font-extrabold text-white bg-[#2C8C91] hover:bg-[#237276] active:scale-[0.99] transition-all shadow-[0_8px_24px_-4px_rgba(44,140,145,0.4)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 cursor-pointer"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Submitting Response...
                </>
              ) : (
                "Submit & Continue"
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
