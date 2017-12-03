import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actions from './store/actions';
import AppRouter from './appRouter';

class App extends Component {
  state = {
    authFinished: false,
    hasSession: false,
  }

  async componentDidMount() {
    try {
      const userResponse = await axios.get('/api/user');
      if (userResponse.data) {
        this.setState({ authFinished: true, hasSession: true });
        this.props.updateUser(userResponse.data);
        // check if window screen is big enough to display a sidebar (only if we have a user)
        if (window.matchMedia('(min-width: 1200px)').matches) this.props.toggleSidebar();
        // fetch user's notebooks
        const notebooksResponse = await axios.get('/api/notebooks');
        this.props.updateNotebooks(notebooksResponse.data);
      } else {
        this.setState({ authFinished: true });
      }
    } catch (error) {
      console.error(error);
    }
  }

  // TODO: Have static page with login and app description at '/' route
  render() {
    return this.state.authFinished ? (
      <AppRouter redirect={this.state.hasSession} />
    ) : (
      <h1>Loading...</h1>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  updateNotebooks: notebooks => dispatch(actions.updateNotebooks(notebooks)),
  updateUser: user => dispatch(actions.updateUser(user)),
  toggleSidebar: () => dispatch(actions.toggleSidebar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
