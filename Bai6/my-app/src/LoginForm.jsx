import React, { Component } from 'react';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: ''
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    if (!username.trim() || !password.trim() || username.includes(' ')) {
      this.setState({
        errorMessage: 'Vui lòng kiểm tra lại thông tin'
      });
      return;
    }

    this.setState({
      errorMessage: ''
    });

    console.log('Thông tin đăng nhập:', {
      username: username,
      password: password
    });
  };

  render() {
    const { username, password, errorMessage } = this.state;

    return (
      <div style={{ maxWidth: '300px', margin: '20px auto', fontFamily: 'sans-serif' }}>
        <h2>Đăng Nhập</h2>
        <form onSubmit={this.handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={this.handleInputChange}
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleInputChange}
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>

          {errorMessage && (
            <p style={{ color: 'red', margin: '0 0 10px 0', fontSize: '14px' }}>
              {errorMessage}
            </p>
          )}

          <button type="submit" style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
            Đăng nhập
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;