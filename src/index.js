import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';

import './index.css';
import AppRouter from './appRouter';
import reducer from './store/reducer';

axios.defaults.withCredentials = true;

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}><AppRouter /></Provider>,
  document.getElementById('root'),
);
