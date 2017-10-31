import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './containers/Dashboard';
import LoginPage from './containers/LoginPage';

class AppRouter extends Component {
  state = {
    user: null,
    authFinished: false,
  }

  async componentDidMount() {
    const result = await axios.get('/api/user');
    this.setState({ user: result.data, authFinished: true });
  }

  // TODO: Have static page with login and app description at '/' route
  render() {
    let routes = <h1>Loading...</h1>; // TODO: loading spinner instead
    if (this.state.authFinished) {
      routes = (
        <div>
          <Route exact path="/"
            render={() => (
            this.state.user ? (
              <Dashboard user={this.state.user} />
            ) : (
              <Redirect to="/login" />
            ))}
          />
          <Route exact path="/login" render={() => (
            !this.state.user ? (
              <LoginPage />
            ) : (
              <Redirect to="/" />
            ))}
          />
        </div>
      );
    }
    return (
      <Router>
        {routes}
      </Router>
    );
  }
}

export default AppRouter;
