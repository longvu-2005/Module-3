import React, { useState } from 'react';
import { UserService } from './UserService.js';

export const CreateUserUI = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification(null);

    try {
      const result = await UserService.createUser(formData);

      // Bẫy dữ liệu: Chỉ hiển thị thông báo thành công khi mã trạng thái thuộc nhóm 2xx (200 - 299)
      if (result.status >= 200 && result.status < 300) {
        setNotification({
          type: 'success',
          message: `Tạo thành công! ID tài khoản mới: ${result.userId}`,
        });
        setFormData({ name: '', email: '' });
      } else {
        setNotification({
          type: 'error',
          message: 'Tạo tài khoản thất bại!',
        });
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Đã có lỗi xảy ra trong quá trình xử lý.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '450px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Tạo Tài Khoản Mới</h2>

      {notification && (
        <div style={{
          padding: '10px',
          marginBottom: '15px',
          borderRadius: '4px',
          backgroundColor: notification.type === 'success' ? '#d4edda' : '#f8d7da',
          color: notification.type === 'success' ? '#155724' : '#721c24',
        }}>
          {notification.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Họ và tên:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: loading ? '#6c757d' : '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Đang tạo...' : 'Tạo Tài Khoản'}
        </button>
      </form>
    </div>
  );
};