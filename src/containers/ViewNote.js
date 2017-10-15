import React, { Component } from 'react';
import Header from '../components/Header';
import './ViewNote.css';

class ViewNote extends Component {
  search(input) {
    console.log(input);
  }

  render() {
    return (
      <div>
        <Header 
          notebook={this.props.match.params.notebook}
          handleSearch={this.search}
        />
        <div className="container">
        <span>{this.props.match.params.note}</span> is a note in: <span>{this.props.match.params.notebook}</span>
        </div>
      </div>
    );
  }
}

export default ViewNote;