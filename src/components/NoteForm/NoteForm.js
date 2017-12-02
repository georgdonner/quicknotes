import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import './NoteForm.css';

require('codemirror/mode/markdown/markdown');

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notebookId: props.selected,
      note: {
        title: '',
        body: '',
      },
    };

    this.titleChange = this.titleChange.bind(this);
    this.notebookChange = this.notebookChange.bind(this);
    this.bodyChange = this.bodyChange.bind(this);
  }

  componentDidMount() {
    if (this.props.note) {
      this.setState({ note: this.props.note });
    }
  }

  titleChange(event) {
    const note = { ...this.state.note };
    note.title = event.target.value;
    this.setState({ note });
  }

  notebookChange(event) {
    this.setState({ notebookId: event.target.value });
  }

  bodyChange(event) {
    const note = { ...this.state.note };
    note.body = event.target.value;
    this.setState({ note });
  }

  render() {
    const notebooks = this.props.notebooks.map(notebook => (
      <option key={notebook._id} value={notebook._id}>
        {notebook.name}
      </option>
    ));

    const cancelUrl = this.props.updating ? `/note/${this.props.note._id}` : '/';

    return (
      <div className="container is-fluid" id="noteform">
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <div className="control is-expanded">
                <input
                  className="input" name="title" id="text" placeholder="Title"
                  value={this.state.note.title} onChange={this.titleChange}
                />
              </div>
            </div>
            {this.props.selected ? (
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
              </div>) : null}
          </div>
        </div>
        <div className="field editor-field">
          <div className="control">
            <CodeMirror
              value={this.state.note.body}
              className="editor"
              options={{
                mode: 'markdown',
                lineNumbers: true,
                lineWrapping: true,
              }}
              onBeforeChange={(editor, data, value) => {
                const note = { ...this.state.note };
                note.body = value;
                this.setState({ note });
              }}
            />
          </div>
        </div>
        <div className="field is-grouped button-group">
          <div className="control">
            <button
              className="button is-link"
              onClick={this.props.updating ?
                () => this.props.onUpdate(this.state.note) :
                () => this.props.onAdd(this.state.note, this.state.notebookId)
              }
            >
              {this.props.updating ? 'Update' : 'Create'} note
            </button>
          </div>
          <div className="control">
            <Link to={cancelUrl} replace><button className="button">Cancel</button></Link>
          </div>
        </div>
      </div>
    );
  }
}

export default NoteForm;
