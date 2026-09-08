const BaseProvider = require('./baseProvider');

class OpenRouterProvider extends BaseProvider {
  constructor(apiKey) {
    super('OpenRouter', apiKey);
  }

  async generate(prompt, options = {}) {
    try {
      // Default to a free, highly capable Llama 3 model on OpenRouter
      const modelName = options.model || 'meta-llama/llama-3-8b-instruct:free';
      const systemInstruction = options.systemInstruction || 'You are a helpful assistant.';

      const messages = [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: prompt }
      ];

      const body = {
        model: modelName,
        messages,
        temperature: options.temperature || 0.7
      };

      if (options.format === 'json') {
        body.response_format = { type: 'json_object' };
      }

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': 'http://localhost:5000',
          'X-Title': 'ContentForge AI'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errText = await response.text();
        return { success: false, error: `OpenRouter API error: Status ${response.status} - ${errText}` };
      }

      const resData = await response.json();
      const text = resData.choices[0].message.content;
      return { success: true, text };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = OpenRouterProvider;
