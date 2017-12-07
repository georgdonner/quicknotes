import React, { Component } from 'react';
// import axios from 'axios';

import NotebookForm from '../../../components/NotebookForm/NotebookForm';

class NewNotebookHandler extends Component {
  onCancel = () => {
    this.props.history.push('/');
  }

  addNotebook = (notebook) => {
    console.log(notebook);
  }

  render() {
    return (
      <NotebookForm
        onSubmit={notebook => this.addNotebook(notebook)}
        onCancel={this.onCancel}
      />
    );
  }
}

export default NewNotebookHandler;
