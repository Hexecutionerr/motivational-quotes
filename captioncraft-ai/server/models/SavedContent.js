const mongoose = require('mongoose');

const SavedContentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quoteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quote',
    required: true
  },
  savedAt: {
    type: Date,
    default: Date.now
  },
  folder: {
    type: String,
    default: 'default'
  }
});

SavedContentSchema.index({ userId: 1, quoteId: 1 }, { unique: true });
SavedContentSchema.index({ userId: 1, savedAt: -1 });

module.exports = mongoose.model('SavedContent', SavedContentSchema);
