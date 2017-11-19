import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import NewNote from '../../../components/NewNote/NewNote';

class NewNoteHandler extends Component {
  async addNote(note) {
    try {
      const body = {
        title: note.title,
        body: note.body,
      };
      const result = await axios.post(`/api/notebook/${note.notebook}/new`, body);
      console.log('Notebook successfully created.', result.data);
    } catch (err) {
      console.error(err);
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
