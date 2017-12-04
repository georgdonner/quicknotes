import { SELECT_NOTEBOOK, SELECT_NOTE } from '../actions/actionTypes';

const initialState = {
  notebook: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_NOTEBOOK:
      return {
        ...state,
        notebook: action.notebook,
      };
    case SELECT_NOTE:
      return {
        ...state,
        note: action.note,
      };
    default:
      return state;
  }
};

export default reducer;
