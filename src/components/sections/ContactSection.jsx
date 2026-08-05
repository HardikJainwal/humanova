"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, Mail, ChevronDown, ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
    }),
};

export default function ContactSection() {
    const [form, setForm] = useState({
        fullName: "",
        phoneNo: "",
        email: "",
        service: "Mental Wellness & EAP",
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setError("");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!form.fullName.trim()) {
            setError("Please enter your name.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const payload = {
                fullName: form.fullName,
                phoneNo: form.phoneNo || "N/A",
                email: form.email || `${form.fullName.toLowerCase().replace(/\s+/g, ".")}@lead.com`,
                companyName: form.service ? `${form.service} Inquiry` : "General Lead",
                role: "Manager",
                industry: "Research",
                companySize: "50",
            };

            const res = await fetch("https://api.humanova.live/api/v1/demo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error("Failed to submit");
            }

            setSubmitted(true);
        } catch (err) {
            console.error(err);
            setError("Failed to send request. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* LEFT: form card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.97 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="relative rounded-[32px] bg-gradient-to-br from-[#1B6E73] via-[#2C8C91] to-[#257D82] p-10 overflow-hidden shadow-lg"
                    >
                        {/* soft glow */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#7FC7AE]/30 blur-3xl" />

                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="relative py-12 px-4 text-center flex flex-col items-center justify-center space-y-4"
                                >
                                    <div className="w-16 h-16 rounded-full bg-[#D4F04A]/20 flex items-center justify-center text-[#D4F04A]">
                                        <CheckCircle2 size={36} />
                                    </div>
                                    <h3 className="text-white text-2xl font-extrabold" style={{ fontFamily: "var(--font-outfit)" }}>
                                        Thank You!
                                    </h3>
                                    <p className="text-white/80 text-sm max-w-xs leading-relaxed">
                                        We have received your message. Our team will reach out to you shortly.
                                    </p>
                                    <button
                                        onClick={() => { setSubmitted(false); setForm({ fullName: "", phoneNo: "", email: "", service: "Mental Wellness & EAP" }); }}
                                        className="mt-4 px-6 py-2.5 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            ) : (
                                <form className="relative space-y-6" onSubmit={handleSubmit}>
                                    <Field label="Your name">
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={form.fullName}
                                            onChange={handleChange}
                                            placeholder="Full Name"
                                            required
                                            className="w-full bg-white/10 text-white placeholder-white/50 rounded-full px-5 py-3.5 outline-none border border-white/10 focus:border-[#D4F04A] focus:bg-white/[0.14] transition-all text-sm"
                                        />
                                    </Field>

                                    <Field label="Your Phone">
                                        <input
                                            type="tel"
                                            name="phoneNo"
                                            value={form.phoneNo}
                                            onChange={handleChange}
                                            placeholder="Your phone number"
                                            className="w-full bg-white/10 text-white placeholder-white/50 rounded-full px-5 py-3.5 outline-none border border-white/10 focus:border-[#D4F04A] focus:bg-white/[0.14] transition-all text-sm"
                                        />
                                    </Field>

                                    <Field label="Work Email">
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="you@company.com"
                                            className="w-full bg-white/10 text-white placeholder-white/50 rounded-full px-5 py-3.5 outline-none border border-white/10 focus:border-[#D4F04A] focus:bg-white/[0.14] transition-all text-sm"
                                        />
                                    </Field>

                                    <Field label="Choose Services">
                                        <div className="relative">
                                            <select
                                                name="service"
                                                value={form.service}
                                                onChange={handleChange}
                                                className="w-full appearance-none bg-white/10 text-white/80 rounded-full px-5 py-3.5 outline-none border border-white/10 focus:border-[#D4F04A] transition-all text-sm"
                                            >
                                                <option className="text-black" value="Mental Wellness & EAP">Mental Wellness & EAP</option>
                                                <option className="text-black" value="Burnout Prevention">Burnout Prevention</option>
                                                <option className="text-black" value="Leadership Coaching">Leadership Coaching</option>
                                                <option className="text-black" value="Workforce Analytics">Workforce Analytics</option>
                                                <option className="text-black" value="General Inquiry">General Inquiry</option>
                                            </select>
                                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
                                        </div>
                                    </Field>

                                    {error && <p className="text-red-300 text-xs font-medium px-2">{error}</p>}

                                    <motion.button
                                        type="submit"
                                        disabled={loading}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="group flex items-center gap-3 bg-[#D4F04A] rounded-full pl-7 pr-2 py-2 mt-2 shadow-[0_8px_30px_rgba(212,240,74,0.35)] hover:shadow-[0_8px_36px_rgba(212,240,74,0.55)] transition-shadow disabled:opacity-60 cursor-pointer"
                                    >
                                        <span className="font-semibold text-black text-sm">
                                            {loading ? "Sending..." : "Submit"}
                                        </span>
                                        <span className="grid place-items-center w-10 h-10 rounded-full bg-black text-[#D4F04A] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                            {loading ? <Loader2 size={16} className="animate-spin text-[#D4F04A]" /> : <ArrowUpRight size={16} />}
                                        </span>
                                    </motion.button>
                                </form>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* RIGHT: copy */}
                    <div>
                        <motion.h2
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            custom={1}
                            className="mt-6 text-[#07312C] text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            Get in Touch
                            <br />
                            With Us
                            <br />
                            <span
                                className="italic font-normal text-[#2C8C91]"
                                style={{ fontFamily: "'Instrument Serif', serif" }}
                            >
                                Today
                            </span>
                        </motion.h2>

                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            custom={2}
                            className="mt-6 text-[#5C7570] text-base leading-7 max-w-md"
                        >
                            Manage leave, shifts, and employee support — reach the Humanova
                            team any time for onboarding, setup, or platform help.
                        </motion.p>

                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            custom={3}
                            className="mt-10 flex flex-wrap lg:flex-nowrap items-center gap-x-2 lg:gap-x-4 gap-y-2"
                        >
                            <ContactItem icon={Phone} text="+91 84440 74642" />
                            <span className="w-px h-8 bg-black/10 shrink-0" />
                            <ContactItem icon={MapPin} text="Delhi, India" />
                            <span className="w-px h-8 bg-black/10 shrink-0" />
                            <ContactItem icon={Mail} text="support@humanova.live" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Field({ label, children }) {
    return (
        <div>
            <label className="block text-white/70 text-sm mb-2">{label}</label>
            {children}
        </div>
    );
}

function ContactItem({ icon: Icon, text }) {
    return (
        <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 shrink-0"
        >
            <span className="grid place-items-center w-11 h-11 rounded-full bg-black text-[#D4F04A] shrink-0">
                <Icon size={17} />
            </span>
            <span className="text-sm font-semibold text-[#07312C]">{text}</span>
        </motion.div>
    );
}