import React from 'react';
import {
  useLazyGet401ErrorQuery,
  useLazyGet404ErrorQuery,
  useLazyGet500ErrorQuery,
  useLazyGetSuccessQuery,
} from './store';
import { ToastContainer } from './ToastContainer';

export const App = () => {
  // Sử dụng lazy query để chỉ gọi khi bấm nút
  const [trigger401] = useLazyGet401ErrorQuery();
  const [trigger404] = useLazyGet404ErrorQuery();
  const [trigger500] = useLazyGet500ErrorQuery();
  const [trigger200] = useLazyGetSuccessQuery();

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      {/* Container hiển thị Toast toàn cục */}
      <ToastContainer />

      <h2>Demo Bắt Lỗi API Global (Redux Middleware)</h2>
      <p style={{ color: '#666' }}>
        Các nút bên dưới khi bấm sẽ gọi API lỗi. Mọi Component <strong>KHÔNG</strong> hề chứa đoạn code xử lý lỗi hay bật Toast nào, Middleware sẽ tự động bắt action <code>rejected</code> và bắn Toast notification lên góc màn hình.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '20px' }}>
        <button
          onClick={() => trigger401()}
          style={{ padding: '10px 16px', backgroundColor: '#fa8c16', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Test Gọi API Lỗi 401
        </button>

        <button
          onClick={() => trigger404()}
          style={{ padding: '10px 16px', backgroundColor: '#13c2c2', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Test Gọi API Lỗi 404
        </button>

        <button
          onClick={() => trigger500()}
          style={{ padding: '10px 16px', backgroundColor: '#f5222d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Test Gọi API Lỗi 500
        </button>

        <button
          onClick={() => trigger200()}
          style={{ padding: '10px 16px', backgroundColor: '#52c41a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Test API Thành Công (200)
        </button>
      </div>
    </div>
  );
};