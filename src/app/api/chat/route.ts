// src/app/api/chat/route.ts
// YOU IMPLEMENT THIS (Step 4)
//
// This is a Next.js Route Handler. It runs on the SERVER — never exposed to browser.
// This is where you safely use the API keys (they never leave the server).
//
// HOW IT WORKS:
// - Frontend sends POST { messages, provider, model, conversation_id }
// - This route picks the right LLM, calls it, returns the response + cost data
//
// import { NextRequest, NextResponse } from "next/server";
// import { callOpenAI } from "@/lib/openai";
// import { callGemini } from "@/lib/gemini";
// import type { ChatRequest } from "@/types";
//
// export async function POST(req: NextRequest) {
//   try {
//     const body: ChatRequest = await req.json();
//     const { messages, provider, model } = body;
//
//     // Get API key from request headers (sent by the frontend)
//     const apiKey = req.headers.get("x-api-key") ?? "";
//     if (!apiKey) {
//       return NextResponse.json({ error: "No API key provided" }, { status: 401 });
//     }
//
//     let result;
//     if (provider === "openai") {
//       result = await callOpenAI(messages, model, apiKey);
//     } else {
//       result = await callGemini(messages, model, apiKey);
//     }
//
//     return NextResponse.json(result);
//   } catch (error: any) {
//     console.error("Chat API error:", error);
//     return NextResponse.json(
//       { error: error.message ?? "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Chat API not implemented yet — see src/app/api/chat/route.ts" },
    { status: 501 }
  );
}
