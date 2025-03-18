import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  // baseURL: 'http://127.0.0.1:8000/api/', // Update with your actual API URL
  baseURL: 'https://eduflickserver.vercel.app/api/', // Update with your actual API URL
  withCredentials: false, // Important for authentication (cookies, JWT)
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    "Content-Type": "application/json"
  }
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');

    if (token && !config.url.includes("auth/login") && !config.url.includes("auth/register") && token) {
      config.headers.Authorization = `${token}`;
    }
    
    console.log('Request Interceptor:', config);
    return config;
  },
  error => Promise.reject(error)
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => {
    console.log('Response Interceptor:', response);
    return response.data;
  },
  error => {
    console.log("[error]", error.response?.status);
    
    if (error.response?.status === 401) {
      localStorage.removeItem("token"); // Clear token if unauthorized
      window.location.href = "/"; // Redirect to login page
      return Promise.reject({ message: "Unauthorized" });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
