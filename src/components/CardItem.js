import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
    const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

    return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 gap-4">
        <div className="flex items-center gap-4">
        <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-cover rounded-md"
        />
        <div>
            <h4 className="font-semibold text-gray-800">{item.name}</h4>
            <p className="text-sm text-orange-600 font-medium">XAF {item.price.toLocaleString()}</p>
        </div>
        </div>

        <div className="flex items-center gap-3">
        <div className="flex items-center border border-gray-200 rounded-lg">
            <button
            onClick={() => decreaseQuantity(item.id)}
            className="p-1 hover:bg-gray-100 text-gray-600 rounded-l-lg transition-colors"
            >
            <Minus className="w-4 h-4" />
            </button>
            <span className="px-3 font-medium text-gray-800 text-sm">{item.quantity}</span>
            <button
            onClick={() => increaseQuantity(item.id)}
            className="p-1 hover:bg-gray-100 text-gray-600 rounded-r-lg transition-colors"
            >
            <Plus className="w-4 h-4" />
            </button>
        </div>

        <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 hover:text-red-700 p-2 transition-colors"
            title="Remove item"
        >
            <Trash2 className="w-5 h-5" />
        </button>
        </div>
    </div>
    );
}