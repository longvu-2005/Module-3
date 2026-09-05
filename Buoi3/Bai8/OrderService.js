export class OrderService {
  static async fetchOrders() {
    const response = await fetch('/api/orders');
    if (!response.ok) {
      throw new Error('Không thể tải danh sách đơn hàng');
    }
    return response.json();
  }

  static async markAsProcessed(orderId) {
    const response = await fetch(`/api/orders/${orderId}/process`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'PROCESSED' }),
    });

    if (!response.ok) {
      throw new Error('Xử lý đơn hàng thất bại từ Server');
    }

    return response.json();
  }
}