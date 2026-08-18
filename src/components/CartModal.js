import React, { useState } from 'react';
import CheckoutModal from './CheckoutModal'; // Make sure the path matches your project structure

const CartModal = ({ isOpen, onClose, cart, updateQuantity, removeFromCart, onOrderSuccess }) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isOpen) return null;

  // Calculate total price
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'flex-end', zIndex: 1000
      }}>
        <div style={{
          width: '100%', maxWidth: '400px', backgroundColor: 'white', height: '100%', padding: '20px',
          display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 10px rgba(0,0,0,0.1)', boxSizing: 'border-box'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', paddingBottom: '15px' }}>
            <h2 style={{ margin: 0, color: '#0e0954' }}>Your Cart</h2>
            <button 
              onClick={onClose}
              style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              &times;
            </button>
          </div>

          {/* Cart Items List */}
          <div style={{ flexGrow: 1, overflowY: 'auto', margin: '15px 0' }}>
            {cart.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#666', marginTop: '50px' }}>Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                  <div>
                    <h4 style={{ margin: '0 0 5px', color: '#222' }}>{item.name}</h4>
                    <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>{item.price} FCFA</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      style={{ padding: '2px 8px', background: '#ddd', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
                    >
                      -
                    </button>
                    <span style={{ fontWeight: 'bold' }}>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      style={{ padding: '2px 8px', background: '#ddd', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
                    >
                      +
                    </button>
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', marginLeft: '5px' }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Total */}
          {cart.length > 0 && (
            <div style={{ borderTop: '1px solid #ddd', paddingTop: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
                <span>Total:</span>
                <span style={{ color: '#2ecc71' }}>{totalAmount} FCFA</span>
              </div>
              <button 
                style={{ width: '100%', backgroundColor: '#0e0954', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
                onClick={() => setIsCheckoutOpen(true)}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal Form */}
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        totalAmount={totalAmount}
        onOrderSuccess={() => {
          setIsCheckoutOpen(false);
          onOrderSuccess(); // Clears cart and closes cart modal from parent component
        }}
      />
    </>
  );
};

export default CartModal;