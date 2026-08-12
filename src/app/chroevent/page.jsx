import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EventRecapSection from "@/components/sections/OurEvents";
import ContactSection from "@/components/sections/ContactSection";

export default function ChroEventPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />
      <main className="pt-20">
        <EventRecapSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
