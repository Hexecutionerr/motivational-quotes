const express = require('express');
const router = express.Router();
const { generate } = require('../controllers/aiController');
const { optionalAuth } = require('../middleware/auth');
const { aiLimiter } = require('../middleware/rateLimiter');

// POST /api/ai/generate - generic AI endpoint
router.post('/generate', optionalAuth, aiLimiter, generate);

module.exports = router;
