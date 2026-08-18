import React, { useState, useEffect } from 'react';
import { fetchMenuItems } from '../api';
import { useCart } from '../context/CartContext';

export default function Home() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart();

  const categories = [
    'Local Dishes', 'Grills & Soya', 'Rice Dishes', 
    'Soups', 'Snacks & Breakfast'
  ];

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const response = await fetchMenuItems();
        const data = Array.isArray(response.data) 
          ? response.data 
          : (response.data.menu || response.data.items || []);
        setMenuItems(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching menu items from live server:', err);
        setError('Failed to load menu items. Make sure your Render backend is awake!');
        setLoading(false);
      }
    };

    loadMenu();
  }, []);

  const filteredItems = menuItems.filter(item => {
    const itemName = item.name || '';
    const itemCategory = item.category || 'Local Dishes';
    const matchesSearch = itemName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || itemCategory.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', color: '#1F2937', margin: 0, padding: 0, overflowX: 'hidden' }}>
      
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', padding: '16px 5%', borderBottom: '1px solid #E5E7EB', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 2px 4px rgba(0,0,0,0.02)', flexWrap: 'wrap', gap: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>🍲</span>
          <span style={{ fontWeight: 900, fontSize: '18px', color: '#1E3A8A', letterSpacing: '0.5px' }}>SPLASHY BITES</span>
        </div>
        <div style={{ display: 'flex', gap: '25px', fontWeight: 600, fontSize: '14px', color: '#4B5563' }}>
          <a href="/" style={{ color: '#1E3A8A', textDecoration: 'none', borderBottom: '2px solid #1E3A8A', paddingBottom: '4px' }}>Home</a>
          <a href="#menu" style={{ color: 'inherit', textDecoration: 'none' }}>Menu</a>
          <a href="#about" style={{ color: 'inherit', textDecoration: 'none' }}>About</a>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ border: '1px solid #1E3A8A', color: '#1E3A8A', background: 'transparent', padding: '8px 16px', fontSize: '11px', fontWeight: 700, borderRadius: '8px', cursor: 'pointer', textTransform: 'uppercase' }}>Contact Us</button>
          <a href="/cart" style={{ background: '#1E3A8A', color: '#FFFFFF', textDecoration: 'none', padding: '9px 18px', fontSize: '11px', fontWeight: 700, borderRadius: '8px', textTransform: 'uppercase', display: 'inline-block' }}>Order Now</a>
        </div>
      </nav>

      {/* Hero Header Banner */}
      <div style={{ background: '#1A1A1A', color: '#FFFFFF', textAlign: 'center', padding: '50px 20px', backgroundImage: 'radial-gradient(circle at center, #2A2A2A 0%, #111 100%)' }}>
        <h2 style={{ color: '#F59E0B', fontSize: '28px', fontWeight: 800, margin: '0 0 10px 0' }}>Authentic Cameroonian Kitchen</h2>
        <p style={{ color: '#9CA3AF', fontSize: '14px', maxWidth: '550px', margin: '0 auto 25px auto', lineHeight: '1.6' }}>Savor our rich local heritage dishes prepared with authentic spices and delivered hot to your doorstep.</p>
        <a href="#menu" style={{ background: '#F59E0B', color: '#111', padding: '12px 28px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', borderRadius: '8px', textDecoration: 'none', display: 'inline-block', boxShadow: '0 4px 12px rgba(245,158,11,0.3)' }}>Explore Menu</a>
      </div>

      {/* Main Container Layout */}
      <div style={{ width: '92%', maxWidth: '1200px', margin: '0 auto', padding: '30px 0' }}>
        
        {/* Categories Bar & Search Section */}
        <div id="menu" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: 0 }}>Our Menu Categories</h3>
            <input 
              type="text" 
              placeholder="Search dishes (e.g. Ekwang, Fufu, Soya)..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', maxWidth: '320px', padding: '12px 18px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '13px', outline: 'none', background: '#FFFFFF' }}
            />
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
            <button
              onClick={() => setSelectedCategory('All')}
              style={{
                background: selectedCategory === 'All' ? '#1E3A8A' : '#FFFFFF',
                color: selectedCategory === 'All' ? '#FFFFFF' : '#4B5563',
                border: '1px solid #E5E7EB',
                padding: '10px 18px',
                fontSize: '12px',
                fontWeight: 700,
                borderRadius: '20px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}
            >
              All Dishes
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: selectedCategory === cat ? '#1E3A8A' : '#FFFFFF',
                  color: selectedCategory === cat ? '#FFFFFF' : '#4B5563',
                  border: '1px solid #E5E7EB',
                  padding: '10px 18px',
                  fontSize: '12px',
                  fontWeight: 700,
                  borderRadius: '20px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && <p style={{ textAlign: 'center', color: '#666', padding: '40px 0' }}>Loading live menu from server...</p>}
        {error && <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bold', padding: '40px 0' }}>{error}</p>}

        {/* Responsive Grid Layout for Menu Items */}
        {!loading && !error && (
          filteredItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 0', color: '#666' }}>
              <p style={{ fontSize: '16px' }}>No dishes found matching your search.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px', marginBottom: '60px' }}>
              {filteredItems.map(item => (
                <div key={item._id || item.id} style={{ background: '#FFFFFF', borderRadius: '16px', padding: '14px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', transition: 'transform 0.2s' }}>
                  <div>
                    <div style={{ width: '100%', height: '160px', borderRadius: '12px', overflow: 'hidden', marginBottom: '12px', background: '#F3F4F6' }}>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'; }}
                      />
                    </div>
                    <h5 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: '0 0 6px 0' }}>{item.name}</h5>
                    <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 16px 0', lineHeight: '1.4' }}>{item.description}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F3F4F6', paddingTop: '12px' }}>
                    <span style={{ fontWeight: 900, color: '#1E3A8A', fontSize: '14px' }}>{(item.price || 0).toLocaleString()} FCFA</span>
                    <button onClick={() => addToCart(item)} style={{ background: '#1E3A8A', color: '#FFFFFF', border: 'none', padding: '8px 14px', borderRadius: '8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>Order Now</button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

      </div>

      {/* Footer */}
      <footer style={{ background: '#FFFFFF', borderTop: '1px solid #E5E7EB', padding: '40px 5%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px', fontSize: '12px', color: '#6B7280' }}>
        <div>
          <div style={{ fontWeight: '900', color: '#1E3A8A', fontSize: '16px', marginBottom: '10px' }}>SPLASHY BITES</div>
          <p style={{ lineHeight: '1.6' }}>Bringing the finest traditional Cameroonian recipes straight to your door with unmatched taste and quality.</p>
        </div>
        <div>
          <h6 style={{ fontWeight: 800, color: '#111827', fontSize: '13px', marginBottom: '14px', textTransform: 'uppercase' }}>Quick Links</h6>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2' }}>
            <li><a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</a></li>
            <li><a href="#menu" style={{ color: 'inherit', textDecoration: 'none' }}>Menu</a></li>
            <li><a href="#about" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</a></li>
          </ul>
        </div>
        <div>
          <h6 style={{ fontWeight: 800, color: '#111827', fontSize: '13px', marginBottom: '14px', textTransform: 'uppercase' }}>Contact Us</h6>
          <p style={{ margin: '0 0 6px 0' }}>Molyko, Buea, Cameroon</p>
          <p style={{ margin: '0 0 6px 0' }}>(+237) 653 80 14 78/ 681 88 10 91</p>
          <p style={{ margin: 0 }}>kifonpreciouss@gmail.com</p>
        </div>
      </footer>

    </div>
  );
}