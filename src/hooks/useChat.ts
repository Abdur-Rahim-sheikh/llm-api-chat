// src/hooks/useChat.ts
// YOU IMPLEMENT THIS (Step 3 + 4)
//
// This hook manages:
// - The list of messages in the current conversation
// - Sending a new message (calls /api/chat, saves to Supabase)
// - Loading conversation history from Supabase
// - isLoading / error state

import { useState } from "react";
import type { Message, Conversation, Settings } from "@/types";

export function useChat(conversation: Conversation | null, settings: Settings) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: Load messages from Supabase when conversation changes
  // useEffect(() => { ... load messages ... }, [conversation?.id])

  async function sendMessage(content: string): Promise<void> {
    if (!conversation) return;
    setIsLoading(true);
    setError(null);

    try {
      // TODO:
      // 1. Add user message to local state immediately (optimistic update)
      // 2. Call POST /api/chat with the message history
      // 3. Add assistant response to local state
      // 4. Save both messages to Supabase messages table
      // 5. Insert a cost_record to Supabase
      console.log("sendMessage not yet implemented", content);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { messages, isLoading, error, sendMessage };
}
