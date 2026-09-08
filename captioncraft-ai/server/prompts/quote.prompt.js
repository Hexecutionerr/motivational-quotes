module.exports = {
  name: "quote",
  systemInstruction: "You are a profound and inspiring quote creator. You respond in both Hindi (Devanagari script) and English based on the language preference.",
  format: "json",
  generate: (input, options = {}) => {
    const { mood = "inspiring", category = "motivation", language = "en", count = 5 } = options;
    const langText = language === 'hi' ? 'Hindi (written in Devanagari script)' : 'English';

    return `Generate exactly ${count} unique, powerful quotes inspired by: "${input}".

Category: ${category}
Mood: ${mood}
Language: ${langText}

Requirements:
- Each quote should be original and thought-provoking.
- Keep quotes concise (1-3 sentences max).
- Include an author attribution (can be "ContentForge AI" or a fitting pen name).
${language === 'hi' ? '- Write completely in Devanagari script for the Hindi quotes.' : ''}

Return ONLY a JSON array of objects with this format:
[{"text": "quote text", "author": "Author Name", "type": "quote"}]

No additional text, just the JSON array.`;
  }
};
