module.exports = {
  name: "product-desc",
  systemInstruction: "You are a professional e-commerce product copywriter. You write persuasive, benefit-focused descriptions that convert viewers into buyers.",
  format: "json",
  generate: (input, options = {}) => {
    const { length = "Short & Punchy" } = options;

    return `Create a compelling product description based on these details: "${input}".

Length Format: ${length}

Requirements:
- Highlight the key benefits and problem solved, not just specs.
- Use an inviting, professional tone.
- If 'Detailed Features' or 'Bullet Points' is selected, format parameters as a list.
- Keep descriptions clear, concise, and concluding with a strong call-to-action (CTA).

Return ONLY a JSON array containing a single object with this format:
[{"text": "full product description text", "type": "product-desc"}]

No additional text, just the JSON array.`;
  }
};
