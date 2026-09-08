import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Sends a generic generation request to the Express backend AI endpoint
 * @param {string} toolId - The tool identifier (e.g. 'caption', 'quote')
 * @param {string} input - User prompt description
 * @param {object} options - Generation parameters (mood, platform, length, etc.)
 * @param {AbortSignal} signal - AbortController signal to cancel pending requests
 * @returns {Promise<any>}
 */
export const generateContent = async (toolId, input, options = {}, signal = null) => {
  const response = await axios.post(`${API_URL}/ai/generate`, {
    tool: toolId,
    input,
    options
  }, {
    signal,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};
