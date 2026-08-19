import React, { Component } from 'react';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartCount: 0
    };
  }

  // Dùng Arrow Function để tránh lỗi mất ngữ cảnh 'this'
  handleAddToCart = () => {
    // Dùng this.setState() để thông báo cho React trigger lại hàm render()
    this.setState((prevState) => ({
      cartCount: prevState.cartCount + 1
    }));
  };

  render() {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'sans-serif' }}>
        <h2>Giỏ Hàng Của Bạn</h2>
        <p style={{ fontSize: '18px' }}>
          Số lượng sản phẩm: <strong>{this.state.cartCount}</strong>
        </p>
        <button 
          onClick={this.handleAddToCart}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
        >
          Thêm vào giỏ
        </button>
      </div>
    );
  }
}

export default ShoppingCart;