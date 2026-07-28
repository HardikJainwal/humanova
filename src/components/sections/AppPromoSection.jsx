"use client";

import { motion } from "framer-motion";

const PHONE_IMAGE =
    "https://res.cloudinary.com/dii2omqrm/image/upload/v1783055896/Untitled_design_3_bpe0gr.png";

export default function HeroSection() {
    return (
        <section className="px-4 py-6 md:px-6 md:py-10">
            <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] bg-[#EEF8F5]">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_45%,rgba(202,230,216,0.55),transparent_38%)]" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                        {/* LEFT */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <h2
                                className="text-[#07312C] text-3xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.15] sm:leading-[1.05] tracking-tight"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                Humanova,{" "}
                                <span
                                    className="italic font-normal"
                                    style={{ fontFamily: "'Instrument Serif', serif" }}
                                >
                                    your partner
                                </span>{" "}
                                <br className="hidden sm:block" />
                                in workplace{" "}
                                <br className="hidden sm:block" />
                                wellness.
                            </h2>

                            <p className="mt-5 sm:mt-8 text-[#47635F] text-base sm:text-lg leading-relaxed max-w-lg">
                                Manage leave, shifts, support, and employee wellbeing with
                                AI-powered mood detection and reflection insights—all in one
                                beautifully designed platform.
                            </p>

                            <div className="mt-8 sm:mt-10 flex gap-4 sm:gap-5 flex-wrap">
                                <AppStoreBadge />
                                <PlayStoreBadge />
                            </div>
                        </motion.div>

                        {/* RIGHT */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[340px] sm:h-[460px] lg:h-[580px] flex items-center justify-center mt-4 lg:mt-0"
                        >
                            {/* Phone */}
                            <motion.img
                                src={PHONE_IMAGE}
                                alt="Humanova App"
                                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.2,
                                }}
                                className="relative z-20 h-[320px] sm:h-[440px] lg:h-[560px] w-auto max-w-full object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.22)]"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function AppStoreBadge() {
    return (
        <a
            href="#"
            className="flex items-center gap-3 bg-black text-white rounded-xl px-5 py-3 hover:scale-105 transition"
        >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.365 1.43c0 1.14-.415 2.075-1.246 2.805-.913.807-2.02 1.28-3.02 1.19-.12-1.11.42-2.29 1.22-3.02.83-.76 2.24-1.31 3.046-1.31zM20.5 17.09c-.51 1.14-.75 1.65-1.4 2.66-.9 1.4-2.17 3.15-3.75 3.16-1.4.02-1.76-.9-3.66-.89-1.9.01-2.3.9-3.7.89-1.58-.02-2.78-1.6-3.68-3-2.53-3.9-2.8-8.47-1.24-10.9 1.11-1.72 2.86-2.73 4.5-2.73 1.67 0 2.72.9 4.1.9 1.34 0 2.16-.9 4.09-.9 1.46 0 3.01.79 4.11 2.16-3.61 1.98-3.03 7.14.63 8.65z" />
            </svg>

            <div>
                <p className="text-[11px] text-gray-300 leading-none">
                    Download on the
                </p>
                <p className="font-semibold text-lg leading-none mt-1">
                    App Store
                </p>
            </div>
        </a>
    );
}

function PlayStoreBadge() {
    return (
        <a
            href="#"
            className="flex items-center gap-3 bg-black text-white rounded-xl px-5 py-3 hover:scale-105 transition"
        >
            <svg width="22" height="22" viewBox="0 0 24 24">
                <path fill="#00D9FF" d="M3.6 2.3 14 12 3.6 21.7c-.4-.3-.6-.8-.6-1.3V3.6c0-.5.2-1 .6-1.3z" />
                <path fill="#FFCE00" d="M14 12l3.4-3.4 3.86 2.2c.6.34.6 1.18 0 1.52l-3.86 2.2L14 12z" />
                <path fill="#00F076" d="M14 12 3.6 2.3c.16-.13.35-.2.55-.2.2 0 .4.06.6.17l12.65 7.2L14 12z" />
                <path fill="#FF3A44" d="M14 12l3.4 3.4-12.65 7.2c-.2.11-.4.17-.6.17-.2 0-.39-.07-.55-.2L14 12z" />
            </svg>

            <div>
                <p className="text-[11px] text-gray-300 leading-none">
                    Get it on
                </p>
                <p className="font-semibold text-lg leading-none mt-1">
                    Play Store
                </p>
            </div>
        </a>
    );
}