import axios from 'axios';

export class ProductService {
  static BASE_URL = 'https://api.example.com/products';

  /**
   * Tìm kiếm sản phẩm với tham số truy vấn an toàn
   * @param {string} keyword - Từ khóa tìm kiếm (có thể chứa ký tự đặc biệt)
   * @param {number} page - Số trang hiện tại
   * @param {number} limit - Số lượng sản phẩm trên một trang
   */
  static async searchProducts(keyword, page = 1, limit = 10) {
    try {
      // Tối ưu: Sử dụng thuộc tính params thay vì nối chuỗi thủ công
      const response = await axios.get(this.BASE_URL, {
        params: {
          search: keyword,
          page: page,
          limit: limit,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Lỗi khi tải danh sách sản phẩm:', error.message);
      throw error;
    }
  }
}