import SolutionPageTemplate from "@/components/solutions/SolutionPageTemplate";

export const metadata = {
  title: "For Scale-Ups — Humanova",
  description: "Grow your team's mental health resilience as your company scales.",
};

export default function ScaleUpsPage() {
  return (
    <SolutionPageTemplate
      eyebrow="For Scale-Ups"
      headline="Build resilience before the growing pains hit"
      subheadline="As headcount grows fast, culture and wellbeing can slip. Humanova keeps your team's mental health ahead of the curve — structured, measurable, and effortless to roll out."
      ctaPrimary={{ label: "Get a Free Demo", href: "#request-demo" }}
      ctaSecondary={{ label: "See How It Works", href: "#how-it-works" }}
    />
  );
}
