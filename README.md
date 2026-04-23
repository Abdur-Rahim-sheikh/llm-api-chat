# LLM Chat — Multi-Provider AI Chat with Cost Tracking

A Next.js 14 app to chat with OpenAI (ChatGPT) and Google Gemini, with per-tab and aggregate cost tracking backed by Supabase.

---

## What's Built For You (UI Scaffold)
- ✅ Full chat layout with sidebar (tabs per conversation)
- ✅ Settings panel (provider switcher, API key inputs)
- ✅ Cost display per tab + weekly/monthly/total summary
- ✅ Message bubbles, streaming-ready input bar
- ✅ All Tailwind styling + design system

## What You'll Implement (Your Learning Path)

### Step 1 — Environment & Supabase Setup
**Learn first:** Next.js environment variables (`NEXT_PUBLIC_` prefix rules), Supabase JS client.
- [ ] Create `.env.local` with Supabase URL + anon key
- [ ] Run the SQL in `supabase/schema.sql` in your Supabase dashboard
- [ ] Fill in `src/lib/supabase.ts`

### Step 2 — Settings Persistence
**Learn first:** Next.js Server Actions OR simple API routes, `useState` + `useEffect` for forms.
- [ ] Save API keys to Supabase `settings` table (or localStorage for quick start)
- [ ] Load saved keys on app start in `useSettings` hook

### Step 3 — Chat Tabs (CRUD)
**Learn first:** React Context, Next.js App Router layouts.
- [ ] Create new chat tab → insert to `conversations` table
- [ ] Load conversation list on sidebar mount
- [ ] Delete tab → soft delete in DB

### Step 4 — Sending Messages & API Integration
**Learn first:** Next.js API Route Handlers (`app/api/.../route.ts`), streaming responses.
- [ ] Implement `app/api/chat/route.ts` — receives `{messages, provider, model}`
- [ ] OpenAI: use `openai` npm package, stream response
- [ ] Gemini: use `@google/generative-ai` npm package
- [ ] Save each message to `messages` table

### Step 5 — Cost Tracking
**Learn first:** Token counting, simple arithmetic, Supabase queries with filters.
- [ ] After each API response, calculate cost from token usage
- [ ] Insert cost record to `cost_records` table
- [ ] Aggregate in `useCosts` hook for display

### Step 6 — Polish
- [ ] Error handling (invalid key, rate limit, network)
- [ ] Loading skeletons
- [ ] Mobile responsiveness

---

## Project Structure
```
src/
  app/
    layout.tsx          ← Root layout, font loading
    page.tsx            ← Main chat page
    settings/
      page.tsx          ← Settings page
    api/
      chat/
        route.ts        ← YOU IMPLEMENT: API route for LLM calls
  components/
    chat/
      ChatWindow.tsx    ← Message list + input bar
      MessageBubble.tsx ← Individual message
      InputBar.tsx      ← Text input + send button
    sidebar/
      Sidebar.tsx       ← Conversation tab list
      TabItem.tsx       ← Single tab with cost badge
    settings/
      SettingsPanel.tsx ← Provider + key config
      CostSummary.tsx   ← Weekly/monthly/total costs
    ui/
      Button.tsx        ← Reusable button
      Badge.tsx         ← Cost/provider badges
  lib/
    supabase.ts         ← YOU IMPLEMENT: Supabase client
    openai.ts           ← YOU IMPLEMENT: OpenAI helper
    gemini.ts           ← YOU IMPLEMENT: Gemini helper
    costs.ts            ← Cost calculation constants
  hooks/
    useChat.ts          ← YOU IMPLEMENT: Chat state logic
    useSettings.ts      ← YOU IMPLEMENT: Settings CRUD
    useCosts.ts         ← YOU IMPLEMENT: Cost aggregation
  types/
    index.ts            ← All TypeScript types
supabase/
  schema.sql            ← Run this in Supabase SQL editor
```

---

## Running Locally
```bash
npm install
cp .env.example .env.local
# fill in your Supabase keys
npm run dev
```
