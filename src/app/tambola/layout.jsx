import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "CHRO Workforce Signals Roundtable 2026 | Humanova",
  description:
    "Play the CHRO Workforce Signals Game at the CHRO Roundtable 2026. A live, interactive workforce signals event by Humanova.",
};

export default function TambolaLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#07312C]">
      <Navbar />
      <main className="flex-1 -mt-24 pt-4">{children}</main>
      <Footer />
    </div>
  );
}
