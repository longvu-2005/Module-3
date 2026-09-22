import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1. Định nghĩa Async Thunk lấy danh sách khách hàng
export const fetchCustomers = createAsyncThunk(
  'customer/fetchCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      if (!response.ok) {
        throw new Error(`Server trả về lỗi status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Bắt lỗi và trả về rejectWithValue để chuyển payload sang action.rejected
      return rejectWithValue(error.message || 'Không thể kết nối đến máy chủ. Kiem tra lại mạng!');
    }
  }
);

const initialState = {
  customers: [],
  loading: false,
  error: null,
};

// 2. Slice xử lý các trạng thái Async Action trong extraReducers
export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    // Reducers đồng bộ khác nếu có
  },
  extraReducers: (builder) => {
    builder
      // Trạng thái 1: Đang tải
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Trạng thái 2: Thành công
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      // Trạng thái 3: THỰC THI BỔ SUNG - Bắt trạng thái Rejected khi lỗi mạng/server
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Đã xảy ra lỗi không xác định!';
      });
  },
});

export const selectCustomers = (state) => state.customer.customers;
export const selectCustomerLoading = (state) => state.customer.loading;
export const selectCustomerError = (state) => state.customer.error;

export default customerSlice.reducer;