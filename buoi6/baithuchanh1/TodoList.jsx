import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, selectTodos } from './todoSlice';

export const TodoList = () => {
  const [text, setText] = useState('');
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    dispatch(
      addTodo({
        id: Date.now(),
        title: text.trim(),
        completed: false,
      })
    );
    setText('');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>Quản lý Công việc (Redux Toolkit Fix)</h2>

      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nhập công việc mới..."
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Thêm
        </button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: '6px' }}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};