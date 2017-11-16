import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary';
import NotebooksMenu from './NotebooksMenu';
import NavIcon from './NavIcon';
import Searchbar from './Searchbar';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(value) {
    this.props.handleSearch(value);
    this.setState({
      showSearch: false,
    });
  }

  render() {
    const profileArea = this.props.user ? (
      <NavIcon dropdown
        style={{ marginRight: '1rem' }}
        padding="medium" size="2x" icon="user-circle-o"
      />
    ) : (
      <div className="nav-icon">
        <Link to="/login">Login</Link>
      </div>
    );

    let rightNav = (
      <Aux>
        {this.props.notebook ? this.props.notebook.name : null}
        <NavIcon
          classes="is-hidden-tablet"
          clicked={() => this.setState({ showSearch: true })}
          padding="small" size="lg" icon="search"
        />
        <NavIcon dropdown
          padding="small" size="lg" icon="plus"
        />
        {profileArea}
      </Aux>
    );

    if (this.state.showSearch) {
      rightNav = (
        <NavIcon
          clicked={() => this.setState({ showSearch: false })}
          padding="small" size="lg" icon="times"
        />
      );
    }

    return (
      <nav id="main-nav">
        <div className="is-flex container is-fluid" style={{ height: '36px', marginLeft: 0 }}>
          <div className="nav-start">
            <NotebooksMenu
              showButton={this.props.user && !this.state.showSearch}
              clicked={this.props.menuClicked}
            />
            <Searchbar active={this.state.showSearch} handleSearch={this.handleSearch} />
          </div>
          <div className="nav-icons">
            {rightNav}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  notebook: state.notebook,
});

export default connect(mapStateToProps)(Header);
