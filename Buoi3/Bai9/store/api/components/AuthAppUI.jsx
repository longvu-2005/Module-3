import React from 'react';
import { useBoundStore } from '../store/useBoundStore.js';

export const AuthAppUI = () => {
  // Sử dụng Selectors để re-render tối ưu trong Component
  const token = useBoundStore((state) => state.token);
  const login = useBoundStore((state) => state.login);
  const logout = useBoundStore((state) => state.logout);
  const toastMessage = useBoundStore((state) => state.toastMessage);

  const handleMockLogin = () => {
    login({ id: 1, name: 'Admin' }, 'mock-jwt-token-xyz-123');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Zustand Bound Store + Axios Interceptor</h2>

      {toastMessage && (
        <div style={{ padding: '10px', background: '#ffebee', color: '#c62828', marginBottom: '10px' }}>
          {toastMessage}
        </div>
      )}

      <div>
        <p><strong>Trạng thái Token hiện tại:</strong> {token ? token : 'null (Chưa đăng nhập)'}</p>
        
        {token ? (
          <button onClick={logout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
            Đăng xuất
          </button>
        ) : (
          <button onClick={handleMockLogin} style={{ padding: '8px 16px', cursor: 'pointer' }}>
            Đăng nhập (Giả lập nhận Token)
          </button>
        )}
      </div>
    </div>
  );
};