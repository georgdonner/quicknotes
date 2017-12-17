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
  const editButton = props.onEdit ? (
    <span onClick={() => props.onEdit()} className="icon edit-sidebar">
      <i className="fa fa-pencil" />
    </span>
  ) : null;
  return (
    <div className={classes}>
      {link}
      {editButton}
    </div>
  );
};

export default SidebarItem;
