class BaseProvider {
  constructor(name, apiKey) {
    this.name = name;
    this.apiKey = apiKey;
  }

  /**
   * Abstract generate method
   * @param {string} prompt - The compiled prompt text
   * @param {object} options - Format options (e.g. systemInstruction, json mode)
   * @returns {Promise<{success: boolean, text: string, data?: any}>}
   */
  async generate(prompt, options = {}) {
    throw new Error(`generate() not implemented for provider ${this.name}`);
  }
}

module.exports = BaseProvider;
