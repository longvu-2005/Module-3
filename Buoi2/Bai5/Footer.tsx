import React from 'react';
import { useTheme } from './ThemeContext';

export const Footer: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer style={{
      padding: '16px',
      textAlign: 'center',
      borderTop: '1px solid #ccc',
      backgroundColor: isDark ? '#121212' : '#f5f5f5',
      color: isDark ? '#aaaaaa' : '#666666'
    }}>
      <p>© 2026 Nền tảng Học Tập. Hiện tại: Modo {theme.toUpperCase()}</p>
    </footer>
  );
};