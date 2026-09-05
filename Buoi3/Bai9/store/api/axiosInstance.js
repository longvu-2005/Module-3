import axios from 'axios';
import { useBoundStore } from '../store/useBoundStore.js';

export const axiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Đọc token trực tiếp ngoài React Component bằng Vanilla JS API
    const token = useBoundStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Tự động Logout và hiển thị Toast khi Token hết hạn
      useBoundStore.getState().logout();
      useBoundStore.getState().showToast('Phiên đăng nhập hết hạn!');
    }
    return Promise.reject(error);
  }
);