import React from 'react';
import { ProductList } from './ProductList';
import { CheckoutProcess } from './CheckoutProcess';

export const App = () => {
  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Cỗ Máy Quản Lý Checkout (Mini E-commerce)</h2>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        <ProductList />
        <CheckoutProcess />
      </div>
    </div>
  );
};