import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentPage,
  nextPage,
  prevPage,
  selectCurrentPage,
  selectPageSize,
} from './postSlice';

// Giả lập danh sách bài viết
const MOCK_POSTS = Array.from({ length: 23 }, (_, index) => ({
  id: index + 1,
  title: `Bài viết số ${index + 1}: Hướng dẫn Redux Toolkit`,
  description: `Đây là nội dung tóm tắt cho bài viết thứ ${index + 1}...`,
}));

export const PostList = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);

  // Tính toán phân trang
  const totalPages = Math.ceil(MOCK_POSTS.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentPosts = MOCK_POSTS.slice(startIndex, startIndex + pageSize);

  // Thao tác nhập số trang thủ công (Mô phỏng nhập từ URL/Input)
  const handlePageInputChange = (e) => {
    const val = e.target.value;
    dispatch(setCurrentPage(val));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>Danh sách Bài viết (Trang {currentPage} / {totalPages})</h2>

      {/* Danh sách bài viết */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        {currentPosts.map((post) => (
          <div
            key={post.id}
            style={{
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
            }}
          >
            <h4 style={{ margin: '0 0 6px 0' }}>{post.title}</h4>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{post.description}</p>
          </div>
        ))}
      </div>

      {/* Bộ điều khiển Phân trang */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <button
          onClick={() => dispatch(prevPage())}
          disabled={currentPage <= 1}
          style={{ padding: '8px 12px', cursor: currentPage <= 1 ? 'not-allowed' : 'pointer' }}
        >
          &laquo; Trang trước
        </button>

        <span>
          Trang <strong>{currentPage}</strong>
        </span>

        <button
          onClick={() => dispatch(nextPage())}
          disabled={currentPage >= totalPages}
          style={{ padding: '8px 12px', cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer' }}
        >
          Trang sau &raquo;
        </button>
      </div>

      {/* Ô nhập số trang trực tiếp (Kiểm thử bẫy số trang âm) */}
      <div style={{ padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '6px' }}>
        <label style={{ fontSize: '14px', marginRight: '8px' }}>
          Test nhập trang trực tiếp (thử nhập -5 hoặc 0):
        </label>
        <input
          type="number"
          value={currentPage}
          onChange={handlePageInputChange}
          style={{ width: '60px', padding: '6px' }}
        />
      </div>
    </div>
  );
};