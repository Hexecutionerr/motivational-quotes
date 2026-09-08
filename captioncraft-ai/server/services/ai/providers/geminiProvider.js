const { GoogleGenerativeAI } = require('@google/generative-ai');
const BaseProvider = require('./baseProvider');

class GeminiProvider extends BaseProvider {
  constructor(apiKey) {
    super('Google Gemini', apiKey);
    this.genAI = new GoogleGenerativeAI(this.apiKey);
  }

  async generate(prompt, options = {}) {
    try {
      const modelName = options.model || 'gemini-2.0-flash';
      const systemInstruction = options.systemInstruction || '';

      const modelConfig = {};
      if (systemInstruction) {
        modelConfig.systemInstruction = systemInstruction;
      }

      const model = this.genAI.getGenerativeModel({ model: modelName }, modelConfig);
      
      const generationConfig = {};
      if (options.format === 'json') {
        generationConfig.responseMimeType = "application/json";
      }

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig
      });

      const text = result.response.text();
      return { success: true, text };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = GeminiProvider;
