import { UPDATE_NOTEBOOKS } from './actionTypes';

export const updateNotebooks = notebooks => ({
  type: UPDATE_NOTEBOOKS,
  notebooks,
});
