import { UPDATE_NOTEBOOKS, ADD_NOTEBOOK, ADD_NOTE, UPDATE_NOTE, DELETE_NOTE } from '../actions/actionTypes';

const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NOTEBOOKS:
      return action.notebooks;
    case ADD_NOTEBOOK:
      return action.notebook ? state.concat(action.notebook) : null;
    case ADD_NOTE:
      return action.note ? state.map((notebook) => {
        if (notebook._id === action.notebook) {
          return {
            ...notebook,
            notes: notebook.notes.concat([action.note]),
            updatedAt: new Date().toISOString(),
          };
        }
        return notebook;
      }) : state;
    case UPDATE_NOTE:
      return action.note ? state.map((notebook) => {
        if (notebook._id === action.note.notebook) {
          return {
            ...notebook,
            notes: notebook.notes.map((note) => {
              if (note._id === action.note._id) {
                return action.note;
              }
              return note;
            }),
            updatedAt: new Date().toISOString(),
          };
        }
        return notebook;
      }) : state;
    case DELETE_NOTE:
      return action.note ? state.map((notebook) => {
        if (notebook._id === action.note.notebook) {
          return {
            ...notebook,
            notes: notebook.notes.filter(note => note._id !== action.note._id),
            updatedAt: new Date().toISOString(),
          };
        }
        return notebook;
      }) : state;
    default:
      return state;
  }
};

export default reducer;
