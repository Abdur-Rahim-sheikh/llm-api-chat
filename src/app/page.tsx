// src/app/page.tsx
"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { useSettings } from "@/hooks/useSettings";
import type { Conversation } from "@/types";

// Placeholder data so the UI renders before Supabase is wired up
const PLACEHOLDER_CONVERSATIONS: Conversation[] = [
  {
    id: "demo-1",
    title: "Explain async/await",
    provider: "openai",
    model: "gpt-4o-mini",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    total_cost_usd: 0.0014,
    message_count: 4,
  },
  {
    id: "demo-2",
    title: "Write a Python script",
    provider: "gemini",
    model: "gemini-2.0-flash",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    total_cost_usd: 0.0003,
    message_count: 6,
  },
];

export default function HomePage() {
  const { settings, saveSettings } = useSettings();

  // TODO (Step 3): Replace with Supabase data + useConversations() hook
  const [conversations, setConversations] = useState<Conversation[]>(PLACEHOLDER_CONVERSATIONS);
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeConversation = conversations.find((c) => c.id === activeId) ?? null;

  function handleNewChat() {
    // TODO (Step 3): Insert to Supabase conversations table, then set as active
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

  function handleDeleteConversation(id: string) {
    // TODO (Step 3): Delete from Supabase
    setConversations((prev) => prev.filter((c) => c.id !== id));
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
        <ChatWindow conversation={activeConversation} />
      </main>
    </div>
  );
}
