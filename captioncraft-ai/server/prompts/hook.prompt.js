module.exports = {
  name: "hook",
  systemInstruction: "You are a short-form video strategist and hook expert. You specialize in viral copywriting for TikToks, Reels, and Shorts.",
  format: "json",
  generate: (input, options = {}) => {
    const { niche = "business", style = "curiosity", count = 5 } = options;

    return `Generate exactly ${count} viral video hook options based on this topic: "${input}".

Niche: ${niche}
Style/Angle: ${style} (e.g., curiosity, fear/warnings, contrarian, direct value, or storytelling)

Requirements:
- Keep each hook short, punchy, and designed to be spoken in the first 3 seconds of a video.
- Focus on extreme curiosity or high emotional resonance.
- For each hook, provide a brief execution note (e.g., visual direction or tone of voice).

Return ONLY a JSON array of objects with this format:
[{"text": "the hook phrase", "style": "curiosity", "execution": "how to deliver the hook visually/verbally", "type": "hook"}]

No additional text, just the JSON array.`;
  }
};
