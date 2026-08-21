import React from 'react';
import { useTheme } from './ThemeContext';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header style={{
      padding: '16px',
      borderBottom: '1px solid #ccc',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h2>Hệ Thống Học Tập Trực Tuyến</h2>
      <button onClick={toggleTheme} style={{ padding: '8px 16px', cursor: 'pointer' }}>
        Chuyển sang giao diện {theme === 'light' ? 'Ban đêm 🌙' : 'Ban ngày ☀️'}
      </button>
    </header>
  );
};