import ServicesPageClient from "@/components/services/ServicesPageClient";
import JsonLd from "@/components/seo/JsonLd";
import { SERVICES_PAGE_SCHEMA } from "@/constants/schemas";

export const metadata = {
  title: "Humanova Services | Workplace Wellbeing, HR Analytics and Employee Support",
  description:
    "Explore Humanova services for workplace wellbeing, employee engagement, coaching, HR analytics, leave and attendance intelligence, AI recommendations, and workforce productivity insights.",
  openGraph: {
    title: "Humanova Services | Workplace Wellbeing, HR Analytics and Employee Support",
    description:
      "Explore Humanova services for workplace wellbeing, employee engagement, coaching, HR analytics, leave and attendance intelligence, AI recommendations, and workforce productivity insights.",
    type: "website",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={SERVICES_PAGE_SCHEMA} />
      <ServicesPageClient />
    </>
  );
}
