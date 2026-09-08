module.exports = {
  name: "caption",
  systemInstruction: "You are a creative social media caption expert. You respond in both Hindi (written in Devanagari script) and English based on the language preference.",
  format: "json",
  generate: (input, options = {}) => {
    const { platform = "Instagram", mood = "inspiring", category = "general", language = "en", count = 5 } = options;
    const langText = language === 'hi' ? 'Hindi (written in Devanagari script)' : 'English';
    
    return `Generate exactly ${count} unique, engaging ${platform} captions for a post about: "${input}".

Topic/Category: ${category}
Mood: ${mood}
Language: ${langText}

Requirements:
- Each caption should include appropriate emojis.
- Include 3-5 relevant hashtags per caption.
- Make them catchy and optimized for social engagement.
${language === 'hi' ? '- Write completely in Devanagari script for the Hindi captions.' : ''}

Return ONLY a JSON array of objects with this format:
[{"text": "caption text with emojis", "hashtags": ["tag1", "tag2"], "type": "caption"}]

No additional text, just the JSON array.`;
  }
};
