"use client";

import { use, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { blogService } from "@/lib/blogService";
import {
  Search,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Tag,
  ChevronRight,
  Loader2,
  BookOpen,
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

/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */
function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
function stripHtml(h = "") {
  return h.replace(/<[^>]*>/g, "").replace(/&[a-z]+;/gi, " ").trim();
}
function excerpt(h = "", max = 110) {
  const t = stripHtml(h);
  return t.length > max ? t.slice(0, max) + "…" : t;
}
function getDriveImageUrl(url) {
  if (!url) return url;
  const match = url.match(/\/file\/d\/([^/]+)/);
  if (match) return `https://lh3.googleusercontent.com/d/${match[1]}`;
  return url;
}

/* ══════════════════════════════════════════
   SKELETON CARD
══════════════════════════════════════════ */
function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-card animate-pulse">
      <div className="aspect-[16/10] bg-bg-secondary" />
      <div className="p-5 flex flex-col gap-3">
        <div className="h-3 w-20 bg-bg-secondary rounded-full" />
        <div className="h-5 w-full bg-bg-secondary rounded-full" />
        <div className="h-5 w-4/5 bg-bg-secondary rounded-full" />
        <div className="h-3 w-full bg-bg-secondary rounded-full" />
        <div className="mt-2 h-3 w-24 bg-bg-secondary rounded-full" />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   BLOG CARD
══════════════════════════════════════════ */
function BlogCard({ blog, index }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      className="group"
    >
      <Link href={`/blog/${blog.slug}`} className="block h-full">
        <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-border bg-card hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5 transition-all duration-300">
          {/* image */}
          <div className="relative aspect-[16/10] overflow-hidden bg-bg-secondary flex-shrink-0">
            {blog.imageUrl ? (
              <Image
                src={getDriveImageUrl(blog.imageUrl)}
                alt={blog.imageAlt || blog.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand/10 to-brand/5">
                <BookOpen size={32} className="text-brand/30" />
              </div>
            )}
            {/* category badge */}
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-heading shadow-sm">
                <Tag size={9} />
                {blog.category}
              </span>
            </div>
          </div>
          {/* content */}
          <div className="flex flex-col flex-1 gap-3 p-5">
            <h3
              className="text-base font-semibold text-heading leading-snug line-clamp-2 group-hover:text-brand transition-colors duration-200"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {blog.title}
            </h3>
            <p className="text-sm text-body leading-relaxed line-clamp-2 flex-1">
              {excerpt(blog.content)}
            </p>
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
              <span className="text-xs text-body/60 flex items-center gap-1.5">
                <Calendar size={11} />
                {formatDate(blog.date)}
              </span>
              <span className="text-xs font-semibold text-brand flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                Read <ChevronRight size={13} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   FEATURED CARD (wide)
══════════════════════════════════════════ */
function FeaturedCard({ blog }) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
        style={{ minHeight: 380 }}
      >
        <div className="grid md:grid-cols-2 items-stretch min-h-[380px]">
          <div className="relative overflow-hidden min-h-[260px]">
            {blog.imageUrl ? (
              <Image
                src={getDriveImageUrl(blog.imageUrl)}
                alt={blog.imageAlt || blog.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width:768px) 100vw,50vw"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand/20 to-brand/5 flex items-center justify-center">
                <BookOpen size={48} className="text-brand/40" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/20" />
          </div>
          <div className="flex flex-col justify-center gap-5 p-8 md:p-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand w-fit">
              <Tag size={11} /> {blog.category}
            </span>
            <h2
              className="text-2xl md:text-3xl text-heading leading-snug group-hover:text-brand transition-colors duration-200"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {blog.title}
            </h2>
            <p className="text-body text-sm leading-relaxed line-clamp-3">
              {excerpt(blog.content, 200)}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-body/70 flex items-center gap-1.5">
                <Calendar size={12} /> {formatDate(blog.date)}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand group-hover:gap-3 transition-all duration-200">
                Read more <ArrowRight size={15} />
              </span>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent group-hover:ring-brand/20 transition-all duration-300" />
      </motion.div>
    </Link>
  );
}

/* ══════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════ */
export default function CategoryBlogsPage({ params }) {
  const { category: categorySlug } = use(params);

  const [categoryName, setCategoryName] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const LIMIT = 9;

  // Sync search input with URL query param '?q=...'
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const query = urlParams.get("q");
      if (query) {
        setSearch(query);
      }
    }
  }, []);

  useEffect(() => {
    if (!categorySlug) return;

    async function loadCategoryAndBlogs() {
      setLoading(true);
      setError(null);
      try {
        let exactName = null;
        if (categorySlug !== "all") {
          const categories = await blogService.getAllCategories();
          const matched = categories.find((cat) => cat.slug === categorySlug);
          if (matched) {
            exactName = matched.name;
            setCategoryName(matched.name);
          } else {
            // fallback decode URI
            exactName = decodeURIComponent(categorySlug);
            setCategoryName(exactName);
          }
        } else {
          setCategoryName("All Articles");
        }

        // fetch blogs
        const result = await blogService.getAllBlogs(1, LIMIT, exactName);
        const data =
          result?.data?.blogs ??
          result?.data?.data ??
          (Array.isArray(result?.data) ? result.data : null) ??
          result?.blogs ??
          (Array.isArray(result) ? result : []);

        setFeatured(data[0] ?? null);
        setBlogs(data.slice(1));
        setHasMore(data.length === LIMIT);
      } catch (err) {
        console.error(err);
        setError("Failed to load articles.");
      } finally {
        setLoading(false);
      }
    }

    loadCategoryAndBlogs();
  }, [categorySlug]);

  async function loadMore() {
    const next = page + 1;
    setPage(next);
    setLoadingMore(true);
    try {
      const result = await blogService.getAllBlogs(next, LIMIT, categorySlug === "all" ? null : categoryName);
      const data =
        result?.data?.blogs ??
        result?.data?.data ??
        (Array.isArray(result?.data) ? result.data : null) ??
        result?.blogs ??
        (Array.isArray(result) ? result : []);

      setBlogs((prev) => [...prev, ...data]);
      setHasMore(data.length === LIMIT);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  }

  const filteredBlogs = blogs.filter((b) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      b.title?.toLowerCase().includes(q) ||
      b.category?.toLowerCase().includes(q) ||
      stripHtml(b.content).toLowerCase().includes(q)
    );
  });

  const featuredMatchesSearch = !search || (featured && (
    featured.title?.toLowerCase().includes(search.toLowerCase()) ||
    featured.category?.toLowerCase().includes(search.toLowerCase())
  ));

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      <main className="pt-20 pb-28">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header & Back Action */}
          <div className="mb-10 flex flex-col gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:gap-3 transition-all duration-200 group w-fit"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              All categories
            </Link>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand mb-2">
                  Category
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl text-heading font-bold" style={{ fontFamily: "var(--font-outfit)" }}>
                  {categoryName || "Category Articles"}
                </h1>
              </div>

              {/* Search within category */}
              <div className="relative w-full max-w-xs">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-body/40 pointer-events-none" />
                <input
                  type="search"
                  placeholder={`Search in ${categoryName || "category"}…`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-full border border-border bg-card pl-10 pr-4 py-2.5 text-sm text-heading placeholder:text-body/40 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 transition-all shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Loader */}
          {loading && !error && (
            <div className="space-y-12">
              <div className="rounded-3xl overflow-hidden border border-border bg-card animate-pulse">
                <div className="grid md:grid-cols-2 min-h-[340px]">
                  <div className="bg-bg-secondary" />
                  <div className="flex flex-col justify-center gap-5 p-10">
                    {[100, 75, 100, 80].map((w, i) => (
                      <div key={i} className="h-4 bg-bg-secondary rounded-full" style={{ width: `${w}%` }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-center py-20">
              <p className="text-body text-lg mb-6">{error}</p>
              <Link href="/blog" className="rounded-full bg-brand px-7 py-3 font-semibold text-white hover:bg-brand-hover">
                Back to Blog
              </Link>
            </div>
          )}

          {/* Content Grid */}
          {!loading && !error && (
            <AnimatePresence mode="wait">
              <motion.div
                key={categorySlug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Featured article at top */}
                {featured && featuredMatchesSearch && !search && (
                  <div className="mb-12">
                    <FeaturedCard blog={featured} />
                  </div>
                )}

                {/* Main list */}
                {(filteredBlogs.length > 0 || (search && featured && featuredMatchesSearch)) ? (
                  <motion.div
                    initial="hidden"
                    animate="show"
                    variants={stagger}
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    {search && featured && featuredMatchesSearch && (
                      <BlogCard blog={featured} index={0} />
                    )}
                    {filteredBlogs.map((b, i) => (
                      <BlogCard key={b._id || b.slug} blog={b} index={i} />
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-center py-20">
                    <BookOpen size={44} className="mx-auto text-body/25 mb-4" />
                    <p className="text-body text-lg">No articles found matching search criteria.</p>
                  </div>
                )}

                {/* Load More */}
                {hasMore && !search && filteredBlogs.length > 0 && (
                  <div className="mt-14 flex justify-center">
                    <button
                      onClick={loadMore}
                      disabled={loadingMore}
                      className="group inline-flex items-center gap-2.5 rounded-full border border-brand/30 bg-card px-8 py-3.5 font-semibold text-brand hover:bg-brand hover:text-white hover:border-brand transition-all duration-200 disabled:opacity-60"
                    >
                      {loadingMore ? (
                        <><Loader2 size={16} className="animate-spin" /> Loading…</>
                      ) : (
                        <>Load more articles <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" /></>
                      )}
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
