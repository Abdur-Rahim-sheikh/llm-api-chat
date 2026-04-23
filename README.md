### Pay as you go api lightweight conversation interface.

Let's say you have an api key, you want to make conversations using it.

Now you would need to build a backend interface or something to call it right.

But you just want to check or ask some quick questions using it.

Use this local and lightweight repo to utilize it.

### Features

1. Supports chatting with `Openai` and `Gemini`
2. approximate cost calculated per conversations.

### Steps to run it

1. Clone the repo

```bash
git clone https://github.com/Abdur-Rahim-sheikh/llm-api-chat.git
```

2. Install and run either with `npm` or `docker compose`
   - ```bash
     cd llm-api-chat
     npm install
     npm run dev
     ```

   - ```bash
      cd llm-api-chat
      docker compose up
     ```

3. Accessing it in browser, visit `localhost:3000`
4. Paste your api key from `settings` and choose which model you want to use.
