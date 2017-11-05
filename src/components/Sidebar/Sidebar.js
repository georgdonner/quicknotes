import React from 'react';
import './Sidebar.css';

const Sidebar = (props) => {
  const notebooks = props.notebooks.map(notebook =>
    <li className="notebook" key={notebook._id}>{notebook.name}</li>,
  );
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
