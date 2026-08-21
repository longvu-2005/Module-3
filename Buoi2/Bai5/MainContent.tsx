import React from 'react';
import { useTheme } from './ThemeContext';

export const MainContent: React.FC = () => {
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <main style={{
      padding: '24px',
      minHeight: '300px',
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
      color: isDark ? '#ffffff' : '#000000',
      transition: 'all 0.3s ease'
    }}>
      <h3>Khóa học React TypeScript Advanced</h3>
      <p>Nội dung bài học về Quản lý Trạng thái Toàn cục với Context API...</p>
    </main>
  );
};