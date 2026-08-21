import React, { useState } from 'react';

interface Course {
  id: string;
  title: string;
  description: string;
}

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  // 1. Quản lý trạng thái mở rộng/thu gọn bằng useState
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // 2. BẪY DỮ LIỆU: Kiểm tra nếu mô tả rỗng hoặc chỉ toàn khoảng trắng
  const hasDescription = Boolean(course.description && course.description.trim().length > 0);

  // Hàm xử lý bật/tắt trạng thái (Tuân thủ tính bất biến)
  const handleToggleExpand = () => {
    if (!hasDescription) return; // Bảo vệ nếu không có mô tả
    setIsExpanded((prev) => !prev); // Cập nhật state thông qua hàm setter
  };

  return (
    <div
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '16px',
        maxWidth: '400px',
        margin: '16px 0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      }}
    >
      <h3>{course.title}</h3>

      {/* Hiển thị mô tả */}
      <div style={{ margin: '12px 0', color: '#444' }}>
        {hasDescription ? (
          <p>
            {isExpanded
              ? course.description
              : `${course.description.slice(0, 80)}${course.description.length > 80 ? '...' : ''}`}
          </p>
        ) : (
          <p style={{ fontStyle: 'italic', color: '#888' }}>Mô tả khóa học đang được cập nhật.</p>
        )}
      </div>

      {/* Nút thao tác xử lý Bẫy Dữ Liệu */}
      <button
        onClick={handleToggleExpand}
        disabled={!hasDescription} // Vô hiệu hóa nếu không có mô tả
        style={{
          padding: '8px 16px',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: hasDescription ? '#1890ff' : '#d9d9d9',
          color: hasDescription ? '#fff' : '#8c8c8c',
          cursor: hasDescription ? 'pointer' : 'not-allowed',
        }}
      >
        {isExpanded ? 'Thu gọn' : 'Xem chi tiết'}
      </button>
    </div>
  );
};

// Component Demo
export const CourseListDemo: React.FC = () => {
  const sampleCourses: Course[] = [
    {
      id: '1',
      title: 'Lập trình ReactJS Nâng Cao',
      description:
        'Khóa học giúp bạn làm chủ React Hooks, Context API, tối ưu hóa hiệu năng render, quản lý state phức hợp và xây dựng kiến trúc ứng dụng SPA chuẩn doanh nghiệp.',
    },
    {
      id: '2',
      title: 'Thiết Kế UI/UX Cơ Bản',
      description: '', // Bẫy dữ liệu: Mô tả rỗng
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Danh Mục Khóa Học</h2>
      {sampleCourses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseListDemo;