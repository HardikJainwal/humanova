"use client";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const testimonials = [
  {
    name: "Karan",
    time: "1 week ago",
    initial: "K",
    color: "#2C8C91",
    text: "My onboarding experience was so smooth, and the team received me very warmly. Using the platform is also very easy. I never experienced such thoughtful design. Very good support.",
  },
  {
    name: "Catherine",
    time: "10 days ago",
    initial: "C",
    color: "#E76F51",
    text: "I love the check-ins and the support team is excellent. They respond in a timely manner with loads of helpful information about mental wellness resources.",
  },
  {
    name: "Peter",
    time: "2 weeks ago",
    initial: "P",
    color: "#0a3d62",
    text: "Rolled this out to our whole team. Managers finally have visibility without breaching anyone's privacy. HR reports are clear and genuinely actionable.",
  },
  {
    name: "Ananya",
    time: "3 weeks ago",
    initial: "A",
    color: "#2C8C91",
    text: "The confidential chat feature was a game changer for me personally. Fast, private, and the counselors genuinely care. Highly recommend to any HR team.",
  },
];

const StarIcon = ({ size = 16, color = "#2C8C91" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17l-6.1 3.5 1.5-6.8L2.2 9l6.9-.7z" />
  </svg>
);

const QuoteIcon = ({ size = 40, color = "#D8D2C4" }) => (
  <svg width={size} height={size} viewBox="0 0 40 32" fill={color}>
    <path d="M0 32V19.2C0 8.4 6.4 1.6 16.8 0l2.4 4.4C12 6.4 8.8 10.4 8.4 16.4H16.8V32H0ZM21.6 32V19.2C21.6 8.4 28 1.6 38.4 0l2.4 4.4c-7.2 2-10.4 6-10.8 12H38.4V32H21.6Z" />
  </svg>
);

const ArrowLeftIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRightIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function TestimonialsSection() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goPrev = () => swiperRef.current?.slidePrev();
  const goNext = () => swiperRef.current?.slideNext();

  return (
    <section
      className="w-full py-10 md:py-18"
      style={{ backgroundColor: "#FAF7F2" }}
    >
      <div className="max-w-[1400px] mx-auto px-6">
        {/* header */}
        <div className="mb-14">
          <h2
            className="text-[#1F2937] text-4xl md:text-6xl font-bold leading-[1.15]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Read stories,
            <br />
            grow with confidence.
          </h2>
        </div>

        {/* body: flex, not grid — left col fixed, right col fills remaining, clipped */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* left column — fixed width, own stacking context */}
          <div className="w-full lg:w-[260px] shrink-0 flex flex-col justify-between gap-10 relative z-10">
            <div className="flex flex-col gap-6">
              <QuoteIcon />
              <h3 className="text-[#1F2937] text-2xl md:text-3xl font-semibold leading-tight">
                What our
                <br />
                customers are
                <br />
                saying
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={goPrev}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border border-[#1F2937] flex items-center justify-center shrink-0 hover:bg-[#2C8C91] hover:border-[#2C8C91] hover:text-white transition-colors duration-300 text-[#1F2937]"
              >
                <ArrowLeftIcon />
              </button>

              <div className="w-[100px] h-[2px] bg-[#E5E1D8] rounded-full overflow-hidden shrink-0">
                <div
                  className="h-full bg-[#2C8C91] transition-all duration-500 ease-out"
                  style={{
                    width: `${((activeIndex + 1) / testimonials.length) * 100}%`,
                  }}
                />
              </div>

              <button
                onClick={goNext}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-[#1F2937] flex items-center justify-center shrink-0 hover:bg-[#2C8C91] hover:border-[#2C8C91] hover:text-white transition-colors duration-300 text-[#1F2937]"
              >
                <ArrowRightIcon />
              </button>
            </div>
          </div>

          {/* right: card carousel — clipped, no bleed */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <Swiper
              modules={[Autoplay]}
              onSwiper={(s) => (swiperRef.current = s)}
              onSlideChange={(s) => setActiveIndex(s.realIndex)}
              spaceBetween={24}
              slidesPerView={1}
              loop={true}
              loopedSlides={testimonials.length}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: { slidesPerView: 1.4 },
                1024: { slidesPerView: 2.1 },
              }}
              className="!pb-2"
            >
              {testimonials.map((t, i) => (
                <SwiperSlide key={i} className="!h-auto">
                  <TestimonialCard {...t} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ name, time, initial, color, text }) {
  return (
    <div className="relative bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgba(10,61,98,0.06)] hover:shadow-[0_14px_40px_rgba(44,140,145,0.18)] hover:-translate-y-1 transition-all duration-300 h-full min-h-[280px] flex flex-col mb-2">
      <p className="text-[#374151] text-base leading-relaxed mb-8 flex-1">
        {text}
      </p>

      <div className="flex gap-1 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} size={15} />
        ))}
      </div>

      <div
        className="absolute -bottom-2 left-10 w-4 h-4 bg-white rotate-45"
        aria-hidden="true"
      />

      <div className="flex items-center gap-3 relative z-10">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0"
          style={{ backgroundColor: color }}
        >
          {initial}
        </div>
        <div>
          <p className="text-[#1F2937] font-semibold text-sm">{name}</p>
          <p className="text-[#9CA6AC] text-xs">{time}</p>
        </div>
      </div>
    </div>
  );
}