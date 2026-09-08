const express = require('express');
const router = express.Router();
const {
  getQuotes, getQuote, getByPlatform, getByCategory,
  searchQuotes, getTrending, getRandom, likeQuote, copyQuote
} = require('../controllers/contentController');
const { protect, optionalAuth } = require('../middleware/auth');
const cacheService = require('../services/cacheService');

router.get('/quotes', cacheService.cacheMiddleware(300), getQuotes);
router.get('/quotes/:id', getQuote);
router.get('/platform/:platform', cacheService.cacheMiddleware(300), getByPlatform);
router.get('/category/:category', cacheService.cacheMiddleware(300), getByCategory);
router.get('/search', searchQuotes);
router.get('/trending', cacheService.cacheMiddleware(60), getTrending);
router.get('/random', getRandom);
router.put('/quotes/:id/like', protect, likeQuote);
router.put('/quotes/:id/copy', copyQuote);

module.exports = router;
