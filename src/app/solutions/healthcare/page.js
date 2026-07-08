import SolutionPageTemplate from "@/components/solutions/SolutionPageTemplate";

export const metadata = {
  title: "For Healthcare & Public Sector Humanova",
  description: "Specialist mental wellness support for high-pressure healthcare and public sector teams.",
};

export default function HealthcarePage() {
  return (
    <SolutionPageTemplate
      eyebrow="For Healthcare & Public Sector"
      headline="Protecting those who protect others"
      subheadline="Frontline workers face unique pressures. Humanova delivers specialist, evidence-based support designed for the high-stakes environment of healthcare and public service."
      ctaPrimary={{ label: "Get a Free Demo", href: "#request-demo" }}
      ctaSecondary={{ label: "See How It Works", href: "#how-it-works" }}
    />
  );
}
