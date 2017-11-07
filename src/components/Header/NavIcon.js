import React from 'react';
import './Header.css';

const NavIcon = (props) => {
  let classes = 'nav-icon';
  if (props.classes) classes += ` ${props.classes}`;
  return (
    <div
      role="menuitem"
      tabIndex="0"
      className={classes}
      onClick={props.clicked}
      onKeyPress={props.clicked}
      style={props.style}
    >
      {props.dropdown ? <span className="right-arrow" /> : null}
      <span className={`icon is-${props.padding}`}>
        <i className={`fa fa-${props.size} fa-${props.icon}`} />
      </span>
    </div>
  );
};

export default NavIcon;
