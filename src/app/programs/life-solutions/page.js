import ProgramPageTemplate from "@/components/programs/ProgramPageTemplate";
import { Clock, Users, GraduationCap } from "lucide-react";

export const metadata = {
  title: "Life Solutions Program — Humanova",
  description: "Personal coaching beyond the workplace — supporting employees through life's challenges.",
};

export default function LifeSolutionsPage() {
  return (
    <ProgramPageTemplate
      badge="Life Solutions"
      headline={<>Personal coaching <em className="not-italic text-[#7C5CDB]">beyond</em> the workplace</>}
      subheadline="Life doesn't stop at the office door. This program supports employees through personal transitions, family challenges, financial stress, and major life events."
      accentColor="#7C5CDB"
      highlights={[
        { icon: <Clock size={20} />, value: "10 Weeks", label: "Duration" },
        { icon: <Users size={20} />, value: "1-on-1", label: "Format" },
        { icon: <GraduationCap size={20} />, value: "Confidential", label: "Privacy" },
      ]}
      modules={[
        { number: "01", title: "Life Audit & Priorities", desc: "A structured reflection to map personal challenges, energy drains, and what matters most right now." },
        { number: "02", title: "Navigating Life Transitions", desc: "Evidence-based coaching for handling change — moves, relationships, parenthood, loss, or career pivots." },
        { number: "03", title: "Financial & Practical Wellbeing", desc: "Workshops on financial literacy, budgeting stress, and building practical resilience for life's curveballs." },
        { number: "04", title: "Relationships & Communication", desc: "Strengthening personal relationships through better communication, boundary-setting, and conflict resolution." },
        { number: "05", title: "Personal Growth Plan", desc: "A bespoke action plan with goals, habits, and ongoing coaching to sustain progress beyond the program." },
      ]}
      outcomes={[
        { stat: "78%", desc: "Of participants feel more in control of work-life balance" },
        { stat: "2.5×", desc: "Improvement in self-reported life satisfaction scores" },
        { stat: "35%", desc: "Reduction in personal-stress-related productivity loss" },
        { stat: "90%", desc: "Say the program helped them handle a specific life challenge" },
      ]}
      whoIsItFor={[
        { title: "New Parents", desc: "Balancing parenthood with career demands" },
        { title: "Caregivers", desc: "Supporting those caring for aging or unwell relatives" },
        { title: "Career Changers", desc: "Navigating uncertainty during professional transitions" },
        { title: "Anyone Struggling", desc: "For those facing personal challenges affecting work" },
      ]}
      faqs={{
        headline: "Questions about Life Solutions",
        items: [
          { question: "Is this therapy or counselling?", answer: "This is professional coaching, not therapy. If clinical support is needed, we provide warm referrals to appropriate services." },
          { question: "Are sessions truly confidential?", answer: "100%. Nothing shared in 1-on-1 sessions is disclosed to managers, HR, or anyone else. Your privacy is absolute." },
          { question: "Can employees self-refer?", answer: "Yes. Employees can sign up directly — no manager approval needed. We encourage self-referral to remove barriers." },
          { question: "What topics can I discuss?", answer: "Anything affecting your wellbeing — relationships, grief, financial worries, parenting challenges, identity, motivation, or feeling stuck." },
          { question: "How are coaches matched?", answer: "We match based on the employee's needs, preferences, and the coach's specialisms. Employees can request a different coach at any time." },
        ],
      }}
      ctaTitle="Support your people through life's big moments"
      ctaDesc="When employees feel supported as whole people, they bring their best selves to work."
    />
  );
}
