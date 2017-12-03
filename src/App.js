/* eslint-disable arrow-body-style */
import React from 'react';
import { connect } from 'react-redux';

import AppRouter from './appRouter';

const App = (props) => {
  console.log(props.authFinished);
  return props.authFinished ? (
    <AppRouter redirect={props.user} />
  ) : (
    <h1>Loading...</h1>
  );
};

const mapStateToProps = state => ({
  authFinished: state.auth.finished,
  user: state.auth.user,
});

export default connect(mapStateToProps)(App);
