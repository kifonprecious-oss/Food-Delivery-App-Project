import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Clock } from 'lucide-react';
import { restaurants, menuItems } from '../data/mockData';
import MenuItemCard from '../components/MenuItemCard';

export default function MenuPage() {
    const { id } = useParams();

  // Find the restaurant matching the URL ID
    const restaurant = restaurants.find((r) => r.id === id);

  // Filter menu items belonging to this restaurant
    const restaurantMenu = menuItems.filter((item) => item.restaurantId === id);

    if (!restaurant) {
    return (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Restaurant not found</h2>
        <Link to="/" className="text-orange-600 font-semibold hover:underline">
            &larr; Back to Home
        </Link>
        </div>
    );
    }

    return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Back Button */}
        <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-6 font-medium transition-colors"
        >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Restaurants</span>
        </Link>

      {/* Restaurant Header Banner */}
        <div className="relative h-64 md:h-80 w-full rounded-3xl overflow-hidden mb-10 shadow-md">
        <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">{restaurant.name}</h1>
            <p className="text-orange-200 font-medium mb-3">{restaurant.cuisine}</p>

            <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-1 bg-orange-600 px-3 py-1 rounded-full font-semibold">
                <Star className="w-4 h-4 fill-current" />
                <span>{restaurant.rating}</span>
            </div>
            <div className="flex items-center gap-1 bg-black/40 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4 text-orange-400" />
                <span>{restaurant.deliveryTime}</span>
            </div>
            </div>
        </div>
        </div>

      {/* Menu Section */}
        <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Menu Items</h2>

        {restaurantMenu.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-lg">No menu items available for this restaurant yet.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {restaurantMenu.map((item) => (
                <MenuItemCard key={item.id} item={item} />
            ))}
            </div>
        )}
        </div>

    </div>
    );
}