import { isRejectedWithValue } from '@reduxjs/toolkit';

/**
 * Custom Middleware lắng nghe mọi action bị rejected từ RTK Query
 */
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  // Kiểm tra xem action có phải là lỗi trả về từ RTK Query không
  if (isRejectedWithValue(action)) {
    const status = action.payload?.status;
    const data = action.payload?.data;

    let errorMessage = 'Đã xảy ra lỗi hệ thống!';

    // Phân loại xử lý lỗi dựa trên HTTP Status Code
    if (status === 401) {
      errorMessage = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại! (401)';
    } else if (status === 403) {
      errorMessage = 'Bạn không có quyền truy cập tài nguyên này! (403)';
    } else if (status === 404) {
      errorMessage = 'Không tìm thấy dữ liệu yêu cầu! (404)';
    } else if (status === 500) {
      errorMessage = 'Lỗi máy chủ nội bộ. Vui lòng thử lại sau! (500)';
    } else if (status === 'FETCH_ERROR') {
      errorMessage = 'Không thể kết nối đến máy chủ. Kiem tra lại mạng!';
    } else if (data?.message) {
      errorMessage = data.message;
    }

    // Bắn sự kiện hiển thị Toast Notification ngầm
    // Ở đây sử dụng Custom Event đơn giản hoặc có thể gọi trực tiếp hàm toast.error() từ thư viện (ví dụ: react-toastify / hot-toast)
    window.dispatchEvent(
      new CustomEvent('global-error-toast', { detail: { message: errorMessage, status } })
    );
  }

  return next(action);
};