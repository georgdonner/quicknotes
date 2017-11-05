/* eslint arrow-body-style: 0 */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, user, ...rest }) =>
  (<Route
    {...rest}
    render={(props) => {
      return user ?
        <Component user={user} {...props} /> :
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />;
    }}
  />);

export default PrivateRoute;
