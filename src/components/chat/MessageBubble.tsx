// src/components/chat/MessageBubble.tsx
import type { Message } from "@/types";
import { ProviderBadge } from "@/components/ui/Badge";
import { formatCost } from "@/lib/costs";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: Message;
  isStreaming?: boolean;
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function MessageBubble({ message, isStreaming }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 animate-slide-up",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold",
          isUser
            ? "bg-teal-500 text-zinc-950"
            : "bg-zinc-800 text-zinc-300 border border-zinc-700"
        )}
      >
        {isUser ? "U" : "AI"}
      </div>

      {/* Bubble */}
      <div
        className={cn(
          "max-w-[75%] flex flex-col gap-1",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "px-4 py-3 rounded-2xl text-sm leading-relaxed",
            isUser
              ? "bg-teal-500/10 border border-teal-500/20 text-zinc-100 rounded-tr-sm"
              : "bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-sm"
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div
              className="prose-chat"
              dangerouslySetInnerHTML={{ __html: message.content }}
            />
          )}
          {isStreaming && (
            <span className="inline-block w-1.5 h-4 ml-1 bg-teal-400 rounded-sm cursor-blink" />
          )}
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-2 px-1">
          <span className="text-xs text-zinc-600">{formatTime(message.created_at)}</span>
          {!isUser && (
            <>
              <ProviderBadge provider={message.provider} />
              {message.cost_usd > 0 && (
                <span className="text-xs font-mono text-amber-600">
                  {formatCost(message.cost_usd)}
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/** Shown while the AI is typing */
export function TypingIndicator({ provider }: { provider: "openai" | "gemini" }) {
  return (
    <div className="flex gap-3 animate-slide-up">
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300">
        AI
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" />
      </div>
    </div>
  );
}
