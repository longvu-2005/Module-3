import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }), // Demo API Endpoint
  tagTypes: ['Product'], // Khai báo các kiểu Tag trong hệ thống
  endpoints: (builder) => ({
    
    // 1. QUERY: Lấy danh sách sản phẩm (Gắn nhãn Provides Tags)
    getProducts: builder.query({
      query: () => 'products?limit=5',
      providesTags: (result) =>
        result
          ? [
              // Gắn Tag cho từng item cụ thể
              ...result.products.map(({ id }) => ({ type: 'Product', id })),
              // Gắn Tag đại diện cho toàn bộ danh sách
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),

    // 2. MUTATION: Thêm sản phẩm mới
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: 'products/add',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: newProduct,
      }),
      // Khi thêm thành công -> Hủy cache LIST để tự động refetch danh sách
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),

    // 3. MUTATION: Cập nhật sản phẩm
    updateProduct: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `products/${id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: updatedData,
      }),
      // Hủy cache item cụ thể và danh sách
      invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }],
    }),

    // 4. MUTATION: Xóa sản phẩm
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      // Hủy cache của item bị xóa & làm mới danh sách
      invalidatesTags: (result, error, id) => [
        { type: 'Product', id },
        { type: 'Product', id: 'LIST' },
      ],
    }),

  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;