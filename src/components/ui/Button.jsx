import { cn } from "@/lib/cn";

/**
 * Reusable Button atom.
 *
 * @param {"primary"|"outline"} variant
 * @param {"sm"|"md"|"lg"} size
 * @param {string} [className]
 * @param {React.ReactNode} children
 * @param {string} [href] — renders <a> when provided, else <button>
 * @param {object} props — rest forwarded to element
 */
export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-colors duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C8C91] focus-visible:ring-offset-2";

  const variants = {
    primary:
      "bg-[#2C8C91] hover:bg-[#236F73] text-white shadow-[0_4px_16px_-4px_rgba(44,140,145,0.4)]",
    outline:
      "border border-[#E5DED6] hover:border-[#2C8C91] hover:text-[#2C8C91] text-[#1F2937] bg-white",
  };

  const sizes = {
    sm: "text-xs px-4 py-2",
    md: "text-sm px-6 py-3",
    lg: "text-sm px-7 py-4",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
