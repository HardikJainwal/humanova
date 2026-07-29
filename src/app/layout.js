import { Outfit, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { DemoModalProvider } from "@/context/DemoModalContext";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import RequestDemoModal from "@/components/ui/RequestDemoModal";
import TimedAppPopup from "@/components/ui/TimedAppPopup";
import ScrollToTop from "@/components/ui/ScrollToTop";

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
            </DemoModalProvider>
          </LanguageProvider>
        </AuthProvider>

        {/* Tawk.to live chat */}
        <Script
          id="tawk-to"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API = Tawk_API || {};
              Tawk_API.disablePopup = true;
              Tawk_API.disableMobileAttentionGrabber = true;
              Tawk_API.onLoad = function() {
                if (typeof Tawk_API.minimize === 'function') {
                  Tawk_API.minimize();
                }
              };
              var Tawk_LoadStart = new Date();
              (function(){
                var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
                s1.async = true;
                s1.src = 'https://embed.tawk.to/6a47a6c3bb890f1d47e70b50/1jsju6rlj';
                s1.charset = 'UTF-8';
                s1.setAttribute('crossorigin', '*');
                s0.parentNode.insertBefore(s1, s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
