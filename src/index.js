import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import Dashboard from './containers/Dashboard';
import NewNote from './containers/NewNote';
import ViewNote from './containers/ViewNote';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path='/:notebook' component={Dashboard} />
      <Route exact path='/:notebook/new' component={NewNote} />
      <Route exact path='/:notebook/note/:note' component={ViewNote} />
    </div>
  </Router>, 
  document.getElementById('root')
);
