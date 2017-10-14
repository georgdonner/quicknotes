import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <nav className="navbar main-nav">
        <div className="container navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item">
              <span id="notebook">{this.props.notebook}</span>
            </div>
            <div className="navbar-item">
              <p className="control has-icons-left">
                <input className="input" id="search-field" type="search" placeholder="Search"/>
                <span className="icon is-left">
                  <i className="fa fa-search"></i>
                </span>
              </p>
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <a className="button" id="new-note">
                <span className="icon is-small">
                  <i className="fa fa-plus"></i>
                </span>
                <span>New</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;