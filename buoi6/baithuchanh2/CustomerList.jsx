import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCustomers,
  selectCustomers,
  selectCustomerLoading,
  selectCustomerError,
} from './customerSlice';

export const CustomerList = () => {
  const dispatch = useDispatch();
  const customers = useSelector(selectCustomers);
  const loading = useSelector(selectCustomerLoading);
  const error = useSelector(selectCustomerError);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(fetchCustomers());
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>Danh sách Khách hàng</h2>

      {/* 1. Trạng thái Đang tải */}
      {loading && <p style={{ color: '#007bff' }}>⏳ Đang tải dữ liệu khách hàng...</p>}

      {/* 2. Trạng thái Lỗi - Hiển thị giao diện cảnh báo an toàn thay vì crash */}
      {error && !loading && (
        <div
          style={{
            padding: '16px',
            backgroundColor: '#fff1f0',
            border: '1px solid #ffa39e',
            borderRadius: '8px',
            color: '#cf1322',
            marginBottom: '16px',
          }}
        >
          <h4 style={{ margin: '0 0 8px 0' }}>⚠️ Lỗi tải dữ liệu</h4>
          <p style={{ margin: '0 0 12px 0' }}>{error}</p>
          <button
            onClick={handleRetry}
            style={{
              padding: '6px 12px',
              backgroundColor: '#ff4d4f',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Thử lại
          </button>
        </div>
      )}

      {/* 3. Trạng thái Thành công */}
      {!loading && !error && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {customers.length > 0 ? (
            customers.map((item) => (
              <li
                key={item.id}
                style={{
                  padding: '12px',
                  borderBottom: '1px solid #eee',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <strong>{item.name}</strong>
                <span style={{ color: '#666' }}>{item.email}</span>
              </li>
            ))
          ) : (
            <p>Không có dữ liệu khách hàng.</p>
          )}
        </ul>
      )}
    </div>
  );
};