import SolutionPageTemplate from "@/components/solutions/SolutionPageTemplate";

export const metadata = {
  title: "For Startups  Humanova",
  description: "Lightweight, impactful mental wellness tools from day one.",
};

export default function StartupsPage() {
  return (
    <SolutionPageTemplate
      eyebrow="For Startups"
      headline="Wellbeing from day one, without the overhead"
      subheadline="You move fast and so do we. Get your team the mental health foundation they need — flexible plans, zero complexity, maximum impact from your very first hire."
      ctaPrimary={{ label: "Get a Free Demo", href: "#request-demo" }}
      ctaSecondary={{ label: "See How It Works", href: "#how-it-works" }}
    />
  );
}
