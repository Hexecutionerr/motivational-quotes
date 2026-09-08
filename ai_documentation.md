# 🤖 ContentForge AI - Centralized AI Engine Documentation

This document explains the architecture, provider failover management, prompt template system, and how to expand the AI capabilities of the **ContentForge AI** platform.

---

## 📂 Folder Structure

The AI Engine resides cleanly inside the backend server project under the following structure:

```
captioncraft-ai/server/
  ├── prompts/                              # 📝 Center for Prompt Templates
  │     ├── caption.prompt.js               # Caption generator prompt
  │     ├── quote.prompt.js                 # Quote generator prompt
  │     ├── linkedin.prompt.js              # LinkedIn post architect prompt
  │     ├── hook.prompt.js                  # Video hook variations prompt
  │     └── youtube.prompt.js               # YouTube SEO tags, titles, desc prompt
  │
  └── services/
        └── ai/                             # ⚙️ Core AI Service Layer
              ├── providers/                # 🔌 AI Client Adapters
              │     ├── baseProvider.js     # Abstract class defining Provider interface
              │     ├── geminiProvider.js   # Adapter for Google Gemini SDK (Primary)
              │     ├── groqProvider.js     # Adapter for Groq API (Fallback)
              │     └── openrouterProvider.js # Adapter for OpenRouter API (Fallback)
              │
              ├── providerManager.js        # 🔀 Fallover/Failover Pipeline Orchestrator
              └── aiService.js              # 🌐 Reusable Entry Service
```

---

## 🔌 Provider Manager & Failover Chain

The **Provider Manager** ([providerManager.js](file:///c:/Users/Hasnain/Desktop/Motivational-quotes/captioncraft-ai/server/services/ai/providerManager.js)) regulates API keys and fallbacks chronologically:
1.  It checks `.env` for active keys: `GEMINI_API_KEY`, `GROQ_API_KEY`, `OPENROUTER_API_KEY` and loads corresponding adapters.
2.  Upon receiving a generation request, it tries the pipeline order: **Google Gemini ➡️ Groq ➡️ OpenRouter**.
3.  If a provider fails or hits its limit, it logs the error, records the execution time, and tries the next provider.
4.  Only if all providers fail will it return a structured 500 error.

### Example Logs:
*   *Successful Gemini Request:*
    `✅ [AI Service] Provider: Google Gemini | Status: Success | Time: 1200ms`
*   *Gemini Failure ➡️ Groq Success:*
    `❌ [AI Service] Provider: Google Gemini | Status: Failed | Error: API Key expired | Time: 150ms`
    `🔌 [AI Service] Attempting generation with provider: Groq...`
    `✅ [AI Service] Provider: Groq | Status: Success | Time: 800ms`

---

## 📝 Prompt Template System

Prompts are separated from controllers and routes to guarantee modularity. Every prompt template in `prompts/` (e.g., [caption.prompt.js](file:///c:/Users/Hasnain/Desktop/Motivational-quotes/captioncraft-ai/server/prompts/caption.prompt.js)) exports:
-   `name`: Identity identifier.
-   `systemInstruction`: Setting the AI context (system role).
-   `format`: Expected output type (`json` or `text`).
-   `generate(input, options)`: Function compiling variables into the final user prompt.

---

## ⏱️ Add a New AI Tool in Under 5 Minutes

To add a new generation tool (e.g., `tweet` thread generator):

### Step 1: Create the Prompt Template
Create `captioncraft-ai/server/prompts/tweet.prompt.js`:
```javascript
module.exports = {
  name: "tweet",
  systemInstruction: "You are a professional Twitter/X ghostwriter.",
  format: "json",
  generate: (input, options = {}) => {
    const count = options.count || 3;
    return `Create a thread of exactly ${count} educational tweets about: "${input}". 
Optimize for engagement and line spacing.
Return a JSON array: [{"text": "tweet content", "index": 1, "type": "tweet"}]`;
  }
};
```

### Step 2: Use the Generic Endpoint
From your frontend, execute a `POST` request to `/api/ai/generate`:
```json
{
  "tool": "tweet",
  "input": "React Server Components architecture",
  "options": {
    "count": 4
  }
}
```
*That's it!* The backend automatically resolves the template, handles failovers, and returns clean parsed JSON output.
