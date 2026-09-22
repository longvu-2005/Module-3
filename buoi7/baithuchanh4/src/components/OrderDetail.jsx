import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchOrderDetail, fetchShippingHistory } from '../services/orderApi';

export const OrderDetail = ({ orderId }) => {
  // ==========================================
  // QUERY 1: Lấy thông tin đơn hàng
  // ==========================================
  const {
    data: order,
    isLoading: isLoadingOrder,
    isError: isOrderError,
    error: orderError,
  } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => fetchOrderDetail(orderId),
    enabled: Boolean(orderId), // Chỉ chạy khi có orderId
  });

  // Bóc tách trackingId an toàn
  const trackingId = order?.trackingId;

  // ==========================================
  // QUERY 2: Lấy lịch sử giao hàng (Phụ thuộc vào Query 1)
  // ==========================================
  const {
    data: shippingHistory,
    isLoading: isLoadingShipping,
    isError: isShippingError,
    error: shippingError,
  } = useQuery({
    queryKey: ['shippingHistory', trackingId],
    queryFn: () => fetchShippingHistory(trackingId),
    // ✅ BẪY DỮ LIỆU CHUẨN XÁC:
    // Chuyển trackingId sang kiểu Boolean. Nếu trackingId là null/undefined/"" -> enabled = false
    // Query 2 sẽ ở trạng thái 'pending' và KHÔNG BAO GIỜ tự kích hoạt request ra mạng.
    enabled: Boolean(trackingId),
  });

  // Render khi đang tải đơn hàng
  if (isLoadingOrder) {
    return <div className="loading">Đang tải thông tin đơn hàng...</div>;
  }

  // Render khi lỗi tải đơn hàng
  if (isOrderError) {
    return <div className="error">Lỗi: {orderError.message}</div>;
  }

  return (
    <div className="order-detail-container" style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Chi tiết đơn hàng #{order?.id}</h2>
      <div className="order-info" style={{ marginBottom: '20px', background: '#f9f9f9', padding: '15px' }}>
        <p><strong>Khách hàng:</strong> {order?.customerName}</p>
        <p><strong>Tổng tiền:</strong> {order?.totalAmount?.toLocaleString()} VNĐ</p>

        <p>
          <strong>Mã vận đơn (Tracking ID):</strong>{' '}
          {trackingId ? (
            <span style={{ color: '#2563eb', fontWeight: 'bold' }}>{trackingId}</span>
          ) : (
            <span style={{ color: '#dc2626', italic: 'true' }}>
              Chưa bàn giao cho đơn vị vận chuyển
            </span>
          )}
        </p>
      </div>

      <hr />

      <h3>Lịch sử giao hàng</h3>

      {/* BẪY TRẠNG THÁI 1: Đơn hàng chưa có trackingId */}
      {!trackingId && (
        <div style={{ color: '#6b7280', fontStyle: 'italic' }}>
          Đơn hàng đang chuẩn bị. Lịch sử giao hàng sẽ xuất hiện sau khi đơn hàng được giao cho đơn vị vận chuyển.
        </div>
      )}

      {/* BẪY TRẠNG THÁI 2: Đã có trackingId và đang tải lịch sử */}
      {trackingId && isLoadingShipping && (
        <div>Đang tải lịch sử giao hàng...</div>
      )}

      {/* BẪY TRẠNG THÁI 3: Có lỗi khi lấy lịch sử */}
      {trackingId && isShippingError && (
        <div style={{ color: '#dc2626' }}>Lỗi: {shippingError.message}</div>
      )}

      {/* BẪY TRẠNG THÁI 4: Lấy dữ liệu thành công */}
      {trackingId && shippingHistory && (
        <ul className="shipping-timeline" style={{ listStyle: 'none', paddingLeft: 0 }}>
          {shippingHistory.map((step, index) => (
            <li
              key={index}
              style={{
                borderLeft: '2px solid #2563eb',
                paddingLeft: '15px',
                marginBottom: '10px',
              }}
            >
              <div style={{ fontWeight: 'bold' }}>{step.status}</div>
              <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{step.timestamp}</div>
              <div>{step.location}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};