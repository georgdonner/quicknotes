import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import Dashboard from './containers/Dashboard';

ReactDOM.render(
  <Router>
    <div>
      <Route path='/:notebook/' component={Dashboard} />
    </div>
  </Router>, 
  document.getElementById('root')
);
