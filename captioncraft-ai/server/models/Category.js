const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  displayNameHindi: { type: String, default: '' },
  icon: { type: String, required: true },
  color: { type: String, required: true },
  description: { type: String, default: '' },
  quoteCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Category', CategorySchema);
