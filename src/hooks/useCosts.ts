// src/hooks/useCosts.ts
// YOU IMPLEMENT THIS (Step 5)
//
// Queries Supabase cost_records and aggregates into weekly/monthly/total

import { useState, useEffect } from "react";
import type { CostSummary, Provider } from "@/types";

const EMPTY_SUMMARY: CostSummary = {
  provider: "openai",
  weekly_cost: 0,
  monthly_cost: 0,
  total_cost: 0,
  total_tokens: 0,
};

export function useCosts(provider: Provider) {
  const [summary, setSummary] = useState<CostSummary>({
    ...EMPTY_SUMMARY,
    provider,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // TODO: Query Supabase cost_records filtered by provider
    //
    // const now = new Date();
    // const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString();
    // const monthAgo = new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString();
    //
    // const { data } = await supabase
    //   .from("cost_records")
    //   .select("cost_usd, tokens_input, tokens_output, created_at")
    //   .eq("provider", provider);
    //
    // Then reduce data into weekly/monthly/total sums.
    setIsLoading(false);
  }, [provider]);

  return { summary, isLoading };
}

export function useConversationCost(conversationId: string | null) {
  const [cost, setCost] = useState(0);

  useEffect(() => {
    if (!conversationId) return;
    // TODO: Query cost_records where conversation_id = conversationId
    // sum up cost_usd
  }, [conversationId]);

  return cost;
}
