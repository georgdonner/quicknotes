import React, { Component } from 'react';

class LoginPage extends Component {
  login() {
    fetch('/auth');
  }

  render() {
    return (
      <div>
        <button onClick={this.login.bind(this)}>Login with Github</button>
        <a href="/api/auth">Login with Github</a>
      </div>
    );
  }
}

export default LoginPage;