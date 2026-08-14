import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, totalAmount } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/" className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        {cart.map(item => (
          <div key={item.id} className="flex justify-between items-center py-4 border-b last:border-none">
            <div>
              <h4 className="font-bold">{item.name}</h4>
              <p className="text-sm text-gray-500">XAF {item.price} each</p>
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
              <span className="font-bold">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm ml-4">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center bg-white rounded-xl shadow-md p-6">
        <span className="text-xl font-bold">Total: XAF {totalAmount}</span>
        <button onClick={() => navigate('/checkout')} className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700">Proceed to Checkout</button>
      </div>
    </div>
  );
}