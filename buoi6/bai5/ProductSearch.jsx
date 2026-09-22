import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setKeyword, selectSearchKeyword } from './searchSlice';
import { useGetProductsQuery } from './productApi';

export const ProductSearch = () => {
  const dispatch = useDispatch();
  const keyword = useSelector(selectSearchKeyword);

  // Xử lý trim khoảng trắng
  const trimmedKeyword = keyword.trim();
  const isQueryDisabled = trimmedKeyword === '';

  // Kết nối RTK Query với cơ chế skip
  const { data: products, isFetching, isError } = useGetProductsQuery(trimmedKeyword, {
    skip: isQueryDisabled, // Ngăn chặn gọi API nếu từ khóa rỗng hoặc chỉ chứa khoảng trắng
  });

  const handleInputChange = (e) => {
    dispatch(setKeyword(e.target.value));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Tìm kiếm sản phẩm</h2>
      
      <input
        type="text"
        value={keyword}
        onChange={handleInputChange}
        placeholder="Nhập từ khóa tìm kiếm (ví dụ: Laptop)..."
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />

      {/* Hiển thị trạng thái */}
      {isQueryDisabled && (
        <p style={{ color: '#666' }}>Vui lòng nhập từ khóa để tìm kiếm sản phẩm.</p>
      )}

      {isFetching && <p>Đang tải dữ liệu...</p>}

      {isError && <p style={{ color: 'red' }}>Đã xảy ra lỗi khi lấy dữ liệu!</p>}

      {/* Danh sách kết quả */}
      {!isQueryDisabled && !isFetching && products && (
        <ul>
          {products.length > 0 ? (
            products.map((item) => <li key={item.id}>{item.name}</li>)
          ) : (
            <p>Không tìm thấy sản phẩm nào phù hợp.</p>
          )}
        </ul>
      )}
    </div>
  );
};