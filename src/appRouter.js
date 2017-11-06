import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Aux from './hoc/Auxiliary';
import Dashboard from './containers/Dashboard/Dashboard';
import LoginPage from './containers/Login/LoginPage';

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
        <Aux>
          <Route exact path="/login" render={() => (
            !this.state.user ? (
              <LoginPage />
            ) : (
              <Redirect to="/" />
            ))}
          />
          <Route path="/" render={() => <Dashboard user={this.state.user} />} />
        </Aux>
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
