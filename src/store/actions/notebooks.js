import axios from 'axios';
import { UPDATE_NOTEBOOKS, ADD_NOTE } from './actionTypes';

export const updateNotebooks = notebooks => ({
  type: UPDATE_NOTEBOOKS,
  notebooks,
});

export const addNote = (notebook, note) => dispatch =>
  axios.post(`/api/notebook/${notebook}/new`, note)
    .then((res) => {
      const created = res.status < 300 ? res.data : null;
      dispatch({
        type: ADD_NOTE,
        notebook,
        note: created,
      });
      return created;
    });
