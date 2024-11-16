import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`, // Replace with your backend URL
  timeout: 100000, // Optional timeout for requests
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor for adding the token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken'); // Get token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Interceptor for handling 401 errors (unauthorized)
apiClient.interceptors.response.use((response) => response, (error) => {
  if (error.response && error.response.status === 401) {
    // Redirect to login or handle token refresh logic
    localStorage.removeItem('accessToken');
    window.location.href = '/login'; // Redirect to login page
  }
  return Promise.reject(error);
});

export default apiClient;
