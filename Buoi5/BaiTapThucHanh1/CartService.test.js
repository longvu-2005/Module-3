import { CartService } from './CartService.js';

describe('CartService - Fix Matchers Unit Test', () => {
  const mockItems = [
    { id: 1, name: 'Áo thun', price: 150000, quantity: 2 },
    { id: 2, name: 'Quần Jeans', price: 350000, quantity: 1 },
  ];

 
  test('[DEMO FAIL] toBe sẽ thất bại khi so sánh 2 Object độc lập', () => {
    const cartResult = CartService.calculateCart(mockItems);
    const expectedOutput = {
      total: 650000,
      items: mockItems,
      isEmpty: false,
    };

  
  });


  test('Tính toán đúng tổng tiền và cấu trúc giỏ hàng bằng toEqual (Deep Equality)', () => {
    const cartResult = CartService.calculateCart(mockItems);

    const expectedOutput = {
      total: 650000,
      items: mockItems,
      isEmpty: false,
    };
    expect(cartResult).toEqual(expectedOutput);

  
    expect(cartResult.isEmpty).toBe(false);
    expect(cartResult.isEmpty).toBeFalsy();
  });

  test('Xử lý giỏ hàng rỗng chính xác', () => {
    const emptyCart = CartService.calculateCart([]);

    expect(emptyCart).toEqual({
      total: 0,
      items: [],
      isEmpty: true,
    });

    expect(emptyCart.isEmpty).toBeTruthy();
  });
});