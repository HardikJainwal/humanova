import PricingPageClient from "@/components/pricing/PricingPageClient";
import JsonLd from "@/components/seo/JsonLd";
import { PRICING_SCHEMA } from "@/constants/schemas";

export const metadata = {
  title: "Pricing | Humanova — Tailored Wellness Plans for Every Organisation",
  description:
    "Humanova offers flexible, custom-priced workplace wellness plans for startups, scale-ups, and enterprises. Talk to our team to build a plan that fits your organisation.",
  alternates: {
    canonical: "https://humanova.live/pricing",
  },
  openGraph: {
    title: "Pricing | Humanova — Tailored Wellness Plans for Every Organisation",
    description:
      "Humanova offers flexible, custom-priced workplace wellness plans for startups, scale-ups, and enterprises. Talk to our team to build a plan that fits your organisation.",
    type: "website",
    url: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={PRICING_SCHEMA} />
      <PricingPageClient />
    </>
  );
}
