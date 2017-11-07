import React from 'react';
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
    <span className="is-hidden-mobile" id="quicknotes">Quicknotes</span>
  </div>
);

export default NotebooksMenu;
