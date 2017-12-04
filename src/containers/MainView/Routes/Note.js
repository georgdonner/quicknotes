import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    if (this.props.note && nextProps.match.params.note !== nextProps.note._id) {
      this.props.selectNote(nextProps.match.params.note);
      if (window.matchMedia('(max-width: 1199px)').matches) this.props.setSidebar(false);
    }
    if (!this.props.note || this.props.note.notebook !== nextProps.note.notebook) {
      this.selectNotebook(nextProps.note.notebook);
    }
  }

  selectNotebook(notebookId) {
    if (!this.props.notebook || notebookId !== this.props.notebook) {
      this.props.selectNotebook(notebookId);
      this.props.updateSidebarType('notes');
    }
  }

  render() {
    if (!this.props.note || !this.props.notebook) {
      return <h1>Loading...</h1>;
    }
    const userId = this.props.user ? this.props.user.id : null;
    const canEdit = userId ? (userId === this.props.note.owner._id ||
      this.props.notebook.editors.includes(userId)) : null;
    return (
      <Aux>
        <Note note={this.props.note} canEdit={canEdit} />
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
  updateSidebarType: sidebarType => dispatch(actions.setSidebarType(sidebarType)),
  setSidebar: sidebar => dispatch(actions.setSidebar(sidebar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainer);
