import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

import './NotebookForm.css';
import UserTags from './UserTags/UserTags';

class NotebookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      publicVisible: false,
      publicEditable: false,
      viewers: [],
      editors: [],
    };
  }

  nameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  }

  checkboxChange = (event) => {
    const { name, checked } = event.target;
    if (name === 'publicEditable' && checked) {
      this.setState({
        publicVisible: true,
        publicEditable: true,
      });
    } else {
      this.setState({
        [name]: checked,
      });
    }
  }

  addUser = async (event) => {
    const { key, target } = event;
    const { name, value } = target;
    const alreadyExists = this.state[name].find(user => user.username === value);
    if (key === 'Enter') {
      if (alreadyExists) {
        target.value = '';
        toast.warn(`You already added ${value} to the ${name}!`, { position: 'bottom-right' });
      } else {
        try {
          const userRes = await axios.get(`/api/username/${value}`);
          const user = userRes.data;
          const newState = { [name]: this.state[name].concat([user]) };
          if (name === 'editors' && !this.state.viewers.find(viewer => viewer.username === value)) {
            newState.viewers = this.state.viewers.concat([user]);
          }
          this.setState({ ...newState });
          target.value = '';
        } catch (error) {
          toast.error(`Couldn't find user with username ${value}.`, { position: 'bottom-right' });
        }
      }
    }
  }

  addNotebook = async () => {
    if (this.state.name !== '') {
      const notebook = {
        ...this.state,
        viewers: this.state.viewers.map(viewer => viewer._id),
        editors: this.state.editors.map(editor => editor._id),
      };
      this.props.onSubmit(notebook);
    } else {
      toast.error('Please give the notebook a name!', { position: 'bottom-right' });
    }
  }

  removeViewer = (viewer) => {
    const viewers = this.state.viewers.filter(user => user._id !== viewer._id);
    const editors = this.state.editors.filter(user => user._id !== viewer._id);
    this.setState({
      viewers,
      editors,
    });
  }

  removeEditor = (editor) => {
    const editors = this.state.editors.filter(user => user._id !== editor._id);
    this.setState({
      editors,
    });
  }

  render() {
    const cancelUrl = this.props.updating ? `/note/${this.props.note._id}` : '/';

    return (
      <div id="note-container" className="container is-fluid">
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              type="text" name="name" className="input" placeholder="My own notebook"
              value={this.state.name} onChange={this.nameChange}
            />
          </div>
        </div>
        <div className="field is-grouped" id="public-settings">
          <div className="control">
            <label className="checkbox" disabled={this.state.publicEditable}>
              <input name="publicVisible" type="checkbox"
                checked={this.state.publicVisible}
                onChange={this.checkboxChange}
                disabled={this.state.publicEditable}
              />
              <span className="public-settings-label">Publicly visible</span>
            </label>
          </div>
          <div className="control">
            <label className="checkbox">
              <input name="publicEditable" type="checkbox"
                checked={this.state.publicEditable}
                onChange={this.checkboxChange}
              />
              <span className="public-settings-label">Publicly editable</span>
            </label>
          </div>
        </div>
        <div className="field">
          <label className="label">Add Viewers</label>
          <div className="control">
            <input
              type="text" name="viewers" className="input" placeholder="Username"
              onKeyPress={this.addUser}
            />
          </div>
          <UserTags users={this.state.viewers} onDelete={user => this.removeViewer(user)} />
        </div>
        <div className="field">
          <label className="label">Add Editors</label>
          <div className="control">
            <input
              type="text" name="editors" className="input" placeholder="Username"
              onKeyPress={this.addUser}
            />
          </div>
          <UserTags users={this.state.editors} onDelete={user => this.removeEditor(user)} />
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" onClick={this.addNotebook}>Create Notebook</button>
          </div>
          <div className="control">
            <Link to={cancelUrl} replace><button className="button">Cancel</button></Link>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default NotebookForm;
