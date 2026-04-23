// src/components/chat/ChatWindow.tsx
"use client";

import { useEffect, useRef } from "react";
import { MessageBubble, TypingIndicator } from "./MessageBubble";
import { InputBar } from "./InputBar";
import { ProviderBadge } from "@/components/ui/Badge";
import type { Conversation, Message } from "@/types";
import { useChat } from "@/hooks/useChat";
import { useSettings } from "@/hooks/useSettings";
import { formatCost } from "@/lib/costs";

interface ChatWindowProps {
	conversation: Conversation | null;
	onUpdateConversation: (id: string, updates: Partial<Conversation>) => void;
}

function EmptyState() {
	return (
		<div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-8">
			<div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
				<svg
					viewBox="0 0 24 24"
					className="w-8 h-8 text-zinc-600"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
					/>
				</svg>
			</div>
			<div>
				<p className="text-zinc-400 font-medium">No conversation selected</p>
				<p className="text-zinc-600 text-sm mt-1">
					Create a new chat from the sidebar to get started.
				</p>
			</div>
		</div>
	);
}

function NoApiKeyState({ provider }: { provider: string }) {
	return (
		<div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-8">
			<div className="w-16 h-16 rounded-2xl bg-amber-950/40 border border-amber-800/40 flex items-center justify-center">
				<svg
					viewBox="0 0 24 24"
					className="w-8 h-8 text-amber-500"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
					/>
				</svg>
			</div>
			<div>
				<p className="text-zinc-300 font-medium">API key required</p>
				<p className="text-zinc-500 text-sm mt-1">
					Add your {provider === "openai" ? "OpenAI" : "Gemini"} API key in
					Settings to start chatting.
				</p>
			</div>
		</div>
	);
}

export function ChatWindow({
	conversation,
	onUpdateConversation,
}: ChatWindowProps) {
	const { settings } = useSettings();
	const { messages, isLoading, error, sendMessage } = useChat(
		conversation,
		settings,
	);
	const bottomRef = useRef<HTMLDivElement>(null);

	// Scroll to bottom when new messages arrive
	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, isLoading]);

	const handleSend = async (content: string) => {
		await sendMessage(content);
		if (
			(conversation && conversation.title == "New Chat") ||
			messages.length === 0
		) {
			const snippet =
				content.trim().slice(0, 15) + (content.length > 15 ? "..." : "");
			onUpdateConversation(conversation?.id!, { title: snippet });
		}
	};

	const activeKey =
		settings.active_provider === "openai"
			? settings.openai_api_key
			: settings.gemini_api_key;

	const hasApiKey = !!activeKey;

	return (
		<div className="flex flex-col h-full">
			{/* Header */}
			{conversation && (
				<div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-sm">
					<div className="flex items-center gap-3 min-w-0">
						<h2 className="text-sm font-semibold text-zinc-200 truncate">
							{conversation.title}
						</h2>
						<ProviderBadge provider={conversation.provider} />
						<span className="text-xs font-mono text-zinc-600 hidden sm:block">
							{conversation.model}
						</span>
					</div>
					<div className="flex items-center gap-2 flex-shrink-0">
						{conversation.total_cost_usd > 0 && (
							<span className="text-xs font-mono text-amber-500/80">
								{formatCost(conversation.total_cost_usd)} this chat
							</span>
						)}
					</div>
				</div>
			)}

			{/* Body */}
			{!conversation ? (
				<EmptyState />
			) : !hasApiKey ? (
				<NoApiKeyState provider={settings.active_provider} />
			) : (
				<>
					<div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
						{messages.length === 0 && (
							<div className="text-center py-12">
								<p className="text-zinc-600 text-sm">
									Send a message to begin.
								</p>
							</div>
						)}
						{messages.map((msg) => (
							<MessageBubble key={msg.id} message={msg} />
						))}
						{isLoading && (
							<TypingIndicator provider={settings.active_provider} />
						)}
						{error && (
							<div className="mx-auto max-w-md bg-red-950/40 border border-red-800/50 rounded-xl px-4 py-3 text-sm text-red-400">
								<strong>Error:</strong> {error}
							</div>
						)}
						<div ref={bottomRef} />
					</div>

					<InputBar
						onSend={handleSend}
						isLoading={isLoading}
						provider={settings.active_provider}
					/>
				</>
			)}
		</div>
	);
}
