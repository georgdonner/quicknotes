import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.min.css';

import './index.css';
import App from './App';
import rootReducer from './store/reducers';
import { fetchUserAndNotebooks } from './store/actions';

axios.defaults.withCredentials = true;

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

store.dispatch(fetchUserAndNotebooks());

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root'),
);
