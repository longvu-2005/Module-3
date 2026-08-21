import React, { useState, useEffect } from 'react';

interface ExamTimerProps {
  initialSeconds: number; // Thời gian làm bài tính bằng giây
  onTimeUp?: () => void;  // Callback khi hết giờ
}

export const ExamTimer: React.FC<ExamTimerProps> = ({ initialSeconds, onTimeUp }) => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);

  useEffect(() => {
    // 1. BẪY DỮ LIỆU: Nếu thời gian đã chạm 0 (hoặc âm), không khởi tạo interval
    if (seconds <= 0) {
      if (onTimeUp) onTimeUp();
      return;
    }

    // 2. Khởi tạo interval đếm ngược
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        // Kiểm tra an toàn trước khi giảm số giây
        if (prevSeconds <= 1) {
          clearInterval(timer); // Tự động dọn dẹp interval khi về 0
          if (onTimeUp) onTimeUp();
          return 0; // BẪY DỮ LIỆU: Khóa không cho đếm xuống số âm
        }
        return prevSeconds - 1;
      });
    }, 1000);

    // 3. CLEANUP FUNCTION: Dọn dẹp bộ nhớ khi Unmount hoặc khi effect chạy lại
    return () => {
      clearInterval(timer);
    };
  }, []); // Mảng phụ thuộc RỖNG: Chỉ đăng ký interval 1 lần duy nhất khi Component Mount

  // Hàm đổi số giây sang định dạng MM:SS
  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      padding: '16px',
      border: '2px solid #ff4d4f',
      borderRadius: '8px',
      width: 'fit-content',
      backgroundColor: '#fff1f0',
      color: '#cf1322',
      fontFamily: 'monospace'
    }}>
      <h3 style={{ margin: '0 0 8px 0' }}>⏱️ Thời Gian Làm Bài Còn Lại</h3>
      <div style={{ fontSize: '28px', fontWeight: 'bold', textAlign: 'center' }}>
        {formatTime(seconds)}
      </div>
      {seconds === 0 && (
        <p style={{ color: '#ff4d4f', fontWeight: 'bold', margin: '8px 0 0 0', textAlign: 'center' }}>
          ⚠️ Đã hết giờ làm bài!
        </p>
      )}
    </div>
  );
};

// Component Demo
export const ExamTimerDemo: React.FC = () => {
  const [isExamActive, setIsExamActive] = useState<boolean>(true);

  return (
    <div style={{ padding: '24px' }}>
      <h2>Phòng Thi Trực Tuyến</h2>
      
      <button 
        onClick={() => setIsExamActive(!isExamActive)} 
        style={{ marginBottom: '16px', padding: '8px 16px' }}
      >
        {isExamActive ? 'Rời phòng thi (Unmount Component)' : 'Vào lại phòng thi'}
      </button>

      {isExamActive && (
        <ExamTimer 
          initialSeconds={10} 
          onTimeUp={() => console.log('Tự động nộp bài!')} 
        />
      )}
    </div>
  );
};

export default ExamTimerDemo;