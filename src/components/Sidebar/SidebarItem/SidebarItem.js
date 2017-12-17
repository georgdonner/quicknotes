import React from 'react';
import { Link } from 'react-router-dom';

const SidebarItem = (props) => {
  const classes = props.active ? 'sidebar-item active' : 'sidebar-item';
  const item = <li className={classes}>{props.text}</li>;
  return props.url ? (
    <Link to={props.url}>{item}</Link>
  ) : (
    <div onClick={() => { props.onClick(); }} >{item}</div>
  );
};

export default SidebarItem;
