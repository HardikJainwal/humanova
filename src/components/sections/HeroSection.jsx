"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import DemoButton from "@/components/ui/DemoButton";
import Icon from "@/components/ui/Icon";

const BANNER_IMG =
  "https://humanova-docs-app.s3.amazonaws.com/Banners/Untitled_1920_x_1080_px_lo6wzv.png";

export default function HeroSection() {
  return (
    <section id="hero" className="w-full" aria-labelledby="hero-heading">
      {/* Full width banner */}
      <div className="relative left-1/2 -translate-x-1/2 -mt-24">
        <div className="relative min-h-[660px] sm:min-h-[620px] lg:h-[700px] flex items-center overflow-hidden">
          {/* Extend image upwards */}
          <div className="absolute inset-x-0 -top-24 -bottom-4">
            <Image
              src={BANNER_IMG}
              alt="HR leader and team member having a calm, supportive one-on-one conversation"
              fill
              priority
              className="object-cover object-[70%_center] sm:object-center"
              sizes="100vw"
            />
            {/* Contrast overlay for high legibility on mobile & desktop */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2]/95 via-[#FAF7F2]/85 to-transparent sm:from-[#FAF7F2]/80 sm:via-[#FAF7F2]/40 sm:to-transparent z-1 pointer-events-none" />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pt-32 sm:pt-28 lg:pt-0 pb-12 sm:pb-0">
            <div className="max-w-[520px] flex flex-col gap-6 sm:gap-8 animate-fade-up">
              <h1
                id="hero-heading"
                className="text-[#0F172A] text-3xl sm:text-5xl lg:text-[3.375rem] font-semibold leading-[1.2] sm:leading-[1.12] tracking-[-0.03em]"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Your team&apos;s wellbeing{" "}
                <span className="text-[#2C8C91]">is your</span>{" "}
                <br className="hidden sm:block" />
                greatest asset.
              </h1>

              <p className="text-[#374151] text-base sm:text-lg leading-[1.7] max-w-[460px] font-normal">
                Humanova gives HR leaders and founders a structured,
                evidence-based platform to measure, support, and improve
                mental health across every team — before burnout becomes a
                business problem.
              </p>

              <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto pt-1">
                <DemoButton
                  id="hero-cta-primary"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto justify-center"
                >
                  Get a Free Demo
                  <Icon
                    name="arrowRight"
                    size={16}
                    color="currentColor"
                    strokeWidth={2}
                  />
                </DemoButton>

                <Button
                  id="hero-cta-secondary"
                  href="/services"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto justify-center bg-white/80 backdrop-blur-sm"
                >
                  See How It Works
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logos */}
      <div className="max-w-[1200px] mx-auto px-6">
        <TrustedLogos />
      </div>
    </section>
  );
}

/* ── Sub-components ──────────────────────────────────────── */

function TrustedLogos() {
  const logos = [
    { name: "Logo 1", img: "https://humanova-docs-app.s3.ap-south-1.amazonaws.com/uploads/d28e9d19-0c30-4c51-b11b-6a2f5e8efad5.png" },
    { name: "Logo 2", img: "https://humanova-docs-app.s3.amazonaws.com/Humanova-web-img/images_xfnrk6.jpg" },
    { name: "Logo 3", img: "https://humanova-docs-app.s3.amazonaws.com/Humanova-web-img/LOGO_ZeSTNnjyN_dcsxml.webp" },
    { name: "Logo 4", img: "https://humanova-docs-app.s3.amazonaws.com/Humanova-web-img/Vivo-Logo_trsegp.png" },
    { name: "Logo 5", img: "https://humanova-docs-app.s3.amazonaws.com/Humanova-web-img/equipments_dekho_logo_u4qgh3.jpg" },
    { name: "Logo 6", img: "https://humanova-docs-app.s3.amazonaws.com/Humanova-web-img/microsoft-logo-microsoft-icon-transparent-free-png_wcsgay.webp" },
    { name: "Logo 7", img: "https://humanova-docs-app.s3.amazonaws.com/Humanova-web-img/Logo_100x_2x_becfsk.avif" },
  ];

  const marquee = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="pt-12">
      <p className="text-center text-[#5F6B73] text-sm mb-8">
        Built for{" "}
        <span className="font-semibold text-[#1F2937]">
          forward-thinking
        </span>{" "}
        teams and organizations
      </p>
      <div className="relative overflow-hidden">
        <div className="flex items-center gap-14 md:gap-20 trusted-track">
          {marquee.map((logo, index) => (
            <div key={index} className="shrink-0 trusted-item">
              <Image
                src={logo.img}
                alt={logo.name}
                width={180}
                height={120}
                unoptimized
                className="h-10 md:h-14 lg:h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#FAF7F2] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#FAF7F2] to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
}