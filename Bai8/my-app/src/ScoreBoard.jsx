import React, { Component } from 'react';

class ScoreBoard extends Component {
  // So sánh score mới và score hiện tại
  shouldComponentUpdate(nextProps) {
    if (nextProps.score === this.props.score) {
      return false; // Ngăn re-render nếu điểm không đổi
    }
    return true; // Cho phép re-render nếu điểm có sự thay đổi
  }

  render() {
    console.log('ScoreBoard re-rendered!');

    return (
      <div style={{ border: '2px solid #333', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
        <h2>Bảng Điểm</h2>
        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2b6cb0' }}>
          {this.props.score}
        </p>
      </div>
    );
  }
}

export default ScoreBoard;