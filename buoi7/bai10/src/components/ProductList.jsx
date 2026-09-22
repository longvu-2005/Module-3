import React from 'react';
import { useDispatch } from 'react-redux';
import { useGetProductsQuery } from '../features/products/productApi';
import { addToCart } from '../features/cart/cartSlice';

export const ProductList = () => {
  const { data, isLoading, isError } = useGetProductsQuery();
  const dispatch = useDispatch();

  if (isLoading) return <div>⏳ Đang tải sản phẩm...</div>;
  if (isError) return <div style={{ color: 'red' }}>❌ Không thể tải danh sách sản phẩm</div>;

  return (
    <div>
      <h3>🛍️ Danh Sách Sản Phẩm</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {data?.products?.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '12px',
              textAlign: 'center',
            }}
          >
            <h4 style={{ margin: '8px 0' }}>{product.title}</h4>
            <p style={{ color: '#16a34a', fontWeight: 'bold' }}>${product.price}</p>
            <button
              onClick={() => dispatch(addToCart(product))}
              style={{
                backgroundColor: '#2563eb',
                color: '#fff',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              🛒 Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};