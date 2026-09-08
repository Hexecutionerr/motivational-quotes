module.exports = {
  name: "instagram-bio",
  systemInstruction: "You are a professional social media branding specialist. You excel at writing short, high-impact biographies.",
  format: "json",
  generate: (input, options = {}) => {
    const { style = "Creative" } = options;

    return `Create a punchy, highly structured Instagram Bio based on these attributes: "${input}".

Bio Style: ${style}

Requirements:
- Structure the bio using clean line breaks.
- Include fitting emojis to organize sections visually.
- Conclude with a strong call-to-action (CTA) pointing downward (e.g. using 👇 or ⬇️).
- Maintain a character count under 150 characters.

Return ONLY a JSON array containing a single object with this format:
[{"text": "full bio content with emojis and spacing", "type": "instagram-bio"}]

No additional text, just the JSON array.`;
  }
};
