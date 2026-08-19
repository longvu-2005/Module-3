import React, { useState } from 'react';

function WelcomeBanner() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '300px', margin: '20px auto' }}>
      {/* Conditional Rendering bằng toán tử ba ngôi */}
      {isLoggedIn ? (
        <h2>Chào mừng trở lại</h2>
      ) : (
        <button onClick={handleToggleLogin} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Đăng nhập ngay
        </button>
      )}

      {/* Nút hỗ trợ test chuyển đổi trạng thái khi đã đăng nhập */}
      {isLoggedIn && (
        <button onClick={handleToggleLogin} style={{ display: 'block', margin: '10px auto 0', cursor: 'pointer' }}>
          Đăng xuất
        </button>
      )}
    </div>
  );
}

export default WelcomeBanner;