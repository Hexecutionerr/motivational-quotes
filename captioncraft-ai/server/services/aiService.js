const { GoogleGenerativeAI } = require('@google/generative-ai');

class AIService {
  constructor() {
    this.genAI = null;
    this.model = null;

    if (process.env.GEMINI_API_KEY) {
      this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    }
  }

  /**
   * Generate captions for a specific platform
   */
  async generateCaptions({ mood, platform, category, situation, language, count = 5 }) {
    const langText = language === 'hi' ? 'Hindi' : 'English';
    const prompt = `You are ContentForge AI, a creative social media content expert. Generate exactly ${count} unique, engaging ${platform || 'social media'} captions.

Topic/Category: ${category || 'general'}
Mood: ${mood || 'positive'}
${situation ? `Situation: ${situation}` : ''}
Language: ${langText}

Requirements:
- Each caption should be unique and creative
- Include relevant emojis
- Include 3-5 relevant hashtags per caption
- Optimize for ${platform || 'social media'} engagement
- Make them catchy and shareable
${language === 'hi' ? '- Write in Hindi (Devanagari script)' : ''}

Return ONLY a JSON array of objects with this format:
[{"text": "caption text with emojis", "hashtags": ["tag1", "tag2"], "type": "caption"}]

No additional text, just the JSON array.`;

    return this._generateContent(prompt);
  }

  /**
   * Generate quotes
   */
  async generateQuotes({ mood, category, language, count = 5 }) {
    const langText = language === 'hi' ? 'Hindi' : 'English';
    const prompt = `You are ContentForge AI, a profound quote creator. Generate exactly ${count} unique, powerful quotes.

Category: ${category || 'motivation'}
Mood: ${mood || 'inspiring'}
Language: ${langText}

Requirements:
- Each quote should be original and thought-provoking
- Include an author attribution (can be "ContentForge AI" or a fitting pen name)
- Keep quotes concise (1-3 sentences max)
${language === 'hi' ? '- Write in Hindi (Devanagari script)' : ''}

Return ONLY a JSON array of objects with this format:
[{"text": "quote text", "author": "Author Name", "type": "quote"}]

No additional text, just the JSON array.`;

    return this._generateContent(prompt);
  }

  /**
   * Generate post ideas
   */
  async generatePostIdeas({ mood, platform, category, situation, language, count = 3 }) {
    const langText = language === 'hi' ? 'Hindi' : 'English';
    const prompt = `You are ContentForge AI, a social media strategist. Generate exactly ${count} creative post ideas for ${platform || 'social media'}.

Category: ${category || 'general'}
Mood: ${mood || 'creative'}
${situation ? `Context: ${situation}` : ''}
Language: ${langText}

Requirements:
- Each idea should include a post concept, suggested caption, and hashtags
- Make them engaging and trending-worthy
- Include emojis
${language === 'hi' ? '- Write in Hindi (Devanagari script)' : ''}

Return ONLY a JSON array of objects with this format:
[{"concept": "post idea description", "caption": "suggested caption with emojis", "hashtags": ["tag1", "tag2"], "type": "post-idea"}]

No additional text, just the JSON array.`;

    return this._generateContent(prompt);
  }

