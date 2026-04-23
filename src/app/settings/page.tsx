// src/app/settings/page.tsx
"use client";

import Link from "next/link";
import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { CostSummary } from "@/components/settings/CostSummary";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <div className="border-b border-zinc-800/60 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link
            href="/"
            className="text-zinc-500 hover:text-zinc-200 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <h1 className="text-lg font-bold text-zinc-100">Settings</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* API Keys & Model Config */}
        <section>
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
            API Configuration
          </h2>
          <SettingsPanel />
        </section>

        {/* Cost Overview */}
        <section>
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
            Cost Overview
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <CostSummary provider="openai" />
            <CostSummary provider="gemini" />
          </div>
        </section>

        {/* About */}
        <section className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-5 space-y-2">
          <h2 className="text-sm font-semibold text-zinc-300">About this app</h2>
          <p className="text-xs text-zinc-500 leading-relaxed">
            LLM Chat is a portfolio + utility project built with Next.js 14, Tailwind CSS, and Supabase.
            It lets you switch between OpenAI and Google Gemini, tracking cost per conversation and in aggregate.
          </p>
          <div className="flex gap-3 pt-1">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-teal-500 hover:text-teal-400 transition-colors"
            >
              GitHub →
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
