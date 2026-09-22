import React, { useState } from 'react';
import {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} from './productApi';

export const AdminProductManager = () => {
  // Query danh sách sản phẩm
  const { data, isLoading, isError, isFetching } = useGetProductsQuery();

  // Mutations
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  // Form local state
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  // Handler: Thêm sản phẩm
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!title.trim() || !price) return;

    try {
      // .unwrap() giúp bắt lỗi HTTP trực tiếp trong khối try...catch
      await addProduct({ title, price: Number(price) }).unwrap();
      alert('✅ Thêm sản phẩm mới thành công! Dữ liệu đã được cập nhật.');
      setTitle('');
      setPrice('');
    } catch (error) {
      alert(`❌ Thêm sản phẩm thất bại: ${error?.data?.message || 'Có lỗi xảy ra'}`);
    }
  };

  // Handler: Xóa sản phẩm
  const handleDeleteProduct = async (id, title) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${title}"?`)) return;

    try {
      await deleteProduct(id).unwrap();
      alert(`✅ Xóa sản phẩm "${title}" thành công! Dữ liệu đã được tự động làm mới.`);
    } catch (error) {
      alert(`❌ Xóa sản phẩm thất bại: ${error?.data?.message || 'Không thể xóa sản phẩm này'}`);
    }
  };

  if (isLoading) return <div style={{ padding: '20px', textAlign: 'center' }}>⏳ Đang tải danh sách sản phẩm...</div>;
  if (isError) return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>❌ Lỗi tải dữ liệu sản phẩm.</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Phân hệ Admin - Quản lý Sản phẩm</h2>
        {isFetching && <span style={{ color: '#0284c7', fontSize: '14px' }}>🔄 Đang đồng bộ cache...</span>}
      </div>

      {/* Form Thêm sản phẩm */}
      <form
        onSubmit={handleAddProduct}
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          padding: '16px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}
      >
        <input
          type="text"
          placeholder="Tên sản phẩm..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ flex: 2, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="number"
          placeholder="Giá ($)..."
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button
          type="submit"
          disabled={isAdding}
          style={{
            padding: '8px 16px',
            backgroundColor: '#16a34a',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {isAdding ? 'Đang thêm...' : '➕ Thêm Sản Phẩm'}
        </button>
      </form>

      {/* Bảng Danh sách Sản phẩm */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f1f5f9', textAlign: 'left' }}>
            <th style={{ padding: '12px', borderBottom: '2px solid #cbd5e1' }}>ID</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #cbd5e1' }}>Tên Sản Phẩm</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #cbd5e1' }}>Giá</th>
            <th style={{ padding: '12px', borderBottom: '2px solid #cbd5e1', textAlign: 'center' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data?.products?.map((item) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>{item.id}</td>
              <td style={{ padding: '12px', fontWeight: '500' }}>{item.title}</td>
              <td style={{ padding: '12px', color: '#16a34a', fontWeight: 'bold' }}>${item.price}</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>
                <button
                  onClick={() => handleDeleteProduct(item.id, item.title)}
                  disabled={isDeleting}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#dc2626',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  🗑️ Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};