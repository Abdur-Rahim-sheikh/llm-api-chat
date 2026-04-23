// src/lib/storage.ts
// Thin wrappers around localStorage so all keys are in one place.
// If you ever want to swap to Supabase later, only this file changes.

export const storage = {
  get<T>(key: string, fallback: T): T {
    if (typeof window === "undefined") return fallback;
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  },

  set(key: string, value: unknown): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key: string): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  },
};

// All localStorage keys live here — no magic strings scattered around the app
export const KEYS = {
  settings: "llm-chat:settings",
  conversations: "llm-chat:conversations",
  messages: (convId: string) => `llm-chat:messages:${convId}`,
  costs: (provider: string) => `llm-chat:costs:${provider}`,
};
