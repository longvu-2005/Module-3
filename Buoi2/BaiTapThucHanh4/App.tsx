import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Dashboard, Schedule, Profile, NotFound } from './Pages';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: 'sans-serif', color: '#333' }}>
        {/* Thanh điều hướng toàn cục */}
        <Navbar />

        {/* Định tuyến các phân hệ */}
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/profile" element={<Profile />} />

            {/* BẪY DỮ LIỆU: Catch-all route xử lý ngoại lệ URL không tồn tại */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;