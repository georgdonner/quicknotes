import React from 'react';

import NavIcon from './common/NavIcon';

const PlusButton = () => (
  <div className="dropdown is-right is-hoverable">
    <div className="dropdown-trigger">
      <NavIcon dropdown size="lg" icon="plus" />
    </div>
    <div className="dropdown-menu" role="menu">
      <div className="dropdown-content">
        <div className="dropdown-item">
          <p>New Note</p>
          <p>New Notebook</p>
        </div>
      </div>
    </div>
  </div>
);

export default PlusButton;
