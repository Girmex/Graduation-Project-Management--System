import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/', // Set your desired base URL here
});
axiosInstance.interceptors.request.use((config) => {
  const storedToken = localStorage.getItem('token');
  if (storedToken) {
    const tokenData = JSON.parse(storedToken);
    const currentTime = new Date().getTime();

    config.headers['Authorization'] = `Bearer ${tokenData.token}`;
  }
  return config;
});

export default axiosInstance;
