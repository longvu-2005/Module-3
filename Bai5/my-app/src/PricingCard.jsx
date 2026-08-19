import React from 'react';

function PricingCard({ title, price, features, isFeatured }) {
  // Xử lý bẫy dữ liệu: Nếu price bằng 0, null, hoặc undefined -> Hiển thị "Liên hệ"
  const renderPrice = () => {
    if (!price || price === 0) {
      return <span className="price-contact">Liên hệ</span>;
    }
    return <span className="price-value">{price.toLocaleString('vi-VN')} VNĐ/tháng</span>;
  };

  return (
    <div className={`pricing-card ${isFeatured ? 'featured' : ''}`}>
      {isFeatured && <div className="badge">Phổ biến nhất</div>}
      <h3>{title}</h3>
      <div className="price-box">{renderPrice()}</div>
      
      <ul className="feature-list">
        {features.map((feature, index) => (
          <li key={index}>✓ {feature}</li>
        ))}
      </ul>

      <button className={`btn ${isFeatured ? 'btn-primary' : 'btn-outline'}`}>
        {!price || price === 0 ? 'Liên hệ ngay' : 'Đăng ký ngay'}
      </button>
    </div>
  );
}

export default PricingCard;