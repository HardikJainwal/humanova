"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const photos = [
  {
    id: 1,
    src: "https://humanova-docs-app.s3.amazonaws.com/Humanova-web-img/WhatsApp_Image_2026-06-19_at_10.00.35_zinobj.jpg",
    caption: "Team check-in session",
    description: "Starting the day with connection and intention",
  },
  {
    id: 2,
    src: "https://humanova-docs-app.s3.amazonaws.com/Humanova-web-img/WhatsApp_Image_2026-06-25_at_16.50.50_1_llsi1e.jpg",
    caption: "Wellness workshop",
    description: "Interactive sessions focused on mental resilience",
  },
  {
    id: 3,
    src: "https://humanova-docs-app.s3.amazonaws.com/Humanova-web-img/WhatsApp_Image_2026-06-19_at_10.00.41_1_uxlsj6.jpg",
    caption: "1:1 counseling",
    description: "Personalized support in a safe space",
  },
  {
    id: 4,
    src: "https://humanova-docs-app.s3.amazonaws.com/Humanova-web-img/WhatsApp_Image_2026-06-19_at_10.00.34_krkndr.jpg",
    caption: "Mindfulness break",
    description: "Breathing and grounding exercises",
  },
  {
    id: 5,
    src: "https://humanova-docs-app.s3.amazonaws.com/Humanova-web-img/WhatsApp_Image_2026-06-19_at_10.00.37_1_mb9ehc.jpg",
    caption: "Onsite wellness day",
    description: "Full day of activities and rejuvenation",
  },
  {
    id: 6,
    src: "https://humanova-docs-app.s3.ap-south-1.amazonaws.com/uploads/WhatsApp_Image_2026-06-19_at_10.00.39_jyu73y.jpg",
    caption: "Leadership training",
    description: "Building emotionally intelligent leaders",
  },
//   {
//     id: 7,
//     src: "https://humanova-docs-app.s3.amazonaws.com/Humanova-web-img/WhatsApp_Image_2026-06-16_at_20.18.27_ncbhya.jpg",
//     caption: "Team celebration",
//     description: "Recognizing milestones and fostering joy",
//   },
];

export default function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (photo, index) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  const closeLightbox = () => setSelectedPhoto(null);

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + photos.length) % photos.length;
    setSelectedPhoto(photos[newIndex]);
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % photos.length;
    setSelectedPhoto(photos[newIndex]);
    setCurrentIndex(newIndex);
  };

  return (
    <section className="w-full py-10 md:py-18 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#2C8C91]/10 text-[#2C8C91] text-sm font-semibold uppercase tracking-[3px] px-6 py-2.5 rounded-full mb-4">
            Inside Humanova
          </div>
          <h2 className="text-[#1F2937] text-5xl md:text-6xl font-semibold tracking-tight">
            Moments That Matter
          </h2>
          <p className="text-[#5F6B73] text-xl mt-4 max-w-lg mx-auto">
            Real experiences. Real connection. Real impact.
          </p>
        </div>

        {/* Perfectly Aligned Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              onClick={() => openLightbox(photo, index)}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
              whileHover={{ y: -8 }}
            >
              <div className="relative aspect-[16/13] overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />
                
                {/* Number Badge */}
                <div className="absolute top-5 left-5 w-9 h-9 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center text-sm font-semibold text-[#1F2937] shadow">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="p-8">
                <h3 className="text-[#1F2937] font-semibold text-2xl leading-tight mb-3">
                  {photo.caption}
                </h3>
                <p className="text-[#5F6B73] text-[15.5px] leading-relaxed">
                  {photo.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-3xl overflow-hidden bg-black aspect-video">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>

              <div className="mt-8 flex justify-between items-end text-white">
                <div>
                  <p className="text-[#2C8C91] text-sm font-medium mb-2">
                    {String(currentIndex + 1).padStart(2, "0")} / {photos.length}
                  </p>
                  <h3 className="text-4xl font-semibold">{selectedPhoto.caption}</h3>
                  <p className="text-lg text-white/80 mt-3 max-w-md">
                    {selectedPhoto.description}
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={goToPrevious}
                    className="w-14 h-14 rounded-2xl border border-white/30 hover:bg-white/10 flex items-center justify-center text-2xl transition"
                  >
                    ←
                  </button>
                  <button
                    onClick={goToNext}
                    className="w-14 h-14 rounded-2xl border border-white/30 hover:bg-white/10 flex items-center justify-center text-2xl transition"
                  >
                    →
                  </button>
                </div>
              </div>
            </motion.div>

            <button
              onClick={closeLightbox}
              className="absolute top-8 right-8 text-white text-4xl hover:scale-110 transition"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}