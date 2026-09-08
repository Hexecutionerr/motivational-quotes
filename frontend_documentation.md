# 🎨 ContentForge AI - Reusable SaaS Frontend Architecture Documentation

This document explains the scalable, configuration-driven frontend architecture created for **ContentForge AI**, detailing folder layouts, dynamic routing, reusable components, and how to scale the platform with new tools.

---

## 📂 Folder Structure

The tools architecture lives inside the client React folder:

```
client/src/
  ├── config/
  │     └── tools.config.js                 # 🎛️ Tool configurations, default outputs, & settings
  │
  ├── components/
  │     └── tools/                          # 📦 Reusable Presentation Components
  │           ├── ToolCard.jsx              # Card representing a single tool (dynamic icon rendering)
  │           ├── ToolLayout.jsx            # Two-column layout grid wrapper
  │           ├── ToolForm.jsx              # Inputs, textarea prompts, and settings selects
  │           ├── ToolOutput.jsx            # Generated outputs viewer
  │           ├── OutputActions.jsx         # Copy, download, and share actions
  │           ├── SearchBar.jsx             # Text filter input
  │           ├── CategoryFilter.jsx        # Category tab selector
  │           └── LoadingSkeleton.jsx       # Pulse animations for text generation loading
  │
  └── pages/
        ├── ToolsHub.jsx                    # 🏢 Tools Dashboard (Search & Filters)
        └── ToolRunner.jsx                  # ⚙️ Generic Runner (Loads configs from url slug parameters)
```

---

## 📦 Reusable Components

We avoided duplicating logic or markup by building modular presentation components:
*   **[ToolCard.jsx](file:///c:/Users/Hasnain/Desktop/Motivational-quotes/captioncraft-ai/client/src/components/tools/ToolCard.jsx)**: Dynamically maps the string in `tool.icon` to a React element using `import * as Icons from 'lucide-react'`.
*   **[ToolLayout.jsx](file:///c:/Users/Hasnain/Desktop/Motivational-quotes/captioncraft-ai/client/src/components/tools/ToolLayout.jsx)**: Implements standard headers and responsive grid divisions (Left for configuration inputs, Right for output screens).
*   **[ToolForm.jsx](file:///c:/Users/Hasnain/Desktop/Motivational-quotes/captioncraft-ai/client/src/components/tools/ToolForm.jsx)**: Renders standard prompts and loops through settings configurations to generate option dropdown selectors.
*   **[ToolOutput.jsx](file:///c:/Users/Hasnain/Desktop/Motivational-quotes/captioncraft-ai/client/src/components/tools/ToolOutput.jsx)**: Coordinates loading status skeletons, fallback empty states, and standard action buttons.
*   **[OutputActions.jsx](file:///c:/Users/Hasnain/Desktop/Motivational-quotes/captioncraft-ai/client/src/components/tools/OutputActions.jsx)**: Standardized handlers for browser clipping (`navigator.clipboard`), file downloads (`Blob` creation), and social sharing (`navigator.share`).

---

## ⚙️ Dynamic Routing & Config

Rather than writing 15 separate pages, all pages are driven by a single config file:
1.  **[App.jsx](file:///c:/Users/Hasnain/Desktop/Motivational-quotes/captioncraft-ai/client/src/App.jsx#L25)** maps `/tool/:slug` to the dynamic page `ToolRunner.jsx`.
2.  **[ToolRunner.jsx](file:///c:/Users/Hasnain/Desktop/Motivational-quotes/captioncraft-ai/client/src/pages/ToolRunner.jsx)** uses React Router's `useParams` to fetch the slug, queries **[tools.config.js](file:///c:/Users/Hasnain/Desktop/Motivational-quotes/captioncraft-ai/client/src/config/tools.config.js)** to get the correct properties, and feeds details directly into the reusable layout elements.

---

## ⏱️ Add a New AI Tool in Under 2 Minutes

To add a new tool (e.g., `CSS Generator`):

### Step 1: Add Configuration in `tools.config.js`
Open **[tools.config.js](file:///c:/Users/Hasnain/Desktop/Motivational-quotes/captioncraft-ai/client/src/config/tools.config.js)** and append a new object:
```javascript
  {
    id: "css-gen",
    slug: "css-generator",
    title: "AI CSS Generator",
    description: "Write raw design tokens and get optimized Tailwind CSS or Vanilla CSS utilities.",
    icon: "Code",
    category: "SEO",
    placeholder: "Describe the styling rules (e.g., 'Center a div with a glowing purple shadow')...",
    defaultOutput: "/* Generated CSS */\n.centered-glow {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 20px rgba(139, 92, 246, 0.45);\n}",
    settings: [
      { name: "format", label: "Format", type: "select", options: ["Vanilla CSS", "Tailwind CSS"] }
    ]
  }
```

### Step 2: Test the Page
Navigate to: `/tool/css-generator`  
*That's it!* The tools dashboard will automatically display the card in the "SEO" tab, and clicking it will open a fully-functional input/output layout.
