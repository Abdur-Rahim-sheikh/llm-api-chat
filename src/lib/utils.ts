// src/lib/utils.ts
// Simple className merger. In real projects use: npm install clsx tailwind-merge
// then: import { clsx } from "clsx"; import { twMerge } from "tailwind-merge";

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
