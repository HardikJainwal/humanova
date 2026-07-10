"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import DemoButton from "@/components/ui/DemoButton";
import Icon from "@/components/ui/Icon";

const BANNER_IMG =
  "https://res.cloudinary.com/dii2omqrm/image/upload/v1783418592/Untitled_1920_x_1080_px_lo6wzv.png";

export default function HeroSection() {
  return (
    <section id="hero" className="w-full" aria-labelledby="hero-heading">
      {/* Full width banner */}
      <div className="relative left-1/2 -translate-x-1/2 -mt-24">
        <div className="relative h-[560px] sm:h-[620px] lg:h-[700px] overflow-hidden">
          {/* Extend image upwards */}
          <div className="absolute inset-x-0 -top-24 -bottom-4">
            <Image
              src={BANNER_IMG}
              alt="HR leader and team member having a calm, supportive one-on-one conversation"
              fill
              priority
              className="object-cover object-center "
              sizes="100vw"
            />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full max-w-[1200px] mx-auto px-6">
              <div className="max-w-[520px] flex flex-col gap-8 animate-fade-up">
                <h1
                  id="hero-heading"
                  className="text-[#1F2937] text-4xl sm:text-5xl lg:text-[3.375rem] font-semibold leading-[1.12] tracking-[-0.03em]"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Your team&apos;s wellbeing{" "}
                  <span className="text-[#2C8C91]">is your</span>
                  <br className="hidden sm:block" />
                  greatest asset.
                </h1>

                <p className="text-[#5F6B73] text-lg leading-[1.7] max-w-[460px]">
                  Humanova gives HR leaders and founders a structured,
                  evidence-based platform to measure, support, and improve
                  mental health across every team — before burnout becomes a
                  business problem.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <DemoButton
                    id="hero-cta-primary"
                    variant="primary"
                    size="lg"
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
                    href="#how-it-works"
                    variant="outline"
                    size="lg"
                  >
                    See How It Works
                  </Button>
                </div>
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
    { name: "Logo 1", img: "https://res.cloudinary.com/dii2omqrm/image/upload/v1779792237/uploads/d28e9d19-0c30-4c51-b11b-6a2f5e8efad5.png" },
    { name: "Logo 2", img: "https://res.cloudinary.com/dii2omqrm/image/upload/v1782382520/images_xfnrk6.jpg" },
    { name: "Logo 3", img: "https://res.cloudinary.com/dii2omqrm/image/upload/v1782383045/LOGO_ZeSTNnjyN_dcsxml.webp" },
    { name: "Logo 4", img: "https://res.cloudinary.com/dii2omqrm/image/upload/v1782382636/Vivo-Logo_trsegp.png" },
    { name: "Logo 5", img: "https://res.cloudinary.com/dii2omqrm/image/upload/v1782382710/equipments_dekho_logo_u4qgh3.jpg" },
    { name: "Logo 6", img: "https://res.cloudinary.com/dii2omqrm/image/upload/v1782382990/microsoft-logo-microsoft-icon-transparent-free-png_wcsgay.webp" },
    { name: "Logo 7", img: "https://res.cloudinary.com/dii2omqrm/image/upload/v1782385379/Logo_100x_2x_becfsk.avif" },
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
        <div className="trusted-track">
          {marquee.map((logo, index) => (
            <div key={index} className="trusted-item">
              <Image
                src={logo.img}
                alt={logo.name}
                width={180}
                height={120}
                unoptimized
                className="h-12 md:h-14 lg:h-16 w-auto object-contain transition-all duration-300"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#FAF7F2] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#FAF7F2] to-transparent pointer-events-none" />
      </div>

      <style jsx>{`
        .trusted-track {
          display: flex;
          width: max-content;
          gap: 5rem;
          align-items: center;
          animation: marquee 35s linear infinite;
        }
        .trusted-track:hover {
          animation-play-state: paused;
        }
        .trusted-item {
          flex: 0 0 auto;
          perspective: 1000px;
        }
        .logo-card {
          width: 180px;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(229, 222, 214, 0.8);
          border-radius: 20px;
          box-shadow:
            0 8px 24px rgba(0,0,0,0.05),
            inset 0 1px 0 rgba(255,255,255,0.8);
          transition:
            transform .45s cubic-bezier(.22,1,.36,1),
            box-shadow .45s,
            border-color .45s;
        }
        .logo-card img {
          transition: transform .45s ease;
        }
        .trusted-item:hover .logo-card {
          transform:
            translateY(-8px)
            rotateX(8deg)
            rotateY(-8deg)
            scale(1.06);
          border-color: rgba(44,140,145,.25);
          box-shadow:
            0 20px 40px rgba(44,140,145,.18),
            0 10px 24px rgba(0,0,0,.08);
        }
        .trusted-item:hover img {
          transform: scale(1.08);
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-25%); }
        }
      `}</style>
    </div>
  );
}