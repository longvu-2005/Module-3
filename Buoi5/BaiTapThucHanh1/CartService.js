export class CartService {
  /**
   * Tính toán tổng tiền và danh sách sản phẩm trong giỏ hàng
   * @param {Array} items - Danh sách các sản phẩm { id, name, price, quantity }
   */
  static calculateCart(items = []) {
    if (!items || items.length === 0) {
      return {
        total: 0,
        items: [],
        isEmpty: true,
      };
    }

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
      total,
      items,
      isEmpty: false,
    };
  }
}