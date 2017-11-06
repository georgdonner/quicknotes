import React, { Component } from 'react';
import './Header.css';

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.search = null;
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.active && !prevProps.active) {
      this.search.focus();
    }
  }

  handleSearch(event) {
    event.preventDefault();
    this.props.handleSearch(this.search.value);
    this.search.value = '';
    this.search.blur();
  }

  render() {
    let searchClasses = 'search-form nav-item control has-icons-left';
    if (!this.props.active) searchClasses += ' is-hidden-mobile';
    return (
      <form className={searchClasses} onSubmit={this.handleSearch}>
        <input className="input" id="search-field" type="search" placeholder="Search" ref={(ref) => { this.search = ref; }} />
        <span className="icon is-left">
          <i className="fa fa-search" />
        </span>
      </form>
    );
  }
}

export default Searchbar;
