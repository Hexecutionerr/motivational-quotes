const User = require('../models/User');
const Quote = require('../models/Quote');
const SavedContent = require('../models/SavedContent');
const AIHistory = require('../models/AIHistory');
const ApiResponse = require('../utils/apiResponse');

// @desc    Get user profile
// @route   GET /api/user/profile
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    ApiResponse.success(res, user);
  } catch (error) {
    next(error);
  }
};

// @desc    Update profile
// @route   PUT /api/user/profile
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, preferredLanguage, avatar } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (preferredLanguage) updates.preferredLanguage = preferredLanguage;
    if (avatar) updates.avatar = avatar;

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true
    });

    ApiResponse.success(res, user, 'Profile updated');
  } catch (error) {
    next(error);
  }
};

// @desc    Get user stats
// @route   GET /api/user/stats
exports.getStats = async (req, res, next) => {
  try {
    const savedCount = await SavedContent.countDocuments({ userId: req.user._id });
    const generatedCount = await AIHistory.countDocuments({ userId: req.user._id });
    const user = await User.findById(req.user._id);

    ApiResponse.success(res, {
      savedQuotes: savedCount,
      aiGenerations: generatedCount,
      totalGenerations: user.generationCount,
      plan: user.plan,
      memberSince: user.createdAt
    }, 'User stats');
  } catch (error) {
    next(error);
  }
};
