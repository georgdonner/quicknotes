import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = (props) => {
  const notebooks = props.notebooks.map((notebook) => {
    let classes = 'notebook';
    if (props.activeNotebook && props.activeNotebook._id === notebook._id) {
      classes += ' active';
    }
    return (
      <Link to={`/notebook/${notebook._id}`} key={notebook._id}>
        <li className={classes}>{notebook.name}</li>
      </Link>
    );
  });
  const sidebarPos = {
    left: 0,
  };
  if (!props.open) sidebarPos.left = '-240px';
  return (
    <span id="sidebar" style={sidebarPos}>
      <h3 className="sidebar-header">Notebooks</h3>
      <ul>
        {notebooks}
      </ul>
    </span>
  );
};

export default Sidebar;
