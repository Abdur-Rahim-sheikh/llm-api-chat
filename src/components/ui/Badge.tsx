// src/components/ui/Badge.tsx
import React from "react";
import { cn } from "@/lib/utils";
import type { Provider } from "@/types";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "openai" | "gemini" | "cost" | "subtle";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium font-mono",
        variant === "default" && "bg-zinc-800 text-zinc-300",
        variant === "openai" && "bg-emerald-950 text-emerald-400 border border-emerald-800/50",
        variant === "gemini" && "bg-blue-950 text-blue-400 border border-blue-800/50",
        variant === "cost" && "bg-amber-950/80 text-amber-400 border border-amber-800/50",
        variant === "subtle" && "bg-zinc-900 text-zinc-500",
        className
      )}
    >
      {children}
    </span>
  );
}

export function ProviderBadge({ provider }: { provider: Provider }) {
  return (
    <Badge variant={provider}>
      <span className={cn(
        "w-1.5 h-1.5 rounded-full",
        provider === "openai" ? "bg-emerald-400" : "bg-blue-400"
      )} />
      {provider === "openai" ? "OpenAI" : "Gemini"}
    </Badge>
  );
}
