import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function MenuItemCard({ item }) {
    const { addToCart } = useCart();

    return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-4 items-center justify-between hover:shadow-md transition-shadow">
        <div className="flex gap-4 items-center">
        <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
        />
        <div>
            <h4 className="font-bold text-gray-800 text-lg">{item.name}</h4>
            <p className="text-sm text-gray-500 line-clamp-2 my-1">{item.description}</p>
            <span className="font-semibold text-orange-600">XAF {item.price.toLocaleString()}</span>
        </div>
        </div>
        <button
        onClick={() => addToCart(item)}
        className="bg-orange-50 hover:bg-orange-600 text-orange-600 hover:text-white p-3 rounded-full transition-colors flex items-center justify-center flex-shrink-0 cursor-pointer"
        title="Add to Cart"
        >
        <Plus className="w-5 h-5" />
        </button>
    </div>
    );
}