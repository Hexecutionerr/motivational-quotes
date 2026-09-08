const mongoose = require('mongoose');

const AIHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  prompt: { type: String, required: true },
  response: [{ type: String }],
  platform: { type: String },
  category: { type: String },
  language: { type: String, enum: ['en', 'hi'], default: 'en' },
  model: { type: String, default: 'gemini' },
  type: { type: String, enum: ['generate', 'chat'], required: true },
  createdAt: { type: Date, default: Date.now }
});

AIHistorySchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('AIHistory', AIHistorySchema);
