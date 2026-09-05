import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { InventoryController } from './InventoryController.js';
import { useInventoryStore } from './useInventoryStore.js';
import { StockSidebarUI } from './StockSidebarUI.jsx';

export const InventoryModuleUI = () => {
  const queryClient = useQueryClient();
  const controller = new InventoryController(queryClient);

  const openSidebar = useInventoryStore((state) => state.openSidebar);

  const { data: inventory, isLoading, isError, error } = useQuery(
    controller.getInventoryQueryOptions()
  );

  if (isLoading) return <div>Đang tải dữ liệu kiểm kê kho...</div>;
  if (isError) return <div>Lỗi: {error.message}</div>;

  return (
    <div style={{ padding: '20px', position: 'relative' }}>
      <h2>Màn hình Kiểm kê Tồn kho</h2>

      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f8f9fa' }}>
            <th>ID</th>
            <th>Tên sản phẩm</th>
            <th>Mã SKU</th>
            <th>Tồn kho hiện tại</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {inventory?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.sku}</td>
              <td style={{ fontWeight: 'bold' }}>{item.quantity}</td>
              <td>
                <button
                  onClick={() => openSidebar(item)}
                  style={{ padding: '6px 12px', cursor: 'pointer' }}
                >
                  Điều chỉnh số lượng
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Sidebar điều chỉnh tồn kho */}
      <StockSidebarUI />
    </div>
  );
};