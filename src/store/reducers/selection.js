import { NOTEBOOK_CHANGE } from '../actions/actionTypes';

const initialState = {
  notebook: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTEBOOK_CHANGE:
      return {
        ...state,
        notebook: action.notebook,
      };
    default:
      return state;
  }
};

export default reducer;
