export class InventoryService {
  static async fetchInventory() {
    const response = await fetch('/api/inventory');
    if (!response.ok) {
      throw new Error('Không thể lấy danh sách kho hàng');
    }
    return response.json();
  }

  static async updateStock({ id, quantity }) {
    if (quantity < 0) {
      throw new Error('Số lượng tồn kho không được là số âm');
    }

    const response = await fetch(`/api/inventory/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Hết hạn mức cập nhật kho hàng');
    }

    return response.json();
  }
}