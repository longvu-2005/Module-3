import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }), // Endpoint API mẫu
  // 1. Khai báo tagTypes để quản lý Cache cho đối tượng Product
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    // Query: Lấy danh sách sản phẩm
    getProducts: builder.query({
      query: () => 'products?limit=10',
      // 2. Gắn nhãn Cache cung cấp bởi Query này
      providesTags: (result) =>
        result && result.products
          ? [
              // Thẻ tổng cho toàn bộ danh sách
              { type: 'Product', id: 'LIST' },
              // Thẻ riêng cho từng ID sản phẩm
              ...result.products.map(({ id }) => ({ type: 'Product', id })),
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),

    // Mutation: Thêm sản phẩm mới
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: 'products/add',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: newProduct,
      }),
      // 3. Khi Thêm thành công -> Hủy tag LIST để trigger refetch danh sách
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),

    // Mutation: Cập nhật thông tin sản phẩm
    updateProduct: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `products/${id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: patch,
      }),
      // Khi Cập nhật thành công -> Hủy tag ID cụ thể và tag LIST
      invalidatesTags: (result, error, { id }) => [
        { type: 'Product', id },
        { type: 'Product', id: 'LIST' },
      ],
    }),

    // Mutation: Xóa sản phẩm
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      // Khi Xóa thành công -> Hủy tag LIST để gọi lại danh sách mới
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