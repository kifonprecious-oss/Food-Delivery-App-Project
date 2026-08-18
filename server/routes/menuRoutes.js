const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define MenuItem model if not already imported from models folder
const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', new mongoose.Schema({
  id: Number,
  name: String,
  category: String,
  price: Number,
  rating: Number,
  description: String,
  image: String
}));

// GET all menu items
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find({});
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch menu items from database' });
  }
});

module.exports = router;