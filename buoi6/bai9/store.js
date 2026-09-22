import { configureStore } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { rtkQueryErrorLogger } from './errorMiddleware';

// API Demo với các endpoint cố tình trả về lỗi
export const demoApi = createApi({
  reducerPath: 'demoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://httpstat.us/' }), // API giả lập các status code HTTP
  endpoints: (builder) => ({
    get401Error: builder.query({ query: () => '401' }),
    get404Error: builder.query({ query: () => '404' }),
    get500Error: builder.query({ query: () => '500' }),
    getSuccess: builder.query({ query: () => '200' }),
  }),
});

export const {
  useLazyGet401ErrorQuery,
  useLazyGet404ErrorQuery,
  useLazyGet500ErrorQuery,
  useLazyGetSuccessQuery,
} = demoApi;

export const store = configureStore({
  reducer: {
    [demoApi.reducerPath]: demoApi.reducer,
  },
  // Tích hợp rtkQueryErrorLogger vào chuỗi Middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(demoApi.middleware, rtkQueryErrorLogger),
});