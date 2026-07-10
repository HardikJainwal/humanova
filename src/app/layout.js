import { Outfit, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { DemoModalProvider } from "@/context/DemoModalContext";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import RequestDemoModal from "@/components/ui/RequestDemoModal";

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
            </DemoModalProvider>
          </LanguageProvider>
        </AuthProvider>

        {/* Tawk.to live chat — lazyOnload so it doesn't block page render */}
        <Script
          id="tawk-to"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/6a47a6c3bb890f1d47e70b50/1jsju6rlj';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
