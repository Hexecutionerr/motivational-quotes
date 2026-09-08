const aiService = require('../services/ai/aiService');
const AIHistory = require('../models/AIHistory');
const User = require('../models/User');
const ApiResponse = require('../utils/apiResponse');

// @desc    Generic AI Generation Endpoint
// @route   POST /api/ai/generate
exports.generate = async (req, res, next) => {
  try {
    const { tool, options = {} } = req.body;
    let { input } = req.body;

    // 1. Validation
    if (!tool) {
      return ApiResponse.error(res, "Missing parameter: 'tool' is required.", 400);
    }
    if (!input || !input.trim()) {
      return ApiResponse.error(res, "Missing parameter: 'input' is required.", 400);
    }

    // Sanitize input to prevent basic script injections (XSS)
    const sanitizedInput = input.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // 2. Generation & Provider Fallback Pipeline
    const result = await aiService.generateContent(tool, sanitizedInput, options);

    if (!result.success) {
      return ApiResponse.error(res, result.error, 500, result.details);
    }

    // 3. Log into database history if user context exists
    if (req.user) {
      try {
        const historyData = {
          userId: req.user._id,
          prompt: `[${tool}] Input: ${input}`,
          response: Array.isArray(result.data) 
            ? result.data.map(d => d.text || d.concept || JSON.stringify(d)) 
            : [JSON.stringify(result.data)],
          platform: options.platform || 'general',
          category: options.category || 'general',
          language: options.language || 'en',
          type: 'generate'
        };
        await AIHistory.create(historyData);
        await User.findByIdAndUpdate(req.user._id, { $inc: { generationCount: 1 } });
      } catch (logError) {
        console.error('⚠️ Failed to save generation history to DB:', logError.message);
      }
    }

    // 4. Return formatted response with provider telemetry
    res.status(200).json({
      success: true,
      message: `${tool} generated successfully using ${result.provider}`,
      provider: result.provider,
      timeMs: result.time,
      data: result.data
    });

  } catch (error) {
    next(error);
  }
};
