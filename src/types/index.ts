// src/types/index.ts
// Central place for ALL types in the app. Import from here everywhere.

export type Provider = "openai" | "gemini";

export type MessageRole = "user" | "assistant" | "system";

export interface Message {
  id: string;
  conversation_id: string;
  role: MessageRole;
  content: string;
  provider: Provider;
  model: string;
  tokens_input: number;
  tokens_output: number;
  cost_usd: number;
  created_at: string;
}

export interface Conversation {
  id: string;
  title: string;
  provider: Provider;
  model: string;
  created_at: string;
  updated_at: string;
  total_cost_usd: number;
  message_count: number;
}

export interface Settings {
  openai_api_key: string;
  gemini_api_key: string;
  active_provider: Provider;
  openai_model: string;
  gemini_model: string;
}

export interface CostRecord {
  id: string;
  conversation_id: string;
  provider: Provider;
  model: string;
  tokens_input: number;
  tokens_output: number;
  cost_usd: number;
  created_at: string;
}

export interface CostSummary {
  provider: Provider;
  weekly_cost: number;
  monthly_cost: number;
  total_cost: number;
  total_tokens: number;
}

// What we send to our API route
export interface ChatRequest {
  messages: { role: MessageRole; content: string }[];
  provider: Provider;
  model: string;
  conversation_id: string;
}

// What our API route sends back
export interface ChatResponse {
  content: string;
  tokens_input: number;
  tokens_output: number;
  cost_usd: number;
  model: string;
}
