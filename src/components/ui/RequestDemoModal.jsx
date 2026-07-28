"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDemoModal } from "@/context/DemoModalContext";

const INDUSTRIES = [
  "Technology", "Healthcare", "Finance", "Education",
  "Manufacturing", "Retail", "Research", "Consulting",
  "Media & Entertainment", "Non-Profit", "Other",
];

const COMPANY_SIZES = [
  "1–10", "11–50", "51–200", "201–500", "501–1000", "1000+",
];

const ROLES = [
  "CEO / Founder", "COO", "CHRO / HR Head", "HR Manager",
  "Team Lead", "Employee", "Other",
];

const initialForm = {
  fullName: "",
  email: "",
  phoneNo: "",
  companyName: "",
  role: "",
  industry: "",
  companySize: "",
};

export default function RequestDemoModal() {
  const { isOpen, close } = useDemoModal();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const overlayRef = useRef(null);
  const firstInputRef = useRef(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstInputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close]);

  function validate() {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Valid email required";
    if (!form.companyName.trim()) errs.companyName = "Company name is required";
    if (!form.role) errs.role = "Please select your role";
    if (!form.industry) errs.industry = "Please select an industry";
    if (!form.companySize) errs.companySize = "Please select company size";
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    // TODO: replace with real API call
    // const payload = { ...form };
    // await fetch("/api/demo-request", { method: "POST", body: JSON.stringify(payload) });
    await new Promise((r) => setTimeout(r, 1200)); // simulate request
    setLoading(false);
    setSubmitted(true);
  }

  function handleClose() {
    close();
    setTimeout(() => {
      setSubmitted(false);
      setForm(initialForm);
      setErrors({});
    }, 400);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={overlayRef}
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-[860px] max-h-[95vh] overflow-hidden rounded-[28px] shadow-[0_32px_80px_-12px_rgba(15,61,57,0.28),0_8px_32px_-4px_rgba(0,0,0,0.12)] flex"
              style={{ background: "#fff" }}
            >
              {/* ── Left panel (decorative) ── */}
              <div className="hidden md:flex flex-col justify-between w-[42%] relative overflow-hidden p-8"
                style={{
                  background: "linear-gradient(145deg, #0F3D39 0%, #1a5c57 40%, #2C8C91 100%)",
                }}
              >
                {/* Decorative blobs */}
                <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full opacity-20"
                  style={{ background: "radial-gradient(circle, #5dd6db 0%, transparent 70%)" }} />
                <div className="absolute -bottom-8 -right-8 w-56 h-56 rounded-full opacity-15"
                  style={{ background: "radial-gradient(circle, #2C8C91 0%, transparent 70%)" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-10"
                  style={{ background: "radial-gradient(circle, #a0e4e7 0%, transparent 70%)" }} />

                <div className="relative z-10">
                  {/* Logo placeholder */}
                  <div className="flex items-center gap-2 mb-10">
                    <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </div>
                    <span className="text-white font-semibold text-sm tracking-wide opacity-90">Humanova</span>
                  </div>

                  <h2 className="text-white text-2xl font-bold leading-snug mb-3"
                    style={{ fontFamily: "var(--font-outfit, system-ui)" }}>
                    Start your wellness<br />journey today
                  </h2>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Join 500+ organizations building healthier, more productive teams with Humanova.
                  </p>
                </div>

                {/* Stats */}
                <div className="relative z-10 flex flex-col gap-4">
                  {[
                    { stat: "3×", label: "Boost in team engagement" },
                    { stat: "60%", label: "Reduction in burnout risk" },
                    { stat: "48h", label: "Average time to first insight" },
                  ].map(({ stat, label }) => (
                    <div key={stat} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">{stat}</span>
                      </div>
                      <p className="text-white/80 text-xs">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Bottom tagline */}
                <p className="relative z-10 text-white/40 text-xs mt-6">
                  No spam. No commitment. Cancel anytime.
                </p>
              </div>

              {/* ── Right panel (form) ── */}
              <div className="flex-1 overflow-y-auto">
                {/* Close button */}
                <button
                  id="demo-modal-close"
                  onClick={handleClose}
                  aria-label="Close modal"
                  className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#F3EEE8] hover:bg-[#E5DED6] flex items-center justify-center transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5F6B73" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center h-full py-20 px-10 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#2C8C91]/10 flex items-center justify-center mb-6">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2C8C91" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <h3 className="text-[#1F2937] text-2xl font-bold mb-3"
                        style={{ fontFamily: "var(--font-outfit, system-ui)" }}>
                        You&apos;re all set!
                      </h3>
                      <p className="text-[#5F6B73] text-sm leading-relaxed max-w-xs">
                        Our team will reach out within 24 hours to schedule your personalized demo. Check your inbox!
                      </p>
                      <button
                        onClick={handleClose}
                        className="mt-8 px-6 py-3 rounded-2xl bg-[#2C8C91] text-white text-sm font-semibold hover:bg-[#236F73] transition-colors"
                      >
                        Got it, close
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-8 md:p-10"
                    >
                      <div className="mb-7">
                        <p className="text-[#2C8C91] text-xs font-semibold uppercase tracking-widest mb-1">Free · No credit card required</p>
                        <h2 id="demo-modal-title" className="text-[#1F2937] text-2xl font-bold"
                          style={{ fontFamily: "var(--font-outfit, system-ui)" }}>
                          Request a Demo
                        </h2>
                        <p className="text-[#5F6B73] text-sm mt-1">Let&apos;s show you what Humanova can do for your team.</p>
                      </div>

                      <form id="demo-request-form" onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                        {/* Row 1 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Field
                            ref={firstInputRef}
                            id="demo-fullName"
                            label="Full Name"
                            name="fullName"
                            type="text"
                            placeholder="Full Name"
                            value={form.fullName}
                            onChange={handleChange}
                            error={errors.fullName}
                            required
                          />
                          <Field
                            id="demo-email"
                            label="Work Email"
                            name="email"
                            type="email"
                            placeholder="you@company.com"
                            value={form.email}
                            onChange={handleChange}
                            error={errors.email}
                            required
                          />
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Field
                            id="demo-phoneNo"
                            label="Phone Number"
                            name="phoneNo"
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={form.phoneNo}
                            onChange={handleChange}
                            error={errors.phoneNo}
                          />
                          <Field
                            id="demo-companyName"
                            label="Company Name"
                            name="companyName"
                            type="text"
                            placeholder="Acme Corp"
                            value={form.companyName}
                            onChange={handleChange}
                            error={errors.companyName}
                            required
                          />
                        </div>

                        {/* Row 3 */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <SelectField
                            id="demo-role"
                            label="Your Role"
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            error={errors.role}
                            options={ROLES}
                            required
                          />
                          <SelectField
                            id="demo-industry"
                            label="Industry"
                            name="industry"
                            value={form.industry}
                            onChange={handleChange}
                            error={errors.industry}
                            options={INDUSTRIES}
                            required
                          />
                          <SelectField
                            id="demo-companySize"
                            label="Company Size"
                            name="companySize"
                            value={form.companySize}
                            onChange={handleChange}
                            error={errors.companySize}
                            options={COMPANY_SIZES}
                            required
                          />
                        </div>

                        <button
                          id="demo-submit-btn"
                          type="submit"
                          disabled={loading}
                          className="mt-2 w-full py-3.5 rounded-2xl bg-[#2C8C91] hover:bg-[#236F73] disabled:opacity-60 text-white font-semibold text-sm tracking-wide shadow-[0_4px_20px_-4px_rgba(44,140,145,0.5)] hover:shadow-[0_6px_24px_-4px_rgba(44,140,145,0.65)] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <>
                              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                              Sending…
                            </>
                          ) : (
                            <>
                              Schedule My Demo
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                              </svg>
                            </>
                          )}
                        </button>

                        <p className="text-center text-[#5F6B73]/60 text-xs">
                          By submitting, you agree to our{" "}
                          <a href="#" className="underline hover:text-[#2C8C91]">Privacy Policy</a>.
                          No spam, ever.
                        </p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Field atoms ── */

import { forwardRef } from "react";

const Field = forwardRef(function Field({ id, label, name, type, placeholder, value, onChange, error, required }, ref) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[#1F2937] text-xs font-semibold">
        {label}{required && <span className="text-[#2C8C91] ml-0.5">*</span>}
      </label>
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#1F2937] placeholder:text-[#5F6B73]/50 bg-[#FAF7F2] outline-none transition-all duration-150
          ${error
            ? "border-red-400 ring-2 ring-red-100"
            : "border-[#E5DED6] focus:border-[#2C8C91] focus:ring-2 focus:ring-[#2C8C91]/15"
          }`}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
});

function SelectField({ id, label, name, value, onChange, error, options, required }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[#1F2937] text-xs font-semibold">
        {label}{required && <span className="text-[#2C8C91] ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full appearance-none px-4 py-2.5 rounded-xl border text-sm bg-[#FAF7F2] outline-none transition-all duration-150 pr-9
            ${value ? "text-[#1F2937]" : "text-[#5F6B73]/50"}
            ${error
              ? "border-red-400 ring-2 ring-red-100"
              : "border-[#E5DED6] focus:border-[#2C8C91] focus:ring-2 focus:ring-[#2C8C91]/15"
            }`}
        >
          <option value="" disabled>Select…</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#5F6B73]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
