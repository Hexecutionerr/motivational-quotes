module.exports = {
  name: "linkedin",
  systemInstruction: "You are a professional B2B copywriter and LinkedIn thought leader. You specialize in viral corporate storytelling and professional advice.",
  format: "json",
  generate: (input, options = {}) => {
    const { tone = "professional", industry = "technology", keyTakeaways = [] } = options;
    const takeawaysText = keyTakeaways.length > 0 ? `Key points to cover:\n${keyTakeaways.map(t => `- ${t}`).join('\n')}` : '';

    return `Generate a high-converting, professional LinkedIn post based on this topic: "${input}".

Tone: ${tone}
Industry: ${industry}
${takeawaysText}

Requirements:
- Start with a strong, curiosity-driven hook in the first 1-2 sentences.
- Use plenty of line breaks (white space) for readability.
- Use bullet points or emojis for listed items (keep it professional).
- End with a call-to-action (CTA) to encourage comments or engagement.
- Include 3-5 relevant industry hashtags at the very bottom.

Return ONLY a JSON array containing a single object with this format:
[{"text": "full linkedin post text with spacing", "hook": "the hook sentence used", "hashtags": ["tag1", "tag2"], "type": "linkedin"}]

No additional text, just the JSON array.`;
  }
};
