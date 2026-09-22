import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import { productApi } from './productApi';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});