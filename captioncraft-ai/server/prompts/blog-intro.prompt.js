module.exports = {
  name: "blog-intro",
  systemInstruction: "You are a professional blog post copywriter. You write engaging, click-worthy introductions that hook readers.",
  format: "json",
  generate: (input, options = {}) => {
    const { tone = "Conversational" } = options;

    return `Write an engaging blog post introduction based on this topic: "${input}".

Tone: ${tone}

Requirements:
- Start with a compelling hook (a question, statistics, or counter-intuitive statement).
- Clearly define the problem the blog post will solve.
- End with a transition sentence that leads the reader into the body of the article.
- Keep it under 200 words.

Return ONLY a JSON array containing a single object with this format:
[{"text": "full blog post introduction paragraph", "type": "blog-intro"}]

No additional text, just the JSON array.`;
  }
};
