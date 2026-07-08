import ProgramPageTemplate from "@/components/programs/ProgramPageTemplate";
import { Heart, Clock, Users, GraduationCap } from "lucide-react";

export const metadata = {
  title: "Employee Wellbeing Program — Humanova",
  description: "Holistic mental health and wellness program for every employee in your organisation.",
};

export default function EmployeeWellbeingPage() {
  return (
    <ProgramPageTemplate
      // badge="Most Popular"
      headline={<>Holistic wellbeing for <em className="not-italic text-[#2C8C91]">every</em> employee</>}
      subheadline="A comprehensive program that gives every team member the tools, support, and safe space they need to thrive — mentally, emotionally, and socially."
      accentColor="#2C8C91"
      highlights={[
        { icon: <Clock size={20} />, value: "8 Weeks", label: "Duration" },
        { icon: <Users size={20} />, value: "15–40", label: "Group Size" },
        { icon: <GraduationCap size={20} />, value: "Certified", label: "Accreditation" },
      ]}
      modules={[
        { number: "01", title: "Wellbeing Baseline Assessment", desc: "Confidential self-assessment and team-level mood mapping to understand where your people are starting from." },
        { number: "02", title: "Stress & Emotional Literacy", desc: "Interactive workshops on recognising stress signals, building emotional vocabulary, and healthy coping strategies." },
        { number: "03", title: "Building Daily Resilience Habits", desc: "Practical micro-habits for sleep, movement, mindfulness, and work-life boundaries that stick beyond the program." },
        { number: "04", title: "Peer Support & Connection", desc: "Facilitated group circles that build trust, reduce isolation, and create a culture of psychological safety." },
        { number: "05", title: "Sustaining Wellbeing Long-Term", desc: "Personal action plans, manager toolkits, and 90-day follow-up coaching to embed lasting change." },
      ]}
      outcomes={[
        { stat: "85%", desc: "Of participants report improved stress management within 30 days" },
        { stat: "3.2×", desc: "Higher engagement scores compared to pre-program baseline" },
        { stat: "40%", desc: "Reduction in burnout-related absences across participating teams" },
        { stat: "92%", desc: "Would recommend the program to colleagues and peers" },
      ]}
      whoIsItFor={[
        { title: "All Employees", desc: "Universal wellbeing support regardless of role or seniority" },
        { title: "HR & People Teams", desc: "Building organisation-wide wellness strategy and culture" },
        { title: "Team Managers", desc: "Equipping leaders to support their direct reports" },
        { title: "Remote Workers", desc: "Addressing isolation and digital fatigue" },
      ]}
      faqs={{
        headline: "Questions about Employee Wellbeing",
        items: [
          { question: "Is this program suitable for remote teams?", answer: "Absolutely. The program is designed for hybrid and fully remote teams, with all sessions delivered virtually. Self-paced content can be accessed anytime." },
          { question: "How much time commitment is required per week?", answer: "Approximately 2–3 hours per week — one live session (60 min) plus self-paced activities and reflections." },
          { question: "Can we run this alongside existing EAP services?", answer: "Yes. Humanova complements rather than replaces your EAP. We focus on proactive wellbeing rather than crisis intervention." },
          { question: "What data do managers see?", answer: "Managers only see aggregated, anonymised team-level insights. Individual check-ins and reflections remain completely private." },
          { question: "Is there a minimum team size?", answer: "The program works best with groups of 15–40. For smaller teams, we offer a condensed format or can combine teams." },
        ],
      }}
      ctaTitle="Give your team the wellbeing foundation they deserve"
      ctaDesc="Join 50+ organisations who have transformed employee wellness with Humanova's evidence-based approach."
    />
  );
}
