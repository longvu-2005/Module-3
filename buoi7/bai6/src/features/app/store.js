import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/search/searchSlice';
import { productApi } from '../features/products/productApi';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});