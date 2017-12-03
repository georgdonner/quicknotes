const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_CHANGE':
      return action.user;
    default:
      return state;
  }
};

export default reducer;
