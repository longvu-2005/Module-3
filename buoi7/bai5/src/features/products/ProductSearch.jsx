import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setKeyword, selectSearchKeyword } from '../search/searchSlice';
import { useGetProductsBySearchQuery } from './productApi';

export const ProductSearch = () => {
  const dispatch = useDispatch();
  
  // 1. Lấy Client State từ Redux Store
  const rawKeyword = useSelector(selectSearchKeyword);

  // 2. Làm sạch chuỗi input (loại bỏ khoảng trắng dư thừa)
  const cleanKeyword = rawKeyword.trim();

  // 3. Kết nối với Server State via RTK Query Hook
  // Cơ chế chặn: skip = true khi cleanKeyword rỗng
  const { data, isFetching, isLoading, isError, error } = useGetProductsBySearchQuery(
    cleanKeyword,
    {
      skip: !cleanKeyword, 
    }
  );

  const handleInputChange = (e) => {
    dispatch(setKeyword(e.target.value));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Tìm kiếm sản phẩm</h2>
      
      {/* Search Input */}
      <input
        type="text"
        value={rawKeyword}
        onChange={handleInputChange}
        placeholder="Nhập tên sản phẩm (vd: Laptop)..."
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
          marginBottom: '20px',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}
      />

      {/* Hiển thị trạng thái */}
      {!cleanKeyword && (
        <p style={{ color: '#666' }}>
          💡 Vui lòng nhập từ khóa hợp lệ để tìm kiếm (Khoảng trắng không được tính).
        </p>
      )}

      {(isLoading || isFetching) && <p>⏳ Đang tải dữ liệu...</p>}

      {isError && (
        <p style={{ color: 'red' }}>
          ❌ Đã xảy ra lỗi: {error?.data?.message || 'Không thể lấy dữ liệu'}
        </p>
      )}

      {/* Kết quả danh sách sản phẩm */}
      {cleanKeyword && data && (
        <div>
          <h3>Kết quả cho từ khóa: "{cleanKeyword}"</h3>
          <p>Tìm thấy: {data.products?.length || 0} sản phẩm</p>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {data.products?.map((product) => (
              <li
                key={product.id}
                style={{
                  padding: '10px',
                  borderBottom: '1px solid #eee',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span><strong>{product.title}</strong></span>
                <span>${product.price}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};