import React, { Component } from 'react';
import './NewNote.css';

class NewNote extends Component {
  render() {
    return (
      <div>
        <div className="container">
          Here comes a new note in: <span>{this.props.match.params.notebook}</span>
        </div>
      </div>
    );
  }
}

export default NewNote;