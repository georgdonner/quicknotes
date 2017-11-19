import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Textarea from 'react-textarea-autosize';
import './NewNote.css';

class NewNote extends Component {
  render() {
    let preSelected;
    if (this.props.notebook) preSelected = this.props.notebook._id;
    if (!preSelected && this.props.notebooks.length > 0) preSelected = this.props.notebooks[0]._id;

    const notebooks = this.props.notebooks.map(notebook => (
      <option key={notebook._id} selected={notebook._id === preSelected}>
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
            <input className="input" name="title" id="text" />
          </div>
        </div>
        <div className="field">
          <label className="label">Notebook</label>
          <div className="control">
            <div className="select">
              <select>{notebooks}</select>
            </div>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <Textarea className="textarea" placeholder="Styling with Markdown is supported" />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link">Create Note</button>
          </div>
          <div className="control">
            <button className="button"><Link to="/">Cancel</Link></button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notebook: state.notebook,
  notebooks: state.notebooks,
  user: state.user,
});

export default connect(mapStateToProps)(NewNote);
