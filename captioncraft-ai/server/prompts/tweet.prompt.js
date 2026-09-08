module.exports = {
  name: "tweet",
  systemInstruction: "You are a professional Twitter/X ghostwriter and micro-blogging expert. You excel at spacing, value delivery, and hooks.",
  format: "json",
  generate: (input, options = {}) => {
    const { style = "Bullet Points" } = options;

    return `Create a highly shareable tweet or micro-thread based on this input: "${input}".

Tweet Style: ${style}

Requirements:
- Optimize for high readability using line breaks and minimal, impactful emojis.
- Deliver maximum value or curiosity in under 280 characters.
- Ensure the text fits Twitter's constraints.

Return ONLY a JSON array containing a single object with this format:
[{"text": "tweet content text", "type": "tweet"}]

No additional text, just the JSON array.`;
  }
};
