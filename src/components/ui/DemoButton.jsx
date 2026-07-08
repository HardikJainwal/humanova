"use client";

import { useDemoModal } from "@/context/DemoModalContext";
import { cn } from "@/lib/cn";

/**
 * Drop-in replacement for any "Request Demo" / "Get a Free Demo" button.
 * Accepts same variant/size/className as Button.jsx.
 */
export default function DemoButton({ children, className, variant = "primary", size = "md", id, ...props }) {
  const { open } = useDemoModal();

  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-all duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C8C91] focus-visible:ring-offset-2 cursor-pointer";

  const variants = {
    primary: "bg-[#2C8C91] hover:bg-[#236F73] text-white shadow-[0_4px_16px_-4px_rgba(44,140,145,0.4)]",
    outline: "border border-[#E5DED6] hover:border-[#2C8C91] hover:text-[#2C8C91] text-[#1F2937] bg-white",
  };

  const sizes = {
    sm: "text-xs px-4 py-2",
    md: "text-sm px-6 py-3",
    lg: "text-sm px-7 py-4",
  };

  return (
    <button
      id={id}
      type="button"
      onClick={open}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
