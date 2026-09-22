import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.example.com/' }), // Thay đổi URL endpoint thực tế
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (keyword) => ({
        url: 'products',
        params: { search: keyword },
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productApi;