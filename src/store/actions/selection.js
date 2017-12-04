import { SELECT_NOTEBOOK } from './actionTypes';

export const selectNotebook = notebook => ({
  type: SELECT_NOTEBOOK,
  notebook,
});
