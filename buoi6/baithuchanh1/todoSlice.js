import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    // Nhờ Immer.js tích hợp sẵn trong createSlice,
    // ta có thể viết code dạng push() trực tiếp mà vẫn đảm bảo tính Bất biến (Immutable)
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    
    // Cách viết linh hoạt khác nếu muốn clear hoặc gán danh sách mới:
    // removeTodo, toggleTodo...
  },
});

export const { addTodo } = todoSlice.actions;
export const selectTodos = (state) => state.todo.todos;

export default todoSlice.reducer;