const aiService = require('../services/aiService');
const AIHistory = require('../models/AIHistory');
const Quote = require('../models/Quote');
const User = require('../models/User');
const ApiResponse = require('../utils/apiResponse');

// @desc    Generate AI caption
// @route   POST /api/generate/caption
exports.generateCaption = async (req, res, next) => {
  try {
    const { mood, platform, category, situation, language, count } = req.body;

    const result = await aiService.generateCaptions({
      mood, platform, category, situation,
      language: language || 'en',
      count: count || 5
    });

    if (!result.success) {
      return ApiResponse.error(res, 'Failed to generate captions', 500);
    }

    // Save to history
    if (req.user) {
      await AIHistory.create({
        userId: req.user._id,
        prompt: `Caption: ${mood || ''} ${category || ''} ${situation || ''}`,
        response: result.data.map(d => d.text || JSON.stringify(d)),
        platform,
        category,
        language: language || 'en',
        type: 'generate'
      });

      // Increment generation count
      await User.findByIdAndUpdate(req.user._id, { $inc: { generationCount: 1 } });
    }

    // Optionally save generated quotes to DB
    if (result.data && result.data.length > 0) {
      const quotesToSave = result.data.map(item => ({
        text: item.text || item.caption || '',
        author: item.author || 'CaptionCraft AI',
        category: category || 'motivation',
        platforms: platform ? [platform] : ['general'],
        tags: item.hashtags || [],
        language: language || 'en',
        isAIGenerated: true,
        generatedBy: req.user?._id,
        hashtags: item.hashtags || [],
        isPublic: true
      }));

      try {
        await Quote.insertMany(quotesToSave, { ordered: false });
      } catch (e) {
        // Ignore duplicate key errors for insertMany
      }
    }

    ApiResponse.success(res, result.data, 'Captions generated successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Generate AI quote
// @route   POST /api/generate/quote
exports.generateQuote = async (req, res, next) => {
  try {
    const { mood, category, language, count } = req.body;

    const result = await aiService.generateQuotes({
      mood, category,
      language: language || 'en',
      count: count || 5
    });

    if (!result.success) {
      return ApiResponse.error(res, 'Failed to generate quotes', 500);
    }

    // Save to history
    if (req.user) {
      await AIHistory.create({
        userId: req.user._id,
        prompt: `Quote: ${mood || ''} ${category || ''}`,
        response: result.data.map(d => d.text || JSON.stringify(d)),
        category,
        language: language || 'en',
        type: 'generate'
      });

      await User.findByIdAndUpdate(req.user._id, { $inc: { generationCount: 1 } });
    }

    ApiResponse.success(res, result.data, 'Quotes generated successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Generate post idea
// @route   POST /api/generate/post-idea
exports.generatePostIdea = async (req, res, next) => {
  try {
    const { mood, platform, category, situation, language, count } = req.body;

    const result = await aiService.generatePostIdeas({
      mood, platform, category, situation,
      language: language || 'en',
      count: count || 3
    });

    if (!result.success) {
      return ApiResponse.error(res, 'Failed to generate post ideas', 500);
    }

    // Save to history
    if (req.user) {
      await AIHistory.create({
        userId: req.user._id,
        prompt: `Post Idea: ${mood || ''} ${platform || ''} ${category || ''}`,
        response: result.data.map(d => d.concept || d.text || JSON.stringify(d)),
        platform,
        category,
        language: language || 'en',
        type: 'generate'
      });

      await User.findByIdAndUpdate(req.user._id, { $inc: { generationCount: 1 } });
    }

    ApiResponse.success(res, result.data, 'Post ideas generated successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Chat with AI
// @route   POST /api/generate/chat
exports.chat = async (req, res, next) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return ApiResponse.error(res, 'Message is required', 400);
    }

    const result = await aiService.chat(message, history || []);

    if (!result.success) {
      return ApiResponse.error(res, 'Failed to get AI response', 500);
    }

    // Save to history
    if (req.user) {
      await AIHistory.create({
        userId: req.user._id,
        prompt: message,
        response: [result.response],
        type: 'chat'
      });
    }

    ApiResponse.success(res, {
      response: result.response,
      fallback: result.fallback || false
    }, 'Chat response');
  } catch (error) {
    next(error);
  }
};

// @desc    Get AI generation history
// @route   GET /api/generate/history
exports.getHistory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const total = await AIHistory.countDocuments({ userId: req.user._id });
    const history = await AIHistory.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const pagination = {
      page, limit, total,
      pages: Math.ceil(total / limit),
      hasMore: skip + history.length < total
    };

    ApiResponse.paginated(res, history, pagination);
  } catch (error) {
    next(error);
  }
};
