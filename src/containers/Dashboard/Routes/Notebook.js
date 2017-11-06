import React, { Component } from 'react';
import axios from 'axios';

class NotebookContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notebook: null,
      error: null,
    };
  }

  async componentWillReceiveProps() {
    if (this.state.notebook === null ||
      (this.props.match.params.notebook !== this.state.notebook._id)) {
      try {
        const result = await axios.get(`/api/notebook/${this.props.match.params.notebook}`, { withCredentials: true });
        this.setState({
          notebook: result.data,
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
  }

  render() {
    let notebook;
    if (!this.state.error && !this.state.notebook) {
      notebook = <h1>Loading...</h1>;
    } else if (this.state.error) {
      notebook = <h1>{this.state.error}</h1>;
    } else {
      notebook = <h1>{this.state.notebook.name}</h1>;
    }
    return notebook;
  }
}

export default NotebookContainer;
