"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
  MessageSquare,
  Building2,
  Users,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Lock,
  Headphones
} from "lucide-react";

const INDUSTRIES = [
  "Aviation",
  "Research",
  "Finance",
  "Public Sector",
  "Telecom",
  "Healthcare",
  "Manufacturing",
  "Construction",
  "Energy",
  "Transportation & Logistics",
  "Education",
  "Hospitality and Tourism",
  "Media and Entertainment",
  "Chemical",
  "Food and Beverages",
  "Pharmaceutical",
  "Retail and E-Commerce",
  "Other",
];

const COMPANY_SIZES = [
  { label: "1–10 employees", value: "10" },
  { label: "11–50 employees", value: "50" },
  { label: "51–200 employees", value: "200" },
  { label: "201–500 employees", value: "500" },
  { label: "501–1000 employees", value: "1000" },
  { label: "1000+ employees", value: "1000" },
];

const ROLES = [
  "CEO / Founder",
  "COO",
  "CHRO / HR Head",
  "HR Manager",
  "Team Lead",
  "Employee",
  "Other",
];

function formatCompanySize(val) {
  if (!val) return "10";
  const matches = String(val).match(/\d+/g);
  return matches ? matches[matches.length - 1] : "10";
}

const CONTACT_FAQS = [
  {
    q: "How fast can we expect a response?",
    a: "Our team reviews all inquiries promptly. For enterprise sales and demo requests, an advisor will reach out to you within 24 hours.",
  },
  {
    q: "Can I request a custom product walkthrough?",
    a: "Yes! Simply fill out the contact form selecting your organization size and industry, and we will prepare a personalized walkthrough tailored to your workforce needs.",
  },
  {
    q: "Do you offer pilot programs for enterprise teams?",
    a: "We offer guided pilot programs so your HR leadership can test check-ins, analytics, and coaching modules with a subset of employees before deploying company-wide.",
  },
  {
    q: "How does Humanova protect employee data privacy?",
    a: "Humanova is built with strict privacy compliance including DPDP Act 2023, GDPR readiness, and end-to-end encryption. Employee check-in insights are aggregated anonymously to protect individual privacy.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function ContactPageClient() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    companyName: "",
    role: "",
    industry: "",
    companySize: "",
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  function validate() {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Valid work email is required";
    if (!form.phoneNo.trim() || !/^\d{10}$/.test(form.phoneNo.trim()))
      errs.phoneNo = "Enter a valid 10-digit mobile number";
    if (!form.companyName.trim()) errs.companyName = "Company name is required";
    if (!form.role) errs.role = "Please select your role";
    if (!form.industry) errs.industry = "Please select an industry";
    if (!form.companySize) errs.companySize = "Please select company size";
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "phoneNo") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setForm((prev) => ({ ...prev, phoneNo: digitsOnly }));
      if (errors.phoneNo) setErrors((prev) => ({ ...prev, phoneNo: "" }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        fullName: form.fullName,
        email: form.email,
        phoneNo: form.phoneNo,
        companyName: form.companyName,
        role: form.role,
        industry: form.industry,
        companySize: formatCompanySize(form.companySize),
      };

      const res = await fetch("https://api.humanova.live/api/v1/demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || (data && data.success === false)) {
        const backendMessage = data?.message || "Failed to submit inquiry. Please try again.";
        setFormError(backendMessage);
        return;
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setFormError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      <main>
        {/* ── HERO BANNER (WEBSITE TEAL THEME) ─────────────────────────── */}
        <section className="relative w-full overflow-hidden -mt-24" style={{ minHeight: "520px" }}>
          <div
            className="absolute inset-0 z-0"
            style={{
              background: "linear-gradient(135deg, #1B6E73 0%, #2C8C91 60%, #257D82 100%)",
            }}
          />

          {/* Ambient Decorative Blurs */}
          <div
            className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 z-0"
            style={{ background: "radial-gradient(circle, #5dd6db 0%, transparent 70%)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-16 -left-16 w-80 h-80 rounded-full opacity-15 z-0"
            style={{ background: "radial-gradient(circle, #2C8C91 0%, transparent 70%)" }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-40 pb-24 lg:pt-48 lg:pb-28">
            <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl">
             

              <motion.h1
                variants={fadeUp}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]"
                style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
              >
                Let&apos;s talk about your team&apos;s{" "}
                <span
                  className="italic font-normal text-[#D4F04A]"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  wellbeing.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-5 text-lg text-white/75 leading-relaxed max-w-2xl"
              >
                Have questions about our employee wellness platform, enterprise HR integrations,
                or custom plans? Connect with our dedicated workforce advisors.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── CONTACT CHANNELS STRIP ───────────────────────────────────── */}
        <section className="px-6 -mt-12 relative z-20 mb-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Email Support Card */}
            <motion.div
              variants={fadeUp}
              className="bg-white rounded-3xl border border-[#E5DED6] p-7 shadow-sm hover:border-[#2C8C91]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF6F4] text-[#2C8C91] grid place-items-center">
                    <Mail size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                  Email Support
                </h3>
                <p className="text-sm text-[#5F6B73] leading-relaxed mb-4">
                  For platform assistance, demo inquiries, and partner outreach. We reply within 24 hours.
                </p>
              </div>
              <span dangerouslySetInnerHTML={{ __html: '<!--email_off-->' }} />
              <a
                href="mailto:support@humanova.live"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#2C8C91] hover:text-[#0E3D39] transition-colors"
              >
                support@humanova.live <ArrowRight size={14} />
              </a>
              <span dangerouslySetInnerHTML={{ __html: '<!--/email_off-->' }} />
            </motion.div>

            {/* Direct Phone / WhatsApp Card */}
            <motion.div
              variants={fadeUp}
              className="bg-white rounded-3xl border border-[#E5DED6] p-7 shadow-sm hover:border-[#2C8C91]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#EFFDF4] text-[#1AAF7E] grid place-items-center">
                    <Phone size={24} />
                  </div>
                 
                </div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                  Phone & Call Support
                </h3>
                <p className="text-sm text-[#5F6B73] leading-relaxed mb-4">
                  Speak directly with our team for quick assistance, demo scheduling, or partner inquiries.
                </p>
              </div>
              <a
                href="tel:+918444074642"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#2C8C91] hover:text-[#0E3D39] transition-colors"
              >
                +91 84440 74642 <ArrowRight size={14} />
              </a>
            </motion.div>

            {/* Headquarters Card */}
            <motion.div
              variants={fadeUp}
              className="bg-white rounded-3xl border border-[#E5DED6] p-7 shadow-sm hover:border-[#2C8C91]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] text-[#0E3D39] grid place-items-center border border-[#E5DED6]">
                    <MapPin size={24} />
                  </div>
                 
                </div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                  Location
                </h3>
                <p className="text-sm text-[#5F6B73] leading-relaxed mb-4">
                  Shobhit University Tower, Mayur Vihar Phase II, Institutional Area, Mayur Vihar, New Delhi, Delhi, 110091
                </p>
              </div>
              <span className="text-xs font-semibold text-[#8FA8A3] flex items-center gap-1.5">
                <Clock size={13} /> Mon–Fri, 9:00 AM – 6:00 PM IST
              </span>
            </motion.div>
          </motion.div>
        </section>

        {/* ── MAIN CONTACT FORM & TRUST SECTION ───────────────────────── */}
        <section className="px-6 py-8 mb-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact / Demo Request Form (7 cols) */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="lg:col-span-7 bg-white rounded-3xl border border-[#E5DED6] p-8 md:p-10 shadow-sm"
            >
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-[#2C8C91]">
                  Direct Inquiry & Demo Request
                </span>
                <h2
                  className="text-2xl md:text-3xl font-extrabold text-[#1F2937] mt-1"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Send us a message
                </h2>
                <p className="text-sm text-[#5F6B73] mt-1.5 leading-relaxed">
                  Fill out the form below to connect with a workforce specialist or schedule a live product demonstration.
                </p>
              </div>

              {formError && (
                <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium flex items-center gap-2">
                  <AlertCircle size={16} />
                  {formError}
                </div>
              )}

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 px-6 text-center bg-[#FAF7F2] rounded-2xl border border-[#E5DED6] flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#EAF6F4] text-[#2C8C91] grid place-items-center mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3
                    className="text-2xl font-extrabold text-[#1F2937] mb-2"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-[#5F6B73] max-w-md leading-relaxed mb-6">
                    Thank you for reaching out to Humanova. Our workforce advisory team has received your message and will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        fullName: "",
                        email: "",
                        phoneNo: "",
                        companyName: "",
                        role: "",
                        industry: "",
                        companySize: "",
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#2C8C91] text-white font-bold text-sm hover:bg-[#216B6F] transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-[#2C8C91]">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="John Doe"
                        value={form.fullName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#1F2937] bg-[#FAF7F2] outline-none transition-all ${
                          errors.fullName
                            ? "border-red-400 focus:ring-2 focus:ring-red-100"
                            : "border-[#E5DED6] focus:border-[#2C8C91] focus:ring-2 focus:ring-[#2C8C91]/15"
                        }`}
                      />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-1.5">
                        Work Email <span className="text-[#2C8C91]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#1F2937] bg-[#FAF7F2] outline-none transition-all ${
                          errors.email
                            ? "border-red-400 focus:ring-2 focus:ring-red-100"
                            : "border-[#E5DED6] focus:border-[#2C8C91] focus:ring-2 focus:ring-[#2C8C91]/15"
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Row 2: Phone & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-1.5">
                        Phone Number <span className="text-[#2C8C91]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phoneNo"
                        maxLength={10}
                        placeholder="9876543210"
                        value={form.phoneNo}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#1F2937] bg-[#FAF7F2] outline-none transition-all ${
                          errors.phoneNo
                            ? "border-red-400 focus:ring-2 focus:ring-red-100"
                            : "border-[#E5DED6] focus:border-[#2C8C91] focus:ring-2 focus:ring-[#2C8C91]/15"
                        }`}
                      />
                      {errors.phoneNo && <p className="text-red-500 text-xs mt-1">{errors.phoneNo}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-1.5">
                        Company Name <span className="text-[#2C8C91]">*</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        placeholder="Acme Corp"
                        value={form.companyName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#1F2937] bg-[#FAF7F2] outline-none transition-all ${
                          errors.companyName
                            ? "border-red-400 focus:ring-2 focus:ring-red-100"
                            : "border-[#E5DED6] focus:border-[#2C8C91] focus:ring-2 focus:ring-[#2C8C91]/15"
                        }`}
                      />
                      {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                    </div>
                  </div>

                  {/* Row 3: Role, Industry & Size */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-1.5">
                        Your Role <span className="text-[#2C8C91]">*</span>
                      </label>
                      <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className={`w-full px-3.5 py-3 rounded-xl border text-sm bg-[#FAF7F2] outline-none transition-all ${
                          form.role ? "text-[#1F2937] font-semibold" : "text-[#5F6B73]/60"
                        } ${
                          errors.role
                            ? "border-red-400"
                            : "border-[#E5DED6] focus:border-[#2C8C91]"
                        }`}
                      >
                        <option value="" disabled>Select Role…</option>
                        {ROLES.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                      {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-1.5">
                        Industry <span className="text-[#2C8C91]">*</span>
                      </label>
                      <select
                        name="industry"
                        value={form.industry}
                        onChange={handleChange}
                        className={`w-full px-3.5 py-3 rounded-xl border text-sm bg-[#FAF7F2] outline-none transition-all ${
                          form.industry ? "text-[#1F2937] font-semibold" : "text-[#5F6B73]/60"
                        } ${
                          errors.industry
                            ? "border-red-400"
                            : "border-[#E5DED6] focus:border-[#2C8C91]"
                        }`}
                      >
                        <option value="" disabled>Select Industry…</option>
                        {INDUSTRIES.map((ind) => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </select>
                      {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-1.5">
                        Team Size <span className="text-[#2C8C91]">*</span>
                      </label>
                      <select
                        name="companySize"
                        value={form.companySize}
                        onChange={handleChange}
                        className={`w-full px-3.5 py-3 rounded-xl border text-sm bg-[#FAF7F2] outline-none transition-all ${
                          form.companySize ? "text-[#1F2937] font-semibold" : "text-[#5F6B73]/60"
                        } ${
                          errors.companySize
                            ? "border-red-400"
                            : "border-[#E5DED6] focus:border-[#2C8C91]"
                        }`}
                      >
                        <option value="" disabled>Select Size…</option>
                        {COMPANY_SIZES.map((sz) => (
                          <option key={sz.label} value={sz.value}>{sz.label}</option>
                        ))}
                      </select>
                      {errors.companySize && <p className="text-red-500 text-xs mt-1">{errors.companySize}</p>}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-[#2C8C91] hover:bg-[#216B6F] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin text-white" />
                        Submitting Inquiry…
                      </>
                    ) : (
                      <>
                        Submit Message & Request Demo
                        <Send size={16} />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-[#5F6B73] pt-2">
                    By submitting, you agree to Humanova&apos;s{" "}
                    <Link href="/privacy-policy" className="underline hover:text-[#2C8C91]">
                      Privacy Policy
                    </Link>. Your information is never shared.
                  </p>
                </form>
              )}
            </motion.div>

            {/* Right: Why Choose Humanova & Security (5 cols) */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
              className="lg:col-span-5 space-y-6"
            >
              {/* Card 1: Enterprise Trust */}
              <motion.div variants={fadeUp} className="bg-white rounded-3xl border border-[#E5DED6] p-8 shadow-sm">
                <h3 className="text-xl font-bold text-[#1F2937] mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
                  Why HR Leaders Partner with Humanova
                </h3>

                <div className="space-y-4 text-sm text-[#5F6B73]">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#EAF6F4] text-[#2C8C91] grid place-items-center flex-shrink-0 mt-0.5">
                      <Clock size={16} />
                    </div>
                    <div>
                      <strong className="text-[#1F2937] block font-semibold">24-Hour Response SLA</strong>
                      Dedicated account executives respond promptly with custom rollout plans.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#EAF6F4] text-[#2C8C91] grid place-items-center flex-shrink-0 mt-0.5">
                      <Users size={16} />
                    </div>
                    <div>
                      <strong className="text-[#1F2937] block font-semibold">Tailored Guided Pilots</strong>
                      Test check-ins, wellbeing coaching, and leave insights with your core team.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#EAF6F4] text-[#2C8C91] grid place-items-center flex-shrink-0 mt-0.5">
                      <Shield size={16} />
                    </div>
                    <div>
                      <strong className="text-[#1F2937] block font-semibold">Enterprise Security & Compliance</strong>
                      Built to support DPDP Act 2023, GDPR, and SOC 2 security standards.
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Contact Info Card */}
              <motion.div
                variants={fadeUp}
                className="bg-white rounded-3xl border border-[#E5DED6] p-8 shadow-sm hover:border-[#2C8C91]/40 transition-all"
              >
                <span className="text-[10px] font-black bg-[#EAF6F4] text-[#2C8C91] border border-[#2C8C91]/20 px-2.5 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
                  Workforce Wellbeing Platform
                </span>
                <h4 className="text-xl font-bold text-[#1F2937] leading-snug mb-2" style={{ fontFamily: "var(--font-outfit)" }}>
                  Empower your employees with evidence-based wellness & intelligent HR analytics.
                </h4>
                <p className="text-sm text-[#5F6B73] leading-relaxed">
                  Join leading organizations building resilient, high-performing teams with Humanova.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ SECTION ─────────────────────────────────────────────── */}
        <section className="px-6 py-16 bg-[#F3EEE8]">
          <div className="max-w-4xl mx-auto">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#2C8C91]">
                Frequently Asked Questions
              </span>
              <h2 className="text-3xl font-extrabold text-[#1F2937] mt-1" style={{ fontFamily: "var(--font-outfit)" }}>
                Got questions before reaching out?
              </h2>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="bg-white rounded-3xl border border-[#E5DED6] px-8 py-2">
              {CONTACT_FAQS.map((faq, i) => (
                <div key={faq.q} className="border-b border-[#E5DED6] last:border-b-0 py-5">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 text-left font-bold text-base text-[#1F2937] cursor-pointer"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-[#2C8C91] transition-transform duration-300 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3 text-sm text-[#5F6B73] leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
