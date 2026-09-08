import React from 'react';
import { shallow } from 'enzyme';
import { AnalyticsDashboard } from './AnalyticsDashboard.jsx';

describe('AnalyticsDashboard - Shallow Test Matrix', () => {
  test('Render đúng tiêu đề Dashboard với hiệu suất tối ưu (Shallow)', () => {
    const startTime = performance.now();

  
    const wrapper = shallow(<AnalyticsDashboard title="Dashboard Phân tích Kênh Bán hàng" />);
    
 
    expect(wrapper.find('h1.dashboard-title').text()).toEqual('Dashboard Phân tích Kênh Bán hàng');

    const endTime = performance.now();
    console.log(`[PERFORMANCE LOG] Shallow execution time: ${(endTime - startTime).toFixed(2)} ms`);
  });
});