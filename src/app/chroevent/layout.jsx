import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "CHRO Workforce Signals Roundtable 2026 | Humanova",
  description:
    "Join the CHRO Workforce Signals Roundtable 2026. A live, interactive workforce signals event by Humanova.",
};

export default function ChroEventLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F2]">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
