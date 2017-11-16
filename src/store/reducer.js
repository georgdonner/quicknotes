const initialState = {
  notebook: null,
  user: null,
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
    default:
      return state;
  }
};

export default reducer;
