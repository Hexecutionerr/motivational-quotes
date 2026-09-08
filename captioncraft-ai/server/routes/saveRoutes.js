const express = require('express');
const router = express.Router();
const { saveQuote, unsaveQuote, getSaved } = require('../controllers/saveController');
const { protect } = require('../middleware/auth');

router.post('/:quoteId', protect, saveQuote);
router.delete('/:quoteId', protect, unsaveQuote);
router.get('/', protect, getSaved);

module.exports = router;
