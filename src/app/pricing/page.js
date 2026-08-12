import PricingPageClient from "@/components/pricing/PricingPageClient";
import JsonLd from "@/components/seo/JsonLd";
import { PRICING_SCHEMA } from "@/constants/schemas";

export const metadata = {
  title: "Humanova Pricing | Corporate Wellbeing Platform Plans",
  description:
    "Explore Humanova pricing for our AI-powered Corporate Wellbeing Platform. Find the right solution for your organization and book a personalized demo today.",
  alternates: {
    canonical: "https://humanova.live/pricing",
  },
  openGraph: {
    title: "Humanova Pricing | Corporate Wellbeing Platform Plans",
    description:
      "Explore Humanova pricing for our AI-powered Corporate Wellbeing Platform. Find the right solution for your organization and book a personalized demo today.",
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
