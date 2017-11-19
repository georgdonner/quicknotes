import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import axios from 'axios';

import NewNote from '../../../components/NewNote/NewNote';

class NewNoteHandler extends Component {
  constructor(props) {
    super(props);

    this.addNote = this.addNote.bind(this);
  }

  async addNote(note) {
    try {
      const body = {
        title: note.title,
        body: note.body,
      };
      await axios.post(`/api/notebook/${note.notebook}/new`, body);
      this.props.history.push(`/notebook/${note.notebook}`);
    } catch (err) {
      toast(err, { type: 'error', position: 'bottom-right' });
    }
  }

  render() {
    let preSelected;
    if (this.props.notebook) preSelected = this.props.notebook._id;
    if (!preSelected && this.props.notebooks.length > 0) preSelected = this.props.notebooks[0]._id;

    return preSelected ? (
      <NewNote
        notebooks={this.props.notebooks}
        selected={preSelected}
        onSubmit={this.addNote}
      />
    ) : <h1>Loading...</h1>;
  }
}

const mapStateToProps = state => ({
  notebook: state.notebook,
  notebooks: state.notebooks,
  user: state.user,
});

export default connect(mapStateToProps)(NewNoteHandler);
