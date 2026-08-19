import axios from 'axios';

// Pointing directly to your live Render backend URL for public production deployment
const API = axios.create({
  baseURL: 'https://food-delivery-app-project-vqx3.onrender.com/api',
});

// Automatically attach authorization token if available in localStorage
API.interceptors.request.use((req) => {
  const profile = localStorage.getItem('userProfile');
  if (profile) {
    const { token } = JSON.parse(profile);
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }
  return req;
});

export const fetchMenuItems = () => API.get('/menu');
export const createOrder = (orderData) => API.post('/orders', orderData);
export const loginUser = (formData) => API.post('/auth/login', formData);
export const registerUser = (formData) => API.post('/auth/register', formData);

// --- Admin User Management API Calls ---
export const fetchAllUsers = () => API.get('/auth/users');
export const updateUserRole = (userId, newRole) => API.put(`/auth/users/${userId}/role`, { role: newRole });

export default API;