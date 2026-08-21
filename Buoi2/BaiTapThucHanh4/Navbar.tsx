import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar: React.FC = () => {
  // Hàm tạo style cho tab active
  const getNavStyle = ({ isActive }: { isActive: boolean }) => ({
    padding: '8px 16px',
    textDecoration: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    color: isActive ? '#fff' : '#333',
    backgroundColor: isActive ? '#1890ff' : 'transparent',
    transition: 'all 0.3s ease',
  });

  return (
    <nav
      style={{
        display: 'flex',
        gap: '12px',
        padding: '16px 24px',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #e8e8e8',
        marginBottom: '24px',
      }}
    >
      <NavLink to="/" end style={getNavStyle}>
        🏠 Dashboard
      </NavLink>
      <NavLink to="/schedule" style={getNavStyle}>
        📅 Lịch Học
      </NavLink>
      <NavLink to="/profile" style={getNavStyle}>
        👤 Hồ Sơ
      </NavLink>
    </nav>
  );
};