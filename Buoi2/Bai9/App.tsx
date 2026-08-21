import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Classroom } from './pages/Classroom';

const PublicHome: React.FC = () => (
  <div style={{ padding: '24px' }}>
    <h2>🏠 Trang Chủ Công Khai</h2>
    <p>Mọi người đều có thể xem trang này.</p>
  </div>
);

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <nav style={{ padding: '16px', borderBottom: '1px solid #ccc', display: 'flex', gap: '16px' }}>
          <Link to="/">Trang chủ</Link>
          <Link to="/classroom">Phòng học ảo (Bảo mật)</Link>
        </nav>

        <Routes>
          <Route path="/" element={<PublicHome />} />
          <Route path="/login" element={<Login />} />
          
          {/* Vùng Bảo Mật (Protected Boundary) */}
          <Route
            path="/classroom"
            element={
              <ProtectedRoute>
                <Classroom />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;