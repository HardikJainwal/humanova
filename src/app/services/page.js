import ServicesPageClient from "@/components/services/ServicesPageClient";

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
  return <ServicesPageClient />;
}
