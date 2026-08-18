import React, { useState } from 'react';

const CheckoutModal = ({ isOpen, onClose, cart, totalAmount, onOrderSuccess }) => {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Mobile Money');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Format cart items to match your Order schema (menuItem, quantity, price)
    const formattedOrderItems = cart.map((item) => ({
      menuItem: item._id,
      quantity: item.quantity,
      price: item.price
    }));

    const orderData = {
      // NOTE: Replace with dynamic user ID once user authentication state is integrated
      user: "650c1234567890abcdef1234", 
      orderItems: formattedOrderItems,
      shippingAddress: {
        address: address,
        phone: phone,
        notes: "No extra notes"
      },
      paymentMethod: paymentMethod,
      totalAmount: totalAmount
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Order placed successfully!');
        onOrderSuccess(); // Clears cart and closes modals
      } else {
        alert('Failed to place order: ' + (data.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Network error. Make sure your backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1100
    }}>
      <div style={{
        width: '450px', backgroundColor: 'white', padding: '30px', borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)', position: 'relative'
      }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          &times;
        </button>

        <h2 style={{ color: '#0e0954', marginTop: 0, marginBottom: '20px' }}>Delivery Details</h2>
        
        <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Phone Number</label>
            <input 
              type="text" 
              required 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 670000000"
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Delivery Location / Address</label>
            <textarea 
              required 
              value={address} 
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Up Station, Street 3 or Neighborhood landmark"
              rows="3"
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box', resize: 'vertical' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Payment Method</label>
            <select 
              value={paymentMethod} 
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box', backgroundColor: 'white' }}
            >
              <option value="Mobile Money">Mobile Money</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', fontSize: '16px', fontWeight: 'bold' }}>
            <span>Total to Pay:</span>
            <span style={{ color: '#2ecc71' }}>{totalAmount} FCFA</span>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              backgroundColor: '#0e0954', color: 'white', border: 'none', padding: '12px', 
              borderRadius: '6px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '10px' 
            }}
          >
            {loading ? 'Submitting Order...' : 'Confirm & Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;