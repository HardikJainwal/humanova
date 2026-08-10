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
  Rocket,
} from "lucide-react";

export const metadata = {
  title: "Employee Wellbeing for Startups | Humanova",
  description:
    "Humanova helps startups support employee wellbeing, founder resilience, first-time managers and healthy culture without adding heavy HR processes.",
};

export default function StartupsPage() {
  return (
    <SolutionPageTemplate
      eyebrow="People support built for early-stage companies"
      headline="Build a healthy startup culture before pressure becomes the culture"
      subheadline="Humanova helps founders and small teams create healthier ways of working from the start. Give employees practical wellbeing support, build stronger manager habits and understand what the team needs without adding a heavy HR process."
      ctaPrimary={{ label: "Book a Startup Consultation", href: "#request-demo" }}
      ctaSecondary={{ label: "See How Humanova Works", href: "#how-it-works" }}
      bannerImg="https://humanova-docs-app.s3.ap-south-1.amazonaws.com/uploads/Sales_Team_Website.png_1_touvsf.png"
      stats={[
        { value: "100%", label: "Founder & Team Privacy" },
        { value: "0", label: "Heavy HR Overhead Needed" },
        { value: "24/7", label: "Access to Coaching & Care" },
        { value: "Fast", label: "Setup in Under 48 Hours" },
      ]}
      services={{
        headline: "Practical Support For Founders & Growing Teams",
        subline: "Strong People Foundations Without Enterprise-Level Complexity",
        items: [
          {
            icon: <Heart size={22} />,
            title: "Founder & Team Wellbeing",
            desc: "Simple, confidential support for stress, uncertainty, workload pressure and the emotional demands of building a company.",
          },
          {
            icon: <ActivitySquare size={22} />,
            title: "Culture & Engagement Listening",
            desc: "Lightweight ways to understand how the team is feeling and where friction may be emerging.",
          },
          {
            icon: <Users size={22} />,
            title: "First-Time Manager Support",
            desc: "Help new managers learn how to communicate, give feedback and support performance without damaging trust.",
          },
          {
            icon: <TrendingUp size={22} />,
            title: "Sustainable Performance Habits",
            desc: "Create healthier rhythms around priorities, workload, communication and recovery.",
          },
          {
            icon: <Compass size={22} />,
            title: "Remote & Hybrid Connection",
            desc: "Give distributed teams regular touchpoints that support belonging, communication and shared culture.",
          },
          {
            icon: <BarChart3 size={22} />,
            title: "People Insight For Founders",
            desc: "Turn team feedback into clear, manageable actions without exposing individual conversations.",
          },
        ],
      }}
      howItWorks={{
        image: "https://humanova-docs-app.s3.ap-south-1.amazonaws.com/uploads/Sales_Team_Website.png_1_touvsf.png",
        title: "The Startup Approach is Light, Focused & Simple",
        ctaLabel: "Book a Consultation",
        ctaHref: "#request-demo",
        items: [
          {
            icon: <Rocket size={20} />,
            title: "1. Choose the Priority",
            desc: "Start with the challenge that matters now, such as founder stress, manager readiness, team connection or workload pressure.",
          },
          {
            icon: <Sparkles size={20} />,
            title: "2. Set Up & Introduce",
            desc: "Humanova configures the right tools and resources for your team. Employees learn what is available and how confidentiality works.",
          },
          {
            icon: <TrendingUp size={20} />,
            title: "3. Build & Review Habits",
            desc: "Short check-ins, coaching and team activities become part of daily operations, with anonymised founder reviews to guide growth.",
          },
        ],
      }}
      testimonials={[
        {
          quote: "Use focused support and clear actions rather than a large, complicated enterprise HR programme.",
          author: "Built for Small Teams",
          role: "Focused & Agile Structure",
          avatarColor: "#2C8C91",
        },
        {
          quote: "Wellbeing and leadership support is available for the founders carrying the pressure of building the business.",
          author: "Support Founders Too",
          role: "Founder Resilience",
          avatarColor: "#4A90D9",
        },
        {
          quote: "Anonymous listening makes it easier for employees to share concerns before silence turns into disengagement.",
          author: "Protect Honest Feedback",
          role: "Confidential Safety",
          avatarColor: "#7C5CDB",
        },
        {
          quote: "Help high-performing individual contributors become capable people managers before avoidable habits take hold.",
          author: "Develop Managers Early",
          role: "Leadership Habits",
          avatarColor: "#E05FA0",
        },
        {
          quote: "Start with a small set of services and add more as your team, locations and management structure expand.",
          author: "Flexible as You Grow",
          role: "Scalable Growth",
          avatarColor: "#1AAF7E",
        },
        {
          quote: "Receive a manageable set of next steps suited to the realities of a startup, not a generic corporate playbook.",
          author: "Practical Recommendations",
          role: "Action-Oriented Next Steps",
          avatarColor: "#E8A020",
        },
      ]}
      faqs={{
        headline: "Clear Answers for Startup Founders & Leaders",
        items: [
          {
            question: "Is Humanova suitable for a very small team?",
            answer:
              "Yes. The scope can be kept focused for a small team and expanded as the company grows.",
          },
          {
            question: "Will this create more work for the founder?",
            answer:
              "The aim is the opposite. Humanova provides structure, support and clear next steps so founders do not have to design every people process themselves.",
          },
          {
            question: "Can employees use Humanova confidentially?",
            answer:
              "Yes. Individual support should remain confidential, while founders or authorised people leaders receive only agreed anonymised themes and trends.",
          },
          {
            question: "Can Humanova support remote teams?",
            answer:
              "Yes. Digital access, coaching, group sessions, learning and engagement tools can support distributed and hybrid teams.",
          },
          {
            question: "Do we need a full HR team to use Humanova?",
            answer:
              "No. Humanova can support founder-led people operations, a single people lead or an emerging HR team.",
          },
          {
            question: "Can we use only selected services?",
            answer:
              "Yes. Start with the services connected to your immediate priority and add others later.",
          },
          {
            question: "How do you measure results in a small company?",
            answer:
              "Use a limited set of practical indicators, such as participation, team sentiment, manager actions and recurring pressure points.",
          },
          {
            question: "Can Humanova help during rapid hiring?",
            answer:
              "Yes. It can support manager readiness, onboarding experience, team connection and early culture signals during a hiring phase.",
          },
        ],
      }}
      faqCta={{
        title: "Build the company without burning out the people building it",
        desc: "Give your team practical support and create healthier people habits from the beginning.",
        ctaLabel: "Book a Startup Consultation",
        ctaHref: "#request-demo",
      }}
    />
  );
}
