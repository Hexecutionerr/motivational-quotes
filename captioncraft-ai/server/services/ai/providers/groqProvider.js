const BaseProvider = require('./baseProvider');

class GroqProvider extends BaseProvider {
  constructor(apiKey) {
    super('Groq', apiKey);
  }

  async generate(prompt, options = {}) {
    try {
      const modelName = options.model || 'llama-3.3-70b-versatile';
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

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errText = await response.text();
        return { success: false, error: `Groq API error: Status ${response.status} - ${errText}` };
      }

      const resData = await response.json();
      const text = resData.choices[0].message.content;
      return { success: true, text };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = GroqProvider;
