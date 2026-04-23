import { NextRequest, NextResponse } from "next/server";
import { callOpenAI } from "@/lib/openai";
import { callGemini } from "@/lib/gemini";
import type { ChatRequest } from "@/types";

export async function POST(req: NextRequest) {
	try {
		const body: ChatRequest = await req.json();
		const { messages, provider, model } = body;

		const apiKey = req.headers.get("x-api-key") ?? "";
		if (!apiKey) {
			return NextResponse.json(
				{ error: "No API key provided" },
				{ status: 401 },
			);
		}

		const result =
			provider === "openai"
				? await callOpenAI(messages, model, apiKey)
				: await callGemini(messages, model, apiKey);

		return NextResponse.json(result);
	} catch (error: any) {
		console.error("Chat API error:", error);
		return NextResponse.json(
			{ error: error.message ?? "Internal server error" },
			{ status: 500 },
		);
	}
}

// import { NextResponse } from "next/server";

// export async function POST() {
//   return NextResponse.json(
//     { error: "Chat API not implemented yet — see src/app/api/chat/route.ts" },
//     { status: 501 }
//   );
// }
