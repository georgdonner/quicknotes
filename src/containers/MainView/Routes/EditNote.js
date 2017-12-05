import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';

import Aux from '../../../hoc/Auxiliary';
import * as actions from '../../../store/actions';
import NoteForm from '../../../components/NoteForm/NoteForm';

const EditNoteHandler = (props) => {
  const getNote = () => {
    let found = null;
    props.notebooks.forEach((notebook) => {
      const note = notebook.notes.find(n => n._id === props.match.params.note);
      if (note) found = note;
    });
    return found;
  };

  const updateNote = async (note) => {
    try {
      const updated = await props.updateNote(note);
      if (updated) {
        props.history.push(`/note/${updated._id}`);
      } else {
        toast.error('Could not update note :(', { position: 'bottom-right' });
      }
    } catch (err) {
      toast.error(`Could note update note: ${err.message}`, { position: 'bottom-right' });
    }
  };

  const note = getNote();
  return note ? (
    <Aux>
      <NoteForm
        notebooks={props.notebooks}
        note={note}
        onUpdate={updateNote}
        updating
      />
      <ToastContainer />
    </Aux>
  ) : <h1>Something went wrong :(</h1>;
};

const mapStateToProps = state => ({
  notebooks: state.notebooks,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  updateNote: note => dispatch(actions.updateNote(note)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditNoteHandler);
