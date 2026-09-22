import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRawKeyword, selectRawKeyword } from '../search/searchSlice';
import { useSearchProductsQuery } from './productApi';
import { useDebounce } from '../../hooks/useDebounce';

export const AutocompleteSearch = () => {
  const dispatch = useDispatch();
  
  // 1. Lấy keyword thô từ Redux Store (cập nhật liên tục để UI phản hồi mượt)
  const rawKeyword = useSelector(selectRawKeyword);

  // 2. Debounce keyword thô (chờ 300ms sau khi ngừng gõ)
  const debouncedKeyword = useDebounce(rawKeyword.trim(), 300);

  // 3. Gọi API với debouncedKeyword & kiểm tra điều kiện chặn chuỗi rỗng
  const { data, isFetching, isLoading, isError } = useSearchProductsQuery(
    debouncedKeyword,
    {
      skip: !debouncedKeyword, // Chặn gọi API khi chưa nhập gì hoặc chỉ nhập khoảng trắng
    }
  );

  const handleInputChange = (e) => {
    dispatch(setRawKeyword(e.target.value));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '40px auto', position: 'relative' }}>
      <h3>Tối ưu Autocomplete Search (Anti-Spam)</h3>
      
      {/* Search Input Box */}
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={rawKeyword}
          onChange={handleInputChange}
          placeholder="Gõ từ khóa tìm kiếm (vd: Laptop, Phone)..."
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '2px solid #3b82f6',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
        {isFetching && (
          <span style={{ position: 'absolute', right: '12px', top: '12px', fontSize: '14px', color: '#888' }}>
            ⏳ Đang tìm...
          </span>
        )}
      </div>

      {/* Autocomplete Dropdown List */}
      {debouncedKeyword && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          borderRadius: '8px',
          marginTop: '6px',
          maxHeight: '300px',
          overflowY: 'auto',
          zIndex: 10
        }}>
          {isLoading ? (
            <div style={{ padding: '12px', textAlign: 'center', color: '#666' }}>Đang tải dữ liệu...</div>
          ) : isError ? (
            <div style={{ padding: '12px', color: 'red' }}>Đã có lỗi xảy ra khi kết nối máy chủ.</div>
          ) : data?.products?.length === 0 ? (
            <div style={{ padding: '12px', color: '#888' }}>Không tìm thấy sản phẩm phù hợp.</div>
          ) : (
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {data?.products?.map((item) => (
                <li
                  key={item.id}
                  style={{
                    padding: '10px 16px',
                    borderBottom: '1px solid #f0f0f0',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                  onClick={() => alert(`Bạn đã chọn: ${item.title}`)}
                >
                  <span>{item.title}</span>
                  <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 'bold' }}>${item.price}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};