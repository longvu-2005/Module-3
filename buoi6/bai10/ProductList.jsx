import React from 'react';
import { useDispatch } from 'react-redux';
import { useGetProductsQuery } from './eCommerceApi';
import { addToCart } from './cartSlice';

export const ProductList = () => {
  const { data, isLoading, isError } = useGetProductsQuery();
  const dispatch = useDispatch();

  if (isLoading) return <p>Đang tải danh sách sản phẩm...</p>;
  if (isError) return <p style={{ color: 'red' }}>Lỗi khi tải sản phẩm!</p>;

  return (
    <div style={{ flex: 1, padding: '16px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3>1. Chọn Sản Phẩm</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        {data?.products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #eee', padding: '12px', borderRadius: '6px' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>{product.title}</h4>
            <p style={{ color: '#007bff', fontWeight: 'bold', margin: '0 0 8px 0' }}>${product.price}</p>
            <button
              onClick={() => dispatch(addToCart(product))}
              style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
            >
              + Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};