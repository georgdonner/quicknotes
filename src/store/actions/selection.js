import { NOTEBOOK_CHANGE } from './actionTypes';

export const updateNotebook = notebook => ({
  type: NOTEBOOK_CHANGE,
  notebook,
});
