import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useInventoryStore } from './useInventoryStore.js';
import { InventoryController } from './InventoryController.js';

export const StockSidebarUI = () => {
  const queryClient = useQueryClient();
  const controller = new InventoryController(queryClient);

  const selectedItem = useInventoryStore((state) => state.selectedItem);
  const isSidebarOpen = useInventoryStore((state) => state.isSidebarOpen);
  const closeSidebar = useInventoryStore((state) => state.closeSidebar);

  const [quantity, setQuantity] = useState(0);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (selectedItem) {
      setQuantity(selectedItem.quantity);
      setValidationError('');
    }
  }, [selectedItem]);

  const updateMutation = useMutation(
    controller.getUpdateStockMutationOptions()
  );

  if (!isSidebarOpen || !selectedItem) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Bẫy lỗi 1: Validate số lượng âm ở Client
    if (quantity < 0) {
      setValidationError('Số lượng tồn kho không được nhỏ hơn 0');
      return;
    }

    setValidationError('');
    updateMutation.mutate({
      id: selectedItem.id,
      quantity: Number(quantity),
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '350px',
        height: '100vh',
        backgroundColor: '#fff',
        boxShadow: '-2px 0 8px rgba(0,0,0,0.15)',
        padding: '20px',
        boxSizing: 'border-box',
        zIndex: 1000,
      }}
    >
      <h3>Cập nhật Tồn kho</h3>
      <p><strong>Sản phẩm:</strong> {selectedItem.name}</p>
      <p><strong>Mã SKU:</strong> {selectedItem.sku}</p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Số lượng mới:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        {validationError && (
          <p style={{ color: 'red', fontSize: '14px' }}>{validationError}</p>
        )}

        {/* Bẫy lỗi 2: Bắt lỗi từ API */}
        {updateMutation.isError && (
          <p style={{ color: 'red', fontSize: '14px' }}>
            {updateMutation.error.message}
          </p>
        )}

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button
            type="submit"
            disabled={updateMutation.isPending}
            style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}
          >
            {updateMutation.isPending ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
          
          <button
            type="button"
            onClick={closeSidebar}
            disabled={updateMutation.isPending}
            style={{ padding: '8px 16px', cursor: 'pointer' }}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};