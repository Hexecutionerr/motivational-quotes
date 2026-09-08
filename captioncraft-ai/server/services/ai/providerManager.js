const GeminiProvider = require('./providers/geminiProvider');
const GroqProvider = require('./providers/groqProvider');
const OpenRouterProvider = require('./providers/openrouterProvider');

class ProviderManager {
  constructor() {
    this.providers = [];
    this.initializeProviders();
  }

  initializeProviders() {
    // 1. Google Gemini (Primary)
    if (process.env.GEMINI_API_KEY) {
      this.providers.push(new GeminiProvider(process.env.GEMINI_API_KEY));
    } else {
      console.warn('⚠️ [AI Service] GEMINI_API_KEY is not defined in environment variables.');
    }

    // 2. Groq (Secondary Fallback)
    if (process.env.GROQ_API_KEY) {
      this.providers.push(new GroqProvider(process.env.GROQ_API_KEY));
    } else {
      console.warn('⚠️ [AI Service] GROQ_API_KEY is not defined in environment variables.');
    }

    // 3. OpenRouter (Tertiary Fallback)
    if (process.env.OPENROUTER_API_KEY) {
      this.providers.push(new OpenRouterProvider(process.env.OPENROUTER_API_KEY));
    } else {
      console.warn('⚠️ [AI Service] OPENROUTER_API_KEY is not defined in environment variables.');
    }
  }

  /**
   * Generates content using the fallback pipeline
   * Pipeline order: Gemini -> Groq -> OpenRouter
   * @param {string} prompt - The compiled prompt
   * @param {object} options - Generation settings
   * @returns {Promise<{success: boolean, text?: string, provider?: string, time?: number, errors?: object}>}
   */
  async generate(prompt, options = {}) {
    if (this.providers.length === 0) {
      return {
        success: false,
        error: "No AI providers are configured. Make sure you set the required keys in your .env file."
      };
    }

    const errorsLog = {};

    for (const provider of this.providers) {
      console.log(`🔌 [AI Service] Attempting generation with provider: ${provider.name}...`);
      const startTime = Date.now();

      const result = await provider.generate(prompt, options);
      const duration = Date.now() - startTime;

      if (result.success) {
        console.log(`✅ [AI Service] Provider: ${provider.name} | Status: Success | Time: ${duration}ms`);
        return {
          success: true,
          text: result.text,
          provider: provider.name,
          time: duration
        };
      } else {
        console.error(`❌ [AI Service] Provider: ${provider.name} | Status: Failed | Error: ${result.error} | Time: ${duration}ms`);
        errorsLog[provider.name] = {
          error: result.error,
          time: duration
        };
      }
    }

    // If we reach this point, all providers failed
    return {
      success: false,
      error: "All configured AI providers failed to generate a response.",
      details: errorsLog
    };
  }
}

module.exports = new ProviderManager();
