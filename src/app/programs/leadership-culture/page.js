import ProgramPageTemplate from "@/components/programs/ProgramPageTemplate";
import { Clock, Users, GraduationCap } from "lucide-react";

export const metadata = {
  title: "Leadership & Culture Program — Humanova",
  description: "Build psychologically safe leaders who create thriving team cultures.",
  alternates: {
    canonical: "https://humanova.live/programs/leadership-culture",
  },
};

export default function LeadershipCulturePage() {
  return (
    <ProgramPageTemplate
      badge="Leadership"
      headline={<>Build leaders who create <em className="not-italic text-[#E05FA0]">psychologically safe</em> cultures</>}
      subheadline="A transformative program for senior leaders and managers — equipping them with the emotional intelligence, communication skills, and cultural awareness to lead with both impact and humanity."
      accentColor="#E05FA0"
      highlights={[
        { icon: <Clock size={20} />, value: "10 Weeks", label: "Duration" },
        { icon: <Users size={20} />, value: "8–20", label: "Cohort Size" },
        { icon: <GraduationCap size={20} />, value: "CPD Certified", label: "Professional Dev" },
      ]}
      modules={[
        { number: "01", title: "The Psychologically Safe Leader", desc: "Understanding what psychological safety really means, why it matters for performance, and how to model it daily." },
        { number: "02", title: "Emotional Intelligence in Practice", desc: "Developing self-awareness, empathy, and emotional regulation as core leadership competencies." },
        { number: "03", title: "Difficult Conversations & Feedback", desc: "Frameworks for giving honest feedback, navigating conflict, and holding space for difficult team dynamics." },
        { number: "04", title: "Inclusive Leadership & Culture", desc: "Building diverse, equitable teams where every voice is heard and valued — moving beyond policy to daily practice." },
        { number: "05", title: "Sustaining Cultural Change", desc: "Creating team rituals, measurement frameworks, and accountability structures that embed new leadership behaviours." },
      ]}
      outcomes={[
        { stat: "91%", desc: "Of leaders report more confident handling of difficult conversations" },
        { stat: "2.8×", desc: "Improvement in team psychological safety scores" },
        { stat: "55%", desc: "Reduction in team turnover among participating leaders' teams" },
        { stat: "96%", desc: "Would recommend the program to fellow leaders" },
      ]}
      whoIsItFor={[
        { title: "Senior Leaders", desc: "Setting cultural tone from the C-suite down" },
        { title: "People Managers", desc: "Leading teams through daily challenges with empathy" },
        { title: "Emerging Leaders", desc: "Preparing high-potentials for leadership transitions" },
        { title: "HR Partners", desc: "Championing culture and psychological safety initiatives" },
      ]}
      faqs={{
        headline: "Questions about Leadership & Culture",
        items: [
          { question: "Is this only for senior executives?", answer: "No. The program is designed for anyone in a leadership or people management role — from team leads to C-suite." },
          { question: "How interactive is the program?", answer: "Very. Each session includes group exercises, role-play scenarios, peer coaching, and facilitated discussions. It's not a lecture series." },
          { question: "Can you deliver this in-person?", answer: "Yes. We offer both virtual and in-person delivery. In-person workshops can be held at your offices or an offsite venue." },
          { question: "How do you handle sensitive topics?", answer: "All facilitators are trained in trauma-informed practices. We create clear group agreements and provide 1-on-1 support if needed." },
          { question: "What's the time commitment?", answer: "Approximately 3–4 hours per week — one live session (90 min) plus pre-work, reflections, and peer coaching partnerships." },
        ],
      }}
      ctaTitle="Transform how your leaders lead"
      ctaDesc="Great cultures start with great leaders. Invest in the leadership development that actually changes behaviour."
    />
  );
}
