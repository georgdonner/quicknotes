import React from 'react';
import '../Header.css';

const NavIcon = (props) => {
  const paddingClass = props.padding ? `is-${props.padding}` : '';
  const sizeClass = props.size ? `fa-${props.size}` : '';
  let classes = '';
  if (props.classes) classes += ` ${props.classes}`;
  return (
    <div
      role="menuitem"
      tabIndex="0"
      onKeyPress={props.clicked}
      onClick={props.clicked}
      className="nav-icon"
      style={{ display: 'flex' }}
    >
      <div className={classes} style={props.style}>
        <span className={`icon ${paddingClass}`}>
          <i className={`fa ${sizeClass} fa-${props.icon}`} />
        </span>
      </div>
      {props.dropdown ? (
        <span className={`icon ${paddingClass}`}>
          <i className="fa fa-angle-down" />
        </span>
      ) : null}
    </div>
  );
};

export default NavIcon;
