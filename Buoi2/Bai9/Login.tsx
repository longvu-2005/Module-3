import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/classroom';

  const handleLogin = () => {
    login(() => {
   
      navigate(from, { replace: true });
    });
  };

  return (
    <div style={{ padding: '24px', textAlign: 'center' }}>
      <h2>🔐 Trang Đăng Nhập</h2>
      <p>Bạn cần đăng nhập để truy cập Phòng học ảo.</p>
      <button onClick={handleLogin} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Đăng nhập ngay
      </button>
    </div>
  );
};