import { combineReducers } from 'redux';
import notebooks from './notebooks';
import selection from './selection';
import sidebar from './sidebar';
import user from './user';

export default combineReducers({
  notebooks,
  selection,
  sidebar,
  user,
});
