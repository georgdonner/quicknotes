const initialState = {
  notebook: null,
  user: null,
  sidebar: false,
  notebooks: [],
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
    case 'UPDATE_NOTEBOOKS':
      return {
        ...state,
        notebooks: action.notebooks,
      };
    default:
      return state;
  }
};

export default reducer;
