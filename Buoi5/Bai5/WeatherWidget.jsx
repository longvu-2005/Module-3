import React, { useState, useEffect } from 'react';
import { WeatherService } from './WeatherService.js';

export const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    WeatherService.getWeather()
      .then((data) => {
        if (isMounted) {
          setWeather(data.status);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setWeather('Lỗi tải thời tiết');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div>Đang tải thời tiết...</div>;

  return (
    <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Thời tiết hôm nay</h3>
      <p data-testid="weather-status">{weather}</p>
    </div>
  );
};