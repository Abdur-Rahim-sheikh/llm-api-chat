# LLM Chat — Multi-Provider AI Chat with Cost Tracking

A Next.js 14 app to chat with OpenAI (ChatGPT) and Google Gemini.
Stores everything in **localStorage** — no backend, no database, no signup.

---

## Features
- Switch between OpenAI and Gemini per-conversation
- Cost tracking per tab + weekly / monthly / all-time totals
- Full conversation history that persists across page reloads
- Settings page for API keys + model selection

---

## What's Built For You (UI + storage layer)
- ✅ Full chat layout — sidebar, tabs, message bubbles, input bar
- ✅ Settings panel — provider switcher, API key inputs, model selector
- ✅ Cost display — per tab and aggregate summary
- ✅ `useSettings` — saves/loads from localStorage, fully working
- ✅ `useCosts` — aggregates cost records from localStorage
- ✅ `page.tsx` — conversations persisted to localStorage
- ✅ `src/lib/storage.ts` — thin wrapper so all localStorage keys are in one place

## What You'll Implement

### Step 1 — Wire up the API route
**File:** `src/app/api/chat/route.ts`
**Learn:** Next.js Route Handlers — how `app/api/*/route.ts` becomes a POST endpoint.
- Uncomment the code in the file, it's all written — just needs the imports active

### Step 2 — OpenAI integration
**File:** `src/lib/openai.ts`
```bash
npm install openai
```
- Uncomment and implement `callOpenAI(messages, model, apiKey)`

### Step 3 — Gemini integration
**File:** `src/lib/gemini.ts`
```bash
npm install @google/generative-ai
```
- Uncomment and implement `callGemini(messages, model, apiKey)`

### Step 4 — Auto-title conversations
After the first message in a new chat, update the conversation title
to the first 40 chars of the user's message.

---

## Running Locally
```bash
npm install
npm run dev
# Open http://localhost:3000
# Go to Settings and add your API keys
```

No `.env` file needed. No database. Just `npm install` and go.
