# 🗺️ ContentForge AI - Programmatic SEO (pSEO) Architecture Documentation

This document explains the scalable, programmatic SEO engine created for **ContentForge AI**, detailing folder changes, routing definitions, data structures, and how to scale the site with new categories and topics.

---

## 📂 Folder Structure

The pSEO engine components reside inside the client project folder:

```
client/src/
  ├── config/
  │     ├── tools.config.js                 # 🎛️ Tool configurations (SEO fallbacks)
  │     └── seoData.config.js               # 🗄️ pSEO category & topic dataset maps
  │
  ├── components/
  │     └── common/
  │           ├── SEO.jsx                   # 🌐 Head tags & JSON-LD Schema.org injector
  │           ├── Breadcrumbs.jsx           # 🍞 Navigation crumb builders
  │           └── InternalLinks.jsx         # 🔗 Categories, topics, & related tools grids
  │
  └── pages/
        └── ToolRunner.jsx                  # ⚙️ runner page loading params & assembling pSEO layouts
```

---

## 🌐 Dynamic Routing Configuration

Dynamic routes are registered in **[App.jsx](file:///c:/Users/Hasnain/Desktop/Motivational-quotes/captioncraft-ai/client/src/App.jsx#L65-L71)**. To prevent code duplication, we map nested variables to a single dynamic page component:

*   `/tools/:toolSlug` (e.g. `/tools/ai-caption-generator`)
*   `/tools/:toolSlug/:categorySlug` (e.g. `/tools/ai-caption-generator/fitness`)
*   `/tools/:toolSlug/:categorySlug/:topicSlug` (e.g. `/tools/ai-caption-generator/fitness/gym`)
*   `/tool/:slug` (Legacy fallback route kept for backward compatibility).

**[ToolRunner.jsx](file:///c:/Users/Hasnain/Desktop/Motivational-quotes/captioncraft-ai/client/src/pages/ToolRunner.jsx)** reads the active parameters, queries the pSEO dataset, and sets headers, breadcrumbs, schemas, and layouts dynamically.

---

## 🗄️ Data Structure

The dataset inside **[seoData.config.js](file:///c:/Users/Hasnain/Desktop/Motivational-quotes/captioncraft-ai/client/src/config/seoData.config.js)** is structured around two core objects:

1.  `seoCategories`: A master registry of categories. Each category defines a readable `name` and a `topics` object containing key-value pairs (slug ➡️ name).
2.  `toolSeoMapping`: Maps the tool slugs (e.g., `ai-caption-generator`) to an array of category keys they support (subset of `seoCategories`).

---

## 📋 Scale Guide

### 1. How to Add a New Category
Open **[seoData.config.js](file:///c:/Users/Hasnain/Desktop/Motivational-quotes/captioncraft-ai/client/src/config/seoData.config.js)**:
1.  Under the `seoCategories` object, insert your new category key and its topics:
    ```javascript
    "gaming": {
      name: "Gaming & Esports",
      topics: {
        "streaming": "Live Streaming",
        "rpg": "RPG Games",
        "retro": "Retro Gaming"
      }
    }
    ```
2.  Map this category to any supported tools under `toolSeoMapping`:
    ```javascript
    "ai-caption-generator": ["fitness", "travel", "gaming"]
    ```

### 2. How to Add a New Topic
Open **[seoData.config.js](file:///c:/Users/Hasnain/Desktop/Motivational-quotes/captioncraft-ai/client/src/config/seoData.config.js)**:
1.  Locate the target category inside `seoCategories` (e.g., `fitness`).
2.  Append your new topic slug and readable title to the `topics` object:
    ```javascript
    "fitness": {
      name: "Fitness",
      topics: {
        "gym": "Gym Workouts",
        "crossfit": "Crossfit Workouts" // <-- Added
      }
    }
    ```

---

## 🛡️ Structured Data & Crawl Safety

1.  **Crawler Indexing**: Breadcrumbs and category lists are dynamically linked via `Link` elements in **[InternalLinks.jsx](file:///c:/Users/Hasnain/Desktop/Motivational-quotes/captioncraft-ai/client/src/components/common/InternalLinks.jsx)**. This ensures search engines can traverse all permutations easily.
2.  **Structured JSON-LD Schema.org**: `<SEO />` automatically compiles and injects structured schema scripts:
    *   `BreadcrumbList`: Maps active breadcrumb navigation.
    *   `SoftwareApplication`: Identifies the current tool specifications and pricing details.
    *   `FAQPage`: Generates FAQ structures for search engine rich snippets.
3.  **Low Input Friction**: Prompt boxes are dynamically pre-filled when landing on nested routes, encouraging instant user interaction and increasing user sessions.
