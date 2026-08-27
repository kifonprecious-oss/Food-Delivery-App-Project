const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Trust proxy settings for production deployment (Render)
app.set('trust proxy', 1);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URI (Fallback included just in case)
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://kifonprecious_db_user:splashy221@cluster0.zkj66ao.mongodb.net/?appName=Cluster0";

// 1. Connect to MongoDB Database
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch(err => console.error('Database connection error:', err));

// 2. Define API Routes
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);

// 3. Serve React Frontend in Production (Using 'build' for Create React App)
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
});

// 4. Start Server with '0.0.0.0' for local network binding
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});