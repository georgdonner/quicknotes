import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Aux from '../../hoc/Auxiliary';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: false,
    };
    this.search = null;
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    event.preventDefault();
    this.props.handleSearch(this.search.value);
    this.setState({
      showSearch: false,
    });
    this.search.value = '';
    this.search.blur();
  }

  render() {
    let notebooksMenu = (
      <div className="notebook-menu nav-item">
        {this.props.user ? (
          <span className="icon is-medium menu-icon" onClick={this.props.menuClicked}>
            <i className="fa fa-lg fa-bars" />
          </span>
        ) : null}
        <span className="is-hidden-mobile" id="notebook">{this.props.notebook}</span>
      </div>
    );

    let profileArea = this.props.user ? (
      <div className="nav-icon" style={{ marginRight: '1rem' }}>
        <span className="right-arrow" />
        <span className="icon is-medium">
          <i className="fa fa-2x fa-user-circle-o" />
        </span>
      </div>
    ) : (
      <div className="nav-icon">
        <Link to="/login">Login</Link>
      </div>
    );

    let navIcons = (
      <Aux>
        <div className="nav-icon is-hidden-tablet"
          onClick={() => {
            this.setState({ showSearch: true });
            this.search.focus();
          }}
        >
          <span className="icon is-small">
            <i className="fa fa-lg fa-search" />
          </span>
        </div>
        <div className="nav-icon">
          <span className="right-arrow" />
          <span className="icon is-small">
            <i className="fa fa-lg fa-plus" />
          </span>
        </div>
        {profileArea}
      </Aux>
    );
    let searchClasses = 'search-form nav-item control has-icons-left';
    if (!this.state.showSearch) {
      searchClasses += ' is-hidden-mobile';
    } else {
      notebooksMenu = null;
      navIcons = (
        <div onClick={() => this.setState({ showSearch: false })}>
          <span className="icon is-small">
            <i className="fa fa-lg fa-times" />
          </span>
        </div>
      );
    }
    return (
      <nav id="main-nav">
        <div className="is-flex container is-fluid" style={{ height: '36px', marginLeft: 0 }}>
          <div className="nav-start">
            {notebooksMenu}
            <form className={searchClasses} onSubmit={this.handleSearch}>
              <input className="input" id="search-field" type="search" placeholder="Search" ref={(ref) => { this.search = ref; }} />
              <span className="icon is-left">
                <i className="fa fa-search" />
              </span>
            </form>
          </div>
          <div className="nav-icons">
            {navIcons}
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
