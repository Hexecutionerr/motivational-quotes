const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const ApiResponse = require('../utils/apiResponse');

// Get all categories
router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ order: 1 }).lean();
    ApiResponse.success(res, categories, 'Categories fetched');
  } catch (error) {
    next(error);
  }
});

// Get category by slug
router.get('/:slug', async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return ApiResponse.error(res, 'Category not found', 404);
    }
    ApiResponse.success(res, category);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
