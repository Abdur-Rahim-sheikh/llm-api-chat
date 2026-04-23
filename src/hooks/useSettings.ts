// src/hooks/useSettings.ts
// YOU IMPLEMENT THIS (Step 2)
//
// This hook manages:
// - Loading settings from Supabase (or localStorage for quick start)
// - Saving updated settings

import { useState, useEffect } from "react";
import type { Settings, Provider } from "@/types";

const DEFAULT_SETTINGS: Settings = {
  openai_api_key: "",
  gemini_api_key: "",
  active_provider: "openai",
  openai_model: "gpt-4o-mini",
  gemini_model: "gemini-2.0-flash",
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);

  // QUICK START: Load from localStorage (replace with Supabase in Step 2)
  useEffect(() => {
    const saved = localStorage.getItem("llm-chat-settings");
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch {
        // ignore corrupt data
      }
    }
  }, []);

  async function saveSettings(updated: Partial<Settings>) {
    setIsSaving(true);
    const next = { ...settings, ...updated };
    setSettings(next);

    // QUICK START: Save to localStorage
    localStorage.setItem("llm-chat-settings", JSON.stringify(next));

    // TODO (Step 2): Replace localStorage with Supabase upsert:
    // await supabase.from("settings").upsert({ id: SETTINGS_ROW_ID, ...next });

    setIsSaving(false);
  }

  function switchProvider(provider: Provider) {
    saveSettings({ active_provider: provider });
  }

  return { settings, saveSettings, switchProvider, isSaving };
}
