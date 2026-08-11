import ProgramPageTemplate from "@/components/programs/ProgramPageTemplate";
import { Clock, Users, GraduationCap } from "lucide-react";

export const metadata = {
  title: "Performance & Career Coaching — Humanova",
  description: "Unlock your team's potential with 1-on-1 performance and career development coaching.",
  alternates: {
    canonical: "https://humanova.live/programs/performance-coaching",
  },
};

export default function PerformanceCoachingPage() {
  return (
    <ProgramPageTemplate
      badge="Performance & Career"
      headline={<>Unlock potential with <em className="not-italic text-[#E8A020]">1-on-1</em> guidance</>}
      subheadline="Structured coaching that helps employees set clear goals, overcome blockers, and accelerate their career growth — with measurable results your leadership team will love."
      accentColor="#E8A020"
      highlights={[
        { icon: <Clock size={20} />, value: "12 Weeks", label: "Duration" },
        { icon: <Users size={20} />, value: "1-on-1", label: "Coaching Format" },
        { icon: <GraduationCap size={20} />, value: "ICF Certified", label: "Coach Standard" },
      ]}
      modules={[
        { number: "01", title: "Career Vision & Goal Setting", desc: "Clarify career aspirations, map strengths and growth areas, and set SMART goals aligned with organisational objectives." },
        { number: "02", title: "Performance Diagnostics", desc: "360° feedback integration, skills gap analysis, and identifying the habits and behaviours that drive high performance." },
        { number: "03", title: "Overcoming Performance Blockers", desc: "Coaching through imposter syndrome, perfectionism, procrastination, and other common barriers to peak performance." },
        { number: "04", title: "Influence & Visibility", desc: "Building executive presence, stakeholder management skills, and strategies for increasing impact and recognition." },
        { number: "05", title: "Growth Plan & Accountability", desc: "Personalised development roadmap with milestone tracking, manager alignment sessions, and quarterly check-ins." },
      ]}
      outcomes={[
        { stat: "72%", desc: "Of coachees achieve a promotion or expanded role within 12 months" },
        { stat: "4.1×", desc: "ROI on coaching investment as measured by productivity gains" },
        { stat: "88%", desc: "Report increased confidence in their professional capabilities" },
        { stat: "45%", desc: "Improvement in 360° feedback scores post-program" },
      ]}
      whoIsItFor={[
        { title: "High Potentials", desc: "Accelerating top talent toward leadership readiness" },
        { title: "New Managers", desc: "Building confidence in the first 90 days of leadership" },
        { title: "Mid-Career Professionals", desc: "Overcoming plateaus and reigniting career momentum" },
        { title: "Returning Employees", desc: "Rebuilding confidence after parental leave or sabbaticals" },
      ]}
      faqs={{
        headline: "Questions about Performance Coaching",
        items: [
          { question: "How is this different from mentoring?", answer: "Coaching is structured, goal-oriented, and led by certified professionals. Mentoring is informal knowledge-sharing. Coaching drives measurable behaviour change." },
          { question: "Can managers see coaching session content?", answer: "No. Session content is confidential. Managers only see progress against agreed goals if the employee opts to share." },
          { question: "What happens in a typical session?", answer: "Sessions are 60 minutes, held virtually. They blend reflective exercises, goal review, skills practice, and action planning." },
          { question: "How do you measure ROI?", answer: "We track goal attainment, 360° feedback changes, promotion rates, and self-reported confidence. You receive a detailed impact report." },
          { question: "Can we combine this with team coaching?", answer: "Yes. We offer a blended format that pairs individual coaching with team workshops for maximum impact." },
        ],
      }}
      ctaTitle="Invest in your people's growth"
      ctaDesc="When employees grow, organisations grow. Start with a free coaching needs assessment."
    />
  );
}
