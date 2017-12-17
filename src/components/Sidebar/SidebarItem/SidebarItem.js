import React from 'react';
import { Link } from 'react-router-dom';

const SidebarItem = (props) => {
  const classes = props.active ? 'sidebar-item active' : 'sidebar-item';
  const item = <li>{props.text}</li>;
  const link = props.url ? (
    <Link className="sidebar-link" to={props.url}>{item}</Link>
  ) : (
    <div className="sidebar-link" onClick={() => { props.onClick(); }} >{item}</div>
  );
  const editButton = props.editUrl ? (
    <Link to={props.editUrl} className="icon edit-sidebar">
      <i className="fa fa-pencil" />
    </Link>
  ) : null;
  return (
    <div className={classes}>
      {link}
      {editButton}
    </div>
  );
};

export default SidebarItem;
