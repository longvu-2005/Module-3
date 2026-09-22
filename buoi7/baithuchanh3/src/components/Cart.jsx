import React from 'react';
import { useCartStore } from '../store/useCartStore';
import { useShallow } from 'zustand/react/shallow';

export const Cart = () => {
  // Trích xuất State & Action dùng useShallow để tối ưu hiệu năng render
  const { items, removeItem, updateQuantity, clearCart } = useCartStore(
    useShallow((state) => ({
      items: state.items,
      removeItem: state.removeItem,
      updateQuantity: state.updateQuantity,
      clearCart: state.clearCart,
    }))
  );

  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const totalCount = useCartStore((state) => state.getTotalCount());

  if (items.length === 0) {
    return <div className="cart-empty">Giỏ hàng đang trống.</div>;
  }

  return (
    <div className="cart-container">
      <h2>Giỏ hàng ({totalCount} sản phẩm)</h2>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <span>{item.name}</span>
            <span>Giá: {item.price.toLocaleString()} VNĐ</span>
            <div>
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span> {item.quantity} </span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            <button onClick={() => removeItem(item.id)}>Xóa</button>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <h3>Tổng tiền: {totalPrice.toLocaleString()} VNĐ</h3>
        <button onClick={clearCart}>Xóa tất cả</button>
      </div>
    </div>
  );
};