import React from 'react';
import { mount } from 'enzyme';
import { AnalyticsDashboard } from './AnalyticsDashboard.jsx';

describe('AnalyticsDashboard - Mount Test Matrix', () => {
  test('Render tiêu đề Dashboard bằng Full DOM (Mount)', () => {
    const startTime = performance.now();

  
    const wrapper = mount(<AnalyticsDashboard title="Dashboard Phân tích Kênh Bán hàng" />);
    
   
    expect(wrapper.find('h1.dashboard-title').text()).toEqual('Dashboard Phân tích Kênh Bán hàng');

    const endTime = performance.now();
    console.log(`[PERFORMANCE LOG] Mount execution time: ${(endTime - startTime).toFixed(2)} ms`);
    
    wrapper.unmount();
  });
});