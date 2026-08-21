import React, { useState, useMemo, useCallback } from 'react';
import { Student, StudentRow } from './StudentRow';

// Khởi tạo giả lập 5.000 học viên
const GENERATED_STUDENTS: Student[] = Array.from({ length: 5000 }, (_, index) => ({
  id: index + 1,
  name: `Học viên ${index + 1}`,
  email: `student${index + 1}@edu.vn`,
  score: Math.floor(Math.random() * 100),
}));

export const StudentDashboard: React.FC = () => {
  const [students] = useState<Student[]>(GENERATED_STUDENTS);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // BẪY DỮ LIỆU: State độc lập - Nút "Đã kiểm tra"
  const [isCheckedHeader, setIsCheckedHeader] = useState<boolean>(false);

  // 1. Tối ưu hóa tính toán danh sách bằng useMemo
  // Chỉ tính toán lại khi `searchTerm` hoặc `students` thay đổi
  const filteredStudents = useMemo(() => {
    console.log('🔥 [HEAVY COMPUTATION] Đang lọc 5.000 học viên...');
    const trimmedQuery = searchTerm.toLowerCase().trim();
    if (!trimmedQuery) return students;

    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(trimmedQuery) ||
        student.email.toLowerCase().includes(trimmedQuery)
    );
  }, [searchTerm, students]); // Strict Equality Check trên mảng dependencies

  // 2. Tối ưu hóa tham chiếu hàm bằng useCallback
  // Giữ nguyên tham chiếu ô nhớ của callback để React.memo ở StudentRow phát huy hiệu quả
  const handleSelectStudent = useCallback((id: number) => {
    console.log(`Đã chọn học viên ID: ${id}`);
  }, []); // Dependence rỗng = tham chiếu vĩnh viễn không đổi qua các lượt render

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Bảng Điều Khiển Quản Trị (5.000 Học Viên)</h2>

      {/* BẪY DỮ LIỆU: Nút tính năng độc lập */}
      <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f0f2f5', borderRadius: '6px' }}>
        <label style={{ cursor: 'pointer', fontWeight: 'bold' }}>
          <input
            type="checkbox"
            checked={isCheckedHeader}
            onChange={(e) => setIsCheckedHeader(e.target.checked)}
          />{' '}
          Đánh dấu trạng thái "Đã kiểm tra" trên tiêu đề bảng
        </label>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#666' }}>
          (Thao tác trên nút này đổi State nhưng <strong>tuyệt đối không</strong> chạy lại vòng lặp lọc 5.000 học viên)
        </p>
      </div>

      {/* Ô Tìm Kiếm */}
      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Nhập tên hoặc email tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      {/* Kết quả đếm */}
      <p>Hiển thị: <strong>{filteredStudents.length}</strong> / {students.length} học viên</p>

      {/* Danh Sách Học Viên */}
      <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ccc', borderRadius: '4px' }}>
        {filteredStudents.map((student) => (
          <StudentRow
            key={student.id}
            student={student}
            onSelect={handleSelectStudent}
          />
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;