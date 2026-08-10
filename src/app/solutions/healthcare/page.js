import SolutionPageTemplate from "@/components/solutions/SolutionPageTemplate";
import {
  Heart,
  ActivitySquare,
  ShieldCheck,
  HeadphonesIcon,
  ClipboardList,
  BarChart3,
  Users,
  Compass,
  Zap,
  TrendingUp,
  Sparkles,
  Stethoscope,
  Clock,
  AlertCircle,
} from "lucide-react";

export const metadata = {
  title: "Healthcare & Public Sector Wellbeing | Humanova",
  description:
    "Humanova supports healthcare and public sector workforce wellbeing, burnout prevention, leadership readiness and confidential employee support.",
};

export default function HealthcarePage() {
  return (
    <SolutionPageTemplate
      eyebrow="Workforce resilience for essential services"
      headline="Support the people who carry the pressure of caring for communities"
      subheadline="Humanova helps healthcare and public sector organisations strengthen workforce wellbeing, reduce burnout risk and support leaders in demanding, highly accountable environments. Employees receive confidential, accessible support while authorised leaders gain anonymised insight into workforce needs."
      ctaPrimary={{ label: "Book a Sector Consultation", href: "#request-demo" }}
      ctaSecondary={{ label: "Explore Workforce Support", href: "#services" }}
      bannerImg="https://humanova-docs-app.s3.amazonaws.com/Banners/Sales_Team_Website_vddhzd.png"
      stats={[
        { value: "100%", label: "Confidentiality & Compliance" },
        { value: "24/7", label: "Shift-Friendly Access" },
        { value: "Role", label: "Aware Burnout Prevention" },
        { value: "Zero", label: "Service Delivery Disruption" },
      ]}
      services={{
        headline: "A Human-First Ecosystem For High-Pressure Services",
        subline: "Supporting Employees in Emotionally Demanding & Mission-Critical Roles",
        items: [
          {
            icon: <Heart size={22} />,
            title: "Mental Health & Emotional Resilience",
            desc: "Confidential support for stress, emotional fatigue, difficult incidents and the cumulative pressure of essential work.",
          },
          {
            icon: <ActivitySquare size={22} />,
            title: "Burnout & Compassion Fatigue Prevention",
            desc: "Role-aware support for clinical, frontline, emergency, administrative and public-facing teams.",
          },
          {
            icon: <Users size={22} />,
            title: "Leadership Support in High-Pressure Settings",
            desc: "Help managers and senior leaders communicate clearly, respond to distress and maintain trust during sustained pressure.",
          },
          {
            icon: <AlertCircle size={22} />,
            title: "Critical Incident & Transition Support",
            desc: "Structured support following difficult events, service changes, redeployment or workforce disruption.",
          },
          {
            icon: <BarChart3 size={22} />,
            title: "Workforce Listening & Risk Insight",
            desc: "Give employees safe ways to share concerns and give leaders anonymised patterns that support responsible action.",
          },
          {
            icon: <Clock size={22} />,
            title: "Secure & Accessible Delivery",
            desc: "Support varied work patterns, locations and access needs through shift-friendly digital tools combined with human services.",
          },
        ],
      }}
      howItWorks={{
        image: "https://humanova-docs-app.s3.ap-south-1.amazonaws.com/uploads/Sales_Team_Website.png_1_touvsf.png",
        title: "Designed For Operational Realities & Governance",
        ctaLabel: "Book a Consultation",
        ctaHref: "#request-demo",
        items: [
          {
            icon: <Stethoscope size={20} />,
            title: "1. Map Sector Context",
            desc: "Review roles, shift patterns, service pressures, risk areas, existing support and governance requirements.",
          },
          {
            icon: <Sparkles size={20} />,
            title: "2. Design Support Model",
            desc: "Select the right mix of confidential support, coaching, group programmes, listening and leadership development.",
          },
          {
            icon: <TrendingUp size={20} />,
            title: "3. Deliver & Review Risk",
            desc: "Provide shift-friendly support across sites with anonymised trend reviews to guide leadership action.",
          },
        ],
      }}
      testimonials={[
        {
          quote: "Programmes recognise emotional labour, critical decisions, public accountability and the impact of sustained service demand.",
          author: "High-Pressure Focus",
          role: "Clinical & Frontline Care",
          avatarColor: "#2C8C91",
        },
        {
          quote: "Clear boundaries between private support interactions and organisational reporting help protect employee confidence.",
          author: "Trusted Confidentiality",
          role: "Employee Trust & Safety",
          avatarColor: "#4A90D9",
        },
        {
          quote: "Managers receive guidance and coaching to respond appropriately without being expected to act as clinicians.",
          author: "Leadership Guidance",
          role: "Manager Empowerment",
          avatarColor: "#7C5CDB",
        },
        {
          quote: "Digital and human-led support can be structured for varied schedules, sites and frontline access needs.",
          author: "Shift & Site Access",
          role: "24/7 Operational Fit",
          avatarColor: "#E05FA0",
        },
        {
          quote: "Authorised leaders can see approved trends and priority areas without receiving private employee disclosures.",
          author: "Anonymised Insight",
          role: "Governance & Privacy",
          avatarColor: "#1AAF7E",
        },
        {
          quote: "The aim is not only short-term relief, but stronger resilience, leadership and support systems over time.",
          author: "Sustained Workforce Capacity",
          role: "Long-term Impact",
          avatarColor: "#E8A020",
        },
      ]}
      faqs={{
        headline: "Clear Answers for Healthcare & Public Sector Leaders",
        items: [
          {
            question: "Can Humanova support shift-based and frontline employees?",
            answer:
              "Yes. Access and communication can be designed around varied shifts, sites and operational roles.",
          },
          {
            question: "Is Humanova a clinical mental health provider?",
            answer:
              "Humanova is a workforce wellbeing and performance platform. The exact professional services and escalation pathways included should be confirmed for each programme and jurisdiction.",
          },
          {
            question: "How is confidentiality handled?",
            answer:
              "Individual support interactions remain private. Organisational reporting should be anonymised and limited to approved workforce trends, subject to the agreed governance model.",
          },
          {
            question: "Can managers see individual employee information?",
            answer:
              "Managers should not receive private details from confidential employee support. They may receive approved team-level guidance or anonymised trends relevant to their role.",
          },
          {
            question: "Can Humanova help after a critical incident?",
            answer:
              "A programme can include structured employee support, manager guidance, group sessions and follow-up reviews after difficult events.",
          },
          {
            question: "Can the solution support both healthcare and government organisations?",
            answer:
              "Yes. The programme can be adapted to different service environments, governance requirements, workforce roles and operational pressures.",
          },
          {
            question: "How do you avoid disrupting service delivery?",
            answer:
              "Rollout, communications and programme access can be planned around shifts, peak periods, role requirements and local operating constraints.",
          },
          {
            question: "What outcomes can be measured?",
            answer:
              "Measures can include support awareness, utilisation, burnout risk indicators, employee sentiment, manager readiness and completion of agreed organisational actions.",
          },
        ],
      }}
      faqCta={{
        title: "Strengthen the workforce behind essential services",
        desc: "Give employees trusted support and give leaders clearer insight into the pressures affecting workforce health and resilience.",
        ctaLabel: "Book a Sector Consultation",
        ctaHref: "#request-demo",
      }}
    />
  );
}
