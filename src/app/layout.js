import { Outfit, Manrope } from "next/font/google";
import "./globals.css";
import { DemoModalProvider } from "@/context/DemoModalContext";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { SocketProvider } from "@/context/SocketContext";
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
  metadataBase: new URL("https://humanova.live"),
  alternates: {
    canonical: "./",
  },
  title: "Corporate Wellness Platform | AI-Powered Employee Wellbeing",
  description:
    "Transform employee wellbeing with Humanova's Corporate Wellness Platform. Boost engagement, HR insights, and workforce performance. Book a free demo.",
  verification: {
    google: "google9aacaec254868d8e",
  },
  icons: {
    icon: 
    "https://humanova-docs-app.s3.amazonaws.com/Logo/humanovalogo_opzjmp.png",
    shortcut: "https://humanova-docs-app.s3.amazonaws.com/Logo/humanovalogo_opzjmp.png",
    apple: "https://humanova-docs-app.s3.amazonaws.com/Logo/humanovalogo_opzjmp.png",
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
          <SocketProvider>
            <LanguageProvider>
              <DemoModalProvider>
                {children}
                <RequestDemoModal />
                <TimedAppPopup />
                <ScrollToTop />
                <ChatbotWidget />
              </DemoModalProvider>
            </LanguageProvider>
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
