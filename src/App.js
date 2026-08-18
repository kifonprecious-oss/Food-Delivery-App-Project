import React, { useEffect, useState } from 'react';
import { fetchMenuItems } from './services/api';
import CartModal from './components/CartModal';
import AdminDashboard from './components/AdminDashboard';
import AuthModal from './components/AuthModal';
import './App.css';

function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // View switcher state: 'store' or 'admin'
  const [viewMode, setViewMode] = useState('store');

  // User Authentication State
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    // Check if user is already logged in from previous session
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchMenuItems()
      .then((response) => {
        setMenuItems(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching menu items:', err);
        setError('Failed to load menu items. Make sure your backend server is running!');
        setLoading(false);
      });
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setMessage(`Welcome back, ${userData.name}!`);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    setViewMode('store'); // Reset to storefront on logout
    setMessage('Logged out successfully.');
    setTimeout(() => setMessage(null), 3000);
  };

  // Add to cart handler
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });

    setMessage(`Added "${item.name}" to cart!`);
    setTimeout(() => setMessage(null), 3000);
  };

  // Update quantity handler (+ / -)
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item handler
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  // Clear cart on successful order
  const clearCart = () => {
    setCart([]);
  };

  // Extract unique categories dynamically from menu items
  const categories = ['All', ...new Set(menuItems.map((item) => item.category))];

  // Filter items based on selected category
  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '50px' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#0e0954', color: 'white', padding: '20px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'relative' }}>
        <h1 style={{ margin: 0, fontSize: 'clamp(24px, 4vw, 36px)' }}>Bites By Splashy Empire</h1>
        <p style={{ margin: '5px 0 0', fontSize: 'clamp(14px, 2vw, 16px)' }}>Fresh, delicious meals delivered right to your doorstep!</p>
        
        {/* Navigation / Switcher Buttons */}
        <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setViewMode('store')}
            style={{ 
              backgroundColor: viewMode === 'store' ? '#2ecc71' : 'transparent', 
              color: 'white', border: '1px solid white', padding: '6px 12px', borderRadius: '4px', 
              fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' 
            }}
          >
            Storefront
          </button>
          <button 
            onClick={() => {
              if (user && user.role === 'admin') {
                setViewMode('admin');
              } else {
                alert('Access Denied. You must be logged in as an admin to view this dashboard.');
                setIsAuthModalOpen(true);
              }
            }}
            style={{ 
              backgroundColor: viewMode === 'admin' ? '#2ecc71' : 'transparent', 
              color: 'white', border: '1px solid white', padding: '6px 12px', borderRadius: '4px', 
              fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' 
            }}
          >
            Admin Dashboard
          </button>
        </div>

        {/* Right Header: User Account Section & Cart Badge */}
        <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          {/* User Auth Section */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,255,255,0.1)', padding: '5px 12px', borderRadius: '20px' }}>
              <span style={{ fontSize: '13px' }}>Hi, <strong>{user.name}</strong></span>
              {user.role === 'admin' && (
                <span style={{ backgroundColor: '#0ea5e9', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>Admin</span>
              )}
              <button 
                onClick={handleLogout}
                style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              style={{ backgroundColor: '#22c55e', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
            >
              Login / Sign Up
            </button>
          )}

          {/* Clickable Cart Badge (Only show on Storefront) */}
          {viewMode === 'store' && (
            <div 
              onClick={() => setIsCartOpen(true)}
              style={{ 
                backgroundColor: '#2ecc71', padding: '8px 15px', borderRadius: '20px', 
                fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' 
              }}
            >
              🛒 Cart: {cart.reduce((total, item) => total + item.quantity, 0)}
            </div>
          )}
        </div>
      </header>

      {/* Cart Modal Drawer */}
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        updateQuantity={updateQuantity} 
        removeFromCart={removeFromCart} 
        onOrderSuccess={clearCart}
      />

      {/* Auth Modal Component */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess} 
      />

      {/* Floating Success Notification */}
      {message && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#2ecc71', color: 'white', padding: '12px 20px', borderRadius: '6px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 1000, fontWeight: 'bold' }}>
          {message}
        </div>
      )}

      {/* Conditional View Rendering with Security Check */}
      {viewMode === 'admin' && user && user.role === 'admin' ? (
        <AdminDashboard />
      ) : (
        <main style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px' }}>
          {viewMode === 'admin' && (
            <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>
              ⚠️ Admin access required. Please log in with an administrator account to view the dashboard.
            </div>
          )}

          <h2 style={{ borderBottom: '2px solid #0e0954', paddingBottom: '10px', color: '#333' }}>Our Live Menu</h2>

          {/* Category Filter Buttons */}
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '15px', marginTop: '15px', whiteSpace: 'nowrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  backgroundColor: selectedCategory === cat ? '#0e0954' : '#e2e8f0',
                  color: selectedCategory === cat ? 'white' : '#333',
                  transition: 'background 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading && <p style={{ textAlign: 'center', fontSize: '18px', color: '#666', marginTop: '40px' }}>Loading delicious dishes...</p>}
          {error && <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bold', marginTop: '40px' }}>{error}</p>}

          {!loading && !error && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '20px' }}>
              {filteredItems.map((item) => (
                <div key={item._id} style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'; }} 
                  />
                  <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#0e0954', textTransform: 'uppercase', marginBottom: '5px' }}>{item.category}</span>
                    <h3 style={{ margin: '0 0 10px', fontSize: '18px', color: '#222' }}>{item.name}</h3>
                    <p style={{ color: '#666', fontSize: '14px', flexGrow: 1, margin: '0 0 15px' }}>{item.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                      <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#2ecc71' }}>{item.price} FCFA</span>
                      <button 
                        onClick={() => addToCart(item)}
                        style={{ backgroundColor: '#0e0954', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}
    </div>
  );
}

export default App;