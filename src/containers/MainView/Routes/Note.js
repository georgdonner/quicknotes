import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Note from '../../../components/Note/Note';
import Aux from '../../../hoc/Auxiliary';

class NoteContainer extends Component {
  state = {
    note: null,
    error: null,
  };

  componentDidMount() {
    if (this.props.match.params.note) this.getNote(this.props.match.params.note);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.note && nextProps.match.params.note !== this.state.note._id) {
      this.getNote(nextProps.match.params.note);
      if (window.matchMedia('(max-width: 1199px)').matches) this.props.setSidebar(false);
    }
  }

  async getNote(noteId) {
    try {
      const result = await axios.get(`/api/note/${noteId}`);
      const note = result.data;
      this.setState({
        note,
        error: null,
      });
      this.updateNotebook(note.notebook);
    } catch (error) {
      const errorMsg = error.response.status === 401
        ? 'You don\'t have the permissions to view this note'
        : 'Something went wrong :(';
      this.setState({
        note: null,
        error: errorMsg,
      });
    }
  }

  async updateNotebook(notebookId) {
    if (!this.props.notebook || notebookId !== this.props.notebook._id) {
      try {
        const result = await axios.get(`/api/notebook/${notebookId}`);
        const notebook = result.data;
        this.props.updateNotebook(notebook);
        this.props.updateSidebarType('notes');
      } catch (error) {
        console.log('You can\'t view all of that notebook.');
      }
    }
  }

  render() {
    if (!this.state.error && (!this.state.note || !this.props.notebook)) {
      return <h1>Loading...</h1>;
    } else if (this.state.error) {
      return <h1>{this.state.error}</h1>;
    }
    const userId = this.props.user ? this.props.user.id : null;
    const canEdit = userId ? (userId === this.state.note.owner._id ||
      this.props.notebook.editors.includes(userId)) : null;
    return (
      <Aux>
        <Note note={this.state.note} canEdit={canEdit} />
      </Aux>
    );
  }
}

const mapStateToProps = state => ({
  notebook: state.selection.notebook,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  updateNotebook: notebook => dispatch({ type: 'NOTEBOOK_CHANGE', notebook }),
  updateSidebarType: sidebarType => dispatch({ type: 'UPDATE_SIDEBAR_TYPE', sidebarType }),
  setSidebar: sidebar => dispatch({ type: 'SET_SIDEBAR', sidebar }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainer);
