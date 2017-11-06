import React from 'react';
import './Header.css';

const NavIcon = (props) => {
  let classes = 'nav-icon';
  if (props.classes) classes += ` ${props.classes}`;
  return (
    <div
      className={classes}
      onClick={props.clicked}
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
