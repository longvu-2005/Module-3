import { useState, useEffect } from 'react';

/**
 * Custom Hook trì hoãn giá trị cập nhật cho đến khi hết khoảng thời gian delay
 * @param {any} value Giá trị cần debounce
 * @param {number} delay Thời gian hoãn (ms)
 */
export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Đặt timer cập nhật giá trị sau khoảng thời gian delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Hủy timer nếu value thay đổi trước khi hết thời gian delay (người dùng tiếp tục gõ)
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};