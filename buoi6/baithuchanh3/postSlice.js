import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
  pageSize: 5, // Số lượng bài viết trên mỗi trang
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    // Reducer thay đổi trang có xử lý chặn lỗi số trang âm
    setCurrentPage: (state, action) => {
      const pageInput = Number(action.payload);

      // Chặn bẫy dữ liệu: Nếu không phải là số hoặc <= 0, đưa về trang 1
      if (isNaN(pageInput) || pageInput < 1) {
        state.currentPage = 1;
      } else {
        state.currentPage = Math.floor(pageInput);
      }
    },
    // Chuyển sang trang kế tiếp
    nextPage: (state) => {
      state.currentPage += 1;
    },
    // Quay lại trang trước đó (chặn không cho nhỏ hơn 1)
    prevPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
  },
});

export const { setCurrentPage, nextPage, prevPage } = postSlice.actions;

// Selectors
export const selectCurrentPage = (state) => state.post.currentPage;
export const selectPageSize = (state) => state.post.pageSize;

export default postSlice.reducer;