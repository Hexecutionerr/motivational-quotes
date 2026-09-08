// Configuration file for ContentForge AI generation tools.
// Easy to scale: to add a new tool, simply append its configuration object to this array.

export const toolsConfig = [
  {
    id: "caption",
    slug: "ai-caption-generator",
    title: "AI Caption Generator",
    description: "Generate highly engaging, copy-paste-ready captions with targeted hashtags and optimal emojis.",
    icon: "Sparkles",
    category: "Social",
    placeholder: "Explain your post image or theme (e.g., 'Indie hacker launching a new SaaS platform on Twitter')...",
    defaultOutput: "Building in public just got real! 🚀 We're launching ContentForge AI today—the ultimate copywriting sandbox for creators and developers. Less writer's block, more shipping. Check it out!\n\n#indiehackers #saas #buildinpublic #solopreneur #ai",
    seoTitle: "AI Social Media Caption Generator",
    seoDescription: "Create viral captions for Instagram, Facebook, and Twitter instantly with our AI Caption Writer.",
    settings: [
      { name: "platform", label: "Platform", type: "select", options: ["Instagram", "Facebook", "Twitter", "LinkedIn"] },
      { name: "mood", label: "Mood", type: "select", options: ["Inspiring", "Casual", "Professional", "Savage"] }
    ]
  },
  {
    id: "quote",
    slug: "ai-quote-generator",
    title: "AI Quote Generator",
    description: "Create original, profound, and thought-provoking quotes with custom author attributions.",
    icon: "Quote",
    category: "Writing",
    placeholder: "Describe the underlying theme of the quote (e.g., 'Failure leads to success')...",
    defaultOutput: "\"The standard you walk past is the standard you accept. In failure, we do not discover defeat; we discover the boundary of our current reach.\"\n\n— ContentForge AI",
    seoTitle: "AI Quote Maker & Caption Generator",
    seoDescription: "Create deep, motivational, and philosophical quotes with smart attributions using AI.",
    settings: [
      { name: "mood", label: "Mood", type: "select", options: ["Philosophical", "Motivational", "Poetic", "Witty"] },
      { name: "language", label: "Language", type: "select", options: ["English", "Hindi"] }
    ]
  },
  {
    id: "instagram-bio",
    slug: "instagram-bio-generator",
    title: "Instagram Bio Generator",
    description: "Design professional, punchy Instagram bios that clearly state your value proposition.",
    icon: "Camera",
    category: "Social",
    placeholder: "Tell us about yourself (e.g., 'Developer building web apps, loves coffee, based in India')...",
    defaultOutput: "💻 Building the future of SaaS, one deploy at a time\n☕ Fueled by clean code & espresso\n🇮🇳 Based in Mumbai\n👇 Start generating copy for free here!",
    seoTitle: "AI Instagram Bio Creator",
    seoDescription: "Upgrade your social profile branding with professional and creative bio options.",
    settings: [
      { name: "style", label: "Style", type: "select", options: ["Creative", "Minimalist", "Professional", "Emoji-Rich"] }
    ]
  },
  {
    id: "linkedin",
    slug: "linkedin-post-generator",
    title: "LinkedIn Post Generator",
    description: "Write structured LinkedIn updates featuring strong hooks and professional insights.",
    icon: "Linkedin",
    category: "Social",
    placeholder: "Explain the professional insight or milestone (e.g., 'Leaving my 9-5 job to build my startup full-time')...",
    defaultOutput: "I just quit my comfortable 9-to-5 job.\n\nHere is why it was the easiest decision of my life:\n\n1. Regret minimization beats security. I would rather fail building my own dream than succeed building someone else's.\n2. Leverage. Standard corporate employment doesn't scale; digital assets do.\n3. Community. The indie hacker ecosystem is alive and collaborative.\n\nAre you building something on the side? Let's connect.\n\n#solopreneur #startups #indiehackers #growth",
    seoTitle: "AI LinkedIn Thought Leadership Post Builder",
    seoDescription: "Generate professional LinkedIn content updates with viral hooks and readable list spacings.",
    settings: [
      { name: "tone", label: "Tone", type: "select", options: ["Thought Leadership", "Casual", "Educational", "Contrarian"] }
    ]
  },
  {
    id: "youtube-title",
    slug: "youtube-title-generator",
    title: "YouTube Title Generator",
    description: "Generate highly clickable, SEO-friendly video titles based on search intent.",
    icon: "Youtube",
    category: "SEO",
    placeholder: "Enter video topic or script outline (e.g., 'Learn React clean architecture in 10 minutes')...",
    defaultOutput: "1. The React Architecture Code You'll ACTUALLY Use (Clean Code Guide)\n2. STOP Writing Messy React: Build Clean Dashboards in 10 Mins!\n3. React Clean Architecture: The Junior vs. Senior Developer Comparison",
    seoTitle: "YouTube Video Title & SEO Tag Generator",
    seoDescription: "Optimize video metadata, click-through rates, and tags using search data analysis.",
    settings: [
      { name: "niche", label: "Video Type", type: "select", options: ["Tutorial", "Review/Vlog", "Case Study", "Clickbait"] }
    ]
  },
  {
    id: "hashtag",
    slug: "hashtag-generator",
    title: "Hashtag Generator",
    description: "Find trending, niche-specific hashtags to increase reach and watch-time.",
    icon: "Hash",
    category: "SEO",
    placeholder: "Enter core keywords (e.g., 'React Tailwind SaaS UI')...",
    defaultOutput: "#reactjs #tailwindcss #saas #uiux #webdevelopment #indiehackers #frontend #css3 #buildinpublic #javascript",
    seoTitle: "Trending Instagram & Video Hashtag Finder",
    seoDescription: "Extract density-optimized trending tags based on core niche keywords to lift organic traffic.",
    settings: [
      { name: "density", label: "Density", type: "select", options: ["High (15-20)", "Medium (8-12)", "Low (3-5)"] }
    ]
  },
  {
    id: "hook",
    slug: "hook-generator",
    title: "Hook Generator",
    description: "Craft powerful, high-retention video hooks for Reels, Shorts, and TikToks.",
    icon: "Video",
    category: "Social",
    placeholder: "What is your video about? (e.g., 'Tips to avoid CSS errors')...",
    defaultOutput: "Option 1 (Fear Hook): \"If you're still using margin: 0 auto to center divs, you're breaking your layouts. Stop doing this.\"\n\nOption 2 (Curiosity Hook): \"I tested all CSS centering layouts so you don't have to. Here is the only one that doesn't break.\"\n\nOption 3 (Value Hook): \"Centered divs in React in under 2 seconds. Add flex, items-center, justify-center. Done.\"",
    seoTitle: "Short Form Video Hook Architect",
    seoDescription: "Build spoken scripts, fear hooks, and curiosity headlines designed to prevent scrolling.",
    settings: [
      { name: "style", label: "Hook Angle", type: "select", options: ["Curiosity", "Fear/Warning", "Contrarian", "Value-First"] }
    ]
  },
  {
    id: "product-desc",
    slug: "product-description-generator",
    title: "Product Description Generator",
    description: "Generate persuasive e-commerce descriptions focused on values and CTAs.",
    icon: "ShoppingBag",
    category: "Business",
    placeholder: "Describe product features and target audience (e.g., 'Leather wallet with RFID protection for travelers')...",
    defaultOutput: "Meet the Nomad Shield Wallet. Handcrafted from premium full-grain leather, this minimalist card wallet is designed for modern travelers. Equipped with aerospace-grade RFID shielding, it protects your financial credentials from contactless theft while maintaining a sleek, front-pocket profile. Holds up to 8 cards and folded cash. Travel light, travel safe.",
    seoTitle: "AI E-commerce Product Description Copywriter",
    seoDescription: "Increase conversions on Shopify or Amazon with benefit-oriented sales text copy builders.",
    settings: [
      { name: "length", label: "Length", type: "select", options: ["Short & Punchy", "Detailed Features", "Bullet Points"] }
    ]
  },
  {
    id: "email",
    slug: "email-writer",
    title: "Email Writer",
    description: "Draft high-converting cold outreach, sales pitches, or follow-up letters.",
    icon: "Mail",
    category: "Business",
    placeholder: "Specify email objective and recipient (e.g., 'Cold outreach to potential clients for web development')...",
    defaultOutput: "Subject: Quick question regarding your landing page design\n\nHi [Name],\n\nI came across your site recently and noticed that the load times are slightly lagging, which might be impacting your bounce rates.\n\nI specialize in building high-speed React and Tailwind web applications. I put together a quick 2-minute audit detailing how you can optimize your CSS pipeline for faster loads. Can I send it over?\n\nBest regards,\n[Your Name]\n[Link/Portfolio]",
    seoTitle: "AI Cold Email outreach writer",
    seoDescription: "Draft structured sales templates and follow-ups with high reply rates instantly.",
    settings: [
      { name: "objective", label: "Type", type: "select", options: ["Cold Outreach", "Follow Up", "Product Launch", "Newsletter"] }
    ]
  },
  {
    id: "tweet",
    slug: "tweet-generator",
    title: "Tweet Generator",
    description: "Create highly shareable tweets, hooks, and micro-threads.",
    icon: "Twitter",
    category: "Social",
    placeholder: "What do you want to tweet? (e.g., 'Writing clean React code')...",
    defaultOutput: "React tips for junior devs: \n\n1. Keep components under 150 lines. \n2. Move business logic to custom hooks. \n3. Use conditional rendering carefully. \n\nYour future self will thank you. 🚀",
    seoTitle: "Twitter Thread & Tweet Ghostwriter",
    seoDescription: "Build shareable tweets and educational value threads to lift social impressions.",
    settings: [
      { name: "style", label: "Style", type: "select", options: ["Thread Hook", "Short Quote", "Hot Take", "Bullet Points"] }
    ]
  },
  {
    id: "reel-script",
    slug: "reel-script-generator",
    title: "Reel Script Generator",
    description: "Structure a full 30-60 second short-form video script including cues.",
    icon: "FileText",
    category: "Social",
    placeholder: "Describe video theme (e.g., 'How DNS works for beginners')...",
    defaultOutput: "[0-5s] Hook: \"Ever wondered what happens when you type google.com into your browser? It's not magic, it's DNS.\"\n\n[5-20s] Body: \"Think of DNS as the phonebook of the internet. Computers use IP addresses like 142.250.190.46, but humans like names. The DNS translates the name to the IP address in milliseconds.\"\n\n[20-30s] Call to Action: \"If this made tech simple, hit follow for more!\"",
    seoTitle: "TikTok, Reels, and Shorts Script Generator",
    seoDescription: "Structure time-cued conversational script options for viral visual media formats.",
    settings: [
      { name: "duration", label: "Duration", type: "select", options: ["30 Seconds", "60 Seconds"] }
    ]
  },
  {
    id: "blog-intro",
    slug: "blog-intro-generator",
    title: "Blog Intro Generator",
    description: "Construct engaging blog introductions featuring strong hooks.",
    icon: "FileText",
    category: "Writing",
    placeholder: "Explain your blog topic (e.g., 'Why CSS is harder than backend development')...",
    defaultOutput: "We've all been there: you change a single margin value, and suddenly, the entire page layout breaks. For years, backend developers have mocked CSS as 'not real programming.' But when it comes to layout stability, viewport scaling, and performance budget, CSS is arguably one of the most complex subsystems a developer has to master. In this article, we'll explain why CSS is challenging, and how clean design tokens will save your sanity.",
    seoTitle: "Blog Introduction Copywriter",
    seoDescription: "Kickstart your blog content with engaging hooks and clear problem outlines.",
    settings: [
      { name: "tone", label: "Tone", type: "select", options: ["Conversational", "Professional", "Bold", "Analytical"] }
    ]
  },
  {
    id: "blog-conclusion",
    slug: "blog-conclusion-generator",
    title: "Blog Conclusion Generator",
    description: "Write compelling blog post conclusions with strong final CTAs.",
    icon: "FileText",
    category: "Writing",
    placeholder: "Summarize your article theme (e.g., 'Benefits of coding in React vs. Vue')...",
    defaultOutput: "Ultimately, the choice between React and Vue doesn't come down to performance benchmarks; it comes down to team size and ecosystem alignment. If you want modular flexibility and an expansive community, React is your choice. If you prefer structured guidelines and a gentler learning curve, Vue wins. The best framework is the one that helps your team ship features quickly. What framework are you starting your next project with?",
    seoTitle: "Blog Conclusion and CTA Writer",
    seoDescription: "Summarize blog article takeaways and frame engaging action triggers for readers.",
    settings: [
      { name: "cta", label: "Call to Action", type: "select", options: ["Question", "Sign Up Prompt", "Newsletter Push"] }
    ]
  },
  {
    id: "rewrite",
    slug: "ai-rewrite-tool",
    title: "AI Rewrite Tool",
    description: "Rephrase, rewrite, or adjust the tone of your existing sentences.",
    icon: "RefreshCw",
    category: "Writing",
    placeholder: "Paste text you want to rewrite...",
    defaultOutput: "Option 1 (Professional): \"I am writing to inquire if you have received our previous design proposal, and if you have any questions.\"\n\nOption 2 (Casual): \"Hey! Just checking in to see if you got our design draft. Let me know if you want to chat!\"\n\nOption 3 (Persuasive): \"Did you get a chance to check out our design layout? I'd love to show you how it will speed up your dev pipeline.\"",
    seoTitle: "AI Sentence Rewriter & Tone Adjuster",
    seoDescription: "Rephrase existing text for professional clarity, minimalist styles, or sales copy.",
    settings: [
      { name: "targetTone", label: "Target Tone", type: "select", options: ["Professional", "Casual", "Persuasive", "Minimalist"] }
    ]
  },
  {
    id: "grammar-fixer",
    slug: "grammar-fixer",
    title: "Grammar Fixer",
    description: "Instantly check and correct grammatical, spelling, and style errors.",
    icon: "CheckCircle",
    category: "Writing",
    placeholder: "Paste the text with errors (e.g., 'i goes to store yesturday for buy food')...",
    defaultOutput: "Corrected Text:\n\"I went to the store yesterday to buy food.\"\n\nFixes Made:\n- Capitalized \"I\"\n- Changed \"goes\" to \"went\" (past tense alignment)\n- Corrected spelling: \"yesturday\" -> \"yesterday\"\n- Fixed preposition: \"for buy\" -> \"to buy\"",
    seoTitle: "AI Grammar Checker & Spell Corrector",
    seoDescription: "Instantly correct structural spelling and stylistic errors with clear outline explanations.",
    settings: [
      { name: "detailLevel", label: "Explanation Detail", type: "select", options: ["List of Changes", "Corrected Text Only"] }
    ]
  }
];

export const getToolBySlug = (slug) => {
  return toolsConfig.find(t => t.slug === slug);
};

export const getToolsByCategory = (category) => {
  if (category === 'All') return toolsConfig;
  return toolsConfig.filter(t => t.category === category);
};
