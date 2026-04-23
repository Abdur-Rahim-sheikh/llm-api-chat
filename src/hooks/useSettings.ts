"use client";

import { useState, useEffect } from "react";
import { storage, KEYS } from "@/lib/storage";
import { AVAILABLE_MODELS } from "@/lib/costs";
import type { Settings, Provider } from "@/types";

const DEFAULT_SETTINGS: Settings = {
	openai_api_key: "",
	gemini_api_key: "",
	active_provider: "openai",
	openai_model: AVAILABLE_MODELS.openai.at(-1)!.id,
	gemini_model: AVAILABLE_MODELS.gemini.at(-1)!.id,
};

export function useSettings() {
	const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		const saved = storage.get<Settings>(KEYS.settings, DEFAULT_SETTINGS);
		setSettings(saved);
	}, []);

	async function saveSettings(updated: Partial<Settings>) {
		setIsSaving(true);
		const next = { ...settings, ...updated };
		setSettings(next);
		storage.set(KEYS.settings, next);
		await new Promise((r) => setTimeout(r, 300));
		setIsSaving(false);
	}

	function switchProvider(provider: Provider) {
		saveSettings({ active_provider: provider });
	}

	return { settings, saveSettings, switchProvider, isSaving };
}
