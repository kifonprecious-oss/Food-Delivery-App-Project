import React, { useState } from 'react';
import { menuItems } from '../data/mockData';
import { useCart } from '../context/CartContext';

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Fast Food');
  const { addToCart } = useCart();

  const categories = [
    'Fast Food', 'Thalis', 'Desserts', 'Biryani', 
    'Cold Drinks', 'South Indian', 'North Indian', 
    'Chinese', 'Snacks', 'Beverages', 'Shakes'
  ];

  const filteredItems = menuItems.filter(item => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="app-container">
      
      {/* Top Header Navbar */}
      <header className="navbar">
        <div className="nav-logo">CLOUD CHEF</div>
        <ul className="nav-links">
          <li><a href="/" className="active">Home</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#about">About</a></li>
        </ul>
        <div className="nav-buttons">
          <button className="btn-outline">Contact Us</button>
          <a href="/cart" className="btn-solid">Order Now</a>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="hero-section">
        <h2>Our Menu</h2>
        <p>Explore our wide range of freshly prepared dishes, cooked hygienically using quality ingredients and delivered hot to your doorstep.</p>
        <a href="#menu" className="btn-solid" style={{display: 'inline-block'}}>Our Best Sellers</a>
      </section>

      {/* Main Container */}
      <main className="main-content">
        
        {/* Offers & Discounts */}
        <section style={{marginBottom: '40px'}}>
          <h3 className="section-title">Offers & Discounts</h3>
          <div className="offers-grid">
            <div className="offer-card">
              <div>
                <span className="offer-badge">Buy 1 Get 1 Free</span>
                <h4>Veg Loaded Pizza</h4>
                <button onClick={() => addToCart(menuItems[0])} className="btn-solid" style={{marginTop: '10px'}}>Order Now</button>
              </div>
              <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300" alt="Pizza" />
            </div>

            <div className="offer-card">
              <div>
                <span className="offer-badge">15% Discounts</span>
                <h4>Double Cheese Burger</h4>
                <button onClick={() => addToCart(menuItems[2])} className="btn-solid" style={{marginTop: '10px'}}>Order Now</button>
              </div>
              <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300" alt="Burger" />
            </div>
          </div>
        </section>

        {/* Best Sellers Section */}
        <section id="menu" style={{marginBottom: '40px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
            <h3 className="section-title" style={{margin: 0}}>Best Sellers</h3>
            <div style={{display: 'flex', gap: '6px'}}>
              <button style={{width: '30px', height: '30px', borderRadius: '8px', border: '1px solid #D1D5DB', background: '#fff', cursor: 'pointer'}}>&lsaquo;</button>
              <button style={{width: '30px', height: '30px', borderRadius: '8px', border: 'none', background: '#1E3A8A', color: '#fff', cursor: 'pointer'}}>&rsaquo;</button>
            </div>
          </div>

          <div className="bestsellers-grid">
            {menuItems.slice(0, 4).map(item => (
              <div key={item.id} className="food-card">
                <div>
                  <img src={item.image} alt={item.name} />
                  <h5>{item.name}</h5>
                  <p>{item.description}</p>
                </div>
                <div className="card-footer">
                  <span className="price-tag">₹{item.price}/-</span>
                  <button onClick={() => addToCart(item)} className="btn-solid" style={{padding: '6px 12px', fontSize: '10px'}}>Order Now</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories Sidebar + Menu Items Grid Box */}
        <div className="dashboard-box">
          <div className="sidebar">
            <h3 className="section-title" style={{marginBottom: '15px'}}>Menu Categories</h3>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`sidebar-btn ${selectedCategory === cat ? 'active' : ''}`}
              >
                <span>{cat}</span>
                <span>&rsaquo;</span>
              </button>
            ))}
          </div>

          <div className="menu-grid-area">
            <input 
              type="text" 
              placeholder="Search menu items..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />

            <div className="items-grid-3">
              {filteredItems.map(item => (
                <div key={item.id} className="food-card">
                  <div>
                    <img src={item.image} alt={item.name} style={{height: '110px'}} />
                    <h5>{item.name}</h5>
                    <p>{item.description}</p>
                  </div>
                  <div className="card-footer">
                    <span className="price-tag">₹{item.price}/-</span>
                    <button onClick={() => addToCart(item)} className="btn-solid" style={{padding: '6px 12px', fontSize: '10px'}}>Order Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="footer">
        <div>
          <div style={{fontWeight: '900', color: '#1E3A8A', fontSize: '15px', marginBottom: '8px'}}>CLOUD CHEF</div>
          <p style={{lineHeight: '1.5'}}>Delivering quality meals straight to your doorstep with total speed and hygiene.</p>
        </div>
        <div>
          <h6>Links</h6>
          <ul style={{listStyle: 'none', padding: 0, margin: 0, lineHeight: '1.8'}}>
            <li><a href="/" style={{color: 'inherit', textDecoration: 'none'}}>Home</a></li>
            <li><a href="#menu" style={{color: 'inherit', textDecoration: 'none'}}>Menu</a></li>
            <li><a href="#about" style={{color: 'inherit', textDecoration: 'none'}}>About</a></li>
          </ul>
        </div>
        <div>
          <h6>Contact Us</h6>
          <p style={{margin: '0 0 4px 0'}}>1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
          <p style={{margin: '0 0 4px 0'}}>(907) 555-0101</p>
          <p style={{margin: 0}}>cloudchef@gmail.com</p>
        </div>
        <div>
          <h6>Gallery</h6>
          <div className="footer-thumbs">
            <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100" alt="food" />
            <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100" alt="food" />
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100" alt="food" />
          </div>
        </div>
      </footer>

    </div>
  );
}