  /**
   * Chatbot response
   */
  async chat(message, chatHistory = []) {
    const systemPrompt = `You are ContentForge AI, a friendly and creative social media content assistant.
You specialize in generating captions, quotes, and post ideas for Instagram, Facebook, Pinterest, and general social media.
You respond in both Hindi and English based on what the user types.
Keep responses fun, engaging, and optimized for social media.
Always provide multiple options when generating content.
Use emojis to make responses lively.
If the user asks for help or greets, respond warmly and ask what kind of content they need.

When generating content, format it clearly with numbering and make each option standalone and ready to copy.`;

    const prompt = `${systemPrompt}

${chatHistory.length > 0 ? 'Previous conversation:\n' + chatHistory.map(h => `${h.role}: ${h.content}`).join('\n') + '\n\n' : ''}
User: ${message}

Respond naturally as ContentForge AI:`;

    if (!this.model) {
      return this._fallbackChat(message);
    }

    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response.text();
      return { success: true, response, type: 'chat' };
    } catch (error) {
      console.error('AI Chat Error:', error.message);
      return this._fallbackChat(message);
    }
  }

  /**
   * Internal: Generate content with Gemini or fallback
   */
  async _generateContent(prompt) {
    if (!this.model) {
      return this._fallbackGenerate(prompt);
    }

    try {
      const result = await this.model.generateContent(prompt);
      const text = result.response.text();
      
      // Extract JSON from response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return { success: true, data: parsed };
      }
      
      return { success: true, data: [{ text: text, type: 'raw' }] };
    } catch (error) {
      console.error('AI Generation Error:', error.message);
      return this._fallbackGenerate(prompt);
    }
  }

  /**
   * Fallback content when API is unavailable
   */
  _fallbackGenerate(prompt) {
    const fallbackCaptions = [
      { text: "Every moment is a fresh beginning ✨🌸 Don't let yesterday take up too much of today.", hashtags: ["#NewBeginnings", "#PositiveVibes", "#Motivation"], type: "caption", author: "ContentForge AI" },
      { text: "Be the energy you want to attract 🔥💫 Your vibe attracts your tribe.", hashtags: ["#GoodVibes", "#Energy", "#Mindset"], type: "caption", author: "ContentForge AI" },
      { text: "Stars can't shine without darkness 🌟🌙 Embrace the journey, not just the destination.", hashtags: ["#StarLight", "#Journey", "#Growth"], type: "caption", author: "ContentForge AI" },
      { text: "Life is tough, but so are you 💪🔥 Keep pushing, keep growing.", hashtags: ["#StayStrong", "#NeverGiveUp", "#Hustle"], type: "caption", author: "ContentForge AI" },
      { text: "Collect moments, not things 📸✨ The best things in life aren't things.", hashtags: ["#LiveInTheMoment", "#Blessed", "#Life"], type: "caption", author: "ContentForge AI" },
    ];

    return { success: true, data: fallbackCaptions, fallback: true };
  }

  /**
   * Fallback chat when API is unavailable
   */
  _fallbackChat(message) {
    const msg = message.toLowerCase();
    let response = '';

    if (msg.includes('breakup') || msg.includes('sad') || msg.includes('dukhi')) {
      response = `Here are some captions for you 💙\n\n1. "Sometimes good things fall apart so better things can fall together" ✨\n\n2. "Not every ending is bad. Sometimes it's just a new beginning in disguise" 🌅\n\n3. "The pain you feel today is the strength you feel tomorrow" 💪\n\n4. "Letting go doesn't mean giving up, it means growing up" 🌱\n\n5. "Your heart will heal. Give it time. Give it love" ❤️‍🩹`;
    } else if (msg.includes('love') || msg.includes('pyaar') || msg.includes('romantic')) {
      response = `Here are some love captions for you 💕\n\n1. "In your eyes, I found my home" 🏡💖\n\n2. "You're my favorite notification" 📱💝\n\n3. "Love isn't perfect, but it's worth it" ✨💑\n\n4. "Every love story is beautiful, but ours is my favorite" 📖❤️\n\n5. "Together is a wonderful place to be" 🌸👫`;
    } else if (msg.includes('gym') || msg.includes('fitness') || msg.includes('workout')) {
      response = `Here are gym captions for you 🏋️‍♂️\n\n1. "No pain, no gain. Shut up and train" 💪🔥\n\n2. "Your body can stand almost anything. It's your mind you have to convince" 🧠💪\n\n3. "Sweat is fat crying" 😤💧\n\n4. "The only bad workout is the one that didn't happen" ✅\n\n5. "Beast mode: ON" 🦁🔥`;
    } else if (msg.includes('motivation') || msg.includes('inspire') || msg.includes('hosla')) {
      response = `Here's your daily dose of motivation 🔥\n\n1. "Dream big. Start small. Act now" 🚀\n\n2. "Success is not final, failure is not fatal: it is the courage to continue that counts" 💯\n\n3. "The future belongs to those who believe in the beauty of their dreams" ✨\n\n4. "Don't watch the clock; do what it does. Keep going" ⏰\n\n5. "Hard work beats talent when talent doesn't work hard" 💪`;
    } else if (msg.includes('birthday') || msg.includes('janamdin')) {
      response = `Here are birthday captions 🎂\n\n1. "Another year older, another year bolder" 🎉✨\n\n2. "Age is just a number, but cake is forever" 🎂😋\n\n3. "Making my year count! 🥳🎈"\n\n4. "Born to stand out, celebrating being me" 🌟🎁\n\n5. "Chapter [age] starts now! 📖✨"`;
    } else if (msg.includes('attitude') || msg.includes('savage')) {
      response = `Here are some attitude captions 😎\n\n1. "I'm not special, I'm limited edition" 👑\n\n2. "Too glam to give a damn" 💅✨\n\n3. "My vibe speaks volumes before I even say a word" 🔥\n\n4. "Sorry, I'm too busy being awesome" 😏💫\n\n5. "Confidence level: selfie with no filter" 📸👑`;
    } else {
      response = `Hey there! 👋 I'm ContentForge AI! 🌸\n\nI can help you generate amazing captions and quotes! Try asking me:\n\n✨ "Give me Instagram captions for love"\n✨ "Breakup caption chahiye"\n✨ "Gym motivation quotes"\n✨ "Birthday wishes for best friend"\n✨ "Attitude captions"\n✨ "Study motivation in Hindi"\n\nWhat kind of content do you need today? 💕`;
    }

    return { success: true, response, type: 'chat', fallback: true };
  }
}

module.exports = new AIService();
