module.exports = {
  name: "youtube",
  systemInstruction: "You are an expert YouTube SEO and marketing copywriter. You specialize in video titles, high-retention descriptions, and tag optimization.",
  format: "json",
  generate: (input, options = {}) => {
    const { videoType = "tutorial", language = "en" } = options;
    const langText = language === 'hi' ? 'Hindi (written in Devanagari script)' : 'English';

    return `Generate high-SEO metadata for a YouTube video about: "${input}".

Video Type: ${videoType}
Language: ${langText}

Requirements:
- Generate exactly 3 highly clickable, search-optimized title variations. Include keywords and high click-through rate (CTR) hooks.
- Generate a comprehensive, SEO-friendly video description that includes a brief hook/summary, placeholders for social links, video sections (timestamps), and resources.
- Generate 5-8 relevant hashtags.
${language === 'hi' ? '- Write Hindi titles in Latin script or Devanagari script as preferred in Indian search trends. The description can be a mix of Hinglish and Hindi.' : ''}

Return ONLY a JSON array containing a single object with this format:
[{"titles": ["Title Option 1", "Title Option 2", "Title Option 3"], "description": "Full description text with section outlines", "hashtags": ["#tag1", "#tag2"], "type": "youtube"}]

No additional text, just the JSON array.`;
  }
};
