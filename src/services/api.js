import axios from 'axios';

// Using relative path so the proxy handles routing to port 5000 seamlessly
const API = axios.create({
  baseURL: '/api',
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

export default API;