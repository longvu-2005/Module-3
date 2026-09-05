import axios from 'axios';

export class UserService {
  static API_URL = 'https://api.example.com/api/users';

  /**
   * Tạo tài khoản người dùng mới và bóc tách Response Schema
   * @param {Object} userData - Thông tin người dùng mới { name, email }
   */
  static async createUser(userData) {
    try {
      const response = await axios.post(this.API_URL, userData);

      // 1. Bóc tách Mã trạng thái HTTP (HTTP Status Code)
      const statusCode = response.status;

      // 2. Bóc tách ID người dùng nằm sâu trong Payload (response.data)
      const createdUserId = response.data?.id || response.data?.data?.id;

      // In trực tiếp ra console 2 thông tin theo đúng yêu cầu
      console.log(`[HTTP Status Code]: ${statusCode}`);
      console.log(`[Created User ID]: ${createdUserId}`);

      return {
        status: statusCode,
        userId: createdUserId,
        payload: response.data,
      };
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu tạo user:', error.message);
      throw error;
    }
  }
}