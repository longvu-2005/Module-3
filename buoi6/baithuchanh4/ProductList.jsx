import React from 'react';
import { useGetProductsQuery } from './productApi';

export const ProductList = () => {
  // Lấy các biến trạng thái tự động từ Custom Hook của RTK Query
  const { data, isLoading, isError, error, refetch } = useGetProductsQuery();

  // Mảng sản phẩm từ response
  const products = data?.products || [];

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Danh sách Sản phẩm (RTK Query)</h2>
        <button
          onClick={() => refetch()}
          style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: '4px' }}
        >
          🔄 Làm mới dữ liệu
        </button>
      </div>

      {/* 1. Trạng thái Đang tải (Loading) */}
      {isLoading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: '#007bff', fontSize: '18px' }}>⏳ Đang tải danh sách sản phẩm...</p>
        </div>
      )}

      {/* 2. Trạng thái Gặp lỗi (Error) */}
      {isError && (
        <div
          style={{
            padding: '16px',
            backgroundColor: '#fff1f0',
            border: '1px solid #ffa39e',
            borderRadius: '8px',
            color: '#cf1322',
            margin: '20px 0',
          }}
        >
          <h4>⚠️ Không thể tải danh sách sản phẩm!</h4>
          <p>{error?.data?.message || 'Đã xảy ra lỗi kết nối với máy chủ.'}</p>
        </div>
      )}

      {/* 3. BẪY DỮ LIỆU: Xử lý trường hợp Mảng rỗng [] */}
      {!isLoading && !isError && products.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '40px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            border: '1px dashed #ccc',
            margin: '20px 0',
          }}
        >
          <span style={{ fontSize: '48px' }}>📦</span>
          <h3 style={{ color: '#666', marginTop: '12px' }}>Chưa có sản phẩm nào</h3>
          <p style={{ color: '#999', fontSize: '14px' }}>
            Hiện tại hệ thống chưa cập nhật sản phẩm nào trong danh mục này.
          </p>
        </div>
      )}

      {/* 4. Trạng thái Hiển thị dữ liệu thành công */}
      {!isLoading && !isError && products.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '16px',
            marginTop: '20px',
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                border: '1px solid #e1e8ed',
                borderRadius: '8px',
                padding: '16px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
              }}
            >
              <div>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '4px' }}
                />
                <h4 style={{ margin: '12px 0 6px 0', fontSize: '15px' }}>{product.title}</h4>
                <p style={{ color: '#666', fontSize: '13px', margin: 0 }}>
                  {product.description?.substring(0, 50)}...
                </p>
              </div>
              <p
                style={{
                  color: '#28a745',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  marginTop: '12px',
                  marginBottom: 0,
                }}
              >
                ${product.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};