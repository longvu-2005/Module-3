import React from 'react';
import { shallow } from 'enzyme';
import { CouponInput } from './CouponInput.jsx';

describe('CouponInput Component - Event Simulation Tests', () => {
  it('tự động chuyển đổi chuỗi nhập chữ thường thành chữ hoa (SALE50)', () => {

    const wrapper = shallow(<CouponInput />);
    const inputSelector = 'input.coupon-input';

    expect(wrapper.find(inputSelector).prop('value')).toBe('');

  
    wrapper.find(inputSelector).simulate('change', {
      target: { value: 'sale50' },
    });

   
    const updatedInput = wrapper.find(inputSelector);
    expect(updatedInput.prop('value')).toBe('SALE50');
  });
});