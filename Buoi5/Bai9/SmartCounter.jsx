import React, { useState } from 'react';

export const SmartCounter = () => {
  const [count, setCount] = useState(0);


  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };


  const handleDecrement = () => {
    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  };


  const handleReset = () => {
    setCount(0);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '300px', margin: '20px auto' }}>
      <h2>Smart Counter</h2>

      {/* Hiển thị giá trị đếm */}
      <div data-testid="counter-value" style={{ fontSize: '32px', fontWeight: 'bold', margin: '15px 0' }}>
        {count}
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button
          data-testid="btn-decrement"
          onClick={handleDecrement}
          style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}
        >
          - Giảm
        </button>

        <button
          data-testid="btn-reset"
          onClick={handleReset}
          style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#ffc107' }}
        >
          Reset
        </button>

        <button
          data-testid="btn-increment"
          onClick={handleIncrement}
          style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#28a745', color: '#fff' }}
        >
          + Tăng
        </button>
      </div>
    </div>
  );
};