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

/**
 * Home page — thin orchestrator.
 * Only imports sections; zero layout logic lives here.
 * To add a new section: import it and drop it below.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />
      <main>
        <HeroSection />
        {/* <FeaturesSection /> */}
        <CorporateMentalHealth/>
        <HowItWorksScroll/>
        <FeaturesSection/>
        <PeacefulBeginning/>
        <IntroStats/>
        <TestimonialsSection/>
        {/* <GallerySection/> */}
        <AppPromoSection/>
        <EventRecapSection/>
        <ContactSection/>
        {/* Add future sections here: <SocialProofSection />, <HowItWorksSection />, etc. */}
      </main>
      <Footer />
    </div>
  );
}
