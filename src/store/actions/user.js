import axios from 'axios';
import { AUTH_FAILED, AUTH_SUCCESS, UPDATE_USER } from './actionTypes';
import { updateNotebooks } from './index';

export const updateUser = user => ({
  type: UPDATE_USER,
  user,
});

const authSuccess = user => ({
  type: AUTH_SUCCESS,
  user,
});

const authFailed = () => ({ type: AUTH_FAILED });

export const fetchUserAndNotebooks = () => async (dispatch) => {
  try {
    const userResponse = await axios.get('/api/user');
    dispatch(authSuccess(userResponse.data));
    const notebooksRes = await axios.get('/api/notebooks');
    dispatch(updateNotebooks(notebooksRes.data));
  } catch (error) {
    dispatch(authFailed());
    dispatch(updateNotebooks([]));
  }
};
