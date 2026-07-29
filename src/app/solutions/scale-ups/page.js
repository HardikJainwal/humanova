import SolutionPageTemplate from "@/components/solutions/SolutionPageTemplate";
import {
  Users,
  ActivitySquare,
  ShieldCheck,
  TrendingUp,
  Compass,
  BarChart3,
  Layers,
  Zap,
  Sparkles,
  Rocket,
  RefreshCw,
  Award,
} from "lucide-react";

export const metadata = {
  title: "Employee Wellbeing Platform for Scaleups | Humanova",
  description:
    "Humanova helps scaleups strengthen managers, employee wellbeing, engagement and workforce insight during rapid growth and organisational change.",
};

export default function ScaleUpsPage() {
  return (
    <SolutionPageTemplate
      eyebrow="Workforce support for high-growth companies"
      headline="Scale the company without losing the people, trust and culture behind the growth"
      subheadline="Humanova helps scaleups manage the people pressure that comes with rapid hiring, new managers, expanding teams and constant change. Build leadership capability, spot workforce risks early and keep employees connected as the organisation becomes more complex."
      ctaPrimary={{ label: "Book a Scaleup Consultation", href: "#request-demo" }}
      ctaSecondary={{ label: "Explore the Solution", href: "#services" }}
      bannerImg="https://res.cloudinary.com/dii2omqrm/image/upload/v1785317589/Sales_Team_Website.png_3_zevcey.png"
      stats={[
        { value: "40%", label: "Reduction in Growth Burnout" },
        { value: "3x", label: "Manager Readiness Improvement" },
        { value: "100%", label: "Privacy-Preserved Insights" },
        { value: "Seamless", label: "Multi-Department Scaling" },
      ]}
      services={{
        headline: "Support Designed For High-Growth Transitions",
        subline: "Bridging the Gap Between Informal Startup Habits & Enterprise HR",
        items: [
          {
            icon: <Users size={22} />,
            title: "Leadership Pipeline & Manager Readiness",
            desc: "Prepare new and experienced managers to lead larger teams, handle change and build accountability without losing empathy.",
          },
          {
            icon: <ActivitySquare size={22} />,
            title: "Workforce Wellbeing & Burnout Prevention",
            desc: "Identify pressure created by rapid growth, shifting priorities and sustained delivery demands before crisis hits.",
          },
          {
            icon: <TrendingUp size={22} />,
            title: "Engagement During Rapid Growth",
            desc: "Understand how employees experience communication, leadership, workload and belonging as the company expands.",
          },
          {
            icon: <RefreshCw size={22} />,
            title: "Change & Integration Support",
            desc: "Support employees through reorganisations, new systems, acquisitions, leadership changes and evolving ways of working.",
          },
          {
            icon: <Award size={22} />,
            title: "Learning & Capability Building",
            desc: "Create targeted learning pathways that help employees and managers grow into the company's next stage.",
          },
          {
            icon: <BarChart3 size={22} />,
            title: "People Analytics for Scaling Decisions",
            desc: "Give HR and leaders a clearer view of workforce pressure, participation and development needs across teams.",
          },
        ],
      }}
      howItWorks={{
        image: "https://res.cloudinary.com/dii2omqrm/image/upload/v1785316568/Sales_Team_Website_vddhzd.png",
        title: "A Structured Way to Strengthen Scaleup People Systems",
        ctaLabel: "Book a Consultation",
        ctaHref: "#request-demo",
        items: [
          {
            icon: <Layers size={20} />,
            title: "1. Map Growth Pressure",
            desc: "Identify where rapid hiring, manager capability, workload, communication or change is creating the greatest people risk.",
          },
          {
            icon: <Zap size={20} />,
            title: "2. Prioritise & Configure",
            desc: "Choose key employee groups, departments or leadership levels and set up coaching, listening and analytics.",
          },
          {
            icon: <TrendingUp size={20} />,
            title: "3. Launch & Review Signals",
            desc: "Introduce with clear communication and manager adoption, using anonymised growth trends to adjust as teams expand.",
          },
        ],
      }}
      testimonials={[
        {
          quote: "Support the shift from informal founder-led practices to more consistent leadership and people systems.",
          author: "Made for Complexity",
          role: "Scaling Transition",
          avatarColor: "#2C8C91",
        },
        {
          quote: "Bring together wellbeing, engagement, coaching and learning signals across departments and global locations.",
          author: "One View Across Teams",
          role: "Unified Workforce Data",
          avatarColor: "#4A90D9",
        },
        {
          quote: "Develop new managers while they are already leading, rather than waiting for avoidable problems to become established.",
          author: "Manager Capability at Speed",
          role: "Rapid Manager Readiness",
          avatarColor: "#7C5CDB",
        },
        {
          quote: "Use anonymised patterns and voluntary employee input to understand workforce risk without monitoring private behaviour.",
          author: "Early Warning Safety",
          role: "Zero Surveillance",
          avatarColor: "#E05FA0",
        },
        {
          quote: "Apply different programmes to different workforce groups without fragmenting the overall organizational approach.",
          author: "Flexible by Stage & Team",
          role: "Department Configuration",
          avatarColor: "#1AAF7E",
        },
        {
          quote: "Connect people insights directly to retention, leadership capability, change readiness, productivity and sustainability.",
          author: "Business-Relevant Action",
          role: "Impact & Sustainability",
          avatarColor: "#E8A020",
        },
      ]}
      faqs={{
        headline: "Frequently Asked Questions for Scaleups",
        items: [
          {
            question: "What is the difference between the startup and scaleup solution?",
            answer:
              "The scaleup solution places more emphasis on management layers, organisational change, cross-team consistency and workforce insight across a larger, more complex company.",
          },
          {
            question: "Can Humanova support rapid hiring and onboarding?",
            answer:
              "Yes. It can strengthen manager readiness, employee connection, culture communication and early feedback during periods of rapid hiring.",
          },
          {
            question: "Can different departments use different programmes?",
            answer:
              "Yes. Programmes can be configured by role, team, department or location while remaining part of one overall framework.",
          },
          {
            question: "How does Humanova help with retention?",
            answer:
              "Humanova helps identify themes linked to pressure, disengagement, poor management, unclear growth paths or weak connection so leaders can take earlier action.",
          },
          {
            question: "Can we start before our HR systems are fully mature?",
            answer:
              "Yes. A focused rollout can begin around priority needs and become more integrated as the organisation's HR infrastructure develops.",
          },
          {
            question: "Does Humanova replace our HR team?",
            answer:
              "No. It supports HR and leadership with services, tools and workforce insight. Internal ownership of people decisions remains essential.",
          },
          {
            question: "How are managers involved?",
            answer:
              "Managers can receive coaching, learning, team-level guidance and approved insights relevant to their responsibilities.",
          },
          {
            question: "Can Humanova support acquisitions or restructuring?",
            answer:
              "Yes. The programme can include change-readiness insight, manager support, confidential employee support and ongoing transition reviews.",
          },
        ],
      }}
      faqCta={{
        title: "Grow faster without leaving your people systems behind",
        desc: "Strengthen managers, protect employee wellbeing and keep culture connected through every stage of growth.",
        ctaLabel: "Book a Scaleup Consultation",
        ctaHref: "#request-demo",
      }}
    />
  );
}
