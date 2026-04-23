import type { Provider } from "@/types";

export const MODEL_PRICING: Record<
	string,
	{ input_per_1m: number; output_per_1m: number }
> = {
	// OpenAI
	"gpt-5.2": { input_per_1m: 1.75, output_per_1m: 14.0 },
	"gpt-5-mini": { input_per_1m: 0.25, output_per_1m: 2.0 },
	"gpt-5-nano": { input_per_1m: 0.05, output_per_1m: 0.4 },
	// Gemini
	"gemini-3.1-pro-preview": { input_per_1m: 2.0, output_per_1m: 12.0 },
	"gemini-3.1-flash-lite-preview": { input_per_1m: 0.25, output_per_1m: 1.5 },
	"gemini-2.5-flash-lite": { input_per_1m: 0.1, output_per_1m: 0.4 },
};

export const AVAILABLE_MODELS: Record<
	Provider,
	{ id: string; label: string }[]
> = {
	openai: [
		{ id: "gpt-5.2", label: "GPT-5.2 (premium)" },
		{ id: "gpt-5-mini", label: "GPT-5 Mini" },
		{ id: "gpt-5-nano", label: "GPT-5 Nano (cheapest)" },
	],
	gemini: [
		{ id: "gemini-3.1-pro-preview", label: "Gemini 3.1 Pro (Premium)" },
		{ id: "gemini-3.1-flash-lite-preview", label: "Gemini 3.1 Flash Lite" },
		{ id: "gemini-2.5-flash-lite", label: "Gemini 2.5 Flash Lite (cheap)" },
	],
};

/**
 * Calculate cost in USD given token counts and model name.
 * Returns 0 if model not found in pricing table.
 */
export function calculateCost(
	model: string,
	tokens_input: number,
	tokens_output: number,
): number {
	const pricing = MODEL_PRICING[model];
	if (!pricing) return 0;
	const inputCost = (tokens_input / 1_000_000) * pricing.input_per_1m;
	const outputCost = (tokens_output / 1_000_000) * pricing.output_per_1m;
	return inputCost + outputCost;
}

/** Format a USD cost for display — shows 4 decimals for tiny amounts */
export function formatCost(usd: number): string {
	if (usd === 0) return "$0.00";
	if (usd < 0.001) return `$${usd.toFixed(6)}`;
	if (usd < 0.01) return `$${usd.toFixed(4)}`;
	return `$${usd.toFixed(4)}`;
}
