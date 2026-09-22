import { configureStore } from '@reduxjs/toolkit';
import { productApi } from './productApi';

export const store = configureStore({
  reducer: {
    // Tích hợp reducer của RTK Query vào Store
    [productApi.reducerPath]: productApi.reducer,
  },
  // Tích hợp middleware của RTK Query để bật các tính năng caching, invalidation, polling
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});