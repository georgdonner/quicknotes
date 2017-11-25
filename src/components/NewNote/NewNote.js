import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import './NewNote.css';

require('codemirror/mode/markdown/markdown');

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
      <div className="container is-fluid" id="newnote">
        <div style={{ marginBottom: '2rem' }} id="notebook-topbar">
          <h1 id="notebook-title">Create a new note</h1>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <div className="control is-expanded">
                <input
                  className="input" name="title" id="text" placeholder="Title"
                  value={this.state.title} onChange={this.titleChange}
                />
              </div>
            </div>
            <div className="field">
              <div className="control is-expanded has-icons-left">
                <div className="select" style={{ float: 'right' }}>
                  <select
                    value={this.state.notebookId}
                    onChange={this.notebookChange}
                  >
                    {notebooks}
                  </select>
                  <span className="icon is-small is-left">
                    <i className="fa fa-book" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="field editor-field">
          <div className="control">
            <CodeMirror
              value={this.state.body}
              className="editor"
              options={{
                mode: 'markdown',
                lineNumbers: true,
                lineWrapping: true,
              }}
              onBeforeChange={(editor, data, value) => {
                this.setState({ body: value });
              }}
            />
          </div>
        </div>
        <div className="field is-grouped button-group">
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
            <Link to="/" replace><button className="button">Cancel</button></Link>
          </div>
        </div>
      </div>
    );
  }
}

export default NewNote;
