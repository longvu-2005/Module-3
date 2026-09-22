import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }), // Endpoint API mẫu
  endpoints: (builder) => ({
    // Query lấy danh sách sản phẩm
    getProducts: builder.query({
      query: () => 'products?limit=8',
    }),
  }),
});

// RTK Query tự động sinh ra Custom Hook useGetProductsQuery dựa trên tên endpoint
export const { useGetProductsQuery } = productApi;