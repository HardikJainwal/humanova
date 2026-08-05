import ContactPageClient from "@/components/contact/ContactPageClient";

export const metadata = {
  title: "Contact Us & Enterprise Support | Humanova",
  description: "Get in touch with Humanova workforce advisors. Request a live demo, explore enterprise pricing, or connect with our client support team.",
  openGraph: {
    title: "Contact Us & Enterprise Support | Humanova",
    description: "Get in touch with Humanova workforce advisors. Request a live demo, explore enterprise pricing, or connect with our client support team.",
    url: "https://humanova.live/contact",
    siteName: "Humanova",
    type: "website",
  },
};

export default function ContactRoute() {
  return <ContactPageClient />;
}
