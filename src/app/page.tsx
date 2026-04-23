// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { useSettings } from "@/hooks/useSettings";
import { storage, KEYS } from "@/lib/storage";
import type { Conversation } from "@/types";

export default function HomePage() {
	const { settings } = useSettings();
	const [conversations, setConversations] = useState<Conversation[]>([]);
	const [activeId, setActiveId] = useState<string | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);
	// Load conversations from localStorage on mount
	useEffect(() => {
		const saved = storage.get<Conversation[]>(KEYS.conversations, []);
		setConversations(saved);
		if (saved.length > 0) setActiveId(saved[0].id);
		setIsLoaded(true);
	}, []);

	// Persist conversations whenever they change
	useEffect(() => {
		if (!isLoaded) return;
		storage.set(KEYS.conversations, conversations);
	}, [conversations, isLoaded]);

	const activeConversation =
		conversations.find(
			(c) => c.id === activeId && c.provider === settings.active_provider,
		) ?? null;

	function handleNewChat() {
		const newConv: Conversation = {
			id: crypto.randomUUID(),
			title: "New Chat",
			provider: settings.active_provider,
			model:
				settings.active_provider === "openai"
					? settings.openai_model
					: settings.gemini_model,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			total_cost_usd: 0,
			message_count: 0,
		};
		setConversations((prev) => [newConv, ...prev]);
		setActiveId(newConv.id);
	}
	function updateConversation(id: string, updates: Partial<Conversation>) {
		setConversations((prev) =>
			prev.map((c) =>
				c.id === id
					? { ...c, ...updates, updated_at: new Date().toISOString() }
					: c,
			),
		);
	}
	function handleDeleteConversation(id: string) {
		setConversations((prev) => prev.filter((c) => c.id !== id));
		// Also clean up messages for this conversation
		storage.remove(KEYS.messages(id));
		if (activeId === id) setActiveId(null);
	}

	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar
				conversations={conversations}
				activeId={activeId}
				settings={settings}
				onSelectConversation={setActiveId}
				onNewChat={handleNewChat}
				onDeleteConversation={handleDeleteConversation}
			/>
			<main className="flex-1 flex flex-col overflow-hidden bg-zinc-950">
				<ChatWindow
					conversation={activeConversation}
					onUpdateConversation={updateConversation}
				/>
			</main>
		</div>
	);
}
