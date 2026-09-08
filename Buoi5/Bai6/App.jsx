import React, { useState } from 'react';

export const App = () => {
  const [count, setCount] = useState(0);


  const handleIncrementCounterValue = () => {
    console.log('Developer Log: Button Clicked!'); 
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>React Production Build Demo</h1>
      <p>Số lượt nhấp hiện tại: <strong>{count}</strong></p>
      <button
        onClick={handleIncrementCounterValue}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Tăng số đếm
      </button>
    </div>
  );
};

export default App;