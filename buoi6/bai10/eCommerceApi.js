import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const eCommerceApi = createApi({
  reducerPath: 'eCommerceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }), // Endpoint API mẫu
  endpoints: (builder) => ({
    // Query lấy danh sách sản phẩm
    getProducts: builder.query({
      query: () => 'products?limit=6',
    }),

    // Mutation tạo đơn hàng mới
    createOrder: builder.mutation({
      query: (orderPayload) => ({
        url: 'carts/add',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: orderPayload,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useCreateOrderMutation } = eCommerceApi;