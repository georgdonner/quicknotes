import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const NotebooksMenu = props => (
  <div className="notebook-menu nav-item">
    {props.showButton ? (
      <span
        className="icon is-medium menu-icon"
        onClick={props.clicked}
        onKeyPress={props.clicked}
        role="menu" tabIndex="0"
      >
        <i className="fa fa-lg fa-bars" />
      </span>
    ) : null}
    <Link to="/">
      <span className="is-hidden-mobile" id="quicknotes">Quicknotes</span>
    </Link>
  </div>
);

export default NotebooksMenu;
