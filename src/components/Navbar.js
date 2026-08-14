import { Link } from 'react-router-dom';
import { ShoppingBag, Utensils } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
    const { totalItemsCount } = useCart();

    return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 text-orange-600 font-bold text-xl">
            <Utensils className="w-7 h-7" />
            <span>BillionzBites</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-gray-700">
            <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <Link to="/" className="hover:text-orange-600 transition-colors">Restaurants</Link>
        </nav>

        {/* Cart Icon & Badge */}
        <Link
            to="/cart"
            className="relative flex items-center justify-center p-2 rounded-full bg-orange-50 hover:bg-orange-100 text-orange-600 transition-colors"
        >
            <ShoppingBag className="w-6 h-6" />
            {totalItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow">
                {totalItemsCount}
            </span>
            )}
        </Link>

        </div>
    </header>
    );
}