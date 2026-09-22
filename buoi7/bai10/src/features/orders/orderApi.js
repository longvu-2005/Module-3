import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: 'carts/add', // Demo API endpoint nhận POST order
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: orderData,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;