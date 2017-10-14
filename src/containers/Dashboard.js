import React, { Component } from 'react';
import Header from '../components/Header.js';
import './Dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header notebook={this.props.match.params.notebook} />
        <div className="container">
          {this.props.match.params.notebook}
        </div>
      </div>
    );
  }
}

export default Dashboard;