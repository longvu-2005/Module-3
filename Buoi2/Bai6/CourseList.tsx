import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';


interface Course {
  id: number;
  title: string;
  category: string;
}

const COURSES_DATA: Course[] = [
  { id: 1, title: 'Lập trình ReactJS Nâng Cao', category: 'Frontend' },
  { id: 2, title: 'TypeScript Căn Bản đến Chuyên Sâu', category: 'Frontend' },
  { id: 3, title: 'Xây dựng RESTful API với Node.js', category: 'Backend' },
  { id: 4, title: 'Quản lý Trạng Thái với Redux Toolkit', category: 'Frontend' },
];

export const CourseList: React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();

 
  const queryParam = searchParams.get('search') || '';

 
  const [searchTerm, setSearchTerm] = useState<string>(queryParam);

 
  useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);

  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

  
    const newParams = new URLSearchParams(searchParams);

 
      newParams.set('search', value);
    } else {
      newParams.delete('search');
    }

 
    setSearchParams(newParams, { replace: true });
  };

 
  const filteredCourses = COURSES_DATA.filter((course) =>
    course.title.toLowerCase().includes(queryParam.toLowerCase().trim())
  );

  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Danh Sách Khóa Học</h2>

 }
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Nhập từ khóa tìm kiếm..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            width: '100%',
            padding: '10px 14px',
            fontSize: '16px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            boxSizing: 'border-box'
          }}
        />
      </div>

    
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <li
              key={course.id}
              style={{
                padding: '12px',
                border: '1px solid #eee',
                borderRadius: '6px',
                marginBottom: '8px',
                backgroundColor: '#fafafa'
              }}
            >
              <strong>{course.title}</strong> - <em>{course.category}</em>
            </li>
          ))
        ) : (
          <li style={{ color: '#888', fontStyle: 'italic' }}>
            Không tìm thấy khóa học phù hợp với từ khóa "{queryParam}".
          </li>
        )}
      </ul>
    </div>
  );
};