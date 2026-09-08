// Programmatic SEO data definitions mapping Tools -> Categories -> Topics
// Enables generating 10,000+ optimized landing pages dynamically.

export const seoCategories = {
  "fitness": {
    name: "Fitness",
    topics: {
      "gym": "Gym Workouts",
      "cardio": "Cardio Training",
      "nutrition": "Nutrition & Diet",
      "motivation": "Fitness Motivation",
      "yoga": "Yoga & Mindfulness"
    }
  },
  "travel": {
    name: "Travel",
    topics: {
      "adventure": "Adventure Travel",
      "backpacking": "Backpacking & Budget",
      "luxury": "Luxury Destinations",
      "vlog": "Travel Vlogging",
      "tips": "Packing & Travel Hacks"
    }
  },
  "love": {
    name: "Love & Relationships",
    topics: {
      "dating": "Dating Advice",
      "marriage": "Marriage & Partners",
      "anniversary": "Anniversary Ideas",
      "friendship": "Friendship & Bonds"
    }
  },
  "food": {
    name: "Food & Cooking",
    topics: {
      "recipes": "Cooking Recipes",
      "restaurants": "Restaurant Reviews",
      "baking": "Baking & Desserts",
      "vegan": "Vegan & Healthy Eating"
    }
  },
  "business": {
    name: "Business & Marketing",
    topics: {
      "startups": "Startup Growth",
      "copywriting": "Copywriting Hacks",
      "seo": "Search Engine Optimization",
      "sales": "Sales Conversion",
      "branding": "Brand Strategy"
    }
  },
  "photography": {
    name: "Photography & Design",
    topics: {
      "editing": "Photo Editing",
      "portraits": "Portrait Photography",
      "gear": "Camera & Lens Gear",
      "uiux": "UI/UX Design"
    }
  },
  "fashion": {
    name: "Fashion & Style",
    topics: {
      "streetwear": "Streetwear Outfits",
      "formal": "Formal Dress Codes",
      "trends": "Seasonal Trends",
      "accessories": "Bags & Accessories"
    }
  },
  "selfie": {
    name: "Selfies & Personal",
    topics: {
      "aesthetic": "Aesthetic Selfies",
      "savage": "Savage & Witty",
      "mirror": "Mirror Photos",
      "candid": "Candid Snapshots"
    }
  },
  "nature": {
    name: "Nature & Outdoors",
    topics: {
      "hiking": "Hiking & Trails",
      "sunsets": "Sunsets & Sunrises",
      "camping": "Camping & Survival",
      "animals": "Wildlife & Pets"
    }
  },
  "motivation": {
    name: "Motivation & Mindset",
    topics: {
      "success": "Success Mindset",
      "discipline": "Self-Discipline",
      "overcoming": "Overcoming Obstacles",
      "goals": "Goal Setting"
    }
  }
};

// Map tools to their specific categories (subset of categories above)
export const toolSeoMapping = {
  "ai-caption-generator": ["fitness", "travel", "love", "food", "selfie", "nature", "motivation"],
  "ai-quote-generator": ["love", "nature", "motivation", "business"],
  "instagram-bio-generator": ["fitness", "travel", "business", "selfie", "fashion"],
  "linkedin-post-generator": ["business", "motivation"],
  "youtube-title-generator": ["travel", "food", "business", "photography", "fitness"],
  "hashtag-generator": ["travel", "fitness", "food", "fashion", "photography"],
  "hook-generator": ["business", "fitness", "travel", "food"],
  "product-description-generator": ["business", "fashion", "food"],
  "email-writer": ["business"],
  "tweet-generator": ["business", "motivation", "photography"],
  "reel-script-generator": ["fitness", "travel", "food", "business"],
  "blog-intro-generator": ["business", "travel", "fitness", "food"],
  "blog-conclusion-generator": ["business", "travel", "fitness", "food"],
  "ai-rewrite-tool": ["business", "motivation"],
  "grammar-fixer": ["business"]
};

/**
 * Returns dynamic SEO information for a combination of Tool, Category, and Topic.
 * Autofalls back to dynamic templates if specific copy is not declared.
 */
export const getSeoMetadata = (toolConfig, categorySlug, topicSlug) => {
  if (!toolConfig) return null;

  const toolName = toolConfig.title;
  const categoryName = categorySlug && seoCategories[categorySlug] ? seoCategories[categorySlug].name : '';
  const topicName = (categorySlug && topicSlug && seoCategories[categorySlug]?.topics[topicSlug])
    ? seoCategories[categorySlug].topics[topicSlug]
    : '';

  // Base dynamic builds
  let title = toolConfig.seoTitle || `${toolName} - ContentForge AI`;
  let description = toolConfig.seoDescription || toolConfig.description;
  let keywords = [toolConfig.title.toLowerCase(), 'ai generator', 'copywriting', 'contentforge'];

  if (categoryName) {
    keywords.push(categoryName.toLowerCase());
    if (topicName) {
      keywords.push(topicName.toLowerCase());
      title = `Best AI ${toolName} for ${categoryName} (${topicName}) | ContentForge`;
      description = `Need the perfect ${toolName.toLowerCase()} about ${topicName.toLowerCase()}? Use ContentForge AI to write highly-optimized content for ${categoryName}.`;
    } else {
      title = `AI ${toolName} for ${categoryName} posts | ContentForge`;
      description = `Generate high-quality ${toolName.toLowerCase()} copy optimized for ${categoryName} categories. Free tools for creators.`;
    }
  }

  return {
    title,
    description,
    keywords: keywords.join(', '),
    canonical: window.location.href,
    toolName,
    categoryName,
    topicName
  };
};
