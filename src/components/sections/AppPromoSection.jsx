"use client";

import { motion } from "framer-motion";

const PHONE_IMAGE =
    "https://res.cloudinary.com/dii2omqrm/image/upload/v1783055896/Untitled_design_3_bpe0gr.png";

export default function HeroSection() {
    return (
       <section className="px-4 py-4 md:px-6 md:py-6 ">
  <div className="relative overflow-hidden rounded-[40px] bg-[#EEF8F5]">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_45%,rgba(202,230,216,0.55),transparent_38%)]" />

            <div className="relative z-10 max-w-7xl mx-auto ml-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h1
                            className="text-[#07312C] text-5xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            Humanova,{" "}
                            <span
                                className="italic font-normal"
                                style={{ fontFamily: "'Instrument Serif', serif" }}
                            >
                                your partner
                            </span>
                            <br />
                            in workplace
                            <br />
                            wellness.
                        </h1>

                        <p className="mt-8 text-[#47635F] text-lg leading-8 max-w-lg">
                            Manage leave, shifts, support, and employee wellbeing with
                            AI-powered mood detection and reflection insights—all in one
                            beautifully designed platform.
                        </p>

                        <div className="mt-10 flex gap-5 flex-wrap">
                            <AppStoreBadge />
                            <PlayStoreBadge />
                        </div>
                    </motion.div>

                    {/* RIGHT */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[620px] flex items-center justify-center"
                    >
                        {/* Glow — concentric, centered on phone, not scattered */}
                        {/* <div className="absolute inset-0 m-auto w-[520px] h-[520px] rounded-full bg-[#BFE0D2] blur-[80px] opacity-70" />
                        <div className="absolute inset-0 m-auto w-[380px] h-[380px] rounded-full bg-[#9FD4C0] blur-[60px] opacity-50" />
                        <div className="absolute inset-0 m-auto w-[240px] h-[240px] rounded-full bg-[#7FC7AE] blur-[50px] opacity-40" /> */}

                        {/* Phone */}
                        <motion.img
                            src={PHONE_IMAGE}
                            alt="Humanova App"
                            initial={{ opacity: 0, y: 30, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.2,
                            }}
                            className="relative z-20 h-[610px] w-auto drop-shadow-[0_35px_70px_rgba(0,0,0,0.28)]"
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