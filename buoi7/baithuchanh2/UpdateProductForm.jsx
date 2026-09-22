import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProductApi } from '../api/productApi';
import { toast } from 'react-toastify';

export const UpdateProductForm = ({ product }) => {
  const [price, setPrice] = useState(product.price);
  
  // 1. Khởi tạo queryClient
  const queryClient = useQueryClient();

  // 2. Định nghĩa Mutation với cơ chế Invalidate Cache chuẩn xác
  const updateProductMutation = useMutation({
    mutationFn: (newPrice) => updateProductApi(product.id, { price: newPrice }),
    onSuccess: () => {
      // ✅ VÁ LỖI TẠI ĐÂY: Đánh dấu Cache ['products'] hết hạn
      // Ép TanStack Query tự động refetch lại danh sách sản phẩm mới nhất từ Server
      queryClient.invalidateQueries({ queryKey: ['products'] });

      toast.success('Cập nhật giá sản phẩm thành công!');
    },
    onError: (error) => {
      toast.error(`Cập nhật thất bại: ${error.message}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProductMutation.mutate(Number(price));
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <button
        type="submit"
        disabled={updateProductMutation.isPending}
        style={{
          padding: '6px 12px',
          backgroundColor: '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {updateProductMutation.isPending ? 'Đang lưu...' : 'Cập nhật giá'}
      </button>
    </form>
  );
};