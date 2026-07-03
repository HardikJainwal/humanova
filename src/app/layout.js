import { Outfit, Manrope } from "next/font/google";
import "./globals.css";

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
      <body className="min-h-full bg-[#FAF7F2]">{children}</body>
    </html>
  );
}
