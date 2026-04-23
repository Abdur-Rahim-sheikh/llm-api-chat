// src/components/sidebar/Sidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { TabItem } from "./TabItem";
import { CostSummary } from "@/components/settings/CostSummary";
import { Button } from "@/components/ui/Button";
import type { Conversation, Provider, Settings } from "@/types";
import { cn } from "@/lib/utils";

interface SidebarProps {
	conversations: Conversation[];
	activeId: string | null;
	settings: Settings;
	onSelectConversation: (id: string) => void;
	onNewChat: () => void;
	onDeleteConversation: (id: string) => void;
}

export function Sidebar({
	conversations,
	activeId,
	settings,
	onSelectConversation,
	onNewChat,
	onDeleteConversation,
}: SidebarProps) {
	const [costTab, setCostTab] = useState<Provider>(settings.active_provider);
	const filteredConversation = conversations.filter(
		(c) => c.provider === settings.active_provider,
	);
	return (
		<aside className="w-64 flex-shrink-0 flex flex-col h-full bg-zinc-950 border-r border-zinc-800/60">
			{/* Logo */}
			<div className="px-4 py-4 border-b border-zinc-800/60">
				<div className="flex items-center gap-2.5">
					<div className="w-7 h-7 rounded-lg bg-teal-500 flex items-center justify-center">
						<svg
							viewBox="0 0 24 24"
							className="w-4 h-4 text-zinc-950"
							fill="currentColor">
							<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
						</svg>
					</div>
					<span className="font-bold text-zinc-100 text-sm tracking-tight">
						LLM Chat
					</span>
				</div>
			</div>

			{/* Active provider indicator */}
			<div className="px-3 pt-3">
				<div
					className={cn(
						"flex items-center gap-2 px-3 py-2 rounded-xl text-xs border",
						settings.active_provider === "openai"
							? "bg-emerald-950/40 border-emerald-800/40 text-emerald-400"
							: "bg-blue-950/40 border-blue-800/40 text-blue-400",
					)}>
					<span
						className={cn(
							"w-1.5 h-1.5 rounded-full",
							settings.active_provider === "openai"
								? "bg-emerald-400"
								: "bg-blue-400",
						)}
					/>
					<span className="font-medium">
						{settings.active_provider === "openai" ? "OpenAI" : "Gemini"}
					</span>
					<span className="text-zinc-600 ml-auto">
						{settings.active_provider === "openai"
							? settings.openai_model
							: settings.gemini_model}
					</span>
				</div>
			</div>

			{/* New Chat button */}
			<div className="px-3 pt-2">
				<Button onClick={onNewChat} className="w-full" size="sm">
					<svg
						viewBox="0 0 24 24"
						className="w-4 h-4"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 4.5v15m7.5-7.5h-15"
						/>
					</svg>
					New Chat
				</Button>
			</div>

			{/* Conversation list */}
			<div className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
				{filteredConversation.length === 0 ? (
					<p className="text-center text-xs text-zinc-700 py-6 px-4">
						No conversations yet.
						<br />
						Hit New Chat to begin.
					</p>
				) : (
					filteredConversation.map((conv) => (
						<TabItem
							key={conv.id}
							conversation={conv}
							isActive={conv.id === activeId}
							onSelect={() => onSelectConversation(conv.id)}
							onDelete={onDeleteConversation}
						/>
					))
				)}
			</div>

			{/* Cost summary at bottom */}
			<div className="px-3 pb-3 space-y-2 border-t border-zinc-800/60 pt-3">
				{/* Provider tabs for cost */}
				<div className="flex rounded-lg bg-zinc-900 p-0.5 gap-0.5">
					{(["openai", "gemini"] as Provider[]).map((p) => (
						<button
							key={p}
							onClick={() => setCostTab(p)}
							className={cn(
								"flex-1 py-1 text-xs rounded-md transition-colors font-medium",
								costTab === p
									? "bg-zinc-700 text-zinc-100"
									: "text-zinc-500 hover:text-zinc-300",
							)}>
							{p === "openai" ? "OpenAI" : "Gemini"}
						</button>
					))}
				</div>

				<CostSummary provider={costTab} />

				{/* Settings link */}
				<Link
					href="/settings"
					className="flex items-center gap-2 px-3 py-2 rounded-xl text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 text-sm transition-colors">
					<svg
						viewBox="0 0 24 24"
						className="w-4 h-4"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.8">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
					Settings
				</Link>
			</div>
		</aside>
	);
}
