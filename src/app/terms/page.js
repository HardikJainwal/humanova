import TermsClient from "@/components/legal/TermsClient";

export const metadata = {
  title: "Terms & Conditions | Humanova",
  description:
    "Review the Terms and Conditions governing your access to and use of Humanova services, programs, and digital platforms.",
  openGraph: {
    title: "Terms & Conditions | Humanova",
    description:
      "Review the Terms and Conditions governing your access to and use of Humanova services, programs, and digital platforms.",
    type: "website",
    url: "/terms",
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
