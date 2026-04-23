// src/components/settings/CostSummary.tsx
"use client";

import { formatCost } from "@/lib/costs";
import { useCosts } from "@/hooks/useCosts";
import type { Provider } from "@/types";

interface CostSummaryProps {
  provider: Provider;
}

export function CostSummary({ provider }: CostSummaryProps) {
  const { summary, isLoading } = useCosts(provider);

  const rows = [
    { label: "This week", value: summary.weekly_cost },
    { label: "This month", value: summary.monthly_cost },
    { label: "All time", value: summary.total_cost },
  ];

  return (
    <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-xl p-3 space-y-1">
      <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-2">
        {provider === "openai" ? "OpenAI" : "Gemini"} spend
      </p>
      {isLoading ? (
        <div className="space-y-1.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-4 bg-zinc-800 rounded animate-pulse" />
          ))}
        </div>
      ) : (
        rows.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-xs text-zinc-500">{label}</span>
            <span className="text-xs font-mono text-amber-500/80">
              {formatCost(value)}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
