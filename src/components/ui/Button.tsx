// src/components/ui/Button.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed",

        // Sizes
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-4 py-2 text-sm",
        size === "lg" && "px-5 py-2.5 text-base",

        // Variants
        variant === "primary" &&
          "bg-teal-500 hover:bg-teal-400 text-zinc-950 font-semibold focus:ring-teal-500",
        variant === "ghost" &&
          "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 focus:ring-zinc-600",
        variant === "outline" &&
          "border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 focus:ring-zinc-600",
        variant === "danger" &&
          "text-red-400 hover:text-red-300 hover:bg-red-950/50 focus:ring-red-700",

        className
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
          </svg>
          Loading…
        </>
      ) : children}
    </button>
  );
}
