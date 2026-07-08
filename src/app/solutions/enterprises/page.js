import SolutionPageTemplate from "@/components/solutions/SolutionPageTemplate";

export const metadata = {
  title: "For Enterprises Humanova",
  description: "Scalable mental wellness programmes built for large organisations.",
};

export default function EnterprisesPage() {
  return (
    <SolutionPageTemplate
      eyebrow="For Enterprises"
      headline="Wellness at scale, built for large organisations"
      subheadline="Give every employee — across every office and time zone — access to evidence-based mental health support. Measurable outcomes, enterprise-grade security."
      ctaPrimary={{ label: "Get a Free Demo", href: "#request-demo" }}
      ctaSecondary={{ label: "See How It Works", href: "#how-it-works" }}
    />
  );
}
