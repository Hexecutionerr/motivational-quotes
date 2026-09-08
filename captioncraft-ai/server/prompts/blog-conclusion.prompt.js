module.exports = {
  name: "blog-conclusion",
  systemInstruction: "You are a professional blog post copywriter. You write memorable conclusions that drive action.",
  format: "json",
  generate: (input, options = {}) => {
    const { cta = "Question" } = options;

    return `Write a powerful blog post conclusion based on this topic and summary: "${input}".

Call to Action Type: ${cta}

Requirements:
- Summarize the main takeaways of the article without repeating them verbatim.
- Conclude with a strong final thought or warning.
- End with the specified Call to Action (e.g. ask a thought-provoking question, prompt a signup, or push a newsletter subscription).

Return ONLY a JSON array containing a single object with this format:
[{"text": "full blog post conclusion paragraph with call to action", "type": "blog-conclusion"}]

No additional text, just the JSON array.`;
  }
};
