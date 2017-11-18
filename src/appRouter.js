import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Aux from './hoc/Auxiliary';
import Dashboard from './containers/Dashboard/Dashboard';
import LoginPage from './containers/Login/LoginPage';

const AppRouter = props => (
  <Router>
    <Aux>
      <Route exact path="/login" render={() => (
        props.redirect ? (
          <Redirect to="/" />
        ) : (
          <LoginPage />
        ))}
      />
      <Route path="/" component={Dashboard} />
    </Aux>
  </Router>
);

export default AppRouter;
