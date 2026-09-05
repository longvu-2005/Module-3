import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { OrderController } from './OrderController.js';

export const OrderListUI = () => {
  const queryClient = useQueryClient();
  const controller = new OrderController(queryClient);

  const { data: orders, isLoading, isError, error } = useQuery(
    controller.getOrdersQueryOptions()
  );

  const processMutation = useMutation(
    controller.getProcessMutationOptions()
  );

  const handleProcessOrder = (orderId) => {
    processMutation.mutate(orderId);
  };

  if (isLoading) return <div>Đang tải danh sách đơn hàng...</div>;
  if (isError) return <div>Lỗi: {error.message}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Quản lý Đơn hàng Vi phạm</h2>
      
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f8f9fa' }}>
            <th>Mã đơn hàng</th>
            <th>Tên khách hàng</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => {
            const isProcessed = order.status === 'PROCESSED';
            
            return (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>
                  <span
                    style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      color: '#fff',
                      backgroundColor: isProcessed ? '#28a745' : '#dc3545',
                      fontWeight: 'bold',
                    }}
                  >
                    {isProcessed ? 'Đã xử lý' : 'Chờ xử lý'}
                  </span>
                </td>
                <td>
                  {!isProcessed && (
                    <button
                      onClick={() => handleProcessOrder(order.id)}
                      style={{ padding: '6px 12px', cursor: 'pointer' }}
                    >
                      Đánh dấu Đã xử lý
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};