module.exports = {
  name: "rewrite",
  systemInstruction: "You are a professional editor and copy-editor. You rephrase text to improve clarity, tone, and impact.",
  format: "json",
  generate: (input, options = {}) => {
    const { targetTone = "Professional" } = options;

    return `Rewrite the following text to match the requested target tone: "${input}".

Target Tone: ${targetTone}

Requirements:
- Retain the core message and meaning of the original text.
- Rephrase the sentence structure and vocabulary to fit the requested tone (Professional, Casual, Persuasive, or Minimalist).
- Provide 3 distinct rewritten variations.

Return ONLY a JSON array containing a single object with this format:
[{"text": "Option 1 (Tone): ...\\n\\nOption 2 (Tone): ...\\n\\nOption 3 (Tone): ...", "type": "rewrite"}]

No additional text, just the JSON array.`;
  }
};
