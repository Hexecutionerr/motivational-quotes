const express = require('express');
const router = express.Router();
const {
  generateCaption, generateQuote, generatePostIdea, chat, getHistory
} = require('../controllers/generateController');
const { protect } = require('../middleware/auth');
const { aiLimiter } = require('../middleware/rateLimiter');

router.post('/caption', aiLimiter, generateCaption);
router.post('/quote', aiLimiter, generateQuote);
router.post('/post-idea', aiLimiter, generatePostIdea);
router.post('/chat', aiLimiter, chat);
router.get('/history', protect, getHistory);

module.exports = router;
