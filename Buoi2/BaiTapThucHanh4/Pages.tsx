import React from 'react';
import { Link } from 'react-router-dom';

// 1. Trang Dashboard
export const Dashboard: React.FC = () => (
  <div style={{ padding: '0 24px' }}>
    <h2>📊 Bảng Điều Khiển Sinh Viên</h2>
    <p>Chào mừng bạn quay trở lại Cổng thông tin Sinh viên.</p>
  </div>
);

// 2. Trang Schedule
export const Schedule: React.FC = () => (
  <div style={{ padding: '0 24px' }}>
    <h2>📅 Lịch Học Trong Tuần</h2>
    <ul>
      <li>Thứ 2: Lập trình ReactJS (08:00 - 11:30)</li>
      <li>Thứ 4: Kiến trúc Phần mềm (13:30 - 17:00)</li>
    </ul>
  </div>
);

// 3. Trang Profile
export const Profile: React.FC = () => (
  <div style={{ padding: '0 24px' }}>
    <h2>👤 Hồ Sơ Sinh Viên</h2>
    <p><strong>Mã SV:</strong> SV202601</p>
    <p><strong>Họ tên:</strong> Nguyễn Văn A</p>
    <p><strong>Chuyên ngành:</strong> Công nghệ Phần mềm</p>
  </div>
);

// 4. BẪY DỮ LIỆU: Trang 404 Not Found (Xử lý URL không tồn tại)
export const NotFound: React.FC = () => (
  <div style={{ padding: '40px 24px', textAlign: 'center' }}>
    <h1 style={{ fontSize: '72px', color: '#ff4d4f', margin: 0 }}>404</h1>
    <h2>Không tìm thấy nội dung!</h2>
    <p style={{ color: '#666' }}>
      Đường dẫn bạn truy cập không tồn tại trên hệ thống.
    </p>
    <Link
      to="/"
      style={{
        display: 'inline-block',
        marginTop: '16px',
        padding: '10px 20px',
        backgroundColor: '#1890ff',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '4px',
      }}
    >
      Trở về Trang chủ
    </Link>
  </div>
);