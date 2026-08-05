import { Outfit, Manrope } from "next/font/google";
import "./globals.css";
import { DemoModalProvider } from "@/context/DemoModalContext";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import RequestDemoModal from "@/components/ui/RequestDemoModal";
import TimedAppPopup from "@/components/ui/TimedAppPopup";
import ScrollToTop from "@/components/ui/ScrollToTop";
import ChatbotWidget from "@/components/ui/ChatbotWidget";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata = {
  title: "Humanova Corporate Mental Wellness Platform",
  description:
    "Humanova empowers organizations with evidence-based mental wellness programs, real-time insights, and compassionate support tools for thriving workplaces.",
  verification: {
    google: "google9aacaec254868d8e",
  },
  icons: {
    icon: 
    "https://res.cloudinary.com/dii2omqrm/image/upload/v1768220212/humanovalogo_opzjmp.png",
    shortcut: "https://res.cloudinary.com/dii2omqrm/image/upload/v1768220212/humanovalogo_opzjmp.png",
    apple: "https://res.cloudinary.com/dii2omqrm/image/upload/v1768220212/humanovalogo_opzjmp.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${manrope.variable} antialiased`}
    >
      <body className="min-h-full bg-[#FAF7F2]">
        <AuthProvider>
          <LanguageProvider>
            <DemoModalProvider>
              {children}
              <RequestDemoModal />
              <TimedAppPopup />
              <ScrollToTop />
              <ChatbotWidget />
            </DemoModalProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
