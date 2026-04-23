// src/lib/gemini.ts
// YOU IMPLEMENT THIS (Step 4)
//
// Instructions:
// 1. npm install @google/generative-ai
// 2. Implement the function below
//
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { calculateCost } from "./costs";
// import type { ChatResponse } from "@/types";
//
// export async function callGemini(
//   messages: { role: string; content: string }[],
//   model: string,
//   apiKey: string
// ): Promise<ChatResponse> {
//   const genAI = new GoogleGenerativeAI(apiKey);
//   const geminiModel = genAI.getGenerativeModel({ model });
//
//   // Gemini uses a different history format — separate last user message
//   const history = messages.slice(0, -1).map((m) => ({
//     role: m.role === "assistant" ? "model" : "user",
//     parts: [{ text: m.content }],
//   }));
//
//   const chat = geminiModel.startChat({ history });
//   const lastMessage = messages[messages.length - 1].content;
//   const result = await chat.sendMessage(lastMessage);
//   const response = result.response;
//
//   const content = response.text();
//   const tokens_input = response.usageMetadata?.promptTokenCount ?? 0;
//   const tokens_output = response.usageMetadata?.candidatesTokenCount ?? 0;
//   const cost_usd = calculateCost(model, tokens_input, tokens_output);
//
//   return { content, tokens_input, tokens_output, cost_usd, model };
// }

export async function callGemini(): Promise<never> {
  throw new Error("Gemini not implemented yet — see src/lib/gemini.ts");
}
