import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/** @type {Array<{ icon: string; title: string; description: string; delay: number }>} */
const FEATURES = [
  {
    icon: "heart",
    title: "Employee Wellbeing",
    description:
      "Holistic wellness check-ins, pulse surveys, and burnout detection that give your people a voice — and your organization clear direction.",
    delay: 1,
  },
  {
    icon: "brain",
    title: "Mental Health Support",
    description:
      "On-demand access to licensed therapists, guided mindfulness sessions, and confidential peer support, all within your existing workflow.",
    delay: 2,
  },
  {
    icon: "activity",
    title: "Improved Productivity",
    description:
      "Translate wellbeing investments into measurable outcomes. Track engagement trends, retention lift, and ROI through an executive-ready dashboard.",
    delay: 3,
  },
];

/**
 * Features section — three-column card grid.
 * Server component.
 */
export default function Featuresfarzi() {
  return (
    <section
      id="features"
      className="w-full max-w-[1200px] mx-auto px-6 pt-6 pb-20 md:pb-28"
      aria-label="Key features"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}

/* ── Sub-component ────────────────────────────────────────── */

/**
 * @param {string} icon — Icon name from Icon registry
 * @param {string} title
 * @param {string} description
 * @param {1|2|3} delay — animation delay index
 */
function FeatureCard({ icon, title, description, delay }) {
  return (
    <article
      className={cn(
        "card-lift bg-white rounded-3xl border border-[#E5DED6] p-8",
        "flex flex-col gap-5",
        "shadow-[0_2px_12px_-2px_rgba(0,0,0,0.06)]",
        `animate-fade-up-delay-${delay}`
      )}
    >
      {/* Icon container */}
      <div className="w-14 h-14 rounded-2xl bg-[#F3EEE8] flex items-center justify-center flex-shrink-0">
        <Icon name={icon} size={28} color="#2C8C91" />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h3
          className="text-[#1F2937] font-semibold text-lg leading-snug"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {title}
        </h3>
        <p className="text-[#5F6B73] text-sm leading-relaxed">{description}</p>
      </div>
    </article>
  );
}
