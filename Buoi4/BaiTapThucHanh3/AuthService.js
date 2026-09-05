import axios from 'axios';

export class AuthService {
  static LOGIN_URL = 'https://api.example.com/api/auth/login';

  /**
   * Xử lý đăng nhập và phân loại 3 kịch bản lỗi mạng
   * @param {Object} credentials - { email, password }
   */
  static async login(credentials) {
    try {
      const response = await axios.post(this.LOGIN_URL, credentials, {
        timeout: 5000, // Hạn định timeout 5 giây
      });
      return { success: true, data: response.data };
    } catch (error) {
      // Phân loại lỗi dựa trên thuộc tính của AxiosError
      if (error.response) {
        // Kịch bản 1: Server có phản hồi nhưng trả về mã lỗi (Ví dụ: 401, 400, 500)
        const status = error.response.status;
        if (status === 401) {
          throw new Error('Sai mật khẩu hoặc tài khoản không tồn tại (Mã 401).');
        }
        throw new Error(`Máy chủ phản hồi lỗi với mã trạng thái: ${status}`);
      } else if (error.request) {
        // Kịch bản 2: Request đã gửi nhưng không nhận được Response (Mất mạng / Server sập)
        throw new Error('Không thể kết nối tới máy chủ. Vui lòng kiểm tra kết nối mạng.');
      } else {
        // Kịch bản 3: Lỗi xảy ra khi thiết lập cấu hình Request
        throw new Error(`Lỗi cấu hình hệ thống: ${error.message}`);
      }
    }
  }
}