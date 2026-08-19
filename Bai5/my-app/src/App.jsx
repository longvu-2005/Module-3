import React from 'react';
import PricingCard from './PricingCard';

function App() {
  const plans = [
    {
      id: 1,
      title: "Basic",
      price: 199000,
      features: ["1 Website", "5GB Dung lượng", "Hỗ trợ Email"],
      isFeatured: false,
    },
    {
      id: 2,
      title: "Pro",
      price: 499000,
      features: ["Không giới hạn Website", "50GB Dung lượng", "Hỗ trợ 24/7", "Tích hợp AI"],
      isFeatured: true, // Gói nổi bật
    },
    {
      id: 3,
      title: "Enterprise",
      price: null, 
      features: ["Tùy chỉnh hệ thống", "Dung lượng riêng", "SLA 99.9%", "Dedicated Manager"],
      isFeatured: false,
    },
  ];

  return (
    <div className="pricing-container">
      <h2>Bảng Giá Dịch Vụ</h2>
      <div className="pricing-grid">
        {plans.map((plan) => (
          <PricingCard
            key={plan.id}
            title={plan.title}
            price={plan.price}
            features={plan.features}
            isFeatured={plan.isFeatured}
          />
        ))}
      </div>
    </div>
  );
}

export default App;