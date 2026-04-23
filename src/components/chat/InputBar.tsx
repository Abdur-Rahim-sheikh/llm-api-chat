// src/components/chat/InputBar.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { Provider } from "@/types";

interface InputBarProps {
  onSend: (content: string) => void;
  isLoading: boolean;
  disabled?: boolean;
  provider: Provider;
}

export function InputBar({ onSend, isLoading, disabled, provider }: InputBarProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [value]);

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed || isLoading || disabled) return;
    onSend(trimmed);
    setValue("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const accentClass = provider === "openai"
    ? "focus-within:border-emerald-700/60"
    : "focus-within:border-blue-700/60";

  return (
    <div className="px-4 pb-4 pt-2">
      <div
        className={cn(
          "flex items-end gap-3 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 transition-colors",
          accentClass
        )}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? "Select a chat to start…" : "Message… (Shift+Enter for new line)"}
          disabled={disabled || isLoading}
          rows={1}
          className="flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-600 resize-none focus:outline-none leading-relaxed min-h-[24px] max-h-[200px] disabled:opacity-50"
        />

        <button
          onClick={handleSend}
          disabled={!value.trim() || isLoading || disabled}
          className={cn(
            "flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all",
            value.trim() && !isLoading && !disabled
              ? "bg-teal-500 text-zinc-950 hover:bg-teal-400"
              : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          )}
        </button>
      </div>

      <p className="text-center text-xs text-zinc-700 mt-2">
        Costs are estimates based on published token pricing.
      </p>
    </div>
  );
}
