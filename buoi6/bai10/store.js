import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import shippingReducer from './shippingSlice';
import { eCommerceApi } from './eCommerceApi';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    shipping: shippingReducer,
    [eCommerceApi.reducerPath]: eCommerceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eCommerceApi.middleware),
});