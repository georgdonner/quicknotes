import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import axios from 'axios';

import NoteForm from '../../../components/NoteForm/NoteForm';

class EditNoteHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetched: false,
      note: null,
    };
    this.updateNote = this.updateNote.bind(this);
  }

  async componentDidMount() {
    try {
      const result = await axios.get(`/api/note/${this.props.match.params.note}`);
      this.setState({ fetched: true, note: result.data });
    } catch (error) {
      toast(error, { type: 'error', position: 'bottom-right' });
    }
  }

  async updateNote(note) {
    try {
      await axios.put(`/api/note/${note._id}`, note);
      this.props.history.push(`/note/${note._id}`);
    } catch (err) {
      toast(err, { type: 'error', position: 'bottom-right' });
    }
  }

  render() {
    return this.state.fetched && this.state.note ? (
      <NoteForm
        notebooks={this.props.notebooks}
        note={this.state.note}
        onUpdate={this.updateNote}
        updating
      />
    ) : <h1>Loading...</h1>;
  }
}

const mapStateToProps = state => ({
  notebook: state.notebook,
  notebooks: state.notebooks,
  user: state.user,
});

export default connect(mapStateToProps)(EditNoteHandler);
