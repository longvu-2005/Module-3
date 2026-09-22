import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }), // Endpoint API mẫu
  endpoints: (builder) => ({
    searchProducts: builder.query({
      query: (keyword) => ({
        url: 'products/search',
        params: { q: keyword },
      }),
      // Cấu hình tự động hủy request cũ nếu có request mới thay thế
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useSearchProductsQuery } = productApi;