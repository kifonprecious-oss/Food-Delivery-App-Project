const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }, // Stored in FCFA
  category: { type: String, required: true },
  image: { type: String, required: true }, // Image URL or asset path
  isAvailable: { type: Boolean, default: true },
  preparationTime: { type: String, default: '15-20 mins' }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);