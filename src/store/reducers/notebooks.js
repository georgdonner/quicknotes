const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_NOTEBOOKS':
      return action.notebooks;
    default:
      return state;
  }
};

export default reducer;
