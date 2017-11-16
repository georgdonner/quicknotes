import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Aux from './hoc/Auxiliary';
import Dashboard from './containers/Dashboard/Dashboard';
import LoginPage from './containers/Login/LoginPage';

class AppRouter extends Component {
  state = {
    authFinished: false,
    noSession: false,
  }

  async componentDidMount() {
    const result = await axios.get('/api/user');
    if (result.data) {
      this.setState({ authFinished: true });
      this.props.updateUser(result.data);
      // check if window screen is big enough to display a sidebar (only if we have a user)
      if (window.matchMedia('(min-width: 1200px)').matches) this.props.toggleSidebar();
    } else {
      this.setState({ authFinished: true, noSession: true });
    }
  }

  // TODO: Have static page with login and app description at '/' route
  render() {
    let routes = <h1>Loading...</h1>; // TODO: loading spinner instead
    if (this.state.authFinished) {
      routes = (
        <Aux>
          <Route exact path="/login" render={() => (
            !this.state.noSession ? (
              <LoginPage />
            ) : (
              <Redirect to="/" />
            ))}
          />
          <Route path="/" component={Dashboard} />
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

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch({ type: 'USER_CHANGE', user }),
  toggleSidebar: () => dispatch({ type: 'TOGGLE_SIDEBAR' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
