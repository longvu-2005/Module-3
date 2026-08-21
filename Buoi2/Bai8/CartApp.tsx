import React, { useReducer, useState } from 'react';
import { cartReducer, initialCartState, Course } from './cartReducer';

const AVAILABLE_COURSES: Course[] = [
  { id: 'c1', title: 'React TypeScript Mastery', price: 1200000 },
  { id: 'c2', title: 'Next.js App Router Zero-to-Hero', price: 1500000 },
  { id: 'c3', title: 'Node.js Microservices Architecture', price: 1800000 },
];

export const CartApp: React.FC = () => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const [discountInput, setDiscountInput] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleAddCourse = (course: Course) => {
    // Kiểm tra trước ở UI để hiển thị cảnh báo cho user
    if (state.items.some((item) => item.id === course.id)) {
      setAlertMessage(`Khóa học "${course.title}" đã có trong giỏ hàng!`);
      setTimeout(() => setAlertMessage(null), 3000);
      return;
    }

    dispatch({ type: 'ADD_COURSE', payload: course });
    setAlertMessage(null);
  };

  const handleApplyDiscount = () => {
    if (discountInput.trim().toUpperCase() === 'REACT2026') {
      dispatch({
        type: 'APPLY_DISCOUNT',
        payload: { code: 'REACT2026', discountPercent: 20 },
      });
      setAlertMessage('Áp dụng mã giảm giá 20% thành công!');
    } else {
      setAlertMessage('Mã giảm giá không hợp lệ!');
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>🛒 Quản Lý Giỏ Hàng</h2>

      {alertMessage && (
        <div style={{ padding: '10px', backgroundColor: '#fffbe6', border: '1px solid #ffe58f', marginBottom: '16px' }}>
          {alertMessage}
        </div>
      )}

      {/* Danh sách khóa học có thể mua */}
      <h3>Danh sách khóa học sẵn có</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {AVAILABLE_COURSES.map((course) => (
          <li key={course.id} style={{ marginBottom: '8px' }}>
            {course.title} - <strong>{course.price.toLocaleString('vi-VN')} VNĐ</strong>{' '}
            <button onClick={() => handleAddCourse(course)}>Thêm vào giỏ</button>
          </li>
        ))}
      </ul>

      <hr />

      {/* Chi tiết giỏ hàng */}
      <h3>Giỏ hàng của bạn ({state.items.length})</h3>
      {state.items.length === 0 ? (
        <p>Giỏ hàng đang trống.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {state.items.map((item) => (
            <li key={item.id} style={{ marginBottom: '8px' }}>
              {item.title} - {item.price.toLocaleString('vi-VN')} VNĐ{' '}
              <button
                onClick={() => dispatch({ type: 'REMOVE_COURSE', payload: { id: item.id } })}
                style={{ color: 'red' }}
              >
                Xóa
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Mã giảm giá */}
      <div style={{ margin: '16px 0' }}>
        <input
          type="text"
          placeholder="Nhập mã (Mẫu: REACT2026)"
          value={discountInput}
          onChange={(e) => setDiscountInput(e.target.value)}
        />{' '}
        <button onClick={handleApplyDiscount}>Áp dụng mã</button>
        {state.discountCode && (
          <p style={{ color: 'green' }}>
            Mã đang dùng: <strong>{state.discountCode}</strong> (-{state.discountPercent}%)
          </p>
        )}
      </div>

      {/* Tổng tiền */}
      <h4>
        Tổng cộng: <span style={{ color: '#d9363e' }}>{state.totalAmount.toLocaleString('vi-VN')} VNĐ</span>
      </h4>

      {state.items.length > 0 && (
        <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>Xóa toàn bộ giỏ hàng</button>
      )}
    </div>
  );
};

export default CartApp;