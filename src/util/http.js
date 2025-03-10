import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8000/api/', // Replace with your API base URL
  baseURL: 'https://eduflickserver.vercel.app/api/',
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (config.url !== "auth/login" && config.url !== "auth/register") {
      config.headers.Authorization = `${token}`;
    }
    console.log('Request Interceptor:', config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
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
      return {}
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
