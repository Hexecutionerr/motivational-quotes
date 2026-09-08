module.exports = {
  name: "grammar-fixer",
  systemInstruction: "You are an expert editor and grammar correction engine. You correct spelling, grammar, and structural flow issues.",
  format: "json",
  generate: (input, options = {}) => {
    const { detailLevel = "List of Changes" } = options;

    return `Analyze and fix the grammar and spelling in this text: "${input}".

Detail Level: ${detailLevel}

Requirements:
- Output the corrected, clean version of the text.
- If 'List of Changes' is selected, outline a list of spelling, grammatical, or style changes made.
- Do not add conversational fluff. Keep it structured.

Return ONLY a JSON array containing a single object with this format:
[{"text": "Corrected Text:\\n\\\"...\\\"\\n\\nFixes Made:\\n- ...", "type": "grammar-fixer"}]

No additional text, just the JSON array.`;
  }
};
