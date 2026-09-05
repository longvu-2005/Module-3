import React, { useState } from 'react';
import { ProfileService } from './ProfileService.js';

export const ProfileFormUI = () => {
  // Gộp các state đơn lẻ thành 1 FormState object
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Hàm handleChange dùng chung duy nhất cho tất cả các input
  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      await ProfileService.updateProfile(formState);
      setMessage('Cập nhật hồ sơ thành công!');
    } catch (error) {
      setMessage(`Lỗi: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Cập nhật Hồ sơ Cá nhân</h2>

      {message && (
        <p style={{ color: message.startsWith('Lỗi') ? 'red' : 'green', fontWeight: 'bold' }}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Họ và tên:</label>
          <input
            type="text"
            name="fullName"
            value={formState.fullName}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Số điện thoại:</label>
          <input
            type="text"
            name="phone"
            value={formState.phone}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Địa chỉ:</label>
          <input
            type="text"
            name="address"
            value={formState.address}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Tiểu sử (Bio):</label>
          <textarea
            name="bio"
            value={formState.bio}
            onChange={handleChange}
            rows="4"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{ padding: '10px 20px', cursor: 'pointer', width: '100%' }}
        >
          {isSubmitting ? 'Đang cập nhật...' : 'Lưu thay đổi'}
        </button>
      </form>
    </div>
  );
};