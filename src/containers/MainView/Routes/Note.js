import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

import * as actions from '../../../store/actions';
import Note from '../../../components/Note/Note';
import Aux from '../../../hoc/Auxiliary';

class NoteContainer extends Component {
  componentDidMount() {
    if (this.props.match.params.note) {
      this.props.selectNote(this.props.match.params.note);
      if (window.matchMedia('(max-width: 1199px)').matches) this.props.setSidebar(false);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.note) {
      // note not found
      if (!this.props.notebook || this.props.notebook.notes.length === 0) {
        // notebook not found or empty -> redirect
        this.props.history.push('/');
      } else {
        // note got deleted -> select another note from same notebook
        this.props.selectNote(this.props.notebook.notes[0]._id);
      }
    } else if (this.props.note && nextProps.match.params.note !== nextProps.note._id) {
      // new request with available note
      this.props.selectNote(nextProps.match.params.note);
      if (window.matchMedia('(max-width: 1199px)').matches) this.props.setSidebar(false);
    }
    if (nextProps.note &&
        (!this.props.note || this.props.note.notebook !== nextProps.note.notebook)) {
      // note was found and has new notebook
      this.selectNotebook(nextProps.note.notebook);
    }
  }

  selectNotebook(notebookId) {
    if (!this.props.notebook || notebookId !== this.props.notebook) {
      this.props.selectNotebook(notebookId);
      this.props.updateSidebarType('notes');
    }
  }

  deleteNote = async () => {
    try {
      await this.props.deleteNote(this.props.note);
    } catch (error) {
      toast.error(`Could note delete note: ${error.message}`, { position: 'bottom-right' });
    }
  }

  render() {
    if (!this.props.note || !this.props.notebook) {
      return <h1>Could not find note :(</h1>;
    }
    const userId = this.props.user ? this.props.user.id : null;
    const canEdit = userId ? (userId === this.props.note.owner._id ||
      this.props.notebook.editors.includes(userId)) : null;
    return (
      <Aux>
        <Note
          note={this.props.note}
          canEdit={canEdit}
          onDelete={this.deleteNote}
        />
        <ToastContainer />
      </Aux>
    );
  }
}

const findNote = (notebooks, noteId) => {
  let found = null;
  notebooks.forEach((notebook) => {
    const note = notebook.notes.find(n => n._id === noteId);
    if (note) found = note;
  });
  return found;
};

const mapStateToProps = state => ({
  notebooks: state.notebooks,
  notebook: state.notebooks.find(notebook => notebook._id === state.selection.notebook),
  note: findNote(state.notebooks, state.selection.note),
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  selectNotebook: notebook => dispatch(actions.selectNotebook(notebook)),
  selectNote: note => dispatch(actions.selectNote(note)),
  deleteNote: note => dispatch(actions.deleteNote(note)),
  updateSidebarType: sidebarType => dispatch(actions.setSidebarType(sidebarType)),
  setSidebar: sidebar => dispatch(actions.setSidebar(sidebar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainer);
