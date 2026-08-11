import PrivacyPolicyClient from "@/components/legal/PrivacyPolicyClient";

export const metadata = {
  title: "Privacy Policy | Humanova — Your Privacy Matters",
  description:
    "Learn how Humanova collects, uses, and protects your personal data. We are committed to privacy-first design and responsible data handling across all services.",
  alternates: {
    canonical: "https://humanova.live/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Humanova — Your Privacy Matters",
    description:
      "Learn how Humanova collects, uses, and protects your personal data. We are committed to privacy-first design and responsible data handling across all services.",
    type: "website",
    url: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
