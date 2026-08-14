import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { MapPin, Phone, User, CheckCircle2 } from 'lucide-react';

export default function Checkout() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
    paymentMethod: 'Mobile Money',
    });

    const deliveryFee = 1000;
    const grandTotal = cartTotal + (cartItems.length > 0 ? deliveryFee : 0);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    // Clear the cart state and redirect to order status
    clearCart();
    navigate('/order-status');
    };

    if (cartItems.length === 0) {
    return (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No active order to checkout</h2>
        <button
            onClick={() => navigate('/')}
            className="text-orange-600 font-semibold hover:underline"
        >
            &larr; Back to Home
        </button>
        </div>
    );
    }

    return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Delivery Details Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-4">
            Delivery Information
            </h2>

            <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. +237 6XXXXXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <textarea
                    name="address"
                    required
                    rows="3"
                    placeholder="Enter your street address, neighborhood, or landmark..."
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                ></textarea>
                </div>
            </div>
            </div>

            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-100 pt-4 pb-4">
            Payment Method
            </h2>

            <div className="space-y-3">
            <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-orange-50/50 transition-colors">
                <input
                type="radio"
                name="paymentMethod"
                value="Mobile Money"
                checked={formData.paymentMethod === 'Mobile Money'}
                onChange={handleChange}
                className="text-orange-600 focus:ring-orange-500"
                />
                <span className="font-medium text-gray-800">Mobile Money (MTN / Orange Money)</span>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-orange-50/50 transition-colors">
                <input
                type="radio"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={formData.paymentMethod === 'Cash on Delivery'}
                onChange={handleChange}
                className="text-orange-600 focus:ring-orange-500"
                />
                <span className="font-medium text-gray-800">Cash on Delivery</span>
            </label>
            </div>
        </div>

        {/* Order Review Box */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>

            <div className="space-y-3 text-sm text-gray-600 pb-4 border-b border-gray-100">
            <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-gray-800">XAF {cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-semibold text-gray-800">XAF {deliveryFee.toLocaleString()}</span>
            </div>
            </div>

            <div className="flex justify-between font-bold text-lg text-gray-800 py-4">
            <span>Total to Pay</span>
            <span className="text-orange-600">XAF {grandTotal.toLocaleString()}</span>
            </div>

            <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 mt-4 cursor-pointer"
            >
            <CheckCircle2 className="w-5 h-5" />
            <span>Place Order</span>
            </button>
        </div>

        </form>
    </div>
    );
}