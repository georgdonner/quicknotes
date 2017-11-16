const initialState = {
  notebook: null,
  user: null,
  sidebar: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTEBOOK_CHANGE':
      return {
        ...state,
        notebook: action.notebook,
      };
    case 'USER_CHANGE':
      return {
        ...state,
        user: action.user,
      };
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        sidebar: !state.sidebar,
      };
    default:
      return state;
  }
};

export default reducer;
