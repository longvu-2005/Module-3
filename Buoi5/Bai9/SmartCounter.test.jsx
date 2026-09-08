import React from 'react';
import { shallow } from 'enzyme';
import { SmartCounter } from './SmartCounter.jsx';

describe('SmartCounter - TDD Development Cycle', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SmartCounter />);
  });


  test('[Test 1] Giá trị hiển thị ban đầu phải là 0', () => {
    const counterValue = wrapper.find('[data-testid="counter-value"]').text();
    expect(counterValue).toBe('0');
  });


  test('[Test 2] Nhấp nút Tăng sẽ tăng giá trị đếm lên 1', () => {
    const incrementBtn = wrapper.find('[data-testid="btn-increment"]');
    
    incrementBtn.simulate('click');

    const counterValue = wrapper.find('[data-testid="counter-value"]').text();
    expect(counterValue).toBe('1');
  });


  test('[Test 3] Bẫy dữ liệu: Khi đang ở 0, nhấp nút Giảm vẫn giữ nguyên giá trị là 0', () => {
    const decrementBtn = wrapper.find('[data-testid="btn-decrement"]');


    decrementBtn.simulate('click');

    const counterValue = wrapper.find('[data-testid="counter-value"]').text();
    expect(counterValue).toBe('0');
  });
});