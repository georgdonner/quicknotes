import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import axios from 'axios';

import NoteForm from '../../../components/NoteForm/NoteForm';

class NewNoteHandler extends Component {
  constructor(props) {
    super(props);
    this.addNote = this.addNote.bind(this);
  }

  async addNote(note, notebook) {
    try {
      const created = await axios.post(`/api/notebook/${notebook}/new`, note);
      this.props.history.push(`/note/${created.data._id}`);
    } catch (err) {
      toast(err, { type: 'error', position: 'bottom-right' });
    }
  }

  render() {
    let error;
    let preSelected;
    if (this.props.notebook) preSelected = this.props.notebook._id;
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
  notebook: state.notebook,
  notebooks: state.notebooks,
  user: state.user,
});

export default connect(mapStateToProps)(NewNoteHandler);
