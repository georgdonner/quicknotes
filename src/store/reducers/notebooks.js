import { UPDATE_NOTEBOOKS, ADD_NOTE } from '../actions/actionTypes';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NOTEBOOKS:
      return action.notebooks;
    case ADD_NOTE:
      return action.note ? state.map((notebook) => {
        if (notebook._id === action.notebook) {
          return {
            ...notebook,
            notes: notebook.notes.concat([action.note]),
          };
        }
        return notebook;
      }) : state;
    default:
      return state;
  }
};

export default reducer;
