"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { blogService } from "@/lib/blogService";
import {
  Search,
  ArrowRight,
  Grid3X3,
} from "lucide-react";

/* ══════════════════════════════════════════
   ANIMATION VARIANTS
══════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

/* gradient palette cycling for category cards that have no image */
const CAT_GRADIENTS = [
  "linear-gradient(135deg,#07312C 0%,#2C8C91 100%)",
  "linear-gradient(135deg,#1a3a4f 0%,#2C8C91 100%)",
  "linear-gradient(135deg,#2d1b4e 0%,#7C5CBF 100%)",
  "linear-gradient(135deg,#3a1f0a 0%,#C4762F 100%)",
  "linear-gradient(135deg,#0a2e1f 0%,#3BAF7A 100%)",
  "linear-gradient(135deg,#1f0a2e 0%,#8B3BAF 100%)",
];

/* ══════════════════════════════════════════
   CATEGORY IMAGE CARD
══════════════════════════════════════════ */
function CategoryCard({ cat, index, coverImage }) {
  const gradient = CAT_GRADIENTS[index % CAT_GRADIENTS.length];
  return (
    <Link href={`/blog/category/${cat.slug}`} className="block">
      <motion.div
        custom={index}
        variants={fadeUp}
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="group relative overflow-hidden rounded-2xl text-left cursor-pointer focus:outline-none w-full"
        style={{ aspectRatio: "4/3" }}
      >
        {/* background image or gradient */}
        {coverImage ? (
          <Image
            src={coverImage}
            alt={cat.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
          />
        ) : (
          <div className="absolute inset-0" style={{ background: gradient }} />
        )}

        {/* dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/85" />

        {/* content */}
        <div className="absolute inset-0 flex flex-col justify-end p-5">
          <span
            className="mb-3 self-start inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/15 backdrop-blur-sm text-white/90"
          >
            Explore
          </span>

          <h3
            className="text-white text-base font-bold leading-snug mb-1"
            style={{ fontFamily: "var(--font-outfit)", textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
          >
            {cat.name}
          </h3>

          <div
            className="flex items-center gap-1.5 text-white/70 text-xs font-medium transition-all duration-200 group-hover:text-white group-hover:gap-2.5"
          >
            Browse articles <ArrowRight size={12} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function BlogPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [categoryCovers, setCategoryCovers] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function init() {
      setLoading(true);
      try {
        const [catResult, blogsResult] = await Promise.all([
          blogService.getAllCategories(),
          blogService.getAllBlogs(1, 50),
        ]);

        setCategories(catResult ?? []);

        const blogsArr =
          blogsResult?.data?.blogs ??
          blogsResult?.data?.data ??
          (Array.isArray(blogsResult?.data) ? blogsResult.data : null) ??
          blogsResult?.blogs ??
          (Array.isArray(blogsResult) ? blogsResult : []);

        // build cover map: first blog image per category
        const covers = {};
        blogsArr.forEach((b) => {
          if (b.category && b.imageUrl && !covers[b.category]) {
            covers[b.category] = b.imageUrl;
          }
        });
        setCategoryCovers(covers);
      } catch (e) {
        console.error(e);
        setError("Failed to load. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/blog/category/all?q=${encodeURIComponent(search.trim())}`);
    }
  }

  const CatSkeleton = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-2xl bg-bg-secondary animate-pulse" style={{ aspectRatio: "4/3" }} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      <main>
        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section className="relative overflow-hidden pt-10 pb-12 md:pt-16 md:pb-16 px-6">
          <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-35"
            style={{ background: "radial-gradient(circle,rgba(44,140,145,0.13) 0%,transparent 70%)" }} />
          <div aria-hidden className="pointer-events-none absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle,rgba(44,140,145,0.1) 0%,transparent 70%)" }} />

          <div className="mx-auto max-w-7xl">
            <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl">
              <motion.h1
                variants={fadeUp}
                className="mt-5 text-4xl md:text-5xl lg:text-[3.2rem] leading-[1.1] text-heading font-bold"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Insights for healthier{" "}
                <span className="italic font-normal" style={{ fontFamily: "'Instrument Serif',serif", color: "#2C8C91" }}>
                  workplaces
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-5 text-lg text-body leading-relaxed max-w-xl">
                Expert perspectives on mental wellness, leadership, and building resilient teams.
              </motion.p>
            </motion.div>

            {/* search bar */}
            <motion.form
              onSubmit={handleSearchSubmit}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-8"
            >
              <div className="relative w-full max-w-sm">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-body/40 pointer-events-none" />
                <input
                  type="search"
                  placeholder="Search articles…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-full border border-border bg-card pl-10 pr-4 py-3 text-sm text-heading placeholder:text-body/40 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 transition-all shadow-sm"
                />
              </div>
            </motion.form>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CATEGORIES SECTION
        ══════════════════════════════════════════ */}
        <section className="px-6 pb-28">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-3 mb-7">
              <span className="w-2 h-2 rounded-full bg-brand" />
              <h2 className="text-xl md:text-2xl font-semibold text-heading" style={{ fontFamily: "var(--font-outfit)" }}>
                Browse by category
              </h2>
            </div>

            {loading && (
              <CatSkeleton />
            )}

            {error && (
              <div className="text-center py-10">
                <p className="text-body text-lg">{error}</p>
              </div>
            )}

            {!loading && !error && (
              <motion.div
                initial="hidden"
                animate="show"
                variants={stagger}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
              >
                {/* "All" card */}
                <Link href="/blog/category/all" className="block">
                  <motion.div
                    custom={0}
                    variants={fadeUp}
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="group relative overflow-hidden rounded-2xl text-left cursor-pointer focus:outline-none w-full"
                    style={{ aspectRatio: "4/3", background: "linear-gradient(135deg,#07312C 0%,#0f4a42 100%)" }}
                  >
                    <div aria-hidden className="pointer-events-none absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-25"
                      style={{ background: "radial-gradient(circle,#D4F04A 0%,transparent 70%)" }} />
                    <div className="absolute inset-0 flex flex-col justify-end p-5">
                      <span
                        className="mb-3 self-start inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/15 backdrop-blur-sm text-white/90"
                      >
                        <Grid3X3 size={9} />
                        All
                      </span>
                      <h3 className="text-white text-base font-bold" style={{ fontFamily: "var(--font-outfit)" }}>
                        All Articles
                      </h3>
                      <div className="flex items-center gap-1.5 text-white/70 text-xs font-medium mt-1 group-hover:text-white group-hover:gap-2.5 transition-all duration-200">
                        View everything <ArrowRight size={12} />
                      </div>
                    </div>
                  </motion.div>
                </Link>

                {/* Category cards */}
                {categories.map((cat, i) => (
                  <CategoryCard
                    key={cat.id || cat.name}
                    cat={cat}
                    index={i + 1}
                    coverImage={categoryCovers[cat.name]}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
