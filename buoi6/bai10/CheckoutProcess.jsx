import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  selectCartTotal,
  removeFromCart,
  clearCart,
} from './cartSlice';
import {
  selectShippingInfo,
  updateShippingInfo,
  clearShippingInfo,
} from './shippingSlice';
import { useCreateOrderMutation } from './eCommerceApi';

export const CheckoutProcess = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const shippingInfo = useSelector(selectShippingInfo);

  // RTK Query Mutation tạo đơn hàng
  const [createOrder, { isLoading: isSubmitting }] = useCreateOrderMutation();

  const handleInputChange = (e) => {
    dispatch(updateShippingInfo({ field: e.target.name, value: e.target.value }));
  };

  // Gom dữ liệu & Gửi API Thanh toán
  const handleCheckout = async (e) => {
    e.preventDefault();

    // Ràng buộc Validate dữ liệu
    if (cartItems.length === 0) {
      return alert('Giỏ hàng của bạn đang rỗng!');
    }
    if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address) {
      return alert('Vui lòng điền đầy đủ thông tin giao hàng!');
    }

    // Đóng gói Payload tổng hợp từ cả 2 Client State
    const orderPayload = {
      userId: 1,
      products: cartItems.map((item) => ({ id: item.id, quantity: item.quantity })),
      shippingDetails: shippingInfo,
      totalAmount: cartTotal,
    };

    try {
      // Gửi API tạo đơn hàng ngầm (có cờ unwrap)
      await createOrder(orderPayload).unwrap();

      alert('🎉 ĐẶT HÀNG THÀNH CÔNG! Đơn hàng của bạn đã được ghi nhận.');

      // Clear sạch toàn bộ Client State sau khi thành công
      dispatch(clearCart());
      dispatch(clearShippingInfo());
    } catch (error) {
      alert(`❌ Đặt hàng thất bại: ${error?.data?.message || 'Lỗi kết nối máy chủ!'}`);
    }
  };

  return (
    <div style={{ flex: 1, padding: '16px', border: '1px solid #ddd', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Khối Giỏ hàng */}
      <div>
        <h3>2. Giỏ Hàng Nội Bộ</h3>
        {cartItems.length === 0 ? (
          <p style={{ color: '#888' }}>Chưa có sản phẩm nào trong giỏ.</p>
        ) : (
          <div>
            <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0' }}>
              {cartItems.map((item) => (
                <li key={item.id} style={{ marginBottom: '6px' }}>
                  {item.title} - x{item.quantity} (${item.price * item.quantity})
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    style={{ marginLeft: '10px', color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}
                  >
                    [Xóa]
                  </button>
                </li>
              ))}
            </ul>
            <p style={{ fontWeight: 'bold', fontSize: '16px' }}>Tổng tiền: ${cartTotal}</p>
          </div>
        )}
      </div>

      {/* Khối Form Địa chỉ */}
      <div>
        <h3>3. Thông Tin Giao Hàng</h3>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="text"
            name="fullName"
            placeholder="Họ và tên..."
            value={shippingInfo.fullName}
            onChange={handleInputChange}
            style={{ padding: '8px' }}
          />
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại..."
            value={shippingInfo.phone}
            onChange={handleInputChange}
            style={{ padding: '8px' }}
          />
          <input
            type="text"
            name="address"
            placeholder="Địa chỉ nhận hàng..."
            value={shippingInfo.address}
            onChange={handleInputChange}
            style={{ padding: '8px' }}
          />
        </form>
      </div>

      {/* Nút Đặt hàng */}
      <button
        onClick={handleCheckout}
        disabled={isSubmitting || cartItems.length === 0}
        style={{
          padding: '14px',
          backgroundColor: isSubmitting ? '#6c757d' : '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
        }}
      >
        {isSubmitting ? 'ĐANG XỬ LÝ ĐƠN HÀNG...' : 'XÁC NHẬN THANH TOÁN'}
      </button>
    </div>
  );
};