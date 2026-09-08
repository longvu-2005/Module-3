import React from 'react';

export const OrderStatus = ({ isDelivered }) => {
  return (
    <div className="order-status-container">
      <h3>Trạng thái đơn hàng:</h3>
      {isDelivered ? (
        <span className="badge-success">Đã giao hàng</span>
      ) : (
        <span className="badge-warning">Đang xử lý</span>
      )}
    </div>
  );
};