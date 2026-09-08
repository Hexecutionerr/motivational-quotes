const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Quote text is required'],
    trim: true
  },
  textHindi: {
    type: String,
    default: ''
  },
  author: {
    type: String,
    default: 'Unknown',
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['love', 'sad', 'motivation', 'study', 'gym', 'attitude',
           'friendship', 'success', 'life', 'humor', 'birthday', 'travel']
  },
  platforms: [{
    type: String,
    enum: ['instagram', 'facebook', 'pinterest', 'general']
  }],
  tags: [{ type: String }],
  language: {
    type: String,
    enum: ['en', 'hi'],
    default: 'en'
  },
  isAIGenerated: {
    type: Boolean,
    default: false
  },
  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: { type: Number, default: 0 },
  copies: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  isPublic: { type: Boolean, default: true },
  hashtags: [{ type: String }],
  emojis: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

// Indexes
QuoteSchema.index({ category: 1, platforms: 1 });
QuoteSchema.index({ text: 'text', textHindi: 'text' });
QuoteSchema.index({ createdAt: -1 });
QuoteSchema.index({ likes: -1 });
QuoteSchema.index({ platforms: 1 });

module.exports = mongoose.model('Quote', QuoteSchema);
