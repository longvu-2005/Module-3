import React, { useState } from 'react';
import { useDebounce } from './useDebounce';
import { useSearchProductsQuery } from './productApi';

export const AutocompleteSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Áp dụng Debounce 300ms cho từ khóa tìm kiếm
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Chuẩn hóa chuỗi bằng trim()
  const cleanKeyword = debouncedSearchTerm.trim();
  const isSkip = cleanKeyword === '';

  // Truyền debouncedSearchTerm vào RTK Query Hook với tùy chọn skip
  const { data, isFetching, isError } = useSearchProductsQuery(cleanKeyword, {
    skip: isSkip, // Ngăn chặn gọi API khi từ khóa rỗng hoặc toàn khoảng trắng
  });

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>Autocomplete Search (Tối ưu Anti-Spam)</h2>

      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Gõ từ khóa tìm kiếm (ví dụ: Macbook)..."
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            boxSizing: 'border-box',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />

        {/* Indicator hiển thị trạng thái đang nhập liệu hoặc đang tải API */}
        {isFetching && (
          <span style={{ position: 'absolute', right: '12px', top: '12px', color: '#888' }}>
            Đang tìm...
          </span>
        )}
      </div>

      {/* Thông báo trạng thái */}
      {isSkip && (
        <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>
          Gõ từ khóa để xem gợi ý...
        </p>
      )}

      {isError && (
        <p style={{ color: 'red', marginTop: '8px' }}>
          Xảy ra lỗi khi kết nối máy chủ!
        </p>
      )}

      {/* Danh sách kết quả Autocomplete */}
      {!isSkip && !isFetching && data?.products && (
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            marginTop: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            maxHeight: '250px',
            overflowY: 'auto',
          }}
        >
          {data.products.length > 0 ? (
            data.products.map((product) => (
              <li
                key={product.id}
                style={{
                  padding: '10px 12px',
                  borderBottom: '1px solid #eee',
                  cursor: 'pointer',
                }}
              >
                <strong>{product.title}</strong> - ${product.price}
              </li>
            ))
          ) : (
            <li style={{ padding: '10px 12px', color: '#888' }}>
              Không tìm thấy sản phẩm phù hợp.
            </li>
          )}
        </ul>
      )}
    </div>
  );
};