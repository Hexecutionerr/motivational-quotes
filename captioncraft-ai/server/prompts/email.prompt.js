module.exports = {
  name: "email",
  systemInstruction: "You are a professional email marketing copywriter and sales outreach expert.",
  format: "json",
  generate: (input, options = {}) => {
    const { objective = "Cold Outreach" } = options;

    return `Draft a highly professional, high-converting email based on this objective and details: "${input}".

Email Type/Objective: ${objective}

Requirements:
- Write an extremely clickable and curiosity-inducing Subject line.
- Keep the body concise, readable, and structured with clean line breaks.
- State a clear value proposition early in the message.
- Conclude with a low-friction, single call-to-action (CTA).

Return ONLY a JSON array containing a single object with this format:
[{"text": "Subject: ...\\n\\nHi [Name],\\n\\n...", "type": "email"}]

No additional text, just the JSON array.`;
  }
};
