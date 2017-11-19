import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Textarea from 'react-textarea-autosize';
import './NewNote.css';

class NewNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      notebookId: props.selected,
      body: '',
    };

    this.titleChange = this.titleChange.bind(this);
    this.notebookChange = this.notebookChange.bind(this);
    this.bodyChange = this.bodyChange.bind(this);
  }

  titleChange(event) {
    this.setState({ title: event.target.value });
  }

  notebookChange(event) {
    this.setState({ notebookId: event.target.value });
  }

  bodyChange(event) {
    this.setState({ body: event.target.value });
  }

  render() {
    const notebooks = this.props.notebooks.map(notebook => (
      <option key={notebook._id} value={notebook._id}>
        {notebook.name}
      </option>
    ));

    return (
      <div className="container is-fluid">
        <div style={{ marginBottom: '2rem' }} id="notebook-topbar">
          <h1 id="notebook-title">Create a new note</h1>
        </div>
        <div className="field">
          <label className="label" htmlFor="title">Title</label>
          <div className="control">
            <input
              className="input" name="title" id="text"
              value={this.state.title} onChange={this.titleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Notebook</label>
          <div className="control">
            <div className="select">
              <select
                value={this.state.notebookId}
                onChange={this.notebookChange}
              >
                {notebooks}
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <Textarea
              className="textarea"
              placeholder="Styling with Markdown is supported"
              value={this.state.body}
              onChange={this.bodyChange}
            />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button
              className="button is-link"
              onClick={() => this.props.onSubmit({
                notebook: this.state.notebookId,
                title: this.state.title,
                body: this.state.body,
              })}
            >
              Create Note
            </button>
          </div>
          <div className="control">
            <button className="button"><Link to="/">Cancel</Link></button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewNote;
