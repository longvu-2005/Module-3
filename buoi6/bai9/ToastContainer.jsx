import React, { useState, useEffect } from 'react';

export const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    // Lắng nghe sự kiện phát ra từ Custom Middleware
    const handleGlobalError = (event) => {
      const { message, status } = event.detail;
      const id = Date.now();

      // Thêm thông báo mới vào danh sách
      setToasts((prev) => [...prev, { id, message, status }]);

      // Tự động xóa thông báo sau 4 giây
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 4000);
    };

    window.addEventListener('global-error-toast', handleGlobalError);
    return () => window.removeEventListener('global-error-toast', handleGlobalError);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            backgroundColor: '#ff4d4f',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            fontSize: '14px',
            minWidth: '280px',
            animation: 'fadeIn 0.3s ease-in-out',
          }}
        >
          <strong>⚠️ Thông báo lỗi</strong>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px' }}>{toast.message}</p>
        </div>
      ))}
    </div>
  );
};