const Quote = require('../models/Quote');
const ApiResponse = require('../utils/apiResponse');
const cacheService = require('../services/cacheService');

// @desc    Get all quotes (paginated, infinite scroll)
// @route   GET /api/content/quotes
exports.getQuotes = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const { category, platform, language, sort } = req.query;

    // Build filter
    const filter = { isPublic: true };
    if (category) filter.category = category;
    if (platform) filter.platforms = platform;
    if (language) filter.language = language;

    // Build sort
    let sortObj = { createdAt: -1 };
    if (sort === 'popular') sortObj = { likes: -1 };
    if (sort === 'trending') sortObj = { copies: -1, createdAt: -1 };

    const total = await Quote.countDocuments(filter);
    const quotes = await Quote.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .lean();

    const pagination = {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasMore: skip + quotes.length < total
    };

    ApiResponse.paginated(res, quotes, pagination);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single quote
// @route   GET /api/content/quotes/:id
exports.getQuote = async (req, res, next) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return ApiResponse.error(res, 'Quote not found', 404);
    }
    ApiResponse.success(res, quote);
  } catch (error) {
    next(error);
  }
};

// @desc    Get quotes by platform
// @route   GET /api/content/platform/:platform
exports.getByPlatform = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const { category } = req.query;

    const filter = { platforms: req.params.platform, isPublic: true };
    if (category) filter.category = category;

    const total = await Quote.countDocuments(filter);
    const quotes = await Quote.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const pagination = {
      page, limit, total,
      pages: Math.ceil(total / limit),
      hasMore: skip + quotes.length < total
    };

    ApiResponse.paginated(res, quotes, pagination);
  } catch (error) {
    next(error);
  }
};

// @desc    Get quotes by category
// @route   GET /api/content/category/:category
exports.getByCategory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = { category: req.params.category, isPublic: true };

    const total = await Quote.countDocuments(filter);
    const quotes = await Quote.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const pagination = {
      page, limit, total,
      pages: Math.ceil(total / limit),
      hasMore: skip + quotes.length < total
    };

    ApiResponse.paginated(res, quotes, pagination);
  } catch (error) {
    next(error);
  }
};

// @desc    Search quotes
// @route   GET /api/content/search
exports.searchQuotes = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
      return ApiResponse.error(res, 'Please provide a search query', 400);
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Use regex for flexible search since text index may conflict
    const regex = new RegExp(q, 'i');
    const filter = {
      isPublic: true,
      $or: [
        { text: regex },
        { textHindi: regex },
        { author: regex },
        { tags: regex },
        { category: regex }
      ]
    };

    const total = await Quote.countDocuments(filter);
    const quotes = await Quote.find(filter)
      .sort({ likes: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const pagination = {
      page, limit, total,
      pages: Math.ceil(total / limit),
      hasMore: skip + quotes.length < total
    };

    ApiResponse.paginated(res, quotes, pagination);
  } catch (error) {
    next(error);
  }
};

// @desc    Get trending quotes
// @route   GET /api/content/trending
exports.getTrending = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 20;

    const quotes = await Quote.find({ isPublic: true })
      .sort({ likes: -1, copies: -1 })
      .limit(limit)
      .lean();

    ApiResponse.success(res, quotes, 'Trending quotes');
  } catch (error) {
    next(error);
  }
};

// @desc    Get random quotes
// @route   GET /api/content/random
exports.getRandom = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const { category, platform } = req.query;

    const match = { isPublic: true };
    if (category) match.category = category;
    if (platform) match.platforms = platform;

    const quotes = await Quote.aggregate([
      { $match: match },
      { $sample: { size: limit } }
    ]);

    ApiResponse.success(res, quotes, 'Random quotes');
  } catch (error) {
    next(error);
  }
};

// @desc    Like a quote
// @route   PUT /api/content/quotes/:id/like
exports.likeQuote = async (req, res, next) => {
  try {
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!quote) {
      return ApiResponse.error(res, 'Quote not found', 404);
    }

    ApiResponse.success(res, quote, 'Quote liked');
  } catch (error) {
    next(error);
  }
};

// @desc    Track copy
// @route   PUT /api/content/quotes/:id/copy
exports.copyQuote = async (req, res, next) => {
  try {
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { $inc: { copies: 1 } },
      { new: true }
    );

    if (!quote) {
      return ApiResponse.error(res, 'Quote not found', 404);
    }

    ApiResponse.success(res, quote, 'Copy tracked');
  } catch (error) {
    next(error);
  }
};
