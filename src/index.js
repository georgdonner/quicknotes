import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import AppRouter from './appRouter';

axios.defaults.withCredentials = true;

ReactDOM.render(
  <AppRouter />,
  document.getElementById('root'),
);
