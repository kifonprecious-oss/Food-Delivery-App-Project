import { Link } from 'react-router-dom';
import { CheckCircle, Package, Bike, Home, ArrowRight } from 'lucide-react';

export default function OrderStatus() {
    return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">

      {/* Success Icon */}
        <div className="flex justify-center mb-6">
        <div className="bg-orange-100 text-orange-600 p-4 rounded-full shadow-inner">
            <CheckCircle className="w-16 h-16" />
        </div>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Order Placed Successfully! 🎉</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
        Thank you for your order. Your restaurant has received it and is currently getting your meals prepared.
        </p>

      {/* Tracker Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8 text-left">
        <h2 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">
            Order Status Tracker
        </h2>

        <div className="space-y-6">

            <div className="flex items-start gap-4">
            <div className="bg-orange-600 text-white p-3 rounded-full">
                <CheckCircle className="w-5 h-5" />
            </div>
            <div>
                <h4 className="font-bold text-gray-800">Order Confirmed</h4>
                <p className="text-sm text-gray-500">Your payment and details have been verified.</p>
            </div>
            </div>

            <div className="flex items-start gap-4">
            <div className="bg-orange-100 text-orange-600 p-3 rounded-full animate-pulse">
                <Package className="w-5 h-5" />
            </div>
            <div>
                <h4 className="font-bold text-orange-600">Preparing Your Food</h4>
                <p className="text-sm text-gray-500">The kitchen is freshly cooking your meal items.</p>
            </div>
            </div>

            <div className="flex items-start gap-4 opacity-50">
            <div className="bg-gray-100 text-gray-400 p-3 rounded-full">
                <Bike className="w-5 h-5" />
            </div>
            <div>
                <h4 className="font-bold text-gray-800">Out for Delivery</h4>
                <p className="text-sm text-gray-500">A rider will pick up and bring your food soon.</p>
            </div>
            </div>

            <div className="flex items-start gap-4 opacity-50">
            <div className="bg-gray-100 text-gray-400 p-3 rounded-full">
                <Home className="w-5 h-5" />
            </div>
            <div>
                <h4 className="font-bold text-gray-800">Delivered</h4>
                <p className="text-sm text-gray-500">Enjoy your delicious meal!</p>
            </div>
            </div>

        </div>
        </div>

        <Link
        to="/"
        className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-medium px-8 py-3 rounded-full transition-colors shadow-md"
        >
        <span>Back to Home</span>
        <ArrowRight className="w-4 h-4" />
        </Link>

    </div>
    );
}