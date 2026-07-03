"use client";
import Icon from "@/components/ui/Icon";

const features = [
  {
    title: "Mood Tracking",
    desc: "Employees log daily mood in seconds. Patterns surface before burnout hits.",
  },
  {
    title: "Team Analytics",
    desc: "Aggregated, anonymous dashboards give HR real signal on team wellbeing trends.",
    highlight: false,
  },
  {
    title: "Anonymous Surveys",
    desc: "Pulse checks employees actually answer honestly, no fear of exposure.",
  },
  {
    title: "Resource Library",
    desc: "Curated articles, exercises, and guides tailored to each employee's needs.",
  },
  {
    title: "Manager Dashboards",
    desc: "Give managers early-warning insights without breaching individual privacy.",
  },
  {
    title: "Confidential Chat",
    desc: "Direct line to licensed counselors, fully encrypted and private.",
  },
  {
    title: "Wellness Programs",
    desc: "Ready-made initiatives HR can launch in a click, tracked for impact.",
  },
  {
    title: "Risk Alerts",
    desc: "Early flags on rising stress levels so leadership can act before crisis.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      className="w-full py-10 md:py-18"
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
          <button className="bg-[#B7E4C7] text-[#0a3d62] font-semibold text-sm tracking-wide px-8 py-4 rounded-lg hover:bg-[#2C8C91] hover:text-white transition-colors duration-300">
            VIEW ALL FEATURES
          </button>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, desc, highlight }) {
  return (
 <div
className="group relative overflow-hidden rounded-[28px] p-8 border border-[#E5E1D8] bg-white flex flex-col transition-all duration-500 ease-out hover:bg-[#2C8C91] hover:border-[#2C8C91] hover:-translate-y-2 hover:shadow-2xl"
>
      {/* icon placeholder */}
      <div
  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 ${
    highlight
      ? "bg-white/10"
      : "bg-[#E9F3F3] group-hover:bg-white/15"
  }`}
>
        <Icon
          name="placeholder"
          size={24}
          color={highlight ? "#FFFFFF" : "#2C8C91"}
          strokeWidth={2}
        />
      </div>

      <h3
className={`text-xl font-semibold mb-3 transition-colors duration-500 ${
  highlight
    ? "text-white"
    : "text-[#1F2937] group-hover:text-white"
}`}
      >
        {title}
      </h3>

      <p
     className={`text-sm leading-relaxed mb-8 flex-1 transition-colors duration-500 ${
  highlight
    ? "text-white/80"
    : "text-[#5F6B73] group-hover:text-white/90"
}`}
      >
        {desc}
      </p>
<div
  className="absolute bottom-[72px] right-0 w-8 h-8 bg-[#FAF7F2]"
  style={{
    borderBottomRightRadius: "24px",
  }}
/>

<div
  className="absolute bottom-0 right-[72px] w-8 h-8 bg-[#FAF7F2]"
  style={{
    borderBottomRightRadius: "24px",
  }}
/>
      <div className="flex items-center justify-between">
        
        <a
  href="#"
  className={`text-xs font-semibold tracking-wide flex items-center gap-2 underline underline-offset-4 transition-colors duration-500 ${
    highlight
      ? "text-white"
      : "text-[#1F2937] group-hover:text-white"
  }`}
>
          READ MORE
          <Icon
            name="arrowRight"
            size={12}
            color={highlight ? "#FFFFFF" : "#1F2937"}
            strokeWidth={2}
          />
        </a>

      <div
  className="absolute bottom-0 right-0 w-[72px] h-[72px] rounded-tl-[28px] bg-[#B7E4C7] flex items-center justify-center transition-all duration-500 group-hover:scale-105"
>
  <Icon
    name="arrowUpRight"
    size={22}
    color="#0A3D62"
    strokeWidth={2}
  />
</div>
      </div>
    </div>
  );
}