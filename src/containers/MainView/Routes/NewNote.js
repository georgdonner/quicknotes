import React from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';
import NoteForm from '../../../components/NoteForm/NoteForm';

const NewNoteHandler = (props) => {
  const addNote = async (note, notebook) => {
    try {
      const created = await props.addNote(notebook, note);
      props.history.push(`/note/${created._id}`);
    } catch (error) {
      toast(error, { type: 'error', position: 'bottom-right' });
    }
  };

  let error;
  let preSelected;
  if (props.notebook) preSelected = props.notebook;
  else if (props.notebooks.length > 0) preSelected = props.notebooks[0]._id;
  else error = 'You have to create or join a notebook before creating notes!';

  return preSelected ? (
    <NoteForm
      notebooks={props.notebooks}
      selected={preSelected}
      onAdd={addNote}
    />
  ) : <h1>{error || 'Loading...'}</h1>;
};

const mapStateToProps = state => ({
  notebook: state.selection.notebook,
  notebooks: state.notebooks,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  addNote: (notebook, note) => dispatch(actions.addNote(notebook, note)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewNoteHandler);
