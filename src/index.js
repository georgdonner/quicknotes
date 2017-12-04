import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.min.css';

import './index.css';
import App from './App';
import rootReducer from './store/reducers';
import { fetchUserAndNotebooks } from './store/actions';

axios.defaults.withCredentials = true;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

store.dispatch(fetchUserAndNotebooks());

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root'),
);
