// src/components/settings/SettingsPanel.tsx
"use client";

import { useState } from "react";
import { useSettings } from "@/hooks/useSettings";
import { Button } from "@/components/ui/Button";
import { AVAILABLE_MODELS } from "@/lib/costs";
import { cn } from "@/lib/utils";
import type { Provider } from "@/types";

function ApiKeyInput({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  hint?: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-zinc-300">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 font-mono focus:outline-none focus:border-teal-600 transition-colors pr-10"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          {show ? (
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </button>
      </div>
      {hint && <p className="text-xs text-zinc-600">{hint}</p>}
    </div>
  );
}

function ModelSelect({
  provider,
  value,
  onChange,
}: {
  provider: Provider;
  value: string;
  onChange: (v: string) => void;
}) {
  const models = AVAILABLE_MODELS[provider];
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-zinc-300">
        Default model
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-teal-600 transition-colors"
      >
        {models.map((m) => (
          <option key={m.id} value={m.id}>
            {m.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function SettingsPanel() {
  const { settings, saveSettings, isSaving } = useSettings();
  const [activeTab, setActiveTab] = useState<Provider>("openai");

  // Local form state
  const [openaiKey, setOpenaiKey] = useState(settings.openai_api_key);
  const [geminiKey, setGeminiKey] = useState(settings.gemini_api_key);
  const [openaiModel, setOpenaiModel] = useState(settings.openai_model);
  const [geminiModel, setGeminiModel] = useState(settings.gemini_model);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    await saveSettings({
      openai_api_key: openaiKey,
      gemini_api_key: geminiKey,
      openai_model: openaiModel,
      gemini_model: geminiModel,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Provider tabs */}
      <div className="flex gap-1 bg-zinc-900 rounded-xl p-1">
        {(["openai", "gemini"] as Provider[]).map((p) => (
          <button
            key={p}
            onClick={() => setActiveTab(p)}
            className={cn(
              "flex-1 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === p
                ? p === "openai"
                  ? "bg-emerald-950 text-emerald-400 border border-emerald-800/50"
                  : "bg-blue-950 text-blue-400 border border-blue-800/50"
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            {p === "openai" ? "OpenAI / ChatGPT" : "Google Gemini"}
          </button>
        ))}
      </div>

      {activeTab === "openai" && (
        <div className="space-y-4">
          <ApiKeyInput
            label="OpenAI API Key"
            value={openaiKey}
            onChange={setOpenaiKey}
            placeholder="sk-..."
            hint="Get your key at platform.openai.com/api-keys"
          />
          <ModelSelect
            provider="openai"
            value={openaiModel}
            onChange={setOpenaiModel}
          />
        </div>
      )}

      {activeTab === "gemini" && (
        <div className="space-y-4">
          <ApiKeyInput
            label="Gemini API Key"
            value={geminiKey}
            onChange={setGeminiKey}
            placeholder="AIza..."
            hint="Get your key at aistudio.google.com/app/apikey"
          />
          <ModelSelect
            provider="gemini"
            value={geminiModel}
            onChange={setGeminiModel}
          />
        </div>
      )}

      {/* Active provider selector */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-zinc-300">Active Provider</label>
        <p className="text-xs text-zinc-600">New chats will use this provider by default.</p>
        <div className="flex gap-2 mt-2">
          {(["openai", "gemini"] as Provider[]).map((p) => (
            <button
              key={p}
              onClick={() => saveSettings({ active_provider: p })}
              className={cn(
                "flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all",
                settings.active_provider === p
                  ? p === "openai"
                    ? "bg-emerald-950/60 border-emerald-700 text-emerald-400"
                    : "bg-blue-950/60 border-blue-700 text-blue-400"
                  : "bg-zinc-900 border-zinc-700 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600"
              )}
            >
              {settings.active_provider === p && (
                <span className="mr-2">✓</span>
              )}
              {p === "openai" ? "OpenAI" : "Gemini"}
            </button>
          ))}
        </div>
      </div>

      <Button onClick={handleSave} isLoading={isSaving} className="w-full">
        {saved ? "✓ Saved!" : "Save Settings"}
      </Button>

      {/* Security note */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 text-xs text-zinc-500 space-y-1">
        <p className="font-medium text-zinc-400">🔒 Security note</p>
        <p>
          API keys are stored locally in your browser (localStorage) by default.
          After completing Step 2, they'll be saved in your Supabase database.
          Keys are sent to the server only when making API calls — never exposed in the browser.
        </p>
      </div>
    </div>
  );
}
