"use client";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="w-full max-w-[1200px] mx-auto px-6 pt-16 pb-8 md:pt-20 md:pb-12"
      aria-labelledby="hero-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="flex flex-col gap-8 animate-fade-up">
          <h1
            id="hero-heading"
            className="text-[#1F2937] text-4xl sm:text-5xl lg:text-[3.375rem] font-semibold leading-[1.12] tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Your team&apos;s wellbeing{" "}
            <span className="text-[#2C8C91]">is your</span>
            <br className="hidden sm:block" /> greatest asset.
          </h1>

          <p className="text-[#5F6B73] text-lg leading-[1.7] max-w-[480px]">
            Humanova gives HR leaders and founders a structured, evidence-based
            platform to measure, support, and improve mental health across every
            team — before burnout becomes a business problem.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button id="hero-cta-primary" href="#request-demo" variant="primary" size="lg">
              Get a Free Demo
              <Icon name="arrowRight" size={16} color="currentColor" strokeWidth={2} />
            </Button>
            <Button id="hero-cta-secondary" href="#how-it-works" variant="outline" size="lg">
              See How It Works
            </Button>
          </div>
        </div>

        <HeroImage />
      </div>

      <TrustedLogos />
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
    // { name: "Logo 8", img: "https://res.cloudinary.com/dii2omqrm/image/upload/v1782983410/images_zcqdzf.png"}
  ];

  // Duplicate several times so the loop never shows empty space
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
  gap: 5rem; /* was 2rem or 4rem */
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
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-25%);
    }
  }
`}</style>
    </div>
  );
}

function HeroImage() {
  return (
    <div className="relative animate-fade-up-delay-1">
      <div
        className="relative overflow-hidden w-full"
        style={{
          borderRadius: "32px 32px 56% 56% / 32px 32px 48px 48px",
          aspectRatio: "1 / 1.08",
          maxHeight: "580px",
        }}
      >
        <Image
          src="/hero-wellness.png"
          alt="Two corporate professionals having a calm, supportive conversation in a modern wellness-focused office"
          fill
          style={{ objectFit: "cover", objectPosition: "center top" }}
          sizes="(max-width: 768px) 100vw, 50vw"
          preload
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 60%, rgba(250,247,242,0.18) 100%)",
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}