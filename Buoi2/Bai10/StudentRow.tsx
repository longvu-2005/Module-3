import React from 'react';

export interface Student {
  id: number;
  name: string;
  email: string;
  score: number;
}

interface StudentRowProps {
  student: Student;
  onSelect: (id: number) => void;
}

// Bọc React.memo để ngăn re-render khi props không đổi
export const StudentRow: React.FC<StudentRowProps> = React.memo(({ student, onSelect }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 12px',
      borderBottom: '1px solid #eee'
    }}>
      <span><strong>{student.name}</strong> ({student.email})</span>
      <span>Điểm: {student.score}</span>
      <button onClick={() => onSelect(student.id)}>Xem chi tiết</button>
    </div>
  );
});

StudentRow.displayName = 'StudentRow';