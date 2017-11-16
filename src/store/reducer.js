const initialState = {
  notebook: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTEBOOK_CHANGE':
      return {
        notebook: action.notebook,
      };
    default:
      return state;
  }
};

export default reducer;
