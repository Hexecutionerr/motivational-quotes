const SavedContent = require('../models/SavedContent');
const User = require('../models/User');
const ApiResponse = require('../utils/apiResponse');

// @desc    Save a quote
// @route   POST /api/save/:quoteId
exports.saveQuote = async (req, res, next) => {
  try {
    const { quoteId } = req.params;
    const { folder } = req.body;

    // Check if already saved
    const existing = await SavedContent.findOne({
      userId: req.user._id,
      quoteId
    });

    if (existing) {
      return ApiResponse.error(res, 'Quote already saved', 400);
    }

    const saved = await SavedContent.create({
      userId: req.user._id,
      quoteId,
      folder: folder || 'default'
    });

    // Add to user's savedQuotes
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { savedQuotes: quoteId }
    });

    ApiResponse.created(res, saved, 'Quote saved successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Unsave a quote
// @route   DELETE /api/save/:quoteId
exports.unsaveQuote = async (req, res, next) => {
  try {
    const { quoteId } = req.params;

    await SavedContent.findOneAndDelete({
      userId: req.user._id,
      quoteId
    });

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { savedQuotes: quoteId }
    });

    ApiResponse.success(res, {}, 'Quote removed from saved');
  } catch (error) {
    next(error);
  }
};

// @desc    Get all saved quotes
// @route   GET /api/save
exports.getSaved = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const { folder } = req.query;

    const filter = { userId: req.user._id };
    if (folder) filter.folder = folder;

    const total = await SavedContent.countDocuments(filter);
    const saved = await SavedContent.find(filter)
      .sort({ savedAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('quoteId')
      .lean();

    const pagination = {
      page, limit, total,
      pages: Math.ceil(total / limit),
      hasMore: skip + saved.length < total
    };

    ApiResponse.paginated(res, saved, pagination);
  } catch (error) {
    next(error);
  }
};
