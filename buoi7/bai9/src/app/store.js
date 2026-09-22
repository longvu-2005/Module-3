import { configureStore } from '@reduxjs/toolkit';
import { demoApi } from '../features/demo/demoApi';
import { rtkQueryErrorLogger } from './rtkQueryErrorLogger';

export const store = configureStore({
  reducer: {
    [demoApi.reducerPath]: demoApi.reducer,
  },
  // Tích hợp Custom Middleware vào chuỗi middleware mặc định
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(demoApi.middleware, rtkQueryErrorLogger),
});