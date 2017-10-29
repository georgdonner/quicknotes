import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import Dashboard from './containers/Dashboard';
import LoginPage from './containers/LoginPage';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path='/' component={Dashboard} />
      <Route exact path='/login' component={LoginPage} />
    </div>
  </Router>, 
  document.getElementById('root')
);
