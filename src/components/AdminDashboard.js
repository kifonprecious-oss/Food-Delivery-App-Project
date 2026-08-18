import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Admin PIN
  const ADMIN_PIN = '67666'; 

  // Keep track of previous order count to trigger sound alert on new orders
  const prevOrdersCountRef = useRef(0);

  // Play a subtle notification chime using Web Audio API
  const playNotificationSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5 note
      oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5 note

      gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      console.log('Audio playback not supported or blocked by browser policy');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Incorrect PIN. Please try again.');
      setPinInput('');
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders');
      const fetchedOrders = Array.isArray(response.data) 
        ? response.data 
        : (response.data.orders || []);
      
      // Check if new orders came in compared to previous poll
      if (prevOrdersCountRef.current > 0 && fetchedOrders.length > prevOrdersCountRef.current) {
        playNotificationSound();
      }
      prevOrdersCountRef.current = fetchedOrders.length;

      setOrders(fetchedOrders);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders. Make sure your backend server is running!');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
      const interval = setInterval(fetchOrders, 10000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((ord) => (ord._id === orderId ? { ...ord, status: newStatus } : ord))
      );
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Could not update order status. Check backend connection.');
    }
  };

  // Delete Order Function
  const deleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
      setOrders((prevOrders) => prevOrders.filter((ord) => ord._id !== orderId));
      prevOrdersCountRef.current = prevOrdersCountRef.current - 1;
    } catch (err) {
      console.error('Failed to delete order:', err);
      alert('Could not delete order.');
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Preparing':
        return { bg: '#fef3c7', color: '#d97706', border: '#fde68a' };
      case 'Ready':
        return { bg: '#e0f2fe', color: '#0284c7', border: '#bae6fd' };
      case 'Completed':
        return { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' };
      default:
        return { bg: '#f1f5f9', color: '#64748b', border: '#e2e8f0' };
    }
  };

  // Helper to open WhatsApp with pre-filled message
  const openWhatsApp = (order, name, phoneNum, deliveryLoc) => {
    let cleanPhone = phoneNum.replace(/\D/g, '');
    if (cleanPhone.length === 9 && cleanPhone.startsWith('6')) {
      cleanPhone = '237' + cleanPhone;
    }

    const itemsList = (order.items || order.orderItems || [])
      .map(item => `- ${item.name || item.title || (item.menuItem && item.menuItem.name) || 'Item'} (x${item.quantity || 1})`)
      .join('%0a');

    const message = `Hello ${name}! 👋%0a%0aThank you for ordering from *Bites By Splashy Empire*! 🍔✨%0a%0a*Your Order Details:*%0a${itemsList}%0a%0a*Total:* ${order.totalAmount || order.total || 0} FCFA%0a*Delivery Address:* ${deliveryLoc}%0a*Status:* ${order.status || 'Pending'}%0a%0aWe are on it! We'll keep you updated.`;

    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  // If not authenticated, show PIN Login Screen
  if (!isAuthenticated) {
    return (
      <div style={{ maxWidth: '400px', margin: '80px auto', padding: '30px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
        <h2 style={{ color: '#0e0954', marginBottom: '10px' }}>Merchant Login</h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>Enter your PIN to access the Admin Dashboard.</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="password" 
            maxLength="8"
            placeholder="Enter Admin PIN" 
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            style={{ padding: '12px', fontSize: '18px', textAlign: 'center', borderRadius: '6px', border: '1px solid #cbd5e1', letterSpacing: '4px' }}
            autoFocus
          />
          <button 
            type="submit"
            style={{ backgroundColor: '#0e0954', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Access Dashboard
          </button>
        </form>

        {pinError && <p style={{ color: 'red', fontSize: '13px', marginTop: '15px' }}>{pinError}</p>}
      </div>
    );
  }

  // Calculate Revenue & Statistics
  const totalOrdersCount = orders.length;
  const totalRevenue = orders.reduce((acc, order) => acc + (Number(order.totalAmount || order.total) || 0), 0);
  const completedOrdersCount = orders.filter(order => (order.status || 'Pending').toLowerCase() === 'completed').length;
  const pendingOrdersCount = orders.filter(order => (order.status || 'Pending').toLowerCase() === 'pending').length;

  // Filter orders based on active tab and search query
  const filteredOrders = orders.filter((order) => {
    const status = order.status || 'Pending';
    const matchesTab = activeTab === 'All' || status.toLowerCase() === activeTab.toLowerCase();

    const shippingInfo = order.shippingAddress || order.deliveryDetails || order.address || {};
    const name = order.customerName || order.name || order.fullName || shippingInfo.name || (order.user && order.user.name) || '';
    const phoneNum = order.phone || order.phoneNumber || order.contact || shippingInfo.phone || (order.user && order.user.phone) || '';
    const deliveryLoc = typeof shippingInfo === 'string' ? shippingInfo : (shippingInfo.address || shippingInfo.street || order.location || '');

    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      name.toLowerCase().includes(query) || 
      phoneNum.toLowerCase().includes(query) || 
      deliveryLoc.toLowerCase().includes(query);

    return matchesTab && matchesSearch;
  });

  const tabs = ['All', 'Pending', 'Preparing', 'Ready', 'Completed'];

  return (
    <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #0e0954', paddingBottom: '10px', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <h2 style={{ color: '#0e0954', margin: 0 }}>Merchant Order Dashboard</h2>
          <button 
            onClick={() => setIsAuthenticated(false)}
            style={{ backgroundColor: '#fee2e2', color: '#991b1b', border: 'none', padding: '5px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            🔒 Lock
          </button>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button 
            onClick={playNotificationSound}
            title="Test Chime Sound"
            style={{ backgroundColor: '#f3f4f6', color: '#374155', border: '1px solid #d1d5db', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
          >
            🔔 Test Sound
          </button>
          <button 
            onClick={fetchOrders}
            style={{ backgroundColor: '#0e0954', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            🔄 Refresh Orders
          </button>
        </div>
      </div>

      {/* Revenue & Metrics Summary Banner */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px', marginBottom: '25px' }}>
        <div style={{ backgroundColor: 'white', padding: '18px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', borderLeft: '4px solid #10b981' }}>
          <p style={{ margin: '0 0 5px', fontSize: '13px', color: '#666', fontWeight: 'bold' }}>TOTAL REVENUE</p>
          <h3 style={{ margin: 0, color: '#10b981', fontSize: '24px' }}>{totalRevenue.toLocaleString()} FCFA</h3>
        </div>
        <div style={{ backgroundColor: 'white', padding: '18px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', borderLeft: '4px solid #0e0954' }}>
          <p style={{ margin: '0 0 5px', fontSize: '13px', color: '#666', fontWeight: 'bold' }}>TOTAL ORDERS</p>
          <h3 style={{ margin: 0, color: '#0e0954', fontSize: '24px' }}>{totalOrdersCount}</h3>
        </div>
        <div style={{ backgroundColor: 'white', padding: '18px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', borderLeft: '4px solid #f59e0b' }}>
          <p style={{ margin: '0 0 5px', fontSize: '13px', color: '#666', fontWeight: 'bold' }}>PENDING ORDERS</p>
          <h3 style={{ margin: 0, color: '#f59e0b', fontSize: '24px' }}>{pendingOrdersCount}</h3>
        </div>
        <div style={{ backgroundColor: 'white', padding: '18px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', borderLeft: '4px solid #0ea5e9' }}>
          <p style={{ margin: '0 0 5px', fontSize: '13px', color: '#666', fontWeight: 'bold' }}>COMPLETED</p>
          <h3 style={{ margin: 0, color: '#0ea5e9', fontSize: '24px' }}>{completedOrdersCount}</h3>
        </div>
      </div>

      {/* Search Bar & Filter Tabs Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '15px', flexWrap: 'wrap' }}>
        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '5px' }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  backgroundColor: isActive ? '#0e0954' : '#e2e8f0',
                  color: isActive ? 'white' : '#334155',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  transition: 'all 0.2s'
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div style={{ position: 'relative', minWidth: '260px', flex: '1 1 260px', maxWidth: '400px' }}>
          <input
            type="text"
            placeholder="🔍 Search by name, phone, address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '20px',
              border: '1px solid #cbd5e1',
              fontSize: '14px',
              outline: 'none',
              backgroundColor: 'white',
              boxSizing: 'border-box'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {loading && <p style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>Loading incoming orders...</p>}
      {error && <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bold', marginTop: '40px' }}>{error}</p>}

      {!loading && !error && filteredOrders.length === 0 && (
        <div style={{ textAlign: 'center', padding: '50px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <p style={{ fontSize: '18px', color: '#666' }}>No matching orders found.</p>
        </div>
      )}

      {!loading && !error && filteredOrders.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {filteredOrders.map((order) => {
            const shippingInfo = order.shippingAddress || order.deliveryDetails || order.address || {};
            const name = order.customerName || order.name || order.fullName || shippingInfo.name || (order.user && order.user.name) || 'Customer';
            const phoneNum = order.phone || order.phoneNumber || order.contact || shippingInfo.phone || (order.user && order.user.phone) || 'N/A';
            const deliveryLoc = typeof shippingInfo === 'string' 
              ? shippingInfo 
              : (shippingInfo.address || shippingInfo.street || order.location || 'N/A');

            const currentStatus = order.status || 'Pending';
            const badge = getStatusStyle(currentStatus);
            const itemsList = order.items || order.orderItems || [];

            return (
              <div key={order._id || Math.random()} style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.05)', borderLeft: '5px solid #0e0954', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 5px', color: '#222' }}>{name}</h3>
                    <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>📞 {phoneNum}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ backgroundColor: badge.bg, color: badge.color, border: `1px solid ${badge.border}`, padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
                      {currentStatus}
                    </span>
                    <button
                      onClick={() => deleteOrder(order._id)}
                      title="Delete Order"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#ef4444', padding: '0 4px' }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <p style={{ margin: '10px 0', fontSize: '14px', color: '#444' }}>
                  <strong>📍 Delivery Address:</strong> {deliveryLoc}
                </p>

                <div style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee', padding: '10px 0', margin: '10px 0', flexGrow: 1 }}>
                  <p style={{ margin: '0 0 5px', fontSize: '13px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase' }}>Ordered Items:</p>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#333' }}>
                    {itemsList.map((item, index) => (
                      <li key={index} style={{ marginBottom: '4px' }}>
                        {item.name || item.title || (item.menuItem && item.menuItem.name) || 'Item'} <span style={{ color: '#666' }}>(x{item.quantity || 1})</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Status Update Buttons */}
                <div style={{ display: 'flex', gap: '5px', marginBottom: '10px', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => updateStatus(order._id, 'Preparing')}
                    style={{ flex: 1, backgroundColor: '#f59e0b', color: 'white', border: 'none', padding: '6px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Prepare
                  </button>
                  <button 
                    onClick={() => updateStatus(order._id, 'Ready')}
                    style={{ flex: 1, backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '6px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Ready
                  </button>
                  <button 
                    onClick={() => updateStatus(order._id, 'Completed')}
                    style={{ flex: 1, backgroundColor: '#10b981', color: 'white', border: 'none', padding: '6px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Complete
                  </button>
                </div>

                {/* WhatsApp Chat Button */}
                <button
                  onClick={() => openWhatsApp(order, name, phoneNum, deliveryLoc)}
                  style={{ backgroundColor: '#25D366', color: 'white', border: 'none', padding: '8px', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  💬 Message Customer on WhatsApp
                </button>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '12px', color: '#666', background: '#f0fdf4', padding: '4px 8px', borderRadius: '4px', border: '1px solid #bbf7d0' }}>
                    💳 {order.paymentMethod || 'Mobile Money'}
                  </span>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#2ecc71' }}>
                    {order.totalAmount || order.total || 0} FCFA
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;