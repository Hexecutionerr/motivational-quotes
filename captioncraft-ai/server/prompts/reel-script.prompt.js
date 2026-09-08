module.exports = {
  name: "reel-script",
  systemInstruction: "You are a short-form video scriptwriter and content director for Reels, Shorts, and TikToks.",
  format: "json",
  generate: (input, options = {}) => {
    const { duration = "30 Seconds" } = options;

    return `Create a structured short-form video script based on this topic: "${input}".

Target Duration: ${duration}

Requirements:
- Structure script with time-blocked visual and vocal cues (e.g. [0-5s] Hook, [5-20s] Body, [20-30s] CTA).
- Include clear visual directions in brackets (e.g. [Visual: Point to text overlay]).
- Write energetic, conversational copy designed for high retention.

Return ONLY a JSON array containing a single object with this format:
[{"text": "full reel script with timestamps and visual directions", "type": "reel-script"}]

No additional text, just the JSON array.`;
  }
};
