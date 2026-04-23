import type { Provider } from "@/types";

export const MODEL_PRICING: Record<
	string,
	{ input_per_1m: number; output_per_1m: number }
> = {
	// OpenAI
	"gpt-4o": { input_per_1m: 2.5, output_per_1m: 10.0 },
	"gpt-4o-mini": { input_per_1m: 0.15, output_per_1m: 0.6 },
	"gpt-4-turbo": { input_per_1m: 10.0, output_per_1m: 30.0 },
	"gpt-3.5-turbo": { input_per_1m: 0.5, output_per_1m: 1.5 },
	// Gemini
	"gemini-1.5-pro": { input_per_1m: 1.25, output_per_1m: 5.0 },
	"gemini-1.5-flash": { input_per_1m: 0.075, output_per_1m: 0.3 },
	"gemini-2.0-flash": { input_per_1m: 0.1, output_per_1m: 0.4 },
};

export const AVAILABLE_MODELS: Record<
	Provider,
	{ id: string; label: string }[]
> = {
	openai: [
		{ id: "gpt-4o", label: "GPT-4o" },
		{ id: "gpt-4o-mini", label: "GPT-4o Mini (cheap)" },
		{ id: "gpt-4-turbo", label: "GPT-4 Turbo" },
		{ id: "gpt-3.5-turbo", label: "GPT-3.5 Turbo (cheapest)" },
	],
	gemini: [
		{ id: "gemini-2.0-flash", label: "Gemini 2.0 Flash" },
		{ id: "gemini-1.5-pro", label: "Gemini 1.5 Pro" },
		{ id: "gemini-1.5-flash", label: "Gemini 1.5 Flash (cheap)" },
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
