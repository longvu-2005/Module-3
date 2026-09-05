import { inventoryClient } from './inventoryClient.js';

export class InventoryService {

  static async getInventoryItems() {
    try {
   
      const response = await inventoryClient.get('/items');
      return response.data;
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        console.error('Lỗi: Yêu cầu quá thời gian chờ (Timeout > 3000ms)');
      } else {
        console.error('Lỗi khi tải danh sách tồn kho:', error.message);
      }
      throw error;
    }
  }
}