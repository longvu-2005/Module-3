import React from 'react';
import { useCountdown } from './useCountdown';


const QuizTimer: React.FC = () => {
  const { seconds, isRunning, start, pause, reset } = useCountdown({
    initialSeconds: 60,
    onTimerEnd: () => alert('Hết giờ làm bài!'),
  });

  return (
    <div style={{ padding: '16px', border: '1px solid #ccc', marginBottom: '16px' }}>
      <h3>📝 Bài Kiểm Tra Trắc Nghiệm</h3>
      <p>Thời gian còn lại: <strong>{seconds}s</strong></p>
      <button onClick={start} disabled={isRunning || seconds === 0}>Bắt đầu</button>{' '}
      <button onClick={pause} disabled={!isRunning}>Tạm dừng</button>{' '}
      <button onClick={reset}>Làm lại</button>
    </div>
  );
};


const FlashSaleTimer: React.FC = () => {
  const { seconds, isRunning, start } = useCountdown({
    initialSeconds: 10,
    onTimerEnd: () => console.log('Flash sale kết thúc!'),
  });

  return (
    <div style={{ padding: '16px', border: '1px solid #ff4d4f', color: '#cf1322', backgroundColor: '#fff1f0' }}>
      <h3>🔥 Flash Sale Giá Sốc</h3>
      <p>Sự kiện kết thúc sau: <strong>{seconds}s</strong></p>
      {!isRunning && seconds > 0 && (
        <button onClick={start}>Kích hoạt đếm ngược</button>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <div style={{ padding: '24px', maxWidth: '500px' }}>
      <h2>Demo Custom Hook `useCountdown`</h2>
      <QuizTimer />
      <FlashSaleTimer />
    </div>
  );
};

export default App;