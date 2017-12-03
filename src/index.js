import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.min.css';

import './index.css';
import App from './App';
import rootReducer from './store/reducers';

axios.defaults.withCredentials = true;

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root'),
);
