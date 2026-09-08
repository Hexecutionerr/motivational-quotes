const path = require('path');
const fs = require('fs');
const providerManager = require('./providerManager');

class AIService {
  constructor() {
    this.promptsDir = path.join(__dirname, '..', '..', 'prompts');
  }

  /**
   * Generates content using the specified tool template and provider fallback chain
   * @param {string} tool - The name of the tool (e.g. 'caption', 'quote')
   * @param {string} input - User inputs/niche/topic
   * @param {object} options - Generation parameters (mood, platform, etc.)
   * @returns {Promise<{success: boolean, data?: any, provider?: string, time?: number, error?: string}>}
   */
  async generateContent(tool, input, options = {}) {
    try {
      // 1. Validate tool and load prompt template
      const promptFilePath = path.join(this.promptsDir, `${tool}.prompt.js`);
      
      if (!fs.existsSync(promptFilePath)) {
        return {
          success: false,
          error: `Tool '${tool}' is not supported. Create prompts/${tool}.prompt.js to register it.`
        };
      }

      const template = require(promptFilePath);

      // 2. Compile prompt and format options
      const compiledPrompt = template.generate(input, options);
      const generationOptions = {
        format: template.format || 'text',
        systemInstruction: template.systemInstruction || 'You are a helpful assistant.',
        model: options.model,
        temperature: options.temperature
      };

      // 3. Call fallback provider pipeline
      const result = await providerManager.generate(compiledPrompt, generationOptions);

      if (!result.success) {
        return {
          success: false,
          error: result.error,
          details: result.details
        };
      }

      // 4. Parse & format response
      let parsedData = result.text;
      if (template.format === 'json') {
        const extracted = this.parseJSONResponse(result.text);
        if (extracted) {
          parsedData = extracted;
        } else {
          // If JSON parsing fails, wrap raw text in expected output structure
          parsedData = [{ text: result.text, type: 'raw' }];
        }
      }

      return {
        success: true,
        data: parsedData,
        provider: result.provider,
        time: result.time
      };

    } catch (error) {
      return {
        success: false,
        error: `System Error in AI Service layer: ${error.message}`
      };
    }
  }

  /**
   * Clean and parse JSON from string
   */
  parseJSONResponse(text) {
    try {
      return JSON.parse(text);
    } catch (e) {
      try {
        // Strip markdown blocks if present (e.g. ```json ... ```)
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanedText);
      } catch (err) {
        try {
          // Fallback to regex matches
          const match = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
          if (match) {
            return JSON.parse(match[0]);
          }
        } catch (regexErr) {
          console.error("Failed to parse JSON response:", regexErr.message);
        }
      }
    }
    return null;
  }
}

module.exports = new AIService();
