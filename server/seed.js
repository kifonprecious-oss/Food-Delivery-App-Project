const mongoose = require('mongoose');
require('dotenv').config();

const menuItemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  category: String,
  price: Number,
  rating: Number,
  description: String,
  image: String
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

const menuItems = [
  {
    id: 1,
    name: 'Braised Fish',
    category: 'Grills & Soya',
    price: 4500,
    rating: 4.9,
    description: 'Char-grilled spiced fish slathered in an aromatic onion-pepper marinade, served with fried plantains.',
    image: '/images/braised-fish.jpg'
  },
  {
    id: 2,
    name: 'Cornchaff',
    category: 'Local Dishes',
    price: 1800,
    rating: 4.6,
    description: 'A hearty, slow-cooked pot of maize and beans seasoned with rich palm oil and spices.',
    image: '/images/cornchaff.jpg'
  },
  {
    id: 3,
    name: 'Ekwang',
    category: 'Local Dishes',
    price: 2500,
    rating: 4.8,
    description: 'Grated cocoyam wrapped in tender cocoyam leaves, simmered in rich palm oil sauce and smoked fish.',
    image: '/images/Ekwang.jpg'
  },
  {
    id: 4,
    name: 'Fried Egg and Plantain',
    category: 'Snacks & Breakfast',
    price: 1500,
    rating: 4.5,
    description: 'Golden fried ripe plantain slices paired with a savory vegetable-spiced fried egg.',
    image: '/images/fried-egg-and-plantain.jpg'
  },
  {
    id: 5,
    name: 'Fried Rice',
    category: 'Rice Dishes',
    price: 2500,
    rating: 4.6,
    description: 'Wok-tossed rice loaded with mixed vegetables, diced liver, and spices.',
    image: '/images/fried-rice.jpg'
  },
  {
    id: 6,
    name: 'Fried Snails',
    category: 'Grills & Soya',
    price: 3500,
    rating: 4.7,
    description: 'Succulent fried land snails tossed in a fiery pepper and onion seasoning.',
    image: '/images/fried-snails.jpg'
  },
  {
    id: 7,
    name: 'Fufu and Eru',
    category: 'Local Dishes',
    price: 2500,
    rating: 4.9,
    description: 'Finely shredded eru leaves cooked with palm oil, crayfish, and smoked meat, paired with water fufu.',
    image: '/images/fufu-and-eru.jpg'
  },
  {
    id: 8,
    name: 'Fufu-corn and Khati-Khati',
    category: 'Local Dishes',
    price: 3000,
    rating: 4.7,
    description: 'Steamed corn fufu served with traditional local fowl and spiced palm oil sauce.',
    image: '/images/fufu-corn-and-khati-khati.jpg'
  },
  {
    id: 9,
    name: 'Irish Potatoe',
    category: 'Local Dishes',
    price: 2500,
    rating: 4.5,
    description: 'Stewed Irish potatoes cooked with fresh vegetables, rich spices, and choice meat.',
    image: '/images/irish-potatoe.jpg'
  },
  {
    id: 10,
    name: 'Ndole with Boiled Plantain',
    category: 'Local Dishes',
    price: 3500,
    rating: 4.8,
    description: 'Rich bitter leaf delicacy paired with tender boiled ripe plantains and protein.',
    image: '/images/Ndole-with-boiled-plantain.jpg'
  },
  {
    id: 11,
    name: 'Ndole with Plaintain',
    category: 'Local Dishes',
    price: 3500,
    rating: 4.9,
    description: 'Traditional bitter leaf delicacy cooked with groundnuts, crayfish, and tender beef, served with ripe fried plantains.',
    image: '/images/Ndole-with-plaintain.jpg'
  },
  {
    id: 12,
    name: 'Pepper Soup',
    category: 'Soups',
    price: 2500,
    rating: 4.7,
    description: 'A deeply aromatic, spicy broth loaded with local spices and tender meat cuts.',
    image: '/images/pepper-soup.jpg'
  },
  {
    id: 13,
    name: 'Rice and Beans',
    category: 'Rice Dishes',
    price: 1800,
    rating: 4.5,
    description: 'Combined sweet beans and rice cooked in a savory tomato base.',
    image: '/images/rice-and-beans.jpg'
  },
  {
    id: 14,
    name: 'Rice and Stew',
    category: 'Rice Dishes',
    price: 2000,
    rating: 4.4,
    description: 'Fluffy white rice served with a deeply savory tomato-pepper stew and protein.',
    image: '/images/rice-and-stew.jpg'
  },
  {
    id: 15,
    name: 'Suya',
    category: 'Grills & Soya',
    price: 2000,
    rating: 4.8,
    description: 'Tender charcoal-grilled beef skewers coated in a spicy peanut and njangsa crust.',
    image: '/images/suya.jpg'
  }
];

const seedDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://kifonprecious_db_user:splashy221@cluster0.zkj66ao.mongodb.net/?appName=Cluster0";
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB for seeding...');
    
    await MenuItem.deleteMany({});
    await MenuItem.insertMany(menuItems);
    
    console.log('Database re-seeded successfully with clean hyphenated image paths!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
  }
};

seedDB();