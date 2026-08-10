"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const coaches = [
    {
        id: 1,
        name: "Bring inner peace",
        desc: "Happy tunes generate more peaceful solutions.",
        img: "https://humanova-docs-app.s3.ap-south-1.amazonaws.com/uploads/3e6a777b-dd2e-4a58-91b3-47007f553794.jpg",
        shape: "blob",
        accent: "#2C8C91",
        bg: "#DCEFEF",
    },
    {
        id: 2,
        name: "Find more joy",
        desc: "Feel utterly less stressed in just first 10 days.",
        img: "https://humanova-docs-app.s3.ap-south-1.amazonaws.com/uploads/38e9af7a-6c14-4e37-95fb-0db88946ddaf.jpg",
        shape: "bubble",
        accent: "#E29578",
        bg: "#FBE7DE",
    },
    {
        id: 3,
        name: "Healing program",
        desc: "Do it for yourself, and everyone you really love.",
        img: "https://humanova-docs-app.s3.ap-south-1.amazonaws.com/uploads/f0d8bc5a-9145-4cd7-ac27-672ed8976423.jpg",
        shape: "circle",
        accent: "#8BC98C",
        bg: "#E4F3E4",
    },
    {
        id: 4,
        name: "Positive psychology",
        desc: "Put your mind to bed, wake up fully refreshed.",
        img: "https://humanova-docs-app.s3.ap-south-1.amazonaws.com/uploads/cdb4a1d3-41cc-4c75-b1f6-ae5e349c8edc.jpg",
        shape: "sunburst",
        accent: "#D4A24E",
        bg: "#FBF0DD",
    },
];

export default function PeacefulBeginning() {
    return (
        <section
            className="w-full py-20 md:py-28 relative overflow-hidden"
            style={{ backgroundColor: "#FAF7F2" }}
        >
            <div className="max-w-[1200px] mx-auto px-6">
                {/* header */}
               <div className="text-center mb-16 relative">
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="inline-flex items-center gap-2 border border-[#1F2937]/20 rounded-full px-5 py-2 mb-8"
  >
    <span className="text-[#1F2937] text-xs font-semibold tracking-[2px] uppercase">
      Meet Your Guides
    </span>
  </motion.div>

  <div className="flex items-center justify-center gap-3 flex-wrap">
    <span className="text-[#2C8C91] hidden sm:block" aria-hidden="true">
      <SparkleIcon />
    </span>

                        <motion.h2
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-[#1F2937] text-4xl md:text-6xl font-semibold"
                            style={{ fontFamily: "var(--font-outfit)" }}
                        >
                            Bring your inner{" "}
                            <span className="relative inline-block px-2">
                                <span className="relative z-10 text-[#2C8C91]">peace</span>
                                <svg
                                    className="absolute z-0 pointer-events-none"
                                    style={{
                                        left: "-10%",
                                        right: "-10%",
                                        top: "-12%",
                                        bottom: "-26%",
                                        width: "128%",
                                        height: "150%",
                                    }}
                                    viewBox="0 0 200 100"
                                    fill="none"
                                    preserveAspectRatio="none"
                                    aria-hidden="true"
                                >
                                    <motion.ellipse
                                        cx="100"
                                        cy="50"
                                        rx="94"
                                        ry="42"
                                        stroke="#2C8C91"
                                        strokeWidth="4"
                                        fill="none"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
                                    />
                                </svg>
                            </span>
                        </motion.h2>

                        {/* squiggle decoration */}
                        {/* <span className="text-[#2C8C91] hidden sm:block" aria-hidden="true">
      <SquiggleIcon />
    </span> */}
  </div>
</div>

                {/* cards grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
                    {coaches.map((c, i) => (
                        <CoachCard key={c.id} coach={c} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function CoachCard({ coach, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center text-center group cursor-pointer"
        >
            {/* image w/ shape variants */}
            <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative w-[110px] h-[110px] md:w-[130px] md:h-[130px] mb-6"
            >
                {coach.shape === "blob" && (
                    <div
                        className="absolute inset-0 overflow-hidden"
                        style={{
                            borderRadius: "42% 58% 65% 35% / 45% 40% 60% 55%",
                        }}
                    >
                        <div
                            className="absolute inset-0"
                            style={{ backgroundColor: coach.bg }}
                        />
                        <Image
                            src={coach.img}
                            alt={coach.name}
                            fill
                            className="object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                            style={{ opacity: 0.95 }}
                        />
                    </div>
                )}

                {coach.shape === "bubble" && (
                    <>
                        <div
                            className="absolute inset-0 rounded-full overflow-hidden"
                            style={{ backgroundColor: coach.bg }}
                        >
                            <Image
                                src={coach.img}
                                alt={coach.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        <motion.div
                            initial={{ scale: 0, rotate: -15 }}
                            whileInView={{ scale: 1, rotate: -10 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
                            className="absolute -left-3 top-6 w-8 h-8 rounded-lg bg-white border-2 border-[#1F2937] flex items-center justify-center shadow-sm"
                            style={{ borderRadius: "8px 8px 8px 2px" }}
                        >
                            <HeartIcon color={coach.accent} />
                        </motion.div>
                    </>
                )}

                {coach.shape === "circle" && (
                    <div
                        className="absolute inset-0 rounded-full overflow-hidden"
                        style={{ backgroundColor: coach.bg }}
                    >
                        <Image
                            src={coach.img}
                            alt={coach.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                )}

                {coach.shape === "sunburst" && (
                    <>
                        <svg
                            viewBox="0 0 100 100"
                            className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:rotate-[20deg]"
                            aria-hidden="true"
                        >
                            <g fill={coach.bg}>
                                {Array.from({ length: 12 }).map((_, k) => (
                                    <ellipse
                                        key={k}
                                        cx="50"
                                        cy="18"
                                        rx="9"
                                        ry="20"
                                        transform={`rotate(${k * 30} 50 50)`}
                                    />
                                ))}
                            </g>
                        </svg>
                        <div className="absolute inset-[14%] rounded-full overflow-hidden">
                            <Image
                                src={coach.img}
                                alt={coach.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                    </>
                )}
            </motion.div>

            {/* title + underline */}
            <h3 className="text-[#1F2937] text-lg md:text-xl font-semibold mb-2">
                {coach.name}
            </h3>

            <svg width="90" height="6" viewBox="0 0 90 6" className="mb-3" aria-hidden="true">
                <motion.path
                    d="M2 4C20 1 70 1 88 4"
                    stroke={coach.accent}
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                />
            </svg>

            <p className="text-[#5F6B73] text-sm leading-relaxed max-w-[180px]">
                {coach.desc}
            </p>
        </motion.div>
    );
}

/* ── decorative inline icons ─────────────────────────────── */

function SparkleIcon() {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
        </svg>
    );
}

function SquiggleIcon() {
    return (
        <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
            <path
                d="M2 15C10 5 15 25 25 15C35 5 40 25 50 15C53 12 55 10 58 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

function HeartIcon({ color }) {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill={color}>
            <path d="M12 21s-7.5-4.6-10-9C-0.3 7.5 3 3 7 3c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 7.3 4.5 5 9-2.5 4.4-10 9-10 9z" />
        </svg>
    );
}