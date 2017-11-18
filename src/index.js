import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';

import './index.css';
import App from './App';
import reducer from './store/reducer';

axios.defaults.withCredentials = true;

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root'),
);
