import React, { useState, useEffect } from 'react';
import { InventoryService } from './InventoryService.js';

export const InventoryListUI = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const data = await InventoryService.getInventoryItems();
        setItems(data);
      } catch (err) {
        setError('Không thể tải dữ liệu tồn kho. Vui lòng kiểm tra Server!');
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  if (loading) return <div>Đang tải dữ liệu kho hàng...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: '500px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Danh sách Tồn kho (Inventory Service)</h2>
      {items.length === 0 ? (
        <p>Kho hàng trống.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <strong>{item.name}</strong> - Số lượng: {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};