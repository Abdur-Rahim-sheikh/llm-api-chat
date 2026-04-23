// src/components/sidebar/TabItem.tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Conversation } from "@/types";
import { formatCost } from "@/lib/costs";

interface TabItemProps {
  conversation: Conversation;
  isActive: boolean;
  onSelect: () => void;
  onDelete: (id: string) => void;
}

export function TabItem({ conversation, isActive, onSelect, onDelete }: TabItemProps) {
  const [hovered, setHovered] = useState(false);

  const providerDot =
    conversation.provider === "openai"
      ? "bg-emerald-400"
      : "bg-blue-400";

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    if (confirm("Delete this conversation?")) {
      onDelete(conversation.id);
    }
  }

  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all group",
        isActive
          ? "bg-zinc-800 text-zinc-100"
          : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
      )}
    >
      {/* Provider dot */}
      <span className={cn("w-2 h-2 rounded-full flex-shrink-0", providerDot)} />

      {/* Title */}
      <span className="flex-1 text-sm truncate leading-tight">
        {conversation.title}
      </span>

      {/* Right side: cost OR delete button */}
      <span className="flex-shrink-0">
        {hovered ? (
          <span
            onClick={handleDelete}
            className="w-5 h-5 rounded-md flex items-center justify-center text-zinc-500 hover:text-red-400 hover:bg-red-950/50 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        ) : conversation.total_cost_usd > 0 ? (
          <span className="text-xs font-mono text-amber-600/70">
            {formatCost(conversation.total_cost_usd)}
          </span>
        ) : (
          <span className="w-5 h-5" />
        )}
      </span>
    </button>
  );
}
