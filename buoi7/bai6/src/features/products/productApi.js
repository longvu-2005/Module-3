import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  keepUnusedDataFor: 60, // Giữ cache trong 60 giây để tránh gọi lại từ khóa trùng
  endpoints: (builder) => ({
    searchProducts: builder.query({
      query: (keyword) => `products/search?q=${encodeURIComponent(keyword)}`,
    }),
  }),
});

export const { useSearchProductsQuery } = productApi;