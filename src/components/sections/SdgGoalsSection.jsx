"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const sdgGoals = [
  {
    id: 1,
    title: "Good Health & Well-Being",
    img: "https://res.cloudinary.com/dii2omqrm/image/upload/v1785317831/2_vh6ntg.webp",
  },
  {
    id: 2,
    title: "Quality Education & Growth",
    img: "https://res.cloudinary.com/dii2omqrm/image/upload/v1785317824/3_fuma5v.webp",
  },
  {
    id: 3,
    title: "Gender Equality & Inclusion",
    img: "https://res.cloudinary.com/dii2omqrm/image/upload/v1785317828/1_btlva3.webp",
  },
  {
    id: 4,
    title: "Decent Work & Economic Growth",
    img: "https://res.cloudinary.com/dii2omqrm/image/upload/v1785317893/4_1_rqhogx.webp",
  },
  {
    id: 5,
    title: "Reduced Inequalities & Care",
    img: "https://res.cloudinary.com/dii2omqrm/image/upload/v1785317848/5_jfpxnu.webp",
  },
];

export default function SdgGoalsSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-[#FAF7F2] border-t border-[#E5DED6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#2C8C91]/30 bg-[#EEF8F5] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#2C8C91] mb-4">
            UN Sustainable Development Goals
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F2937] leading-tight"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Committed to Global Impact &{" "}
            <span className="text-[#2C8C91]">Workplace Wellbeing</span>
          </h2>
          <p className="mt-4 text-[#5F6B73] text-base md:text-lg leading-relaxed">
            Humanova directly supports United Nations Sustainable Development Goals by creating healthier, inclusive, and resilient corporate workforces.
          </p>
        </div>

        {/* SDG Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {sdgGoals.map((sdg, index) => (
            <motion.div
              key={sdg.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-[24px] bg-white border border-[#E5DED6] shadow-sm hover:shadow-2xl hover:border-[#2C8C91]/40 hover:-translate-y-2 transition-all duration-300 flex flex-col"
            >
              {/* Image container */}
              <div className="relative w-full aspect-square overflow-hidden bg-[#FAF7F2]">
                <Image
                  src={sdg.img}
                  alt={sdg.title}
                  fill
                  unoptimized
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
