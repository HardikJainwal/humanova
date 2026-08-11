import ProgramPageTemplate from "@/components/programs/ProgramPageTemplate";
import { Clock, Users, GraduationCap } from "lucide-react";

export const metadata = {
  title: "Sales Coaching & Revenue Program — Humanova",
  description: "Resilience training and performance coaching for revenue teams.",
  alternates: {
    canonical: "https://humanova.live/programs/sales-coaching",
  },
};

export default function SalesCoachingPage() {
  return (
    <ProgramPageTemplate
      // badge="Sales & Revenue"
      headline={<>Resilience training for <em className="not-italic text-[#1AAF7E]">high-performing</em> revenue teams</>}
      subheadline="Sales is mentally demanding. This program builds the resilience, emotional regulation, and performance habits that turn good salespeople into consistently great ones — without burning them out."
      accentColor="#1AAF7E"
      highlights={[
        { icon: <Clock size={20} />, value: "6 Weeks", label: "Duration" },
        { icon: <Users size={20} />, value: "10–25", label: "Team Size" },
        { icon: <GraduationCap size={20} />, value: "Revenue-Linked", label: "ROI Tracked" },
      ]}
      modules={[
        { number: "01", title: "Sales Mindset & Resilience", desc: "Building mental toughness for rejection, quota pressure, and the emotional rollercoaster of closing deals." },
        { number: "02", title: "Energy Management for Performance", desc: "Practical frameworks for sustaining high energy across quarters — avoiding the boom-bust cycle that plagues sales teams." },
        { number: "03", title: "Emotional Intelligence in Sales", desc: "Reading buyer emotions, building genuine rapport, and using empathy as a competitive advantage in complex deals." },
        { number: "04", title: "Team Dynamics & Competition", desc: "Turning healthy competition into collaboration, managing team politics, and building a supportive sales culture." },
        { number: "05", title: "Sustainable High Performance", desc: "Personal performance systems, recovery rituals, and accountability partnerships that prevent burnout while maintaining results." },
      ]}
      outcomes={[
        { stat: "28%", desc: "Average improvement in quota attainment across participating teams" },
        { stat: "3.6×", desc: "ROI as measured by revenue uplift vs. program investment" },
        { stat: "50%", desc: "Reduction in sales team turnover within 12 months" },
        { stat: "87%", desc: "Report improved confidence in handling high-pressure situations" },
      ]}
      whoIsItFor={[
        { title: "Sales Reps & AEs", desc: "Building resilience for quota-carrying roles" },
        { title: "Sales Leaders", desc: "Creating high-performance cultures without burnout" },
        { title: "SDR/BDR Teams", desc: "Handling rejection and maintaining outbound energy" },
        { title: "Revenue Operations", desc: "Understanding the human side of revenue performance" },
      ]}
      faqs={{
        headline: "Questions about Sales Coaching",
        items: [
          { question: "Is this sales skills training?", answer: "No. This is resilience and performance coaching. We don't teach cold-calling techniques — we build the mental fitness that makes existing skills more effective." },
          { question: "How does this differ from standard sales training?", answer: "Most sales training focuses on methodology. We focus on the human behind the number — mindset, energy, emotional regulation, and sustainable performance." },
          { question: "Can we track revenue impact?", answer: "Yes. We work with your RevOps team to establish baseline metrics and track quota attainment, deal velocity, and retention alongside the program." },
          { question: "Will this take time away from selling?", answer: "The program is designed for busy sales teams — 2 hours per week, with sessions scheduled around your team's peak selling hours." },
          { question: "Do you work with individual reps or whole teams?", answer: "Both. The core program is team-based, but includes optional 1-on-1 coaching for high-potentials or those needing extra support." },
        ],
      }}
      ctaTitle="Build a sales team that wins without burning out"
      ctaDesc="Sustainable revenue growth starts with resilient, mentally fit salespeople. See the difference coaching makes."
    />
  );
}
