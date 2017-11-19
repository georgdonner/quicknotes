import React from 'react';
import { Link } from 'react-router-dom';

import NavIcon from './common/NavIcon';

const PlusButton = () => (
  <div className="dropdown is-right is-hoverable">
    <div className="dropdown-trigger">
      <NavIcon dropdown size="lg" icon="plus" />
    </div>
    <div className="dropdown-menu" role="menu">
      <div className="dropdown-content">
        <div className="dropdown-item">
          <Link to="/new/note">New Note</Link>
        </div>
        <div className="dropdown-item">
          <Link to="/new/notebook">New Notebook</Link>
        </div>
      </div>
    </div>
  </div>
);

export default PlusButton;
