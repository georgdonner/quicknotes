import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';
import Notebook from '../../../components/Notebook/Notebook';

class NotebookContainer extends Component {
  state = {
    notebook: null,
    error: null,
  };

  componentDidMount() {
    if (this.props.match.params.notebook && this.props.notebooks) {
      this.getNotebook(this.props.match.params.notebook);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.notebooks && (this.state.notebook === null ||
      (this.state.notebook && nextProps.match.params.notebook !== this.state.notebook._id))) {
      this.getNotebook(nextProps.match.params.notebook);
    }
  }

  getNotebook(notebookId) {
    this.props.selectNotebook(notebookId);
    const notebook = this.props.notebooks.find(nb => nb._id === notebookId);
    if (notebook) {
      this.setState({
        notebook,
        error: null,
      });
    } else {
      this.setState({
        notebook: null,
        error: 'Notebook not found',
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

const mapStateToProps = state => ({
  notebooks: state.notebooks,
});

const mapDispatchToProps = dispatch => ({
  selectNotebook: notebook => dispatch(actions.selectNotebook(notebook)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotebookContainer);
