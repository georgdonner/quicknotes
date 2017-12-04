import { SELECT_NOTEBOOK } from '../actions/actionTypes';

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
    default:
      return state;
  }
};

export default reducer;
