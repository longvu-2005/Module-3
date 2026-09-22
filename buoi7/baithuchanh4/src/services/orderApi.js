// Giả lập API lấy chi tiết đơn hàng
export const fetchOrderDetail = async (orderId) => {
  const response = await fetch(`/api/orders/${orderId}`);
  if (!response.ok) {
    throw new Error('Không thể tải thông tin đơn hàng');
  }
  return response.json();
};

// Giả lập API lấy lịch sử vận chuyển
export const fetchShippingHistory = async (trackingId) => {
  // Bẫy bảo vệ cấp API
  if (!trackingId) {
    throw new Error('Tracking ID không hợp lệ');
  }
  const response = await fetch(`/api/shipping/history?trackingId=${trackingId}`);
  if (!response.ok) {
    throw new Error('Không thể tải lịch sử vận chuyển');
  }
  return response.json();
};