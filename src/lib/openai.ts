// src/lib/openai.ts
// YOU IMPLEMENT THIS (Step 4)
//
// Instructions:
// 1. npm install openai
// 2. Implement the function below
//
// import OpenAI from "openai";
// import { calculateCost } from "./costs";
// import type { ChatResponse } from "@/types";
//
// export async function callOpenAI(
//   messages: { role: string; content: string }[],
//   model: string,
//   apiKey: string
// ): Promise<ChatResponse> {
//   const client = new OpenAI({ apiKey });
//
//   const response = await client.chat.completions.create({
//     model,
//     messages: messages as any,
//   });
//
//   const content = response.choices[0].message.content ?? "";
//   const tokens_input = response.usage?.prompt_tokens ?? 0;
//   const tokens_output = response.usage?.completion_tokens ?? 0;
//   const cost_usd = calculateCost(model, tokens_input, tokens_output);
//
//   return { content, tokens_input, tokens_output, cost_usd, model };
// }

export async function callOpenAI(): Promise<never> {
  throw new Error("OpenAI not implemented yet — see src/lib/openai.ts");
}
