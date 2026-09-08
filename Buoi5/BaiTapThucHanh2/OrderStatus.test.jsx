import React from 'react';
import { shallow } from 'enzyme';
import { OrderStatus } from './OrderStatus.jsx';

describe('OrderStatus - Fix Enzyme Selector Unit Test', () => {

  test('[DEMO FAIL] Truy vấn sai class selector dẫn đến lỗi 0 node found', () => {
    const wrapper = shallow(<OrderStatus isDelivered={true} />);

  
  });


  test('Render đúng nhãn "Đã giao hàng" khi isDelivered = true', () => {
    const wrapper = shallow(<OrderStatus isDelivered={true} />);

  
    const badgeNode = wrapper.find('.badge-success');

    expect(badgeNode.length).toBe(1);

    expect(badgeNode.text()).toBe('Đã giao hàng');
  });

  test('Render đúng nhãn "Đang xử lý" khi isDelivered = false', () => {
    const wrapper = shallow(<OrderStatus isDelivered={false} />);

    const badgeNode = wrapper.find('.badge-warning');

    expect(badgeNode.length).toBe(1);
    expect(badgeNode.text()).toBe('Đang xử lý');
  });
});