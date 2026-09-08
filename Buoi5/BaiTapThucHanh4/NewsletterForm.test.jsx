import React from 'react';
import { mount } from 'enzyme';
import { NewsletterForm } from './NewsletterForm.jsx';

describe('NewsletterForm - Integration Test with mount()', () => {
  it('kích hoạt callback onSubmit từ cha khi tương tác với form và nút submit con', () => {

    const mockOnSubmit = jest.fn();
    const wrapper = mount(<NewsletterForm onSubmit={mockOnSubmit} />);

    const emailInput = wrapper.find('input.email-input');
    emailInput.simulate('change', { target: { value: 'test@example.com' } });

 
    wrapper.find('form.newsletter-form').simulate('submit');

  
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith('test@example.com');


    wrapper.unmount();
  });
});