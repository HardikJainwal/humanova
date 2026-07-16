import PricingPageClient from "@/components/pricing/PricingPageClient";

export const metadata = {
  title: "Pricing | Humanova — Tailored Wellness Plans for Every Organisation",
  description:
    "Humanova offers flexible, custom-priced workplace wellness plans for startups, scale-ups, and enterprises. Talk to our team to build a plan that fits your organisation.",
  openGraph: {
    title: "Pricing | Humanova — Tailored Wellness Plans for Every Organisation",
    description:
      "Humanova offers flexible, custom-priced workplace wellness plans for startups, scale-ups, and enterprises. Talk to our team to build a plan that fits your organisation.",
    type: "website",
    url: "/pricing",
  },
};

export default function PricingPage() {
  return <PricingPageClient />;
}
