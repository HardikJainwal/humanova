import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";

import CorporateMentalHealth from "@/components/sections/Problems";
import HowItWorksScroll from "@/components/sections/HowitWorks";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PeacefulBeginning from "@/components/sections/PeacefulBeginning";
import IntroStats from "@/components/sections/IntroStats";
import GallerySection from "@/components/sections/GallerySection";
import AppPromoSection from "@/components/sections/AppPromoSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import EventRecapSection from "@/components/sections/OurEvents";
import SdgGoalsSection from "@/components/sections/SdgGoalsSection";
import PresidentLetterSection from "@/components/sections/PresidentLetterSection";

export const metadata = {
  title: "Corporate Wellness Platform | AI-Powered Employee Wellbeing",
  description:
    "Transform employee wellbeing with Humanova's Corporate Wellness Platform. Boost engagement, HR insights, and workforce performance. Book a free demo.",
  alternates: {
    canonical: "https://humanova.live/",
  },
};

/**
 * Home page — thin orchestrator.
 * Only imports sections; zero layout logic lives here.
 * To add a new section: import it and drop it below.
 */
export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://humanova.live/#organization",
        "name": "Humanova",
        "url": "https://humanova.live/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://humanova-docs-app.s3.amazonaws.com/Logo/Vasu_-_Humanova_Logo_500_x_100_px_1_op9ppj.png"
        },
        "description": "Humanova is an AI-powered Corporate Wellbeing Platform that helps organizations improve employee mental wellbeing, leadership development, coaching, workforce performance, and organizational resilience through one integrated, human-first platform.",
        "email": "support@humanova.live",
        "telephone": "+91 84440-74642",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "New Delhi",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://www.linkedin.com/company/humanovabydevdoot/",
          "https://www.instagram.com/humanova_official/"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://humanova.live/#website",
        "url": "https://humanova.live/",
        "name": "Humanova",
        "publisher": {
          "@id": "https://humanova.live/#organization"
        },
        "inLanguage": "en",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://humanova.live/blog?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://humanova.live/#webpage",
        "url": "https://humanova.live/",
        "name": "Humanova | Corporate Wellbeing Platform",
        "description": "Humanova is a modern Corporate Wellbeing Platform that helps organizations improve employee mental wellbeing, coaching, leadership development, HR insights, and workforce performance.",
        "isPartOf": {
          "@id": "https://humanova.live/#website"
        },
        "about": {
          "@id": "https://humanova.live/#organization"
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://humanova.live/hero-wellness.png"
        },
        "breadcrumb": {
          "@id": "https://humanova.live/#breadcrumb"
        },
        "inLanguage": "en"
      },
      {
        "@type": "WebApplication",
        "@id": "https://humanova.live/#webapplication",
        "name": "Humanova",
        "url": "https://humanova.live/",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "Corporate Wellbeing Platform",
        "operatingSystem": "Web Browser",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "description": "Humanova is an AI-powered Corporate Wellbeing Platform that combines mental wellbeing, leadership coaching, employee engagement, HR analytics, workforce insights, and human-led support to improve organizational performance.",
        "provider": {
          "@id": "https://humanova.live/#organization"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "https://humanova.live/"
        },
        "featureList": [
          "Workplace Wellbeing Tracking",
          "Employee Engagement Analytics",
          "Employee Coaching & 1:1 Support",
          "HR Analytics & Workforce Insights",
          "Leave, Attendance & Shift Intelligence",
          "AI-Based Recommendations",
          "Learning & Capability Support",
          "Leadership Coaching",
          "Employee Mental Wellbeing",
          "Enterprise HR Dashboard"
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://humanova.live/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a corporate wellness platform?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A corporate wellness platform is a digital solution that helps organizations improve employee wellbeing through mental health support, wellbeing assessments, anonymous check-ins, engagement tools, and actionable HR insights. It enables businesses to create healthier, more productive workplaces."
            }
          },
          {
            "@type": "Question",
            "name": "How does Humanova improve employee wellbeing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Humanova helps organizations measure employee wellbeing through mood tracking, anonymous surveys, AI-powered analytics, wellbeing resources, and confidential support. HR teams receive actionable insights to address stress, burnout, and engagement challenges early."
            }
          },
          {
            "@type": "Question",
            "name": "Why should companies invest in a corporate wellness platform?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A corporate wellness platform helps reduce burnout, improve employee engagement, increase productivity, strengthen workplace culture, and support employee retention. It also gives HR teams reliable data to make informed wellbeing decisions."
            }
          },
          {
            "@type": "Question",
            "name": "Is employee wellbeing data anonymous?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Humanova protects employee privacy by collecting anonymous wellbeing data. Managers and HR teams receive aggregated insights without access to individual employee responses."
            }
          },
          {
            "@type": "Question",
            "name": "Who can use Humanova?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Humanova is designed for startups, SMEs, large enterprises, remote teams, hybrid workplaces, healthcare organizations, IT companies, financial services, manufacturing businesses, and other organizations looking to improve employee wellbeing."
            }
          },
          {
            "@type": "Question",
            "name": "How does Humanova identify burnout risks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Humanova continuously analyzes wellbeing trends, mood check-ins, and employee feedback to identify early signs of stress and burnout. This helps HR teams provide support before issues affect productivity or employee retention."
            }
          },
          {
            "@type": "Question",
            "name": "How quickly can Humanova be implemented?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most organizations can begin using Humanova within a short implementation period. The onboarding process is simple, allowing HR teams and employees to start using the platform with minimal disruption."
            }
          },
          {
            "@type": "Question",
            "name": "Can Humanova support remote and hybrid teams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Humanova is built for both remote and hybrid workforces. Employees can complete confidential wellbeing check-ins from anywhere, while HR teams receive organization-wide insights through a centralized dashboard."
            }
          },
          {
            "@type": "Question",
            "name": "How can I get started with Humanova?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Getting started is simple. Book a free demo with our team to see how Humanova's Corporate Wellness Platform can help your organization improve employee wellbeing, reduce burnout, and build a healthier workplace."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://humanova.live/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://humanova.live/"
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <HeroSection />
        {/* <FeaturesSection /> */}
        <CorporateMentalHealth/>
        <HowItWorksScroll/>
        <FeaturesSection/>
        <PeacefulBeginning/>
        <IntroStats/>
        <PresidentLetterSection/>
        <TestimonialsSection/>
        {/* <GallerySection/> */}
        <AppPromoSection/>
        <EventRecapSection/>
        <SdgGoalsSection/>
        <ContactSection/>
        {/* Add future sections here: <SocialProofSection />, <HowItWorksSection />, etc. */}
      </main>
      <Footer />
    </div>
  );
}
