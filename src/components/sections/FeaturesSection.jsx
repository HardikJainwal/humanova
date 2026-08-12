"use client";

import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";

const features = [
  {
    title: "Mood Tracking",
    desc: "Employees log daily mood in seconds. Patterns surface before burnout hits.",
    img: "/images/features/1-removebg-preview.png",
  },
  {
    title: "Team Analytics",
    desc: "Aggregated, anonymous dashboards give HR real signal on team wellbeing trends.",
    img: "/images/features/8-removebg-preview.png",
  },
  {
    title: "Anonymous Surveys",
    desc: "Pulse checks employees actually answer honestly, no fear of exposure.",
    img: "/images/features/7-removebg-preview.png",
  },
  {
    title: "Resource Library",
    desc: "Curated articles, exercises, and guides tailored to each employee's needs.",
    img: "/images/features/3-removebg-preview.png",
  },
  {
    title: "Manager Dashboards",
    desc: "Give managers early-warning insights without breaching individual privacy.",
    img: "/images/features/4-removebg-preview.png",
  },
  {
    title: "Confidential Chat",
    desc: "Direct line to licensed counselors, fully encrypted and private.",
    img: "/images/features/5-removebg-preview.png",
  },
  {
    title: "Wellness Programs",
    desc: "Ready-made initiatives HR can launch in a click, tracked for impact.",
    img: "/images/features/6-removebg-preview.png",
  },
  {
    title: "Risk Alerts",
    desc: "Early flags on rising stress levels so leadership can act before crisis.",
    img: "/images/features/2-removebg-preview.png",
  },
];

export default function FeaturesSection() {
  return (
    <section
      className="w-full py-12 md:py-20"
      style={{ backgroundColor: "#FAF7F2" }}
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-14">
          <h2
            className="text-[#1F2937] text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Our Features That We Offer
          </h2>
          <p className="text-[#5F6B73] text-base md:text-lg mt-4 max-w-[700px] mx-auto leading-relaxed">
            A structured, evidence-based toolkit built for HR leaders to
            measure, support, and improve mental health across every team.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>

        <div className="flex justify-center mt-14">
          <Link
            href="/platform-overview"
            className="bg-[#B7E4C7] text-[#0a3d62] font-semibold text-sm tracking-wide px-8 py-4 rounded-xl hover:bg-[#2C8C91] hover:text-white transition-colors duration-300 shadow-sm cursor-pointer inline-flex items-center justify-center"
          >
            VIEW ALL FEATURES
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, desc, img }) {
  return (
    <div className="group relative overflow-hidden rounded-[28px] p-7 border border-[#E5E1D8] bg-white flex flex-col transition-all duration-500 ease-out hover:bg-[#2C8C91] hover:border-[#2C8C91] hover:-translate-y-2 hover:shadow-2xl">
      {/* Icon / image box at top of card */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#EEF8F5] group-hover:bg-white/20 flex items-center justify-center mb-6 p-2 transition-all duration-500 shadow-sm shrink-0">
        <Image
          src={img}
          alt={title}
          width={96}
          height={96}
          unoptimized
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <h3 className="text-xl font-semibold mb-3 text-[#1F2937] group-hover:text-white transition-colors duration-500">
        {title}
      </h3>

      <p className="text-sm leading-relaxed mb-8 flex-1 text-[#5F6B73] group-hover:text-white/90 transition-colors duration-500">
        {desc}
      </p>

      {/* Decorative corners */}
      <div
        className="absolute bottom-[72px] right-0 w-8 h-8 bg-[#FAF7F2]"
        style={{ borderBottomRightRadius: "24px" }}
      />
      <div
        className="absolute bottom-0 right-[72px] w-8 h-8 bg-[#FAF7F2]"
        style={{ borderBottomRightRadius: "24px" }}
      />

      <div className="flex items-center justify-between">
        <Link
          href="/platform-overview"
          className="text-xs font-semibold tracking-wide flex items-center gap-2 text-[#1F2937] group-hover:text-white underline underline-offset-4 transition-colors duration-500"
        >
          READ MORE
          <Icon
            name="arrowRight"
            size={12}
            color="currentColor"
            strokeWidth={2}
          />
        </Link>

        {/* Bottom right corner badge */}
        <Link
          href="/platform-overview"
          className="absolute bottom-0 right-0 w-[72px] h-[72px] rounded-tl-[28px] bg-[#B7E4C7] flex items-center justify-center transition-all duration-500 group-hover:scale-105"
        >
          <Icon
            name="arrowUpRight"
            size={22}
            color="#0A3D62"
            strokeWidth={2}
          />
        </Link>
      </div>
    </div>
  );
}