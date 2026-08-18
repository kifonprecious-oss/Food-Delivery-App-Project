const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true } // Price at the time of purchase in FCFA
    }
  ],
  shippingAddress: {
    address: { type: String, required: true },
    phone: { type: String, required: true },
    notes: { type: String } // e.g. "extra spicy", gate codes, etc.
  },
  paymentMethod: { type: String, required: true, enum: ['Mobile Money', 'Cash on Delivery'], default: 'Mobile Money' },
  paymentStatus: { type: String, required: true, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
  totalAmount: { type: Number, required: true },
  orderStatus: { 
    type: String, 
    required: true, 
    enum: ['Order Placed', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'], 
    default: 'Order Placed' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);