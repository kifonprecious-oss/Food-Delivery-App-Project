const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// @route   POST /api/orders
// @desc    Create a new order
// @access  Public (or protected once auth is added)
router.post('/', async (req, res) => {
  try {
    const { user, orderItems, shippingAddress, paymentMethod, totalAmount } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items provided' });
    }

    const newOrder = new Order({
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create order', error: error.message });
  }
});

// @route   GET /api/orders/:userId
// @desc    Get all orders for a specific user
// @access  Public
router.get('/:userId', async (req, res) => {
  try {
    // Note: If req.params.userId is actually an order ID in some specific route contexts, 
    // Express evaluates routes sequentially. Make sure specific routes don't clash with ':id'.
    const orders = await Order.find({ user: req.params.userId }).populate('orderItems.menuItem');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   GET /api/orders
// @desc    Get all orders (For Admin dashboard)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email phone').populate('orderItems.menuItem');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status (Preparing, Ready, Completed)
// @access  Public (or Admin protected)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server Error while updating status', error: error.message });
  }
});

// @route   DELETE /api/orders/:id
// @desc    Delete an order from MongoDB
// @access  Public (or Admin protected)
router.delete('/:id', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error while deleting order', error: error.message });
  }
});

module.exports = router;