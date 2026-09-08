module.exports = {
  name: "hashtag",
  systemInstruction: "You are a social media search engine optimization (SEO) and hashtag strategist.",
  format: "json",
  generate: (input, options = {}) => {
    const { density = "Medium (8-12)" } = options;
    const count = density.includes("High") ? 18 : density.includes("Low") ? 5 : 10;

    return `Generate exactly ${count} highly targeted, trending hashtags related to these keywords: "${input}".

Requirements:
- Provide hashtags that are relevant to the niche.
- Mix high-competition (viral) and low-competition (niche-specific) tags for optimal organic discovery.
- Print all hashtags separated by spaces.

Return ONLY a JSON array containing a single object with this format:
[{"text": "#tag1 #tag2 #tag3", "hashtags": ["tag1", "tag2"], "type": "hashtag"}]

No additional text, just the JSON array.`;
  }
};
