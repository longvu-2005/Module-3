import { useState, useEffect } from 'react';

export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Thiết lập timer đếm ngược
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Hủy timer cũ nếu value thay đổi trước khi hết thời gian delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};