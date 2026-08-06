"use client";

import { use, useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { blogService } from "@/lib/blogService";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Tag,
  Clock,
  BookOpen,
  Share2,
  Check,
  Link2,
  ChevronRight,
  ListTree,
  Sparkles,
} from "lucide-react";


function IconX({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.634 5.902-5.634Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function IconLinkedin({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function IconInstagram({ size = 14}) {
  return(
    <svg width={size} height={size} viewBox="0 0 24 24 " fill="currentColor">
      <path d ="">

      </path>
    </svg>
  ) 
}











/* ══════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════ */
function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function readingTime(html = "") {
  const words = html.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "").replace(/&[a-z]+;/gi, " ").trim();
}
function getDriveImageUrl(url) {
  if (!url) return url;
  const match = url.match(/\/file\/d\/([^/]+)/);
  if (match) return `https://lh3.googleusercontent.com/d/${match[1]}`;
  return url;
}

/** Parse H2 / H3 headings out of HTML for Table of Contents */
function extractHeadings(html = "") {
  const matches = [...html.matchAll(/<h([23])[^>]*>(.*?)<\/h\1>/gi)];
  return matches.map((m, i) => ({
    level: parseInt(m[1]),
    text: stripHtml(m[2]),
    id: `heading-${i}`,
  }));
}

/** Clean up excess empty paragraphs like <p><br></p> or <p>&nbsp;</p> from rich text HTML */
function cleanBlogContent(html = "") {
  if (!html) return "";
  return html
    .replace(/<p>\s*(<br\s*\/?>|&nbsp;|\s)*\s*<\/p>/gi, "")
    .replace(/<p>\s*<br\s*\/?>/gi, "<p>")
    .replace(/<br\s*\/?>\s*<\/p>/gi, "</p>")
    .replace(/(<br\s*\/?>\s*){2,}/gi, "<br />");
}

/** Inject id attributes into heading tags so TOC links work */
function injectHeadingIds(html = "") {
  let idx = 0;
  const cleaned = cleanBlogContent(html);
  return cleaned.replace(/<h([23])([^>]*)>/gi, (_, level, attrs) => {
    return `<h${level}${attrs} id="heading-${idx++}">`;
  });
}

/* ══════════════════════════════════════════════════════════
   READING PROGRESS BAR
══════════════════════════════════════════════════════════ */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-border/40">
      <motion.div
        className="h-full"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #2C8C91, #7FC7AE)",
        }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   TABLE OF CONTENTS (left sidebar)
══════════════════════════════════════════════════════════ */
function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0% -60% 0%", threshold: 0 }
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto"
    >
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <ListTree size={15} className="text-brand" />
          <span className="text-xs font-semibold uppercase tracking-widest text-body/60">
            Contents
          </span>
        </div>
        <nav>
          <ul className="space-y-1">
            {headings.map(({ id, text, level }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`block py-1 text-sm leading-snug transition-all duration-150 border-l-2 pl-3 ${
                    level === 3 ? "ml-3 text-xs" : ""
                  } ${
                    activeId === id
                      ? "border-brand text-brand font-semibold"
                      : "border-transparent text-body/60 hover:text-heading hover:border-brand/40"
                  }`}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   RIGHT SIDEBAR
══════════════════════════════════════════════════════════ */
function SidebarShare({ title }) {
  const [copied, setCopied] = useState(false);

  function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  function shareTwitter() {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, "_blank", "noopener");
  }
  function shareLinkedIn() {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, "_blank", "noopener");
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
      <span className="text-xs font-semibold uppercase tracking-widest text-body/60">
        Share article
      </span>
      <div className="flex flex-col gap-2">
        <button
          onClick={shareTwitter}
          className="flex items-center gap-3 rounded-xl border border-border bg-bg px-4 py-2.5 text-sm font-medium text-body hover:border-brand/40 hover:text-brand hover:bg-brand/5 transition-all duration-200"
        >
          <IconX size={15} />
          Share on X / Twitter
        </button>
        <button
          onClick={shareLinkedIn}
          className="flex items-center gap-3 rounded-xl border border-border bg-bg px-4 py-2.5 text-sm font-medium text-body hover:border-brand/40 hover:text-brand hover:bg-brand/5 transition-all duration-200"
        >
          <IconLinkedin size={15} />
          Share on LinkedIn
        </button>
        <button
          onClick={copyLink}
          className="flex items-center gap-3 rounded-xl border border-border bg-bg px-4 py-2.5 text-sm font-medium text-body hover:border-brand/40 hover:text-brand hover:bg-brand/5 transition-all duration-200"
        >
          {copied ? (
            <>
              <Check size={15} className="text-brand" />
              <span className="text-brand">Copied!</span>
            </>
          ) : (
            <>
              <Link2 size={15} />
              Copy link
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function SidebarRelated({ related }) {
  if (!related.length) return null;
  return (
    <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
      <span className="text-xs font-semibold uppercase tracking-widest text-body/60">
        Related articles
      </span>
      <ul className="space-y-4">
        {related.map((r) => (
          <li key={r._id || r.slug}>
            <Link href={`/blog/${r.slug}`} className="group flex gap-3 items-start">
              {r.imageUrl && (
                <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-bg-secondary">
                  <Image
                    src={getDriveImageUrl(r.imageUrl)}
                    alt={r.imageAlt || r.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="64px"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-brand mb-1">{r.category}</p>
                <p className="text-sm font-semibold text-heading leading-snug line-clamp-2 group-hover:text-brand transition-colors duration-150">
                  {r.title}
                </p>
                <p className="text-xs text-body/50 mt-1">{formatDate(r.date)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/blog"
        className="flex items-center gap-1.5 text-xs font-semibold text-brand hover:gap-2.5 transition-all duration-200 pt-1"
      >
        View all articles <ChevronRight size={13} />
      </Link>
    </div>
  );
}

function SidebarNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <div
      className="rounded-2xl p-5 space-y-4 overflow-hidden relative"
      style={{ background: "linear-gradient(135deg, #07312C 0%, #0f4a42 100%)" }}
    >
      {/* decorative glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, #D4F04A 0%, transparent 70%)" }}
      />
      <div className="flex items-center gap-2 relative z-10">
        <Sparkles size={15} className="text-[#D4F04A]" />
        <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
          Stay in the loop
        </span>
      </div>
      <p className="text-white text-sm font-semibold leading-snug relative z-10">
        Get the latest wellness insights delivered to your inbox.
      </p>
      {submitted ? (
        <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-3 relative z-10">
          <Check size={15} className="text-[#D4F04A]" />
          <span className="text-white text-sm font-medium">You&apos;re subscribed!</span>
        </div>
      ) : (
        <div className="flex flex-col gap-2 relative z-10">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4F04A]/60 transition-colors"
          />
          <button
            onClick={() => email && setSubmitted(true)}
            className="w-full rounded-xl bg-[#D4F04A] px-4 py-2.5 text-sm font-bold text-black hover:bg-[#c8e83f] transition-colors"
          >
            Subscribe →
          </button>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SKELETON
══════════════════════════════════════════════════════════ */
function Skeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-full h-[60vh] bg-bg-secondary" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_260px] gap-10">
          <div className="hidden lg:block space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-3 bg-bg-secondary rounded-full" style={{ width: `${60 + (i % 3) * 20}%` }} />
            ))}
          </div>
          <div className="space-y-5">
            <div className="h-6 w-32 bg-bg-secondary rounded-full" />
            <div className="h-10 w-full bg-bg-secondary rounded-full" />
            <div className="h-10 w-3/4 bg-bg-secondary rounded-full" />
            <div className="h-4 w-40 bg-bg-secondary rounded-full" />
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-4 bg-bg-secondary rounded-full" style={{ width: `${70 + (i % 4) * 8}%` }} />
            ))}
          </div>
          <div className="hidden lg:block space-y-4">
            <div className="h-40 bg-bg-secondary rounded-2xl" />
            <div className="h-48 bg-bg-secondary rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}


function RelatedCard({ blog }) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group block">
      <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-border bg-card hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5 transition-all duration-300">
        <div className="relative aspect-[16/9] overflow-hidden bg-bg-secondary flex-shrink-0">
          {blog.imageUrl ? (
            <Image
              src={getDriveImageUrl(blog.imageUrl)}
              alt={blog.imageAlt || blog.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen size={28} className="text-brand/25" />
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-heading shadow-sm">
              <Tag size={9} />
              {blog.category}
            </span>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-2 p-5">
          <h3
            className="text-base font-semibold text-heading leading-snug line-clamp-2 group-hover:text-brand transition-colors duration-200"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {blog.title}
          </h3>
          <p className="text-sm text-body line-clamp-2 flex-1">
            {stripHtml(blog.content).slice(0, 100)}…
          </p>
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
            <span className="text-xs text-body/50 flex items-center gap-1.5">
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
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════ */
export default function BlogPostPage({ params }) {
  const { slug } = use(params);

  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [headings, setHeadings] = useState([]);
  const [processedContent, setProcessedContent] = useState("");

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    blogService
      .getBlogBySlug(slug)
      .then(async (result) => {
        const post =
          result?.data?.blog ??
          result?.data ??
          result?.blog ??
          result;
        setBlog(post);

        // Process content: inject heading IDs + extract TOC
        if (post?.content) {
          const withIds = injectHeadingIds(post.content);
          setProcessedContent(withIds);
          setHeadings(extractHeadings(post.content));
        }

        if (post?.category) {
          try {
            const rel = await blogService.getAllBlogs(1, 5, post.category);
            const relData =
              rel?.data?.blogs ??
              rel?.data?.data ??
              (Array.isArray(rel?.data) ? rel.data : null) ??
              rel?.blogs ??
              (Array.isArray(rel) ? rel : []);
            setRelated(relData.filter((b) => b.slug !== slug).slice(0, 3));
          } catch {
            /* silent */
          }
        }
      })
      .catch(() => setError("Blog post not found."))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <ReadingProgress />
      <Navbar />

      <main>
        {/* ── LOADING ── */}
        {loading && <Skeleton />}

        {/* ── ERROR ── */}
        {error && (
          <div className="max-w-3xl mx-auto px-6 py-40 text-center">
            <div className="w-20 h-20 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-6">
              <BookOpen size={32} className="text-brand/50" />
            </div>
            <h1 className="text-2xl font-bold text-heading mb-3" style={{ fontFamily: "var(--font-outfit)" }}>
              Article not found
            </h1>
            <p className="text-body mb-8">{error}</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-white hover:bg-brand-hover transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
          </div>
        )}

        {/* ── CONTENT ── */}
        {!loading && !error && blog && (
          <>
            {/* ════════════════════════════════
                HERO — full bleed cinematic
            ════════════════════════════════ */}
            <div className="relative w-full overflow-hidden" style={{ height: "62vh", minHeight: 400, maxHeight: 640 }}>
              {blog.imageUrl ? (
                <>
                  <Image
                    src={getDriveImageUrl(blog.imageUrl)}
                    alt={blog.imageAlt || blog.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                  />
                  {/* layered gradients for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07312C]/80 via-[#07312C]/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#07312C]/40 to-transparent" />
                </>
              ) : (
                <div
                  className="w-full h-full"
                  style={{ background: "linear-gradient(160deg, #07312C 0%, #0f4a42 50%, #1a5c4e 100%)" }}
                />
              )}

              {/* hero text overlay */}
              <div className="absolute inset-0 flex flex-col justify-end">
                <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 pb-10">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* back link */}
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-5 group transition-colors duration-200"
                    >
                      <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                      All articles
                    </Link>

                    {/* category + meta row */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      {blog.category && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/80 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white">
                          <Tag size={10} />
                          {blog.category}
                        </span>
                      )}
                      {blog.date && (
                        <span className="text-xs text-white/60 flex items-center gap-1.5">
                          <Calendar size={11} />
                          {formatDate(blog.date)}
                        </span>
                      )}
                      <span className="text-xs text-white/60 flex items-center gap-1.5">
                        <Clock size={11} />
                        {readingTime(blog.content)} min read
                      </span>
                    </div>

                    {/* title */}
                    <h1
                      className="text-3xl md:text-4xl lg:text-5xl text-white leading-[1.12] max-w-4xl"
                      style={{ fontFamily: "var(--font-outfit)", fontWeight: 700 }}
                    >
                      {blog.title}
                    </h1>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* ════════════════════════════════
                THREE-COLUMN BODY
            ════════════════════════════════ */}
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_280px] gap-10 xl:gap-14 items-start">

                {/* ── LEFT: Table of Contents ── */}
                <div className="hidden lg:block">
                  <TableOfContents headings={headings} />
                </div>

                {/* ── CENTER: Article body ── */}
                <motion.article
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="min-w-0"
                >
                  {/* inline meta for mobile */}
                  <div className="flex flex-wrap items-center gap-3 mb-6 lg:hidden">
                    {blog.category && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                        <Tag size={11} />
                        {blog.category}
                      </span>
                    )}
                    {blog.date && (
                      <span className="text-xs text-body/60 flex items-center gap-1.5">
                        <Calendar size={11} />
                        {formatDate(blog.date)}
                      </span>
                    )}
                    <span className="text-xs text-body/60 flex items-center gap-1.5">
                      <Clock size={11} />
                      {readingTime(blog.content)} min read
                    </span>
                  </div>

                  {/* divider */}
                  <div className="h-px bg-gradient-to-r from-brand/20 via-border to-transparent mb-10" />

                  {/* article html */}
                  <div
                    className="prose-blog"
                    dangerouslySetInnerHTML={{ __html: processedContent || blog.content }}
                  />

                  {/* tags + keyphrase */}
                  {blog.keyphrase && (
                    <div className="mt-10 pt-8 border-t border-border flex flex-wrap gap-2 items-center">
                      <span className="text-xs font-semibold text-body/50 uppercase tracking-wider">Topics:</span>
                      {blog.keyphrase.split(",").map((kw) => (
                        <span
                          key={kw}
                          className="inline-flex items-center gap-1 rounded-full bg-brand/10 border border-brand/20 px-3 py-1 text-xs font-medium text-brand"
                        >
                          {kw.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* bottom share row */}
                  <div className="mt-10 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-2 text-sm font-medium text-body hover:text-brand transition-colors duration-200 group"
                    >
                      <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                      Back to all articles
                    </Link>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-body/50">Share:</span>
                      <button
                        onClick={() => {
                          const u = `https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`;
                          window.open(u, "_blank", "noopener");
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-body/60 hover:text-brand hover:border-brand/40 transition-all duration-200"
                      >
                        <IconX size={13} />
                      </button>
                      <button
                        onClick={() => {
                          const u = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
                          window.open(u, "_blank", "noopener");
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-body/60 hover:text-brand hover:border-brand/40 transition-all duration-200"
                      >
                        <IconLinkedin size={13} />
                      </button>
                    </div>
                  </div>
                </motion.article>

                {/* ── RIGHT: Sticky Sidebar ── */}
                <motion.aside
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.55, delay: 0.35 }}
                  className="space-y-5 sticky top-24"
                >
                  <SidebarShare title={blog.title} />
                  <SidebarRelated related={related} />
                  <SidebarNewsletter />
                </motion.aside>

              </div>
            </div>

            {/* ════════════════════════════════
                RELATED POSTS — full-width strip
            ════════════════════════════════ */}
            {related.length > 0 && (
              <section className="border-t border-border bg-bg-secondary">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-between mb-10"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                      <h2
                        className="text-2xl md:text-3xl text-heading"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        More in <em className="font-normal not-italic text-brand">{blog.category}</em>
                      </h2>
                    </div>
                    <Link
                      href="/blog"
                      className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-brand hover:gap-3 transition-all duration-200"
                    >
                      View all <ArrowRight size={15} />
                    </Link>
                  </motion.div>

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {related.map((r, i) => (
                      <motion.div
                        key={r._id || r.slug}
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: i * 0.09 }}
                      >
                        <RelatedCard blog={r} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}
    
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
