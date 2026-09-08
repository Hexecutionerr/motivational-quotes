# 🔗 ContentForge AI - MVP Integration & API Flow Documentation

This document explains the dynamic connection between the React + Tailwind frontend dashboard and the Express + Node.js centralized AI Engine, detailing folder changes, the request lifecycle, and how new tools scale automatically.

---

## 📂 Folder Changes & New Components

The integration introduced a unified API client, environment setups, and feedback indicators:

```
client/
  ├── .env                              # ⚙️ Vite configuration (defines VITE_API_URL)
  └── src/
        ├── services/
        │     └── api.js                # 🌐 Reusable Axios API client containing generateContent()
        ├── components/
        │     └── common/
        │           └── Toast.jsx       # 🔔 Premium Framer Motion toast notification popups
        └── pages/
              └── ToolRunner.jsx        # ⚙️ runner page invoking axios, handling aborts, error states, and toasts

server/
  └── prompts/                          # 📝 Added 10 prompt templates to complete all 15 tools:
        ├── instagram-bio.prompt.js
        ├── hashtag.prompt.js
        ├── product-desc.prompt.js
        ├── email.prompt.js
        ├── tweet.prompt.js
        ├── reel-script.prompt.js
        ├── blog-intro.prompt.js
        ├── blog-conclusion.prompt.js
        ├── rewrite.prompt.js
        └── grammar-fixer.prompt.js
```

---

## 🔄 Request Lifecycle

When a user interacts with any AI generator:

```
[User Clicks Generate]
         │
         ▼
[Cancel active request via AbortController.abort()]
         │
         ▼
[Disable Generate Button & Show Loading Skeleton]
         │
         ▼
[Validate: input exists and is <= 1000 characters]
         │
         ▼
[POST /api/ai/generate payload: { tool, input, options }]
         │
         ├───► [Success (200)] ──► Render Output, Enable actions (Copy/Download), Trigger Toast
         │
         └───► [Error (500/Network)] ──► Render Alert Block with Retry Button, Trigger Toast
```

1.  **Duplicate Safety**: If a user submits a prompt while a previous generation is active, the frontend triggers `.abort()` on the previous request's `AbortController` signal, instantly canceling it at the network layer and preventing UI state collisions.
2.  **Telemetry & Skeletons**: Setting inputs disables form controls and displays shimmering skeletons.
3.  **Success/Errors**: Responses are dynamically parsed (e.g., extracting JSON arrays or rendering multiline paragraphs). Network issues or empty outputs display a warning card with an interactive "Retry" button.

---

## ⏱️ Scale in under 2 minutes (Zero Frontend Code)

Because both the frontend layouts and backend endpoints are configuration-driven, adding a new tool requires **no frontend react changes at all**:

1.  **Register Frontend Metadata**: Add the tool definition to `tools.config.js`:
    ```javascript
    {
      id: "cold-call",
      slug: "cold-call-script",
      title: "AI Cold Call script",
      description: "Generate cold call pitches with objection-handling techniques.",
      icon: "PhoneCall",
      category: "Business",
      placeholder: "Describe target prospect and product value...",
      defaultOutput: "Hey [Name], quick question..."
    }
    ```
2.  **Register Backend Prompt**: Create `server/prompts/cold-call.prompt.js`:
    ```javascript
    module.exports = {
      name: "cold-call",
      systemInstruction: "You are a professional sales training coach.",
      format: "json",
      generate: (input, options) => `Create a cold call script for: ${input}`
    };
    ```
*Done!* The dashboard automatically displays the new tool, maps `/tool/cold-call-script` route, and routes requests to the new backend prompt file.
