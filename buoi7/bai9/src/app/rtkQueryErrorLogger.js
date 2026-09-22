import { isRejectedWithValue } from '@reduxjs/toolkit';

/**
 * Redux Middleware bắt tất cả các hành động bị Reject (Lỗi) từ RTK Query / Async Thunks
 */
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  // Kiểm tra xem action gửi lên có phải là rejected từ RTK Query/AsyncThunk hay không
  if (isRejectedWithValue(action)) {
    console.warn('⚠️ [Global Error Middleware Caught]:', action);

    const status = action.payload?.status;
    const errorMessage =
      action.payload?.data?.message || action.error?.message || 'Đã xảy ra lỗi không xác định!';

    // Phân loại xử lý dựa trên HTTP Status Code
    switch (status) {
      case 401:
        showToastNotification(`🔒 [401 Unauthorized]: ${errorMessage}`, 'error');
        // Thêm logic chuyển hướng đến trang Login tại đây nếu cần
        break;
      case 403:
        showToastNotification(`🚫 [403 Forbidden]: Bạn không có quyền truy cập!`, 'warning');
        break;
      case 404:
        showToastNotification(`❓ [404 Not Found]: Tài nguyên không tồn tại.`, 'warning');
        break;
      case 500:
        showToastNotification(`💥 [500 Server Error]: Lỗi hệ thống máy chủ!`, 'error');
        break;
      case 'FETCH_ERROR':
        showToastNotification(`🌐 [Network Error]: Không thể kết nối đến máy chủ!`, 'error');
        break;
      default:
        showToastNotification(`❌ Lỗi (${status || 'Unknown'}): ${errorMessage}`, 'error');
        break;
    }
  }

  return next(action);
};

/**
 * Hàm helper tự định nghĩa hiển thị Toast Notification ngầm trên DOM
 * (Hoặc có thể tích hợp thư viện react-toastify / react-hot-toast / Ant Design)
 */
const showToastNotification = (message, type = 'error') => {
  let toastContainer = document.getElementById('global-toast-container');
  
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'global-toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
    `;
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bgColor = type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#3b82f6';
  
  toast.style.cssText = `
    background-color: ${bgColor};
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    font-family: sans-serif;
    font-size: 14px;
    font-weight: 500;
    min-width: 280px;
    animation: slideIn 0.3s ease-out forwards;
  `;
  toast.innerText = message;

  toastContainer.appendChild(toast);

  // Tự động biến mất sau 4 giây
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
};