import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';

export default function RestaurantCard({ restaurant }) {
    return (
    <Link
        to={`/restaurant/${restaurant.id}`}
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
    >
        <div className="relative h-48 w-full">
        <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
        />
        </div>
        <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
            <h3 className="font-bold text-lg text-gray-800">{restaurant.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{restaurant.cuisine}</p>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1 text-orange-600 font-semibold">
            <Star className="w-4 h-4 fill-current" />
            <span>{restaurant.rating}</span>
            </div>
            <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{restaurant.deliveryTime}</span>
            </div>
        </div>
        </div>
    </Link>
    );
}