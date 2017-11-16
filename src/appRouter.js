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
    try {
      const userResponse = await axios.get('/api/user');
      if (userResponse.data) {
        this.setState({ authFinished: true });
        this.props.updateUser(userResponse.data);
        // check if window screen is big enough to display a sidebar (only if we have a user)
        if (window.matchMedia('(min-width: 1200px)').matches) this.props.toggleSidebar();
        // fetch user's notebooks
        const notebooksResponse = await axios.get('/api/notebooks');
        this.props.updateNotebooks(notebooksResponse.data);
      } else {
        this.setState({ authFinished: true, noSession: true });
      }
    } catch (error) {
      console.error(error);
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
  updateNotebooks: notebooks => dispatch({ type: 'UPDATE_NOTEBOOKS', notebooks }),
  updateUser: user => dispatch({ type: 'USER_CHANGE', user }),
  toggleSidebar: () => dispatch({ type: 'TOGGLE_SIDEBAR' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
