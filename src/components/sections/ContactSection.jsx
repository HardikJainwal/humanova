"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Mail, Sparkles, ChevronDown, ArrowUpRight } from "lucide-react";

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
    }),
};

export default function ContactSection() {
    return (
        <section className="relative  overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* LEFT: form card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.97 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="relative rounded-[32px] bg-[#215B54] p-10 overflow-hidden"
                    >
                        {/* soft glow */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#7FC7AE]/30 blur-3xl" />

                        <form className="relative space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <Field label="Your name">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="w-full bg-white/10 text-white placeholder-white/50 rounded-full px-5 py-3.5 outline-none border border-white/10 focus:border-[#D4F04A] focus:bg-white/[0.14] transition-all"
                                />
                            </Field>

                            <Field label="Your Phone">
                                <input
                                    type="tel"
                                    placeholder="Your phone number"
                                    className="w-full bg-white/10 text-white placeholder-white/50 rounded-full px-5 py-3.5 outline-none border border-white/10 focus:border-[#D4F04A] focus:bg-white/[0.14] transition-all"
                                />
                            </Field>

                            <Field label="Choose Services">
                                <div className="relative">
                                    <select className="w-full appearance-none bg-white/10 text-white/80 rounded-full px-5 py-3.5 outline-none border border-white/10 focus:border-[#D4F04A] transition-all">
                                        <option className="text-black">Select Services</option>
                                        <option className="text-black">Repairs</option>
                                        <option className="text-black">Renovation</option>
                                        <option className="text-black">Maintenance</option>
                                    </select>
                                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
                                </div>
                            </Field>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="group flex items-center gap-3 bg-[#D4F04A] rounded-full pl-7 pr-2 py-2 mt-2 shadow-[0_8px_30px_rgba(212,240,74,0.35)] hover:shadow-[0_8px_36px_rgba(212,240,74,0.55)] transition-shadow"
                            >
                                <span className="font-semibold text-black">Submit</span>
                                <span className="grid place-items-center w-10 h-10 rounded-full bg-black text-[#D4F04A] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                    <ArrowUpRight size={16} />
                                </span>
                            </motion.button>
                        </form>
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
                                className="italic font-normal text-[#215B54]"
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
                            className="mt-10 flex flex-wrap lg:flex-nowrap items-center gap-x-6 lg:gap-x-8 gap-y-4"
                        >
                            <ContactItem icon={Phone} text="+1 837 187 3818" />
                            <span className="w-px h-8 bg-black/10 shrink-0" />
                            <ContactItem icon={MapPin} text="New York" />
                            <span className="w-px h-8 bg-black/10 shrink-0" />
                            <ContactItem icon={Mail} text="company@gmail.com" />
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
            <span className="text-[#1B2B28] font-medium whitespace-nowrap">{text}</span>
        </motion.div>
    );
}