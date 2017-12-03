import { combineReducers } from 'redux';
import notebooks from './notebooks';
import selection from './selection';
import sidebar from './sidebar';
import auth from './auth';

export default combineReducers({
  notebooks,
  selection,
  sidebar,
  auth,
});
