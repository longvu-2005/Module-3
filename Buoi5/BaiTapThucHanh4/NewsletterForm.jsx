import React, { useState } from 'react';
import { SubmitButton } from './SubmitButton.jsx';

export const NewsletterForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(email);
    }
  };

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <input
        type="email"
        className="email-input"
        placeholder="Nhập email của bạn..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <SubmitButton label="Đăng ký" />
    </form>
  );
};