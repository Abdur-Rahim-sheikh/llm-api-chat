// src/hooks/useCosts.ts
"use client";

import { useState, useEffect } from "react";
import { storage, KEYS } from "@/lib/storage";
import type { CostSummary, Provider, CostRecord } from "@/types";

const EMPTY_SUMMARY = (provider: Provider): CostSummary => ({
  provider,
  weekly_cost: 0,
  monthly_cost: 0,
  total_cost: 0,
  total_tokens: 0,
});

export function useCosts(provider: Provider) {
  const [summary, setSummary] = useState<CostSummary>(EMPTY_SUMMARY(provider));

  useEffect(() => {
    const records = storage.get<CostRecord[]>(KEYS.costs(provider), []);
    if (records.length === 0) {
      setSummary(EMPTY_SUMMARY(provider));
      return;
    }

    const now = Date.now();
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    const monthMs = 30 * 24 * 60 * 60 * 1000;

    let weekly_cost = 0;
    let monthly_cost = 0;
    let total_cost = 0;
    let total_tokens = 0;

    for (const r of records) {
      const age = now - new Date(r.created_at).getTime();
      total_cost += r.cost_usd;
      total_tokens += r.tokens_input + r.tokens_output;
      if (age <= weekMs) weekly_cost += r.cost_usd;
      if (age <= monthMs) monthly_cost += r.cost_usd;
    }

    setSummary({ provider, weekly_cost, monthly_cost, total_cost, total_tokens });
  }, [provider]);

  return { summary, isLoading: false };
}

/** Cost total for a single conversation tab */
export function useConversationCost(conversationId: string | null): number {
  const [cost, setCost] = useState(0);

  useEffect(() => {
    if (!conversationId) return;
    // Sum costs across both providers for this conversation
    let total = 0;
    for (const provider of ["openai", "gemini"]) {
      const records = storage.get<CostRecord[]>(KEYS.costs(provider), []);
      for (const r of records) {
        if (r.conversation_id === conversationId) total += r.cost_usd;
      }
    }
    setCost(total);
  }, [conversationId]);

  return cost;
}
