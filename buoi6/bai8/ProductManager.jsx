import React, { useState } from 'react';
import {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from './productApi';

export const ProductManager = () => {
  // Queries & Mutations
  const { data, isLoading, isFetching, isError } = useGetProductsQuery();
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  // Local Form State
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Xử lý Thêm / Sửa
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Vui lòng nhập tên sản phẩm!');

    try {
      if (editingId) {
        // Gọi API Cập nhật
        await updateProduct({ id: editingId, title }).unwrap();
        alert('Cập nhật sản phẩm thành công!');
        setEditingId(null);
      } else {
        // Gọi API Thêm
        await addProduct({ title, price: 100 }).unwrap();
        alert('Thêm sản phẩm thành công!');
      }
      setTitle('');
    } catch (error) {
      alert(`Thao tác thất bại: ${error?.data?.message || 'Có lỗi xảy ra!'}`);
    }
  };

  // Xử lý Xóa sản phẩm
  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;

    try {
      // Chỉ khi unwrap() trả về mã thành công 2xx
      await deleteProduct(id).unwrap();
      alert('Xóa sản phẩm thành công!');
    } catch (error) {
      alert(`Xóa thất bại: ${error?.data?.message || 'Không thể xóa sản phẩm này!'}`);
    }
  };

  // Kích hoạt chế độ chỉnh sửa
  const handleEdit = (product) => {
    setEditingId(product.id);
    setTitle(product.title);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle('');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>Admin - Quản lý Sản phẩm {isFetching && <small style={{ fontSize: '12px', color: '#007bff' }}>(Đang đồng bộ Cache...)</small>}</h2>

      {/* Form Thêm / Sửa */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '24px', display: 'flex', gap: '8px' }}>
        <input
          type="text"
          placeholder="Nhập tên sản phẩm..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ flex: 1, padding: '10px', fontSize: '14px' }}
        />
        <button
          type="submit"
          disabled={isAdding || isUpdating}
          style={{ padding: '10px 20px', backgroundColor: editingId ? '#ffc107' : '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          {editingId ? (isUpdating ? 'Đang sửa...' : 'Lưu cập nhật') : isAdding ? 'Đang thêm...' : 'Thêm mới'}
        </button>
        {editingId && (
          <button type="button" onClick={handleCancelEdit} style={{ padding: '10px 16px' }}>
            Hủy
          </button>
        )}
      </form>

      {/* Trạng thái Loading / Error */}
      {isLoading && <p>Đang tải danh sách sản phẩm...</p>}
      {isError && <p style={{ color: 'red' }}>Lỗi khi tải danh sách sản phẩm!</p>}

      {/* Bảng danh sách sản phẩm */}
      {data?.products && (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4' }}>
              <th>ID</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {data.products.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>${item.price}</td>
                <td style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  <button onClick={() => handleEdit(item)} style={{ padding: '4px 12px' }}>
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={isDeleting}
                    style={{ padding: '4px 12px', backgroundColor: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};