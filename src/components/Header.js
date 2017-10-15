import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    event.preventDefault();
    const searchValue = this.refs.search.value;
    this.props.handleSearch(searchValue);
    this.refs.search.value = '';
    this.refs.search.blur();
  }

  render() {
    return (
      <nav className="navbar main-nav">
        <div className="container navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item">
              <span id="notebook">{this.props.notebook}</span>
            </div>
            <div className="navbar-item">
              <form className="control has-icons-left" onSubmit={this.handleSearch}>
                <input className="input" id="search-field" type="search" placeholder="Search" ref="search"/>
                <span className="icon is-left">
                  <i className="fa fa-search"></i>
                </span>
              </form>
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