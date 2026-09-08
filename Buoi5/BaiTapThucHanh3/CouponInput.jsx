import React, { useState } from 'react';

export const CouponInput = () => {
  const [couponCode, setCouponCode] = useState('');

  const handleInputChange = (event) => {
    const rawValue = event.target.value;

    setCouponCode(rawValue.toUpperCase());
  };

  return (
    <div className="coupon-container">
      <label htmlFor="coupon-field">Mã giảm giá:</label>
      <input
        id="coupon-field"
        type="text"
        className="coupon-input"
        value={couponCode}
        onChange={handleInputChange}
        placeholder="Nhập mã giảm giá của bạn..."
      />
      {couponCode && <p className="coupon-preview">Mã đã nhập: {couponCode}</p>}
    </div>
  );
};