// axiosInstance.js
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://eduflick-server-nine.vercel.app/api/', // Replace with your API base URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // Do something before request is sent
    console.log('Request Interceptor:', config);
    // For example, add an authorization token
    config.headers.Authorization = 'Bearer your_token_here';
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => {
    // Do something with response data
    console.log('Response Interceptor:', response);
    return response.data;
  },
  error => {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstance;