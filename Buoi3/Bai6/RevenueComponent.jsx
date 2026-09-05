import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { RevenueController } from './RevenueController.js';

export const RevenueComponent = () => {
  const queryClient = useQueryClient();
  
  // Khởi tạo Controller chứa logic
  const controller = new RevenueController(queryClient);

  // Gọi Hook với cấu hình từ Controller
  const { data, isLoading, isFetching, error, refetch } = useQuery(
    controller.getQueryOptions()
  );

  const handleForceRefresh = () => {
    // Gọi hàm refetch bỏ qua staleTime
    refetch();
  };

  if (isLoading) return <div>Đang tải dữ liệu doanh thu...</div>;
  if (error) return <div>Lỗi: {error.message}</div>;

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Báo cáo Doanh thu Tháng</h2>

      {isFetching && (
        <p style={{ color: 'orange', fontWeight: 'bold' }}>
          Đang cập nhật dữ liệu mới nhất từ server...
        </p>
      )}

      <pre>{JSON.stringify(data, null, 2)}</pre>

      <button 
        onClick={handleForceRefresh} 
        disabled={isFetching}
        style={{ padding: '10px 16px', cursor: 'pointer' }}
      >
        {isFetching ? 'Đang làm mới...' : 'Làm mới dữ liệu (Force Refresh)'}
      </button>
    </div>
  );
};