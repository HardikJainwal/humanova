import { cn } from "@/lib/cn";

/**
 * Small pill badge — used for eyebrow labels, tags, status chips.
 *
 * @param {"brand"|"neutral"} variant
 * @param {string} [className]
 * @param {React.ReactNode} children
 */
export default function Badge({ variant = "brand", className, children }) {
  const variants = {
    brand:
      "bg-[#F3EEE8] border border-[#E5DED6] text-[#2C8C91]",
    neutral:
      "bg-white border border-[#E5DED6] text-[#5F6B73]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase w-fit",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
