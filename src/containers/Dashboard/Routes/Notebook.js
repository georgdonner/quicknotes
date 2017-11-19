import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Notebook from '../../../components/Notebook/Notebook';

class NotebookContainer extends Component {
  state = {
    notebook: null,
    error: null,
    firstRequestOut: false,
  };

  componentDidMount() {
    if (this.props.match.params.notebook) this.getNotebook(this.props.match.params.notebook);
  }

  componentWillReceiveProps(nextProps) {
    if ((this.state.notebook === null && !this.state.firstRequestOut) ||
      (this.state.notebook && nextProps.match.params.notebook !== this.state.notebook._id)) {
      this.getNotebook(nextProps.match.params.notebook);
    }
  }

  async getNotebook(notebookId) {
    try {
      this.setState({ firstRequestOut: true });
      const result = await axios.get(`/api/notebook/${notebookId}`);
      const notebook = result.data;
      this.props.updateNotebook(notebook);
      this.setState({
        notebook,
        error: null,
      });
    } catch (error) {
      const errorMsg = error.response.status === 401
        ? 'You don\'t have the permissions to view this notebook'
        : 'Something went wrong :(';
      this.setState({
        notebook: null,
        error: errorMsg,
      });
    }
  }

  render() {
    let notebook;
    if (!this.state.error && !this.state.notebook) {
      notebook = <h1>Loading...</h1>;
    } else if (this.state.error) {
      notebook = <h1>{this.state.error}</h1>;
    } else {
      notebook = <Notebook notebook={this.state.notebook} />;
    }
    return notebook;
  }
}

const mapDispatchToProps = dispatch => ({
  updateNotebook: notebook => dispatch({
    type: 'NOTEBOOK_CHANGE',
    notebook,
  }),
});

export default connect(null, mapDispatchToProps)(NotebookContainer);
