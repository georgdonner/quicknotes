import { SELECT_NOTEBOOK, SELECT_NOTE } from './actionTypes';

export const selectNotebook = notebook => ({
  type: SELECT_NOTEBOOK,
  notebook,
});

export const selectNote = note => ({
  type: SELECT_NOTE,
  note,
});
