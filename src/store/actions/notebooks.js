import axios from 'axios';
import {
  UPDATE_NOTEBOOKS, ADD_NOTEBOOK, UPDATE_NOTEBOOK,
  ADD_NOTE, UPDATE_NOTE, DELETE_NOTE,
} from './actionTypes';

export const updateNotebooks = notebooks => ({
  type: UPDATE_NOTEBOOKS,
  notebooks,
});

export const addNotebook = notebook => dispatch =>
  axios.post('/api/notebook', notebook)
    .then((res) => {
      const created = res.status < 300 ? res.data : null;
      dispatch({
        type: ADD_NOTEBOOK,
        notebook: created,
      });
      return created;
    });

export const updateNotebook = notebook => dispatch =>
  axios.put(`/api/notebook/${notebook._id}`, notebook)
    .then((res) => {
      const updated = res.status < 300 ? res.data : null;
      dispatch({
        type: UPDATE_NOTEBOOK,
        notebook: updated,
      });
      return updated;
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

export const updateNote = note => dispatch =>
  axios.put(`/api/note/${note._id}`, note)
    .then((res) => {
      const updated = res.status < 300 ? res.data : null;
      dispatch({
        type: UPDATE_NOTE,
        note: updated,
      });
      return updated;
    });

export const deleteNote = note => dispatch =>
  axios.delete(`/api/note/${note._id}`)
    .then(() => dispatch({
      type: DELETE_NOTE,
      note,
    }));
