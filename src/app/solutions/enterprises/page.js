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
  Building2,
  Globe,
  Lock,
} from "lucide-react";

export const metadata = {
  title: "Enterprise Employee Wellbeing Platform | Humanova",
  description:
    "Humanova helps large organisations improve employee wellbeing, leadership capability, engagement and workforce resilience across complex teams.",
  alternates: {
    canonical: "https://humanova.live/solutions/enterprises",
  },
};

export default function EnterprisesPage() {
  return (
    <SolutionPageTemplate
      eyebrow="Enterprise workforce wellbeing and performance"
      headline="Build a resilient workforce across every location, level and team"
      subheadline="Humanova gives large organisations one connected system for employee wellbeing, leadership capability, engagement and workforce insight. It helps HR teams identify pressure early, deliver confidential support and turn people data into practical action across complex, distributed workplaces."
      ctaPrimary={{ label: "Book an Enterprise Consultation", href: "#request-demo" }}
      ctaSecondary={{ label: "Explore the Platform", href: "#services" }}
      bannerImg="https://humanova-docs-app.s3.amazonaws.com/Banners/Sales_Team_Website_vddhzd.png"
      stats={[
        { value: "10k+", label: "Employees Supported" },
        { value: "100%", label: "Enterprise Security & Privacy" },
        { value: "Global", label: "Multi-Location Rollout" },
        { value: "3x", label: "Measurable ROI Impact" },
      ]}
      services={{
        headline: "Coordinated Services For Complex Enterprise Workforces",
        subline: "Consistent Support, Strong Governance & Measurable Outcomes At Scale",
        items: [
          {
            icon: <Heart size={22} />,
            title: "Workforce Mental Health & Resilience",
            desc: "Confidential support that helps employees manage stress, strengthen coping skills and seek help before challenges affect health or work.",
          },
          {
            icon: <Users size={22} />,
            title: "Leadership Readiness & Executive Coaching",
            desc: "Targeted development for senior leaders and people managers who need to lead with clarity, empathy and sound judgement.",
          },
          {
            icon: <ActivitySquare size={22} />,
            title: "Burnout & High-Risk Role Support",
            desc: "Specialised support for frontline, customer-facing and mission-critical roles exposed to sustained pressure and emotional labour.",
          },
          {
            icon: <TrendingUp size={22} />,
            title: "Change & Workforce Transition Support",
            desc: "Human-centred support during mergers, restructuring, redeployment and major organisational change.",
          },
          {
            icon: <BarChart3 size={22} />,
            title: "Engagement & Workforce Insight",
            desc: "Anonymous listening tools and role-based dashboards that reveal where disengagement, communication gaps or pressure may be building.",
          },
          {
            icon: <Lock size={22} />,
            title: "Confidential & Scalable Delivery",
            desc: "Enterprise-ready delivery designed around privacy, access control, professional standards and consistent employee experience.",
          },
        ],
      }}
      howItWorks={{
        image: "https://humanova-docs-app.s3.ap-south-1.amazonaws.com/uploads/Sales_Team_Website.png_3_zevcey.png",
        title: "A Clear Enterprise Rollout Process",
        ctaLabel: "Book a Consultation",
        ctaHref: "#request-demo",
        items: [
          {
            icon: <Building2 size={20} />,
            title: "1. Discover Priorities",
            desc: "We work with HR and leadership to understand workforce structure, risk areas, existing initiatives and key goals.",
          },
          {
            icon: <Globe size={20} />,
            title: "2. Configure Experience",
            desc: "We set up programmes, access controls, communication, dashboards and support pathways for your enterprise groups.",
          },
          {
            icon: <TrendingUp size={20} />,
            title: "3. Launch & Measure",
            desc: "Employees gain confidential support while HR tracks anonymised trends and actionable recommendations over time.",
          },
        ],
      }}
      testimonials={[
        {
          quote: "Bring wellbeing, coaching, engagement, learning and insight together instead of managing separate vendors and scattered data.",
          author: "One Connected System",
          role: "Unified Enterprise HR",
          avatarColor: "#2C8C91",
        },
        {
          quote: "Employees can access digital tools while still receiving relevant support from qualified coaches and professionals.",
          author: "Tech + Human Care",
          role: "Professional Coaching",
          avatarColor: "#4A90D9",
        },
        {
          quote: "Leaders see anonymised patterns and organisational trends while individual conversations remain strictly confidential.",
          author: "Insight Without Compromise",
          role: "Data Privacy Standard",
          avatarColor: "#7C5CDB",
        },
        {
          quote: "Support multiple locations, layered leadership structures, high-pressure roles and varied employee needs through one framework.",
          author: "Designed for Complexity",
          role: "Multi-Location Fit",
          avatarColor: "#E05FA0",
        },
        {
          quote: "Reports focus on what leaders can do next, not only on scores, charts or one-time participation numbers.",
          author: "Actionable, Not Decorative",
          role: "Executive Decision Support",
          avatarColor: "#1AAF7E",
        },
        {
          quote: "Start with a priority workforce group, geography or use case, then expand based on evidence and organisational readiness.",
          author: "Flexible Enterprise Rollout",
          role: "Phased Deployment",
          avatarColor: "#E8A020",
        },
      ]}
      faqs={{
        headline: "Frequently Asked Questions for Enterprise Leaders",
        items: [
          {
            question: "Is Humanova only an employee assistance programme?",
            answer:
              "No. Humanova can include confidential support, but it also brings together wellbeing, leadership development, engagement, learning and workforce insight in one system.",
          },
          {
            question: "Can Humanova support multiple locations and business units?",
            answer:
              "Yes. The rollout can be configured for different locations, departments, workforce groups and leadership levels while maintaining a consistent organisational framework.",
          },
          {
            question: "How is employee confidentiality protected?",
            answer:
              "Individual support interactions remain confidential. Organisational reporting should use approved, anonymised views and access controls aligned with the agreed implementation model.",
          },
          {
            question: "Can we begin with a pilot?",
            answer:
              "Yes. Many organisations start with one geography, department, role group or priority challenge before deciding how to expand.",
          },
          {
            question: "What can HR and leaders see?",
            answer:
              "Authorised users can view agreed organisational trends, participation patterns and recommendations. They should not receive private details from an employee's confidential support interaction.",
          },
          {
            question: "How long does implementation take?",
            answer:
              "Timing depends on workforce size, integrations, programme scope and internal approvals. Humanova can begin with a focused launch and expand in phases.",
          },
          {
            question: "Can Humanova work alongside our existing HR systems?",
            answer:
              "Humanova can be positioned as a complementary layer for wellbeing, coaching, engagement and workforce insight. Integration requirements should be confirmed during solution design.",
          },
          {
            question: "How are outcomes measured?",
            answer:
              "The organisation and Humanova agree the baseline, indicators, reporting cadence and desired changes before the programme begins.",
          },
        ],
      }}
      faqCta={{
        title: "Build a healthier, more resilient enterprise",
        desc: "Bring workforce wellbeing, leadership development and actionable people insight into one connected experience.",
        ctaLabel: "Book an Enterprise Consultation",
        ctaHref: "#request-demo",
      }}
    />
  );
}
