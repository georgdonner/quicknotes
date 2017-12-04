import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';
import NoteForm from '../../../components/NoteForm/NoteForm';

class NewNoteHandler extends Component {
  constructor(props) {
    super(props);
    this.addNote = this.addNote.bind(this);
  }

  async addNote(note, notebook) {
    try {
      const created = await this.props.addNote(notebook, note);
      this.props.history.push(`/note/${created._id}`);
    } catch (error) {
      toast(error, { type: 'error', position: 'bottom-right' });
    }
  }

  render() {
    let error;
    let preSelected;
    if (this.props.notebook) preSelected = this.props.notebook;
    else if (this.props.notebooks.length > 0) preSelected = this.props.notebooks[0]._id;
    else error = 'You have to create or join a notebook before creating notes!';

    return preSelected ? (
      <NoteForm
        notebooks={this.props.notebooks}
        selected={preSelected}
        onAdd={this.addNote}
      />
    ) : <h1>{error || 'Loading...'}</h1>;
  }
}

const mapStateToProps = state => ({
  notebook: state.selection.notebook,
  notebooks: state.notebooks,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  addNote: (notebook, note) => dispatch(actions.addNote(notebook, note)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewNoteHandler);
