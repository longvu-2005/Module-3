import React from 'react';
import {
  useLazyGet404ErrorQuery,
  useLazyGet500ErrorQuery,
  useLazyGet401ErrorQuery,
} from './demoApi';

export const ErrorDemoComponent = () => {
  // Dùng Lazy Query để kích hoạt gọi API bằng nút bấm
  const [trigger404] = useLazyGet404ErrorQuery();
  const [trigger500] = useLazyGet500ErrorQuery();
  const [trigger401] = useLazyGet401ErrorQuery();

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Demo Hệ Thống Mini Notification (Global Error Handler)</h2>
      <p style={{ color: '#666' }}>
        Nhấn vào các nút bên dưới để thử nghiệm gọi API lỗi. Toàn bộ thông báo lỗi (Toast) sẽ được tự động kích hoạt ngầm từ Redux Middleware mà không cần viết code xử lý lỗi trong Component!
      </p>

      <div style={{ display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
        <button
          onClick={() => trigger401()}
          style={{ padding: '10px 16px', backgroundColor: '#f59e0b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Test Lỗi 401 (Unauthorized)
        </button>

        <button
          onClick={() => trigger404()}
          style={{ padding: '10px 16px', backgroundColor: '#64748b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Test Lỗi 404 (Not Found)
        </button>

        <button
          onClick={() => trigger500()}
          style={{ padding: '10px 16px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Test Lỗi 500 (Server Error)
        </button>
      </div>
    </div>
  );
};