import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CustomerController } from './CustomerController.js';
import { CustomerSkeletonUI } from './CustomerSkeletonUI.jsx';

export const CustomerTableUI = () => {
  const queryClient = useQueryClient();
  const controller = new CustomerController(queryClient);

  const { data, isLoading, isFetching, isError, error } = useQuery(
    controller.getQueryOptions()
  );

  if (isLoading) {
    return <CustomerSkeletonUI />;
  }

  if (isError) {
    return <div>Lỗi: {error.message}</div>;
  }

  return (
    <div style={{ padding: '20px', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
        <h2>Danh sách Khách hàng</h2>
        
        {isFetching && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#666' }}>
            <span style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#007bff',
              display: 'inline-block',
              animation: 'pulse 1s infinite'
            }} />
            Đang cập nhật ngầm...
          </div>
        )}
      </div>

      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f8f9fa' }}>
            <th>ID</th>
            <th>Họ và Tên</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};