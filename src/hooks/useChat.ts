"use client";

import { useState, useEffect } from "react";
import { storage, KEYS } from "@/lib/storage";
import type { Message, Conversation, Settings } from "@/types";

export function useChat(conversation: Conversation | null, settings: Settings) {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Load messages from localStorage when conversation changes
	useEffect(() => {
		if (!conversation) {
			setMessages([]);
			return;
		}
		const saved = storage.get<Message[]>(KEYS.messages(conversation.id), []);
		setMessages(saved);
	}, [conversation?.id]);

	async function sendMessage(content: string): Promise<void> {
		if (!conversation) return;
		setIsLoading(true);
		setError(null);

		const activeKey =
			settings.active_provider === "openai"
				? settings.openai_api_key
				: settings.gemini_api_key;

		// Build the user message and add it immediately (optimistic update)
		const userMessage: Message = {
			id: crypto.randomUUID(),
			conversation_id: conversation.id,
			role: "user",
			content,
			provider: settings.active_provider,
			model:
				settings.active_provider === "openai"
					? settings.openai_model
					: settings.gemini_model,
			tokens_input: 0,
			tokens_output: 0,
			cost_usd: 0,
			created_at: new Date().toISOString(),
		};

		const updatedWithUser = [...messages, userMessage];
		setMessages(updatedWithUser);

		try {
			// Call our Next.js API route — it runs on the server and calls OpenAI/Gemini
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": activeKey,
				},
				body: JSON.stringify({
					messages: updatedWithUser.map((m) => ({
						role: m.role,
						content: m.content,
					})),
					provider: settings.active_provider,
					model:
						settings.active_provider === "openai"
							? settings.openai_model
							: settings.gemini_model,
					conversation_id: conversation.id,
				}),
			});

			if (!response.ok) {
				const err = await response.json();
				throw new Error(err.error ?? `HTTP ${response.status}`);
			}

			const result = await response.json();

			const assistantMessage: Message = {
				id: crypto.randomUUID(),
				conversation_id: conversation.id,
				role: "assistant",
				content: result.content,
				provider: settings.active_provider,
				model: result.model,
				tokens_input: result.tokens_input,
				tokens_output: result.tokens_output,
				cost_usd: result.cost_usd,
				created_at: new Date().toISOString(),
			};

			const finalMessages = [...updatedWithUser, assistantMessage];
			setMessages(finalMessages);

			// Persist messages to localStorage
			storage.set(KEYS.messages(conversation.id), finalMessages);

			// Append cost record
			const costKey = KEYS.costs(settings.active_provider);
			const existingCosts = storage.get<object[]>(costKey, []);
			storage.set(costKey, [
				...existingCosts,
				{
					id: crypto.randomUUID(),
					conversation_id: conversation.id,
					provider: settings.active_provider,
					model: result.model,
					tokens_input: result.tokens_input,
					tokens_output: result.tokens_output,
					cost_usd: result.cost_usd,
					created_at: new Date().toISOString(),
				},
			]);
		} catch (err: any) {
			// Roll back the optimistic user message on failure
			setMessages(messages);
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	}

	return { messages, isLoading, error, sendMessage };
}
