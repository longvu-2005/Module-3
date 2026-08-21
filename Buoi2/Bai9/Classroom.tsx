import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Classroom: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#e6f7ff', borderRadius: '8px' }}>
      <h2>🎓 Phòng Học Ảo (Nội dung độc quyền)</h2>
      <p>Chào mừng bạn đã truy cập vào lớp học nâng cao!</p>
      <button onClick={handleLogout} style={{ color: 'red' }}>Đăng xuất</button>
    </div>
  );
};