import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WeatherWidget } from './WeatherWidget.jsx';
import { WeatherService } from './WeatherService.js';

describe('WeatherWidget - Isolated Network Testing (Mocking)', () => {
  afterEach(() => {
    // Khôi phục lại trạng thái hàm ban đầu sau mỗi test case
    jest.restoreAllMocks();
  });

  test('Render đúng thông tin thời tiết từ dữ liệu giả lập mà không gọi API thật', async () => {
    // 1. CHẶN ĐỨNG API THẬT: Dùng jest.spyOn() để ghi đè hàm getWeather
    const spyGetWeather = jest.spyOn(WeatherService, 'getWeather').mockResolvedValue({
      status: 'Nắng đẹp',
    });

    // 2. Render Component vào DOM ảo của Jest
    render(<WeatherWidget />);

    // 3. Kiểm tra trạng thái đang tải ban đầu
    expect(screen.getByText('Đang tải thời tiết...')).toBeInTheDocument();

    // 4. Chờ Component hoàn tất cập nhật State từ Promise đã mock
    await waitFor(() => {
      expect(screen.getByTestId('weather-status')).toHaveTextContent('Nắng đẹp');
    });

    // 5. MÔ TẢ MINH CHỨNG:
    // - Xác minh hàm getWeather đã được gọi đúng 1 lần
    expect(spyGetWeather).toHaveBeenCalledTimes(1);
    // - Đảm bảo dòng chữ "Nắng đẹp" đã hiển thị thành công trên UI
    expect(screen.getByText('Nắng đẹp')).toBeInTheDocument();
  });
});