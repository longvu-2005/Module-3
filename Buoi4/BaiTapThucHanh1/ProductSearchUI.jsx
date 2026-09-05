import React, { useState } from 'react';
import { ProductService } from './ProductService.js';

export const ProductSearchUI = () => {
  const [keyword, setKeyword] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Ví dụ từ khóa chứa ký tự đặc biệt: "Áo sơ mi & quần jeans #2026"
      const data = await ProductService.searchProducts(keyword, 1, 10);
      setProducts(data);
    } catch (error) {
      alert('Không thể tìm kiếm sản phẩm. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Tìm kiếm Sản phẩm</h2>

      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Nhập từ khóa (VD: Áo & Quần #1)..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          disabled={loading}
          style={{ width: '70%', padding: '8px', marginRight: '10px' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '8px 16px' }}>
          {loading ? 'Đang tìm...' : 'Tìm kiếm'}
        </button>
      </form>

      <div>
        <h3>Kết quả:</h3>
        {products.length === 0 ? (
          <p>Chưa có dữ liệu sản phẩm.</p>
        ) : (
          <ul>
            {products.map((item) => (
              <li key={item.id}>{item.name} - {item.price} VNĐ</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};