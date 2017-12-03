import { SET_SIDEBAR, TOGGLE_SIDEBAR, SET_SIDEBAR_TYPE } from '../actions/actionTypes';

const initialState = {
  open: false,
  type: 'notebooks',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        open: !state.open,
      };
    case SET_SIDEBAR:
      return {
        ...state,
        open: action.open,
      };
    case SET_SIDEBAR_TYPE:
      return {
        ...state,
        type: action.sidebarType,
      };
    default:
      return state;
  }
};

export default reducer;
