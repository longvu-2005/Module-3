import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }), // Demo API Endpoint
  endpoints: (builder) => ({
    getProductsBySearch: builder.query({
      query: (keyword) => `products/search?q=${encodeURIComponent(keyword)}`,
    }),
  }),
});

export const { useGetProductsBySearchQuery } = productApi;