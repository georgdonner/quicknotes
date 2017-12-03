import { AUTH_FAILED, AUTH_SUCCESS, UPDATE_USER } from '../actions/actionTypes';

const initialState = {
  finished: false,
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_FAILED:
      return { finished: true, user: null };
    case AUTH_SUCCESS:
      return { finished: true, user: action.user };
    case UPDATE_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export default reducer;
