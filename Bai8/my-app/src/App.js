import React, { Component } from 'react';
import ScoreBoard from './ScoreBoard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 10,
      timerCount: 0
    };
  }

  componentDidMount() {
    // Giả lập mỗi 1 giây gửi dữ liệu xuống một lần
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        timerCount: prevState.timerCount + 1,
        // Điểm số chỉ tăng sau mỗi 3 giây (ví dụ: 10, 10, 10, 11, 11, 11...)
        score: Math.floor((prevState.timerCount + 1) / 3) + 10
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div style={{ maxWidth: '400px', margin: '30px auto', fontFamily: 'sans-serif' }}>
        <p>Thời gian đếm: {this.state.timerCount}s</p>
        <ScoreBoard score={this.state.score} />
      </div>
    );
  }
}

export default App;