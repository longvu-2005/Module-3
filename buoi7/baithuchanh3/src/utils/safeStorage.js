// Bộ nhớ đệm tạm thời khi localStorage bị chặn hoặc lỗi
const memoryStorage = new Map();

export const safeStorage = {
  getItem: (name) => {
    try {
      return localStorage.getItem(name);
    } catch (error) {
      console.warn(`[Storage Warning] Không thể đọc từ localStorage: ${error.message}. Chuyển sang bộ nhớ tạm.`);
      return memoryStorage.get(name) || null;
    }
  },
  setItem: (name, value) => {
    try {
      localStorage.setItem(name, value);
    } catch (error) {
      console.warn(`[Storage Warning] Không thể ghi vào localStorage: ${error.message}. Chuyển sang bộ nhớ tạm.`);
      memoryStorage.set(name, value);
    }
  },
  removeItem: (name) => {
    try {
      localStorage.removeItem(name);
    } catch (error) {
      console.warn(`[Storage Warning] Không thể xóa từ localStorage: ${error.message}.`);
      memoryStorage.delete(name);
    }
  },
};